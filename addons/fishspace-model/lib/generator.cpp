#include <vector>
#include <random>
#include <fstream>
#include <string>
#include <iostream>

#include "parameters.h"
#include "model.h"

/** \file generator.cpp
 * \brief This contains the method to get the current state of the Fish Space Model
 */
namespace fishspace {

using namespace std;

/*!
  \brief This function/method is for generating the output results using the ModelOutput class
  \details The return type of this function is a ModelOutput which consists of several output variables and matrix
  such as total_biomass, biomass_inside, biomass_grid, fisher_locs and the fisher_catch.
  \return ModelOutput An output class
 */
ModelOutput FISHSpaceModel::get_current_state(void) {
	double total_biomass[ARRAY_SIZE];
	double biomass_inside[ARRAY_SIZE];
	vector2d<double> biomass_grid[ARRAY_SIZE];
	vector<vector2d<int>> fisher_locs[ARRAY_SIZE];
	vector<double> fisher_catch[ARRAY_SIZE];
	int i = 0;

	for (int idx=0; idx < ARRAY_SIZE; idx++) {
		total_biomass[idx] = sum_2df(fish_biomass[idx]);
		biomass_inside[idx] = prod_2df(fish_biomass[idx], protection_mask);
		biomass_grid[idx] = fish_biomass[idx];

		/*
		for (auto& fisher : fisher_set[idx]) {
			fisher_locs[idx].push_back(fisher->catch_locs);
			fisher_catch[idx].push_back(fisher->recent_catch);;
		}
		*/

		//std::string filename = "generator-biomass_grid" + std::to_string(idx) + ".csv";
		//saveToFile(biomass_grid[idx], filename);
	}

	for (auto& fisher : fisher_set[0]) {
		fisher_locs[0].push_back(fisher->catch_locs[0]);
		fisher_catch[0].push_back(fisher->recent_catch[0]);
		fisher_locs[1].push_back(fisher->catch_locs[1]);
		fisher_catch[1].push_back(fisher->recent_catch[1]);
		i++;
	}

	//return ModelOutput { total_biomass, biomass_inside, biomass_grid, fisher_locs, fisher_catch };
	/* Add another set of output variables for 2nd fishbiomass */
	return ModelOutput{ total_biomass[0], biomass_inside[0], biomass_grid[0], fisher_locs[0], fisher_catch[0],
						total_biomass[1], biomass_inside[1], biomass_grid[1], fisher_locs[1], fisher_catch[1]
	                  };
}

/*!
  \brief Deprecated. This function/method is for generating dummy data to test the ModelOutput class
 */
/*
ModelOutput FISHSpaceModel::generate_dummy(void) {
	// zero-initialize the variables
	
	int dim_x = 300;
	int dim_y = 150;
	int fisher_count = 100;

	vector<vector2d<int>> fisher_locs; // Pairs might be used instead
	vector<double> fisher_catch;
	// emulates random walk behavior: generate a number of steps
	// taken by the fisher, then create a position
	std::uniform_int_distribution<int> step_count (1, 50);
	std::uniform_int_distribution<int> rand_posx (0, dim_x - 1);
	std::uniform_int_distribution<int> rand_posy (0, dim_y - 1);
	std::uniform_real_distribution<double> random_bio (0, 100);

	vector2d<double> biomass_grid = generate_2df(dim_x, dim_y);
	double total_biomass = sum_2df(biomass_grid);

	for (int i = 0; i < fisher_count; i++){
		
		vector<int> pos_init { rand_posx(gen), rand_posy(gen) };

		vector2d<int> current_set;
		current_set.push_back(pos_init);
		fisher_catch.push_back(random_bio(gen)/100);

		int steps_taken  = step_count(gen);
		for (int t = 0; t < steps_taken; t++) {
			vector<int> pos_next { rand_posx(gen), rand_posy(gen) };
			current_set.push_back(pos_next);
		}
		fisher_locs.push_back(current_set);
	}

	return ModelOutput { total_biomass, 0, biomass_grid, fisher_locs, fisher_catch };
}
*/

/*!
  \brief Deprecated. This function/method is for generating a 2-dimensional vector of random floating point numbers (decimals) given row and column boundaries
 */
/*
vector2d<double> FISHSpaceModel::generate_2df(int dim_x, int dim_y) {
	std::uniform_real_distribution<double> random_float (0, 100);
	vector2d<double> generated_vec (dim_y, vector<double>(dim_x, 0));
	for (vector<double>& row : generated_vec) {
		for (double& elem : row) {
			elem = random_float(gen);
		}
	}
	return generated_vec;
}
*/

/*!
  \brief Deprected. This function/method is for generating a 2-dimensional vector of random integers given row and column boundaries
 */
/*
vector2d<int> FISHSpaceModel::generate_2di(int dim_x, int dim_y) {
	std::uniform_int_distribution<int> random_int (0, 1);
	vector2d<int> generated_vec (dim_y, vector<int>(dim_x, 0));
	for (vector<int>& row : generated_vec) {
		for (int& elem : row) {
			elem = random_int(gen);
		}
	}
	return generated_vec;
}
*/

/*!
  \brief A utility function/method for getting the sum of all the elements in a matrix

  \param the_vec An input 2-dimensional matrix of numbers of type double
  \return double A number of type double
 */
double FISHSpaceModel::sum_2df(vector2d<double> the_vec) {
	double acc = 0;
	//std::uniform_int_distribution<int> step_count (1, 50);

	for (vector<double>& row : the_vec) {
		for (double& elem : row) acc += elem;
	}
	return acc;
}

/*!
  \brief A utility function/method for getting the product of all the elements multiplied to a 2-dimensional matrix with elements of 1 or 0.

  \param bio_vec An input 2-dimensional matrix of numbers of type double
  \param mask_vec An input 2-dimensional matrix with elements of 1 or 0 only
  \return double A number of type double
 */
double FISHSpaceModel::prod_2df(vector2d<double> bio_vec, vector2d<int> mask_vec) {
	dim vec_dim = matrix_dim(bio_vec);
	double acc = 0;
	for (int i = 0; i < vec_dim.dim_x; i++) {
		for (int j = 0; j < vec_dim.dim_y; j++) {
			if (mask_vec[i][j] == 1) acc += bio_vec[i][j];
		}
	}
	return acc;
}

/*!
  \brief Deprecated. This function/method is for initiliazing the parameters with dummy data for testing.
 */
/*
void FISHSpaceModel::initialize_dummy(int dim_x, int dim_y) {
	// these will be generated by the shims

	double test_growth_rate = 0.10;
	double test_spillover_rate = 20.0;
	double test_spillover_threshold = 0.0;
	double test_fecundity = 1.0;
	double test_recruitment_rate = 1.0;

	MapInputs map_inputs = {
		generate_2df(dim_x, dim_y), generate_2df(dim_x, dim_y),
		generate_2di(dim_x, dim_y), generate_2di(dim_x, dim_y),
		generate_2df(dim_x, dim_y)
	};

	Connectivity connectivity = {
		{}, {}, 
		test_fecundity, test_recruitment_rate
	};

	ModelInput model_input = {
		test_growth_rate, test_spillover_rate, test_spillover_threshold,
		map_inputs, connectivity
	};

	// this will be actually done after construction of instance
	initial_biomass[0]  = model_input.map_inputs.initial_biomass;
	carrying_capacity[0]  = model_input.map_inputs.carrying_capacity;
	geog_mask  = model_input.map_inputs.geog_mask;
	protection_mask  = model_input.map_inputs.protection_mask;

	growth_rate = model_input.growth_rate;
	spillover_rate = model_input.spillover_rate;
}
*/


} //fishspace
