#!/usr/bin/env python
from .fishspace import FishSPACE
from .fishing import ClosestFisher
from .fishing import initialize_fisher_positions

from pkg_resources import resource_filename
from scipy.io import loadmat
import pandas as pd
import numpy as np
import time
import sys
import io

## Note: the goal is to not modify anything inside fishspace.py
## whenever I am tweaking the parameters

new_data = loadmat(resource_filename("fishspace", "data/ElNidoSHP_MATfile_06Sep2016.mat"))
bathymetry = loadmat(resource_filename("fishspace", "data/FS_bathy_final.mat"))['bathy_fin']
compare_networks = loadmat(resource_filename("fishspace", "data/new_networks_01Jun2017.mat"))
habitat_quality = loadmat(resource_filename("fishspace", "data/HabQual_RFinterp.mat"))

connectivity_metadata = pd.read_csv(resource_filename("fishspace", 'data/Epi_JJA_info_mod.csv'))
reef_connectivity_matrix = np.array(pd.read_csv(resource_filename("fishspace", "data/Epi_JJA_mat.csv"), header=None))

## Null model for connectivity is assuming all of the
# cell are connected with each other.
null_connectivity_matrix = np.ones(
        shape=(len(connectivity_metadata), len(connectivity_metadata))
    )/len(connectivity_metadata)

zero_connectivity_matrix = np.ones(
        shape=(len(connectivity_metadata), len(connectivity_metadata))
    )

# x_coords, y_coords = initial_data['lon'], initial_data['lat']
x_coords, y_coords = new_data['POINT_X'], new_data['POINT_Y']


def generate_fisher_set(count, threshold):
    fisher_initial_locs = new_data['FISHER_POD']
    fisher_locations = initialize_fisher_positions(count, fisher_initial_locs)

    return {
        'reef_fish': [ ClosestFisher(threshold=threshold,
            max_distance=60.0, home_posx=x, home_posy=y
            ) for x, y in fisher_locations ],
    }

scenario_config = {
    'CBMPAS': {
        'protection_mask': 1.0 * (new_data['SCENARIO_CBMPAS'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0),
    },
    'CBMPAS_MONTHLY': {
        'protection_mask': 1.0 * (new_data['SCENARIO_CBMPAS'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0),
        'fishing_schedule': 1.0 * (np.sin(np.arange(500)*np.pi/30.0) > 0)
    },
    'CBMPASLESS': {
        'protection_mask': 1.0 * (new_data['SCENARIO_CBMPAS'] > 0),
        'fisher_set': generate_fisher_set(count=250, threshold=6.0)
    },
    'NETWORK': {
        'protection_mask': 1.0 * (new_data['SCENARIO_NETWORK'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    },
    'NIPAS': {
        'protection_mask': 1.0 * (new_data['SCENARIO_NIPAS'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    },
    'NOFISHER': {
        'protection_mask': 1.0 * (new_data['SCENARIO_NETWORK'] > 0),
        'fisher_count': 0
    },

    'NOPROTECTION': {
        'protection_mask': np.zeros(new_data['SCENARIO_CBMPAS'].shape),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    },

    'NETLOCK100': {
        'protection_mask': 1.0 * (compare_networks['NETLOCK100'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    },

    'NETUNI0': {
        'protection_mask': 1.0 * (compare_networks['NETUNI0'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    },

    'RANDOM': {
        'protection_mask': 1.0 * (compare_networks['RANDOM'] > 0),
        'fisher_set': generate_fisher_set(count=500, threshold=6.0)
    }
}

if __name__ == '__main__':

    ## Place old params config inside the import guard; use as a 
    ## emplate for running simulations
    params = {
        'initial_reef_lattice': 0.003*new_data['REEF'],
        'initial_pelagic_lattice': pelagic_carry*0.10*np.random.random(size=new_data['POINT_X'].shape)*(new_data['WATER'] > 0),
        'fisher_initial_locs': new_data['FISHER_POD'],

        'reef_carry': reef_carry * (np.array(new_data['REEF'], dtype=float) / np.max(new_data['REEF'])),     # prev: 5000
        'reef_growth_rate': reef_growth_rate, # prev: 0.0039
        'pelagic_carry': pelagic_carry * (new_data['WATER'] > 0),
        'pelagic_growth_rate': pelagic_growth_rate,

        'geog_mask': (new_data['WATER'] > 0),
        'depth_map': bathymetry,

        'reef_connectivity_matrix': reef_connectivity_matrix,
        'connectivity_metadata': connectivity_metadata,
    }


    single_cell_params = {
        # Single cell params simulates the FISHBE conditions
        'initial_reef_lattice':  500000 * np.ones((1,1)),
        'initial_pelagic_lattice': 500000 * np.ones((1,1)),
        'fisher_initial_locs': np.ones((1,1)),

        'reef_carry': 4000000 * np.ones((1,1)),
        'reef_growth_rate': reef_growth_rate,
        'pelagic_carry': 4000000 * np.ones((1,1)),
        'pelagic_growth_rate': pelagic_growth_rate,

        'geog_mask': np.ones((1,1)),
        'depth_map': np.ones((1,1)),

        'protection_mask': np.zeros((1,1)),
        'fisher_count': 250,

        ## Dummy values; unused
        'reef_connectivity_matrix': reef_connectivity_matrix,
        'connectivity_metadata': connectivity_metadata,
    }

    two_cell_params = {
        # Two cell params simulates FISHBE with two cell types, one of which
        # is a "protected cell". Both intra- and intercell spillover are computed.
        'initial_reef_lattice': 500000 * np.ones((2,2)) / 4.0,
        'initial_pelagic_lattice': 500000 * np.ones((2,2)) / 4.0,
        'fisher_initial_locs': np.ones((2,2)),

        'reef_carry': 4000000 * np.ones((2,2)) / 4.0,
        'reef_growth_rate': reef_growth_rate,
        'pelagic_carry': 4000000 * np.ones((2,2)) / 4.0,
        'pelagic_growth_rate': pelagic_growth_rate,

        'geog_mask': np.ones((2,2)),
        'depth_map': np.ones((2,2)),

        'protection_mask': np.array([[0, 1], [0, 1]]),
        'fisher_count': 250,

        ## Dummy values; unused
        'reef_connectivity_matrix': reef_connectivity_matrix,
        'connectivity_metadata': connectivity_metadata
    }


    # the_model = FishSPACE(**two_cell_params)
    reef_growth_rate, reef_carry = float(sys.argv[2]), float(sys.argv[3])
    pelagic_growth_rate, pelagic_carry = float(sys.argv[4]), float(sys.argv[5])

    fname = "results/fishspace_r-{0}_K-{1}_r-{2}_K-{3}__{4}.json".format(
                    reef_growth_rate, reef_carry,
                    pelagic_growth_rate, pelagic_carry, sys.argv[1])

    # the_model = FishSPACE(
    #     fisher_set={'reef_fish': [EqualFisher(threshold=6.0*250)]},
    #     **two_cell_params
    # )

    the_model = FishSPACE(**params, **scenario_config[sys.argv[1]])
    with io.open(fname, "a") as text_log:
        for i in range(365*5):
            current_time = time.time()
            the_model.run_timestep()
            the_model.save_state(text_log)
            print("Done %i, %.3f s"%(i, time.time() - current_time))
            # print("Total Biomass: %.4f"%(the_model.fishing_layers['reef_fish'].biomass.sum()))

            print("%.4f"%(the_model.fishing_layers['reef_fish'].biomass.sum()))
