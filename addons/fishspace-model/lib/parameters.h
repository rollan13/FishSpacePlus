#pragma once

#include <vector>

#include "fishing_agent.h"

#define ARRAY_SIZE 2 /*!< represents the number of fish biomass (Demersal and Pelagic) */

namespace fishspace{

// for convenience
using std::vector;
template <class T> using vector2d = vector<vector<T>>;
template <class T> using vector3d = vector<vector<vector<T>>>;

class ModelParameters {

public:
    // std::vector<fishing::Fisher> fisher_set;
	int initial_posy;
	std::vector<std::vector<double>> initial_biomass;
	std::vector<std::vector<double>> carrying_capacity;;
	double spillover_rate;
	double growth_rate;
	int warmup_time;
	std::vector<std::vector<bool>> geog_mask;
	std::vector<std::vector<double>> depth_mask;
	std::vector<std::vector<bool>> protection_mask;
	int connectivity_delay;
	std::vector<std::vector<double>> reef_connectivity_matrix;
	int current_time;

};

struct ConnectivityMetadata {
	int x_pos;
	int y_pos;
	int index;
};

struct Connectivity {
	vector<ConnectivityMetadata> metadata;
	vector2d<double> connectivity_matrix;

	double fecundity;
	double recruitment_rate;

	//for second biomass (Pelagic Fish)
	vector<ConnectivityMetadata> metadata2;
	vector2d<double> connectivity_matrix2;

	double fecundity2;
	double recruitment_rate2;
};

struct MapInputs {
	vector2d<double> initial_biomass;
	vector2d<double> carrying_capacity;
	vector2d<int> geog_mask;
	vector2d<int> protection_mask;
	vector2d<double> retention;

	//for second biomass (Pelagic Fish)
	vector2d<double> initial_biomass2;
	vector2d<double> carrying_capacity2;
	vector2d<double> retention2;
};

struct ModelInput {
	double growth_rate;
	double spillover_rate;
	double spillover_threshold;
	MapInputs map_inputs;
	Connectivity connectivity;

	//for second biomass (Pelagic Fish)
	double growth_rate2;
	double spillover_rate2;
	double spillover_threshold2;
};

struct ModelOutput {
	double total_biomass;
	double biomass_inside;
	vector2d<double> biomass_grid;
	vector<vector2d<int>> fisher_locs;
	vector<double> fisher_catch;

	/* Add another set of output variables for 2nd fishbiomass */
	//for second biomass (Pelagic Fish)
	double total_biomass2;
	double biomass_inside2;
	vector2d<double> biomass_grid2;
	vector<vector2d<int>> fisher_locs2;
	vector<double> fisher_catch2;
};

}



