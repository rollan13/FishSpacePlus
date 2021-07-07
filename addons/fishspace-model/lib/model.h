#pragma once

#include <vector>
#include <random>
#include <utility>
#include <string>
#include <deque>
#include "fishing_agent.h"
#include "parameters.h"

#define ARRAY_SIZE 2 /*!< represents the number of fish biomass (Demersal and Pelagic) */

namespace fishspace {

using std::vector;
using std::string;
using std::deque;

struct dim {
  int dim_x;
  int dim_y;
};


template <class T> using vector2d = vector<vector<T>>;

class FISHSpaceModel {

public:
  FISHSpaceModel ();
  ~FISHSpaceModel();

  // Model Parameters
  vector<fishing::GenericFisher*> fisher_set[ARRAY_SIZE];

  vector2d<double> initial_biomass[ARRAY_SIZE];
  vector2d<double> carrying_capacity[ARRAY_SIZE];
  double spillover_rate[ARRAY_SIZE];
  double spillover_threshold[ARRAY_SIZE];
  double growth_rate[ARRAY_SIZE];

  int warmup_time;

  vector2d<int> geog_mask;
  //vector2d<double> depth_map;
  vector2d<int>  protection_mask;
  int connectivity_delay;

  vector2d<double> connectivity_matrix[ARRAY_SIZE];
  vector2d<double> retention[ARRAY_SIZE];
  vector<ConnectivityMetadata> connectivity_metadata[ARRAY_SIZE];
  deque<vector2d<double>> connectivity_delay_arr[ARRAY_SIZE];

  double fecundity[ARRAY_SIZE];
  double recruitment_rate[ARRAY_SIZE];

  vector2d<double> fish_biomass[ARRAY_SIZE];

  int current_time = 0;

  // Methods
  /* This function is not called anywhere. There's an add_fisher in wrapper.cpp */
  //void add_fisher(string fisher_type, double threshold, int home_x, int home_y, double minimum_fishable_ratio, int step_range);
  void initialize_parameters(ModelInput model_input);
  void run_timestep(void);
  //void run_timestep(int num_timestep);
  void solve_fishing(void);
  //void solve_fishing(int current_time);
  void solve_biomass(void);
  // Dummy methods (reference for shimming)
  //ModelOutput generate_dummy(void);
  ModelOutput get_current_state(void);

  //void initialize_dummy(int dim_x, int dim_y);
  //vector2d<double> generate_2df(int dim_x, int dim_y);
  //vector2d<int> generate_2di(int dim_x, int dim_y);

  double elem_sum_2df(vector2d<double> the_vec);
  double sum_2df(vector2d<double> the_vec);
  double prod_2df(vector2d<double> bio_vec, vector2d<int> mask_vec);

  // util methods
  //  vector2d<double> flattenMultiply(
  //      vector<vector2d<double>> the_array);
  void saveToFile(vector2d<double> the_vec, string filename);
  void saveToFile(vector2d<int> the_vec, string filename);
  void saveToFile(vector<ConnectivityMetadata> the_vec, string filename);
  void saveToFile(vector<double> the_vec, string filename);
  void saveToFile(vector<vector2d<int>> the_vec, string filename);
  void saveToFileInt(vector<int> the_vec, string filename);

private:
  std::default_random_engine gen;

  /*
  vector2d<double> solve_spillover_discreet(
    vector2d<double> input_matrix
  );
  */
  vector2d<double> solve_spillover_discreet(
	  vector2d<double> input_matrix,
	  double spillover_rate,
	  double spillover_threshold
  );

  /*
  vector2d<double> solve_spillover(
    vector2d<double> input_matrix,
    vector2d<int> spillover_mask,
    float dx
  ); // DONE
  */

  vector2d<double> solve_connectivity(void);
  vector2d<double> solve_connectivity2(void);
  vector2d<double> mult_frac_2df(vector2d<double> the_array, double frac);
  static dim matrix_dim(vector2d<double> vec); // DONE
};

}