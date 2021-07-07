#include <vector>
#include <random>
#include <cmath>
#include <iostream>
#include <algorithm>
#include <chrono>
#include <deque>
#include <fstream>
#include <typeinfo>

#include "fishing_agent.h"
#include "parameters.h"
#include "model.h"

/** \file model.cpp
 * \brief This contains the methods of the Fish Space Model
 */
typedef std::chrono::high_resolution_clock Clock;

/*!
 * \brief This namespace contains the FISHSpaceModel class which has all the operations needed for the fishspace model.
 */

namespace fishspace {

using namespace std;

/*!
  \brief FISHSpaceModel constructor
  \details This is a simple constructor without any parameters for the FISHSpaceModel.
		   This is executed whenever new objects are created of this class.
*/
FISHSpaceModel::FISHSpaceModel() : current_time(0), gen() {}

/*!
  \brief FISHSpaceModel destructor.
  \details This is a simple destructor for the FISHSpaceModel. This is executed whenever an object of this class goes out of scope or
  whenever the delete expression is applied to a pointer to the object of that class. This desctructor
  deletes the fishers in the fisher_set which is an array of two vectors.
*/
FISHSpaceModel::~FISHSpaceModel() {
	for (auto fisher: fisher_set[0]) {
		delete fisher;
	}
    /*
	for (auto fisher : fisher_set[1]) {
		delete fisher;
	}
    */
}

/*!
 * \brief This should be the first function to call to initialize the parameters for the FISHSpaceModel
 *
 * \details This function/operation should be called first after the FISHSpaceModel object is created.
 * The ModelInput parameter contain all the single-value parameter and vector/matrix parameters needed by the FISHSpaceModel.
 * Single-value parameters include the following:
 *   (1) growth_rate
 *   (2) spillover_rate
 *   (3) spillover_threshold
 *   (4) fecundity
 *   (5) recruitment_rate
 * The vector/matrix parameters include the following:
 *   (1) initial_biomass
 *   (2) carrying_capacity
 *   (3) geog_mask
 *   (4) protection_mask
 *   (5) retention
 *   (6) connectivity.metadata
 *   (7) connectivity_matrix
 * \param model_input Type of ModelInput defined in the parameters header file.
 * \see parameters.h
 */
void FISHSpaceModel::initialize_parameters(ModelInput model_input) {
	// base ModelInput
	growth_rate[0] = model_input.growth_rate;
	growth_rate[1] = model_input.growth_rate2;
	spillover_rate[0] = model_input.spillover_rate;
	spillover_rate[1] = model_input.spillover_rate2;
	spillover_threshold[0] = model_input.spillover_threshold;
	spillover_threshold[1] = model_input.spillover_threshold2;
	// from MapInputs
	initial_biomass[0] = model_input.map_inputs.initial_biomass;
	initial_biomass[1] = model_input.map_inputs.initial_biomass2;
	carrying_capacity[0] = model_input.map_inputs.carrying_capacity;
	carrying_capacity[1] = model_input.map_inputs.carrying_capacity2;
	geog_mask = model_input.map_inputs.geog_mask;
	protection_mask = model_input.map_inputs.protection_mask;
	retention[0] = model_input.map_inputs.retention;
	retention[1] = model_input.map_inputs.retention2;

	saveToFile(initial_biomass[0], "initial_biomass0.csv");
	saveToFile(initial_biomass[1], "initial_biomass1.csv");
	saveToFile(carrying_capacity[0], "carrying_capacity0.csv");
	saveToFile(carrying_capacity[1], "carrying_capacity1.csv");
	saveToFile(geog_mask, "geog_mask.csv");
	saveToFile(protection_mask, "protection_mask.csv");
	saveToFile(retention[0], "retention0.csv");
	saveToFile(retention[1], "retention1.csv");
	// from Connectivity
	connectivity_metadata[0] = model_input.connectivity.metadata;
	connectivity_metadata[1] = model_input.connectivity.metadata2;
	saveToFile(connectivity_metadata[0], "connectivity_metadata0.csv");
	saveToFile(connectivity_metadata[1], "connectivity_metadata1.csv");

	connectivity_matrix[0] = model_input.connectivity.connectivity_matrix;
	connectivity_matrix[1] = model_input.connectivity.connectivity_matrix2;
	saveToFile(connectivity_matrix[0], "connectivity_matrix0.csv");
	saveToFile(connectivity_matrix[1], "connectivity_matrix1.csv");
	fecundity[0] = model_input.connectivity.fecundity;
	fecundity[1] = model_input.connectivity.fecundity2;
	recruitment_rate[0] = model_input.connectivity.recruitment_rate;
	recruitment_rate[1] = model_input.connectivity.recruitment_rate2;
	// initialize biomass
	//fish_biomass = initial_biomass;
	fish_biomass[0] = initial_biomass[0];
	fish_biomass[1] = initial_biomass[1];

	// open a file in write mode.
	ofstream outfile;
	outfile.open("initialize_parameters.csv");

	for(int i=0; i < ARRAY_SIZE; i++) {
		outfile << "growth_rate[" << i << "]=" << growth_rate[i] << endl;
		outfile << "spillover_rate[" << i << "]=" << spillover_rate[i] << endl;
		outfile << "spillover_threshold[" << i << "]=" << spillover_threshold[i] << endl;
		outfile << "fecundity[" << i << "]=" << fecundity[i] << endl;
		outfile << "recruitment_rate[" << i << "]=" << recruitment_rate[i] << endl;
	}

	outfile.close();

	//saveToFile(fish_biomass[0], "model-initialize_parameters-fish_biomass0csv");
	//saveToFile(fish_biomass[1], "model-initialize_parameters-fish_biomass1.csv");
	// internal only: initialize delayed connectivity with zeros initially:
	connectivity_delay = 52;

	for (int arrInd=0; arrInd < ARRAY_SIZE; arrInd++) {
		dim vec_dim = matrix_dim(initial_biomass[arrInd]);
		connectivity_delay_arr[arrInd] = deque<vector2d<double>>(connectivity_delay, vector2d<double>(vec_dim.dim_x, vector<double>(vec_dim.dim_y, 0)));

		/* Removed since this has no use */
		/*
		for (vector2d<double> slice : connectivity_delay_arr[arrInd]) {
			for (int i = 0; i < vec_dim.dim_x; i++){
				for (int j = 0; j < vec_dim.dim_y; j++){
					slice[i][j] = initial_biomass[arrInd][i][j];
				}
			}
		}
		*/
	}
}

/* This run_timestep is called by the run_timestep in wrapper.cpp */
/*!
  \brief This run_timestep is called by the run_timestep in wrapper.cpp
*/
void FISHSpaceModel::run_timestep(void){
    // auto ts_init = Clock::now();

	// Run the processes
	//solve_fishing(current_time);
	solve_fishing();
	// auto ts_fish = Clock::now();
	solve_biomass();
	// auto ts_biom = Clock::now();

    // double fish_time = std::chrono::duration_cast<std::chrono::microseconds>(ts_fish - ts_init).count() / 1000.0;
    // double biom_time = std::chrono::duration_cast<std::chrono::microseconds>(ts_biom - ts_fish).count() / 1000.0;

	// Increment counter, then perform
	// post-time step actions
	current_time = current_time + 1;
	// cout << "current time: " << current_time << " ts. \t"
    //      << "FISH: " << fish_time << " ms. \t"
	// 	 << "BIOM: " << biom_time << " ms." << endl;

}

/*
  Deprecated This run_timestep(int num_timestep) is not used.
*/
/*
void FISHSpaceModel::run_timestep(int num_timestep){
	for (int i = 0; i < num_timestep; i++) {
		solve_fishing();
		solve_biomass();
		current_time = current_time + 1;
	}
}
*/

/*!
  \brief This function removes from the respective cell in the fish biomass the fish caught by each fisher.
  \details This function updates the fish biomass based on the fish caught by each defined fisher object.
  The fisher catches fish from two types of fish (fish_biomass[0] is Demersal and fish_biomass[1] is Pelagic)
*/
void FISHSpaceModel::solve_fishing(void){
	/*
	Performs the fishing operation by iterating over a set
	of fishers with a common object type.
	*/
	
	for (auto& fisher : fisher_set[0]) {
		//fisher->fish_out(fish_biomass[0]);
		fisher->fish_out(fish_biomass[0], fish_biomass[1]); 
		//fisher->fish_out(fish_biomass[0], fish_biomass[1], current_time);
		//ct[fisher->curr_time] = fisher->curr_time;
		//saveToFileInt(fisher->curr_time, "model-solve_fishing-current_time.csv");
	}
	//saveToFile(ct, "model-solve_fishing-current_time.csv");

	//saveToFile(fish_biomass[0], "model-solve_fishing-fish_biomass0.csv");
    /*
	for (auto& fisher : fisher_set[1]) {
		fisher->fish_out(fish_biomass[1]);
	}
    */
	//saveToFile(fish_biomass[1], "model-solve_fishing-fish_biomass1.csv");
}

/*!
  \brief This function updates the fish biomass given the growth rate and movement of the fish.
  \details First, the function updates the fish biomass using the growth rate and carrying capacity of each cell.
  Then, using a connectivity matrix for the movement of the fish, the fish biomass is further updated for each cell.
  Last, the fish biomass is updated using a spill-over algorithm.
*/
void FISHSpaceModel::solve_biomass(void){
	/*
	Compute for the biomass-increase function which includes
	the logistic function, density-dependent spillover, and 
	connectivity.
	 */

	/*
	Compute increase in adult/fishable biomass based on the
	logistic equation. NOTE: temporarily disabled to test
	biomass increase based on the metapopulation model [27Jan2018].
	*/
	dim vec_dim = matrix_dim(fish_biomass[0]);
	for (int i = 0; i < vec_dim.dim_x; i++){
		for (int j = 0; j < vec_dim.dim_y; j++){
			fish_biomass[0][i][j] += growth_rate[0] * fish_biomass[0][i][j]
				* (1 - fish_biomass[0][i][j]/carrying_capacity[0][i][j]);
		}
	}
	fish_biomass[0] = solve_connectivity();
	if (spillover_threshold[0] < 1) {
		for (int i = 0; i < 7; i++) {
			// fish_biomass = solve_spillover(fish_biomass, geog_mask, spillover_rate);
			// vector2d<double> test_exec = solve_spillover_discreet(fish_biomass);
			//fish_biomass[0] = solve_spillover_discreet(fish_biomass[0]);
			fish_biomass[0] = solve_spillover_discreet(fish_biomass[0], spillover_rate[0], spillover_threshold[0]);
		}
	}

	//saveToFile(fish_biomass[0],"model-solve_biomass-fish_biomass0.csv");

	dim vec_dim2 = matrix_dim(fish_biomass[1]);
	for (int i = 0; i < vec_dim2.dim_x; i++) {
		for (int j = 0; j < vec_dim2.dim_y; j++) {
			fish_biomass[1][i][j] += growth_rate[1] * fish_biomass[1][i][j]
				* (1 - fish_biomass[1][i][j] / carrying_capacity[1][i][j]);
		}
	}
	fish_biomass[1] = solve_connectivity2();
	if (spillover_threshold[1] < 1) {
		for (int i = 0; i < 7; i++) {
			// fish_biomass = solve_spillover(fish_biomass, geog_mask, spillover_rate);
			// vector2d<double> test_exec = solve_spillover_discreet(fish_biomass);
			//fish_biomass[1] = solve_spillover_discreet(fish_biomass[1]);
			fish_biomass[1] = solve_spillover_discreet(fish_biomass[1], spillover_rate[1], spillover_threshold[1]);
		}
	}

	//saveToFile(fish_biomass[1], "model-solve_biomass-fish_biomass1.csv");
}

/*!
  \brief A private function for computing the first fish biomass.
  \details Updates the fish biomass using three steps. [Step 1] Larval settlement (from sources...).  [Step 2] Larval recruitment (...to the sink).   [Step 3] Conversion to adult/fishable biomass: Ricker model
*/
vector2d<double> FISHSpaceModel::solve_connectivity(void) {
	vector2d<double> fish_biomass_lag = connectivity_delay_arr[0].front();
	dim vec_dim = matrix_dim(fish_biomass_lag);
	vector2d<double> additional_biomass (vec_dim.dim_x, vector<double>(vec_dim.dim_y, 0));

	for (ConnectivityMetadata& dst_metadata : connectivity_metadata[0]) {
		int sink = dst_metadata.index;
		double ret = retention[0][dst_metadata.x_pos][dst_metadata.y_pos]; 
		double dst_biomass = fish_biomass[0][dst_metadata.x_pos][dst_metadata.y_pos];
		double dst_carry = carrying_capacity[0][dst_metadata.x_pos][dst_metadata.y_pos];
		double settle_bound = 0.0;
		//std::cout << "(" << dst_metadata.x_pos << "," << dst_metadata.y_pos << "," << ret << "),"; // FOR DEBUG
		if (dst_carry > 0) {
			double settle_amount = 0.0;
			for (int source = 0; source < int(connectivity_matrix[0][dst_metadata.index].size()); source++){
				ConnectivityMetadata src_metadata = connectivity_metadata[0][source];
				double src_biomass = fish_biomass_lag[src_metadata.x_pos][src_metadata.y_pos];
				double src_carry = carrying_capacity[0][src_metadata.x_pos][src_metadata.y_pos];
				if (src_carry > 0) {
					double conn_val = connectivity_matrix[0][sink][source];
					// 1. Larval settlement (from sources...) TODO: 1.0 is phi
					if (conn_val > 0) {
						settle_amount = settle_amount + (fecundity[0] * conn_val * src_biomass);
						settle_bound += src_carry;
					}
				}
			}

			settle_amount = settle_amount / (settle_bound + 1e-10);
			// 2. Larval recruitment (...to the sink)
			additional_biomass[dst_metadata.x_pos][dst_metadata.y_pos] = (ret * settle_amount * (dst_carry - dst_biomass));
			// if (ret > 0) { // FOR DEBUG
			// 	std::cout << "#####>  "
			// 	<< ret << ", "
			// 	<< additional_biomass[dst_metadata.x_pos][dst_metadata.y_pos]
			// 	<< settle_amount << ", "
			// 	<< dst_carry << ", "
			// 	<< dst_biomass << ", "
			// 	<< std::endl;
			// }
		}
	}
	// std::cout << std::endl; // FOR DEBUG
	// 3. Conversion to adult/fishable biomass: Ricker model
	for (int i = 0; i < vec_dim.dim_x; i++) {
		for (int j = 0; j < vec_dim.dim_y; j++) {
			if ( (carrying_capacity[0][i][j] - fish_biomass[0][i][j]) > 0){
				double alpha = recruitment_rate[0];
				double beta = 1.0 / (carrying_capacity[0][i][j] - fish_biomass[0][i][j]);
				additional_biomass[i][j] = fish_biomass[0][i][j] + (
					additional_biomass[i][j] * (
						std::exp(alpha * 0.693 * (1 - (beta * additional_biomass[i][j]))) - 1
				));
			}
		}
	}

	// Pop-out the head of the connectivity stack and push a new one
	// for the current value
	connectivity_delay_arr[0].pop_front();
	connectivity_delay_arr[0].push_back(additional_biomass);

	return additional_biomass;
}

/*!
  \brief A private function for computing the second fish biomass.
  \details Updates the fish biomass using three steps. [Step 1] Larval settlement (from sources...).  [Step 2] Larval recruitment (...to the sink).   [Step 3] Conversion to adult/fishable biomass: Ricker model
*/
vector2d<double> FISHSpaceModel::solve_connectivity2(void) {
	vector2d<double> fish_biomass_lag = connectivity_delay_arr[1].front();
	dim vec_dim = matrix_dim(fish_biomass_lag);
	vector2d<double> additional_biomass(vec_dim.dim_x, vector<double>(vec_dim.dim_y, 0));

	for (ConnectivityMetadata& dst_metadata : connectivity_metadata[1]) {
		int sink = dst_metadata.index;
		double ret = retention[1][dst_metadata.x_pos][dst_metadata.y_pos];
		double dst_biomass = fish_biomass[1][dst_metadata.x_pos][dst_metadata.y_pos];
		double dst_carry = carrying_capacity[1][dst_metadata.x_pos][dst_metadata.y_pos];
		double settle_bound = 0.0;
		//std::cout << "(" << dst_metadata.x_pos << "," << dst_metadata.y_pos << "," << ret << "),"; // FOR DEBUG
		if (dst_carry > 0) {
			double settle_amount = 0.0;
			for (int source = 0; source < int(connectivity_matrix[1][dst_metadata.index].size()); source++) {
				ConnectivityMetadata src_metadata = connectivity_metadata[1][source];
				double src_biomass = fish_biomass_lag[src_metadata.x_pos][src_metadata.y_pos];
				double src_carry = carrying_capacity[1][src_metadata.x_pos][src_metadata.y_pos];
				if (src_carry > 0) {
					double conn_val = connectivity_matrix[1][sink][source];
					// 1. Larval settlement (from sources...) TODO: 1.0 is phi
					if (conn_val > 0) {
						settle_amount = settle_amount + (fecundity[1] * conn_val * src_biomass);
						settle_bound += src_carry;
					}
				}
			}

			settle_amount = settle_amount / (settle_bound + 1e-10);
			// 2. Larval recruitment (...to the sink)
			additional_biomass[dst_metadata.x_pos][dst_metadata.y_pos] = (ret * settle_amount * (dst_carry - dst_biomass));
			// if (ret > 0) { // FOR DEBUG
			// 	std::cout << "#####>  "
			// 	<< ret << ", "
			// 	<< additional_biomass[dst_metadata.x_pos][dst_metadata.y_pos]
			// 	<< settle_amount << ", "
			// 	<< dst_carry << ", "
			// 	<< dst_biomass << ", "
			// 	<< std::endl;
			// }
		}
	}
	// std::cout << std::endl; // FOR DEBUG
	// 3. Conversion to adult/fishable biomass: Ricker model
	for (int i = 0; i < vec_dim.dim_x; i++) {
		for (int j = 0; j < vec_dim.dim_y; j++) {
			if ((carrying_capacity[1][i][j] - fish_biomass[1][i][j]) > 0) {
				double alpha = recruitment_rate[1];
				double beta = 1.0 / (carrying_capacity[1][i][j] - fish_biomass[1][i][j]);
				additional_biomass[i][j] = fish_biomass[1][i][j] + (
					additional_biomass[i][j] * (
						std::exp(alpha * 0.693 * (1 - (beta * additional_biomass[i][j]))) - 1
						));
			}
		}
	}

	// Pop-out the head of the connectivity stack and push a new one
	// for the current value
	connectivity_delay_arr[1].pop_front();
	connectivity_delay_arr[1].push_back(additional_biomass);

	return additional_biomass;
}

/*!
  \brief Test decision-based spill-over method.
  \param input_matrix A 2-dimensional vector of input matrix representing the fish biomass
  \param spillover_rate Spillover rate of the fish biomass passed
  \param spillover_threshold Spillover threshold for the fish biomass passed
  \return vector2d A 2-dimensional mask of spillover matrix
 */
vector2d<double> FISHSpaceModel::solve_spillover_discreet(
	vector2d<double> input_matrix,
	double spillover_rate,
	double spillover_threshold
){
	// Retain padding the diffusion MAP for neighborhood search
	dim vec_dim = matrix_dim(input_matrix);
	vector2d<double> biomass_map_tp1 (vec_dim.dim_x, vector<double>(vec_dim.dim_y, 0));

	// Pad the diffusion matrix by one cell on all directions
	// i.e. dim = (N+2, N+2)
	vector2d<double> pad_biomass_t (vec_dim.dim_x+2, vector<double>(vec_dim.dim_y+2, 0));
	vector2d<double> pad_biomass_tp1 (vec_dim.dim_x+2, vector<double>(vec_dim.dim_y+2, 0));
	vector2d<double> pad_k (vec_dim.dim_x+2, vector<double>(vec_dim.dim_y+2, 0));
	// Zero all nan matrix elements, then apply original matrix to padded matrix
	// shifted by one cell down, one cell right.
	for (auto i = 0; i < vec_dim.dim_x; i++){
		for (auto j = 0; j < vec_dim.dim_y; j++){
			if (isnan(input_matrix[i][j])) input_matrix[i][j] = 0;
			pad_biomass_t[i+1][j+1]    = input_matrix[i][j];
			pad_biomass_tp1[i+1][j+1]  = input_matrix[i][j];
			pad_k[i+1][j+1] 			  	 = carrying_capacity[0][i][j];
		}
	}

	// search for reef cells ... TODO: revise as random search
	// maybe pseudorandom selection from a bag of reef cells?
	for (auto i = 1; i < vec_dim.dim_x + 1; i++){
		for (auto j = 1; j < vec_dim.dim_y + 1; j++){
				// if current cell is a reef cell
				if (pad_k[i][j] > 0) {
					double dens_c = pad_biomass_t[i][j] / pad_k[i][j];
					// if biomass density greater than spillover threshold
					if (dens_c > spillover_threshold) {
						double w_t = 0;
						double w_b = 0;
						double w_l = 0;
						double w_r = 0;

						// if the neighbor reef cell has lower biomass density than the
						// home reef cell, prepare that cell for spillover
						if ((pad_k[i+1][j] > 0) && ( (pad_biomass_t[i+1][j] / pad_k[i+1][j]) < dens_c)){
							w_t = pad_k[i+1][j];
						}
						if ((pad_k[i-1][j] > 0) && ( (pad_biomass_t[i-1][j] / pad_k[i-1][j]) < dens_c)){
							w_b = pad_k[i-1][j];
						}
						if ((pad_k[i][j+1] > 0) && ( (pad_biomass_t[i][j+1] / pad_k[i][j+1]) < dens_c)){
							w_l = pad_k[i][j+1];
						}
						if ((pad_k[i][j-1] > 0) && ( (pad_biomass_t[i][j-1] / pad_k[i][j-1]) < dens_c)){
							w_r = pad_k[i][j-1];
						}

						double tot_k = w_t + w_b + w_l + w_r;
						// if there are neighboring reefs to spill to (tot_k > 0)
						double to_spill = pad_biomass_t[i][j] * (dens_c - spillover_threshold) * spillover_rate;
						if (tot_k > 0) {
							// divide spillable biomass among neighbors weighted by K
							// double to_spill = pad_biomass_t[i][j] - ( pad_biomass_t[i][j] * ( 1 - (dens_c - spillover_threshold)) );

							// new biomass should not exceed their K, else return extra to home reef
							// a possible effect of this is that the neighboring reef cells may
							// reach K but the home reef wont
							double to_spill_t = (to_spill * (w_t / tot_k));
							if ((pad_biomass_t[i+1][j] + to_spill_t) > pad_k[i+1][j]) { to_spill_t  = pad_k[i+1][j] - pad_biomass_t[i+1][j]; }
							double to_spill_b = (to_spill * (w_b / tot_k));
							if ((pad_biomass_t[i-1][j] + to_spill_b) > pad_k[i-1][j]) { to_spill_b  = pad_k[i-1][j] - pad_biomass_t[i-1][j]; }
							double to_spill_l = (to_spill * (w_l / tot_k));
							if ((pad_biomass_t[i][j+1] + to_spill_l) > pad_k[i][j+1]) { to_spill_l  = pad_k[i][j+1] - pad_biomass_t[i][j+1]; }
							double to_spill_r = (to_spill * (w_r / tot_k));
							if ((pad_biomass_t[i][j-1] + to_spill_r) > pad_k[i][j-1]) { to_spill_r  = pad_k[i][j-1] - pad_biomass_t[i][j-1]; }

							// update the post-spill biomass at t+1 and remove from the home reef biomass
							pad_biomass_tp1[i][j] = pad_biomass_t[i][j] - (to_spill_t + to_spill_b + to_spill_l + to_spill_r);
							pad_biomass_tp1[i+1][j] = pad_biomass_t[i+1][j] + to_spill_t;
							pad_biomass_tp1[i-1][j] = pad_biomass_t[i-1][j] + to_spill_b;
							pad_biomass_tp1[i][j+1] = pad_biomass_t[i][j+1] + to_spill_l;
							pad_biomass_tp1[i][j-1] = pad_biomass_t[i][j-1] + to_spill_r;
							// if (pad_biomass_tp1[i+1][j+1] > pad_k[i+1][j+1]) {
							// 	cout << ">>> EXCEED: " << i << "," << j << " \t " << input_matrix[i][j] << ", " << pad_biomass_tp1[i+1][j+1] << ", " << pad_k[i+1][j+1] << endl;
							// cout << "$$$$ " << to_spill << " \t " << to_spill_t + to_spill_b + to_spill_l + to_spill_r << endl; //<< ", " << to_spill_b << ", " << to_spill_l << ", " << to_spill_r << endl; 
							// }

						}
				 }

			}
		}
	}




	// update the biomass map at t+1
	for (auto i = 0; i < vec_dim.dim_x; i++){
		for (auto j = 0; j < vec_dim.dim_y; j++){
			if (isnan(pad_biomass_tp1[i+1][j+1])) cout << "#### POST NAN" << i << "," << j << "," << input_matrix[i][j] << endl;
			biomass_map_tp1[i][j] = pad_biomass_tp1[i+1][j+1];
		}
	}

	return biomass_map_tp1;
}

/*!
  \brief Deprecated. This solve_spillover was replaced by solve_spillover_discreet.
 */
/*
vector2d<double> FISHSpaceModel::solve_spillover(
	vector2d<double> input_matrix,
	vector2d<int> spill_mask,
	float dx
){
*/
	/* 
	Solves the spillover operation D^2 on an input matrix.
	Uses a boolean spillover mask to avoid spilling biomass
	to areas with zero carrying capacity (i.e. areas with
	no reef).

	21 Mar 2018 NOTE: corrected spillover to guarantee (approximate)
	conservation of mass per solver operation.
	*/

	/*
		Spillover rules to consider:
		1. if the cell has no coral reef (i.e. zero biomass), NO spillover should occcur TOWARDS the cell.
		2. spillover only occurs if the biomass inside the cell reaches a particular threshold
		3. spillover should not go beyond carrying capacity.
		4. amount of spillover should be computed based on densities (biomass relative to carrying capacity)

		See notes here: http://www.geo.utep.edu/pub/hector/GEOMATH2/Lab_2.pdf
	 */
/*
	dim vec_dim = matrix_dim(input_matrix);
	vector2d<double> output_matrix (vec_dim.dim_x, vector<double>(vec_dim.dim_y, 0));

	// Pad the diffusion matrix by one cell on all directions
	// i.e. dim = (N+2, N+2)
	vector2d<double> pad_matrix (vec_dim.dim_x+2, vector<double>(vec_dim.dim_y+2, 0));
	vector2d<double> pad_carry (vec_dim.dim_x+2, vector<double>(vec_dim.dim_y+2, 0));
	// Zero all nan matrix elements, then apply original matrix to padded matrix
	// shifted by one cell down, one cell right.
	for (auto i = 0; i < vec_dim.dim_x; i++){
		for (auto j = 0; j < vec_dim.dim_y; j++){
			if (isnan(input_matrix[i][j])) input_matrix[i][j] = 0;
			pad_matrix[i+1][j+1] = input_matrix[i][j];
			pad_carry[i+1][j+1] = carrying_capacity[0][i][j];
		}
	}
	double flux = 0;
	double total_biomass = 0;
	// Perform diffusion operation with REFLECTING boundary conditions
	for (auto i = 1; i < vec_dim.dim_x + 1; i++){
		for (auto j = 1; j < vec_dim.dim_y + 1; j++){

			double top = fmax(0, pad_matrix[i+1][j] - (pad_carry[i+1][j] * spillover_threshold));
			double bottom = fmax(0, pad_matrix[i-1][j] - (pad_carry[i-1][j] * spillover_threshold));
			double left = fmax(0, pad_matrix[i][j+1] - (pad_carry[i][j+1] * spillover_threshold));
			double right = fmax(0, pad_matrix[i][j-1] - (pad_carry[i][j-1] * spillover_threshold));
			double center = fmax(0, pad_matrix[i][j] - (pad_carry[i][j] * spillover_threshold));

			double top_c = (1 - spillover_threshold) * pad_carry[i+1][j];
			double bottom_c = (1 - spillover_threshold) * pad_carry[i-1][j];
			double left_c = (1 - spillover_threshold) * pad_carry[i][j+1];
			double right_c = (1 - spillover_threshold) * pad_carry[i][j-1];
			double center_c = (1 - spillover_threshold) * pad_carry[i][j];

			// If a cell has nonzero carry and its neighbor has zero, copy the 
			// value of the cell to the neighbor. NOTE: spillover capacity is 
			// different to the true carrying capacity
			// A1.) LEFT-RIGHT comparison (index j)
			if ((pad_carry[i][j] > 0) && (pad_carry[i][j+1] == 0)) {
				left = center;
				left_c = center_c;
			}
			if ((pad_carry[i][j] > 0) && (pad_carry[i][j-1] == 0)) {
				right = center;
				right_c = center_c;
			}
			// B1.) TOP-BOTTOM comparison (index i)
			if ((pad_carry[i][j] > 0) && (pad_carry[i+1][j] == 0)) {
				top = center;
				top_c = center_c;
			}
			if ((pad_carry[i][j] > 0) && (pad_carry[i-1][j] == 0)) {
				bottom = center;
				bottom_c = center_c;
			}

			// A2.) LEFT-RIGHT spillover
			double delta_lr = ((left - center) / (left_c + center_c)) - ((center - right) / (center_c + right_c));
			// B2.) LEFT-RIGHT spillover
			double delta_tb = ((top - center) / (top_c + center_c)) - ((center - bottom) / (center_c + bottom_c));

			// Aggregate the added biomass
			if (pad_carry[i][j] > 0){
				double delta = spillover_rate * (delta_tb + delta_lr) / center_c;
				flux = flux + delta;
				output_matrix[i-1][j-1] = pad_matrix[i][j] + delta;		
				total_biomass += output_matrix[i-1][j-1];
			} else {
				output_matrix[i-1][j-1] = 0;
			}
		}
	}

    double take_out = 1.0 - (flux / total_biomass);
    for (int i = 0; i < vec_dim.dim_x; i++) {
        for (int j = 0; j < vec_dim.dim_y; j++) {
            output_matrix[i][j] *= take_out;
        }
    }

	return output_matrix;
} //solve_spillover
*/

/*!
  \brief This function returns the sum of all the elements of the 2-dimensional vector
  \param the_array A 2-dimensional vector matrix
  \return double A numeric sum
 */
double FISHSpaceModel::elem_sum_2df(vector2d<double> the_array) {
	int dim_x = the_array.size();
	int dim_y = the_array[0].size();
	double accum = 0;
	for (int i = 0; i < dim_x; i++) {
		for (int j = 0; j < dim_y; j++) {
			if (!isnan(the_array[i][j])) accum += the_array[i][j];
		}
	}
	return accum;
}

/*!
  \brief This function returns a new 2-dimensional vector multiplying each element with a constant number.
  \param the_array A 2-dimensional vector matrix
  \param frac A decimal number representing a fraction
  \return vector2d A 2-dimensional vector matrix
 */
vector2d<double> FISHSpaceModel::mult_frac_2df(vector2d<double> the_array, double frac) {
  int dim_x = the_array.size();
  int dim_y = the_array[0].size();
  vector2d<double> new_matrix (dim_x, vector<double>(dim_y, 0));

  for (int i = 0; i < dim_x; i++) {
    for (int j = 0; j < dim_y; j++) {
      new_matrix[i][j] = the_array[i][j] * frac;
    }
  }
  return new_matrix;
}

/* This function is not called anywhere. There's an add_fisher in wrapper.cpp */
/*
void FISHSpaceModel::add_fisher(string fisher_type, double threshold, int home_x, int home_y, double minimum_fishable_ratio, int step_range) {

  if (fisher_type == "uniform"){ 
    auto* new_fisher = new fishing::EqualFisher(threshold, home_x, home_y);
    new_fisher->protection_mask = protection_mask;
    new_fisher->baseline = mult_frac_2df(carrying_capacity, minimum_fishable_ratio); 
	fisher_set.push_back(new_fisher);
  }

  else if (fisher_type == "closest") {
    auto* new_fisher = new fishing::ClosestFisher(threshold, home_x, home_y);
    double range = step_range;
    new_fisher->travel_range = range;
    new_fisher->protection_mask = protection_mask;
    new_fisher->baseline = mult_frac_2df(carrying_capacity, minimum_fishable_ratio);
	fisher_set.push_back(new_fisher);
  }

  else if (fisher_type == "smart_fisher") {
      auto* new_fisher = new fishing::ClosestFisher(threshold, home_x, home_y);
      double range = step_range;
      new_fisher->travel_range = range;
      new_fisher->protection_mask = protection_mask;
      new_fisher->baseline = mult_frac_2df(carrying_capacity, minimum_fishable_ratio);
	  fisher_set.push_back(new_fisher);
  }

  else if (fisher_type == "random_walk") {
    auto* new_fisher = new fishing::RandomWalkFisher(threshold, home_x, home_y);
    int thresh = step_range;
    new_fisher->step_threshold = thresh;
    new_fisher->protection_mask = protection_mask;
    new_fisher->baseline = mult_frac_2df(carrying_capacity, minimum_fishable_ratio);
	fisher_set.push_back(new_fisher);
  }
}
*/
/* Utility Functions */

/*!
  \brief A utility function saving a 2-dimensional vector of double data type to a file.
  \param the_vec A 2-dimensional vector matrix
  \param filename Name of the file
 */
void FISHSpaceModel::saveToFile(vector2d<double> the_vec, string filename) {
	int vec_dim_x = the_vec.size();
	int vec_dim_y = the_vec[0].size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_dim_x; i++) {
		for (int j = 0; j < vec_dim_y; j++) {
			outfile << the_vec[i][j];
			if (j < (vec_dim_y - 1)) outfile << ",";
		}
		outfile << endl;
	}

	outfile.close();
}

/*!
  \brief A utility function saving a 2-dimensional vector of integer data type to a file.
  \param the_vec A 2-dimensional vector matrix
  \param filename Name of the file
 */
void FISHSpaceModel::saveToFile(vector2d<int> the_vec, string filename) {
	int vec_dim_x = the_vec.size();
	int vec_dim_y = the_vec[0].size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_dim_x; i++) {
		for (int j = 0; j < vec_dim_y; j++) {
			outfile << the_vec[i][j];
			if (j < (vec_dim_y - 1)) outfile << ",";
		}
		outfile << endl;
	}

	outfile.close();
}

/*!
  \brief A utility function saving a vector of ConnectivityMetadata structure to a file.
  \param the_vec A 2-dimensional vector matrix
  \param filename Name of the file
 */
void FISHSpaceModel::saveToFile(vector<ConnectivityMetadata> the_vec, string filename) {
	int vec_size = the_vec.size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_size; i++) {
		outfile << the_vec[i].x_pos << ",";
		outfile << the_vec[i].y_pos << ",";
		outfile << the_vec[i].index;
		outfile << endl;
	}

	outfile.close();
}

/*!
  \brief A utility function saving a vector of double structure to a file.
  \param the_vec A 2-dimensional vector matrix
  \param filename Name of the file
 */
void FISHSpaceModel::saveToFile(vector<double> the_vec, string filename) {
	int vec_size = the_vec.size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_size; i++) {
		outfile << the_vec[i] << endl;
	}

	outfile.close();
}


void FISHSpaceModel::saveToFileInt(vector<int> the_vec, string filename) {
	int vec_size = the_vec.size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_size; i++) {
		outfile << the_vec[i] << endl;
	}

	outfile.close();
}

/*!
  \brief A utility function saving a vector of vector2d structure to a file.
  \param the_vec A 3-dimensional vector matrix
  \param filename Name of the file
 */
void FISHSpaceModel::saveToFile(vector<vector2d<int>> the_vec, string filename) {
	int vec_size = the_vec.size();
	int vec_dim_x = the_vec[0].size();
	int vec_dim_y = the_vec[0][0].size();

	// open a file in write mode.
	ofstream outfile;
	outfile.open(filename);

	for (int i = 0; i < vec_size; i++) {
		outfile << i << ",";
		vec_dim_x = the_vec[i].size();
		for (int j = 0; j < vec_dim_x; j++) {
			vec_dim_y = the_vec[i][j].size();
			for (int k = 0; k < vec_dim_y; k++) {
				outfile << the_vec[i][j][k];
				if ( (j < (vec_dim_x - 1)) || (k < (vec_dim_y - 1)) ) outfile << ",";
			}
			if (j == (vec_dim_x - 1)) outfile << endl;
		}
	}

	outfile.close();
}

/*!
  \brief A utility function splitting the 2-dimensional vector to x (row) and y (column) dimensions
  \param vec A 2-dimensional vector matrix
  \return dim structure type of dim_x and dim_y
 */
//dim FISHSpaceModel::matrix_dim(vector<vector<double>> vec) {
dim FISHSpaceModel::matrix_dim(vector2d<double> vec) {
	return { (int) vec.size(), (int) vec[0].size()};
}

}
