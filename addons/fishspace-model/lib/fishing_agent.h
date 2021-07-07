#pragma once

#include <vector>
#include <string>

#define ARRAY_SIZE 2 /*!< represents the number of fish biomass (Demersal and Pelagic) */

template <class T> using vector2d = std::vector<std::vector<T>>;

namespace fishing {

// class Fisher {

// public:
//     // Constructor/Destructor
//     Fisher(); // DISABLE: REQUIRE PARAMS
//     Fisher(double _threshold);
//     // ~BeliefPropagation();
//     // Class Methods
//     int current_pos_x;
//     int current_pos_y;
//     double threshold;

//     // Record fishing positions and obtained fish
//     vector2d<double> fishing_record;
//     vector2d<double> fish_out(int initial_posx,
//             int initial_posy, vector2d<double> baseline,
//             vector2d<double> fish_weights,
//             vector2d<double> bias_matrix,
//             vector2d<double> protection_mask);
//     std::vector<int> get_position();
//     vector2d<double> get_state_history();
// };
/*std::vector<std::vector<double>> fish_out(int initial_posx,
            int initial_posy, std::vector<std::vector<double>> baseline,
            std::vector<std::vector<double>> fish_weights,
            std::vector<std::vector<double>> bias_matrix,
            std::vector<std::vector<double>> protection_mask);*/

/*!
* \brief Generic fisher class: fishing strategies must inherit from this base class.
* \details Fisher only has awareness of the biomass grid; all biases must be factored into a separate method.
*/
class GenericFisher {
public:
    GenericFisher();
    //GenericFisher(double _threshold, int _home_x, int _home_y);
	/* Modified to set the maximum fishing ratio for fish biomass 1 (biomass1_maxratio) */
	/* The maximum fishing ratio for fish biomass 2 is 1 - biomass1_maxratio */
	GenericFisher(int _fisher_id, double _threshold, int _home_x, int _home_y, double _biomass1_maxratio);
	double biomass1_maxratio;
    //int threshold;
	double threshold;
    int home_x;
    int home_y;
    // shared spatial descriptors
    vector2d<int> protection_mask;
    vector2d<double> baseline[ARRAY_SIZE];
    // for state output
    vector2d<int> catch_locs[ARRAY_SIZE];
    double recent_catch[ARRAY_SIZE];
	
    //virtual void fish_out(vector2d<double>& fish_biomass);
	virtual void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);
	//virtual void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2,int current_time);
	int getFisherID();
	//int curr_time;

private:
	int fisher_id;
};

/*!
* \brief Random walk fisher: each fisher performs random walk along the grid, taking out biomass for each step.
*/
class RandomWalkFisher final : public GenericFisher {
public:
    using GenericFisher::GenericFisher;
    //void fish_out(vector2d<double>& fish_biomass);
	void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);

    int step_threshold;
};


class EqualFisher final : public GenericFisher {
/* 
EqualFisher: 
*/
public:
    using GenericFisher::GenericFisher;
    //void fish_out(vector2d<double>& fish_biomass);
	void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);
};

/*!
 * \brief This type of fisher catches fish based on the closest distance from its home port
 */
class ClosestFisher final : public GenericFisher {
/* 
*/
public:
    using GenericFisher::GenericFisher;
    //void fish_out(vector2d<double>& fish_biomass);
	void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);

    double travel_range;  /*!< The maximum number of cells the fisher can travel from the home port to catch fish */
};

class RegionMaximumFisher final : public GenericFisher {
/*
*/
public:
    using GenericFisher::GenericFisher;
    //void fish_out(vector2d<double>& fish_biomass);
	void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);

    double travel_range;
};


class SmartFisher final : public GenericFisher {
/*
*/
public:
    using GenericFisher::GenericFisher;
    //void fish_out(vector2d<double>& fish_biomass);
	void fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2);

    double travel_range;
};

}

