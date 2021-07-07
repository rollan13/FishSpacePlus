#!/usr/bin/env python
from .fisheries import FishLayer
from .fishing import WalkFisher, EqualFisher, ClosestFisher

import numpy as np
import ujson as json

class FishSPACE(object):
    ''' The full model! '''

    def __init__(self, **kwargs):

        ## TODO: SHOULD INITIALIZING LAYERS BE SEPARATE FROM THE MODEL?
        self.fishing_layers = {
            'reef_fish': FishLayer(
                initial_lattice=kwargs.get('initial_reef_lattice'),
                growth_rate=kwargs.get('reef_growth_rate'),
                carrying_capacity=kwargs.get('reef_carry'),
                spillover_rate=10.0, ## NOTE: temp no spillover

                delay=20,
            ),

            ## NOTE: UNCOMMENT TO ENABLE PELAGICS
            # 'pelagic_fish': FishLayer(
            #     initial_lattice=kwargs.get('initial_pelagic_lattice'),
            #     growth_rate=kwargs.get('pelagic_growth_rate'),
            #     carrying_capacity=kwargs.get('pelagic_carry'),
            #     spillover_rate=999, ## NOTE: temp no spillover
            # )
        }

        self.fisher_set = kwargs.get('fisher_set', {
            # Default is equal fisher, works regardless of spatial format. If
            # no fisher count is specified then assume unfished configuration.
            'reef_fish' : [EqualFisher(threshold=6.0*kwargs.get('fisher_count', 0))]
        }) 

        ## Other required parameters
        self.geog_mask = kwargs['geog_mask']
        self.depth_map = kwargs['depth_map']
        self.protection_mask = kwargs['protection_mask']
        self.connectivity_delay = kwargs.get("connectivity_delay", 365)
        self.connectivity_metadata = kwargs['connectivity_metadata']
        self.reef_connectivity_matrix = kwargs['reef_connectivity_matrix']
        self.lagged_matrix = []

        self.current_time = 0

    def run_timestep(self):
        ## FISHERIES LAYER
        for layer_name, layer in self.fishing_layers.items():
            layer.solve_biomass()
            layer.solve_spillover((layer.biomass > 0) * self.geog_mask)
        ## FISHING LAYER
        ## TODO: move weight function to a method
        weight_func = self.geog_mask.copy()
        weight_func = weight_func.tolist()

        ## The connectivity part; only works with reef
        biomass_values = np.array(self.connectivity_metadata.apply(lambda x: self.fishing_layers['reef_fish'].biomass[x.XPOS, x.YPOS], axis=1))
        mapping_set = { coord: np.sum(biomass_values * self.reef_connectivity_matrix[index]) for index, coord in enumerate(zip(self.connectivity_metadata['XPOS'], self.connectivity_metadata['YPOS'])) }
        self.lagged_matrix.append(mapping_set)

        connectivity_conversion = 0.05
        for coords, biomass_input in self.lagged_matrix[0].items():
            self.fishing_layers['reef_fish'].biomass[coords] = min(self.fishing_layers[layer_name].carrying_capacity[coords], self.fishing_layers['reef_fish'].biomass[coords] + connectivity_conversion*biomass_input)

        if len(self.lagged_matrix) > self.connectivity_delay:
            self.lagged_matrix.remove(self.lagged_matrix[0])

        for layer_name, fisher_set in self.fisher_set.items():
            # Set baseline as 1% of carrying capacity
            baseline = 0.01 * self.fishing_layers[layer_name].carrying_capacity
            biomass = self.fishing_layers[layer_name].biomass

            baseline = baseline.tolist()

            biomass = biomass.tolist()
            protection = self.protection_mask.tolist()

            for fisher in fisher_set: ## TODO: CLEAN THE IMPLEMENTATION!
                # Fisher takes out biomass for the corresponding layer
                # biomass = fisher.fish_out(baseline, biomass,
                #         weight_func, protection)
                biomass = fisher.fish_out(biomass, protection, baseline)
                # biomass = fisher.fish_out(biomass, protection, baseline)

            # Return the resulting biomass values after fishing
            self.fishing_layers[layer_name].biomass = np.array(biomass)

        self.current_time = self.current_time + 1

    def save_state(self, file):
        data_dict = {}

        for layer_name, layer in self.fishing_layers.items():
            data_dict[layer_name] = {
                'max_biomass': np.max(layer.biomass),
                'mean_biomass': np.mean(layer.biomass),
                'total_biomass': np.sum(layer.biomass),
                'biomass_grid': layer.biomass.tolist()
            }

            if self.fisher_set[layer_name] and hasattr(self.fisher_set[layer_name][0], 'get_position'):
                fisher_locs = [fisher.get_position() for fisher in self.fisher_set[layer_name]]
                fisher_states = [ fisher.get_history() for fisher in self.fisher_set[layer_name]]

                fisher_locs_array = np.zeros(self.fishing_layers[layer_name].biomass.shape, dtype=np.int)
                for pos_x, pos_y in fisher_locs:
                    fisher_locs_array[pos_x, pos_y] = 1
                data_dict[layer_name]['fisher_locs'] = fisher_locs_array.tolist()
                # Scans for the last updated fisher current threshold before
                # reaching step limit.
                state_list = []
                for i in fisher_states:
                    last_thresh = i[-1][-1]
                    for step in i[:-1][::-1]:
                        if step[-1] != last_thresh:
                            break
                    state_list.append([i[0][:2], i[-1][:2], len(i), last_thresh])
                data_dict[layer_name]['fisher_states'] = state_list

            if self.fisher_set[layer_name] and hasattr(self.fisher_set[layer_name][0], 'get_last_position'):
                fisher_locs = [ fisher.get_last_position() for fisher in self.fisher_set[layer_name] ]
                fisher_origin = [ [fisher.home_posx, fisher.home_posy] for fisher in self.fisher_set[layer_name] ]

                data_dict[layer_name]['fisher_locs'] = fisher_locs
                data_dict[layer_name]['fisher_origin'] = fisher_origin

            data_dict['time'] = self.current_time
            file.writelines(json.dumps(data_dict) + u"\n")

