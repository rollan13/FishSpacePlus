#include <algorithm>
#include <iostream>
#include <random>
#include <vector>
#include <cmath>
#include <fstream>

#include "fishing_agent.h"

/** \file fishing_agent.cpp
 * \brief This contains all the types of fishers
 */
using namespace std;

/*!
 * \brief This namespace contains the different Fisher classes and their algorithm in catching fish
 * \see fishing_agent.h
 */

namespace fishing {

std::default_random_engine gen; /**< Random number generator used by RandomWalkFisher class */

// Constructors; initialize variables.
// Fisher::Fisher(){};
// Fisher::Fisher(double _threshold){
//     threshold = _threshold;
// };

// vector<vector<double>> Fisher::fish_out(
//     int initial_posx, int initial_posy, vector<vector<double>> baseline,
//     vector<vector<double>> fish_weights, vector<vector<double>> bias_matrix,
//     vector<vector<double>> protection_mask
// ){
//     /* Main code for a single fisher. Requires re-initialization for
//     fishing (agents not reusable). */
//     int dim_x = fish_weights.size();
//     int dim_y = fish_weights[0].size();

//     int pos_x = initial_posx;
//     int pos_y = initial_posy;

//     int attempts = 5000;

//     double current_threshold = threshold;
//     fishing_record.clear();

//     //
//     std::vector<double> current_state = {
//         static_cast<double>(initial_posx),
//         static_cast<double>(initial_posy),
//         current_threshold
//     };
//     fishing_record.push_back(current_state);


//     /*  */
//     while ((current_threshold > 0) && (attempts > 0)){
//         attempts = attempts - 1;

//         int pos_x_left = std::abs((pos_x - 1) % dim_x);
//         int pos_x_right = std::abs((pos_x + 1) % dim_x);
//         int pos_y_down = std::abs((pos_y - 1) % dim_y);
//         int pos_y_up = std::abs((pos_y + 1) % dim_y);

//         std::vector<std::vector<int>> action = {
//             {pos_x_left, pos_y}, {pos_x_right, pos_y},
//             {pos_x, pos_y_up}, {pos_x, pos_y_down}
//         };
//         // Draw position of next step based on the probability biases
//         std::discrete_distribution<int> picker {
//             bias_matrix[pos_x_left][pos_y], bias_matrix[pos_x_right][pos_y],
//             bias_matrix[pos_x][pos_y_up], bias_matrix[pos_x][pos_y_down]
//         };

//         int pick = picker(gen);
//         pos_x = action[pick][0];
//         pos_y = action[pick][1];

//         // Run action if fish is present in the current cell.
//         if (fish_weights[pos_x][pos_y] > 0){
//             double fish_out = std::max(0.0, std::min(current_threshold, 0.5  * (fish_weights[pos_x][pos_y] * (1 - protection_mask[pos_x][pos_y])) - baseline[pos_x][pos_y]));
//             current_threshold = current_threshold - fish_out;
//             fish_weights[pos_x][pos_y] = fish_weights[pos_x][pos_y] - fish_out;
//         }
//         // Update agent variable for position
//         current_pos_x = pos_x;
//         current_pos_y = pos_y;
//         // Record state;
//         std::vector<double> current_state = {
//             static_cast<double>(current_pos_x),
//             static_cast<double>(current_pos_y),
//             current_threshold
//         };
//         fishing_record.push_back(current_state);
//     }

//     return fish_weights;
// }

// vector<int> Fisher::get_position(){
//     /* Returns the current position of the fisher. */
//     vector<int> the_position = {current_pos_x, current_pos_y};
//     return the_position;
// }

// vector<vector<double>> Fisher::get_state_history(){
//     return fishing_record;
// }

GenericFisher::GenericFisher(){}

//GenericFisher::GenericFisher(double _threshold, int _home_x, int _home_y) {
GenericFisher::GenericFisher(int _fisher_id, double _threshold, int _home_x, int _home_y, double _biomass1_maxratio) {
	//To fix the compile/build warning cast to INT
    threshold = _threshold;
	//threshold = static_cast<int>(_threshold);
    home_x = _home_x;
    home_y = _home_y;
	biomass1_maxratio = _biomass1_maxratio;
	fisher_id = _fisher_id;
}

int GenericFisher::getFisherID() {
	return fisher_id;
}

//void GenericFisher::fish_out(vector2d<double>& fish_biomass){}
void GenericFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {}
//void GenericFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {}

//void RandomWalkFisher::fish_out(vector2d<double>& fish_biomass){
void RandomWalkFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {
//void RandomWalkFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {

    int pos_x = home_x;
    int pos_y = home_y;

    int dim_x = fish_biomass.size();
    int dim_y = fish_biomass[0].size();

    int attempts = step_threshold;        // WALK THRESHOLD
    double current_threshold = threshold; // CATCH QUOTA
    recent_catch[0] = 0;

    catch_locs[0].clear();
    vector<int> first_position = { home_x, home_y };
    catch_locs[0].push_back(first_position);
    while ((current_threshold > 0) && (attempts > 0)){
        attempts = attempts - 1;

        int pos_x_left = std::abs((pos_x - 1) % dim_x);
        int pos_x_right = std::abs((pos_x + 1) % dim_x);
        int pos_y_down = std::abs((pos_y - 1) % dim_y);
        int pos_y_up = std::abs((pos_y + 1) % dim_y);

        std::vector<std::vector<int>> action = {
            {pos_x_left, pos_y}, {pos_x_right, pos_y},
            {pos_x, pos_y_up}, {pos_x, pos_y_down}
        };
        // Draw position of next step based on the probability biases
        std::discrete_distribution<int> picker {0.25, 0.25 ,0.25, 0.25};

        int pick = picker(gen);
        pos_x = action[pick][0];
        pos_y = action[pick][1];

        // Run action if fish is present in the current cell.
        if (fish_biomass[pos_x][pos_y] > 0 && protection_mask[pos_x][pos_y] == 0){
            double fish_out = std::max(0.0, std::min(current_threshold, 0.5  * (fish_biomass[pos_x][pos_y]  - baseline[0][pos_x][pos_y])));
            current_threshold = current_threshold - fish_out;
            recent_catch[0] = recent_catch[0] + fish_out;
            fish_biomass[pos_x][pos_y] = fish_biomass[pos_x][pos_y] - fish_out;
            vector<int> position = { pos_x, pos_y };
            catch_locs[0].push_back(position);
        }
    }
}



//void EqualFisher::fish_out(vector2d<double>& fish_biomass) {
void EqualFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {
//void EqualFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {

    double total_biomass = 0; // Sum taken for non-protected areas
    double total_baseline = 0; // Biomass must not decrease below overall
                               // baseline.

    catch_locs[0].clear();
    vector<int> first_position = { home_x, home_y };
    catch_locs[0].push_back(first_position);
    int dim_x = fish_biomass.size();
    int dim_y = fish_biomass[0].size();

    for (int i = 0; i < dim_x; i++) {
        for (int j = 0; j < dim_y; j++) {
            total_biomass += fish_biomass[i][j] * protection_mask[i][j];
            total_baseline += baseline[0][i][j];
        }
    }

    if (threshold < (total_biomass - total_baseline)) {
        double take_out = 1.0 - (threshold / total_biomass);
        for (int i = 0; i < dim_x; i++) {
            for (int j = 0; j < dim_y; j++) {
                if (1 - protection_mask[i][j]) {
                    fish_biomass[i][j] *= take_out;
                }
            }
        }
        recent_catch[0] = threshold;
    } else {
        recent_catch[0] = 0;
    }
    // Since no position is specified, use the set home loc
    // as the current position. Distance travelled is 
    // effectively zero.
    vector<int> position = { home_x, home_y };
    catch_locs[0].push_back(position);
}

/*!
 * \brief This method contains the algorithm for catching fish of the ClosestFisher type
 * \details Algorithm: Traverse the area. Check if (1) the cell falls inside the maximum distance possible,
 * (2) the cell has enough biomass to satisfy the threshold but not fall below the baseline,
 * (3) the cell is closest to the home port so far. The threshold of each fisher is the maximum threshold of fish caught per time step.
 * The threshold is divided between two fish biomass based on the biomass1_maxratio (a decimal number from 0 to 1).
 * For each time step, the fisher will start from his home port (home_x and home_y).
 * \param fish_biomass A matrix of the first type of fish biomass. This matrix size (N x M) should be the same as fish_biomass2.
 * \param fish_biomass2 A matrix of the second type of fish biomass. This matrix size (N x M) should be the same as fish_biomass1.
 */
//void ClosestFisher::fish_out(vector2d<double>& fish_biomass) {
void ClosestFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {
//void ClosestFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {
// Algo: Traverse the area. Check if 1) the cell falls inside the maximum 
// distance possible, 2) the cell has enough biomass to satisfy the threshold 
// but not fall below the baseline, and 3) the cell is closest to the home 
// port so far. 
    int dim_x = fish_biomass.size();
    int dim_y = fish_biomass[0].size();
	bool update_fishbiomass1 = false;
	bool update_fishbiomass2 = false;	

    catch_locs[0].clear();
	catch_locs[1].clear();
    vector<int> first_position = { home_x, home_y };
    catch_locs[0].push_back(first_position);
	catch_locs[1].push_back(first_position);

    int current_pos_x = -1;
    int current_pos_y = -1;
    double current_distance = 1e20;
    recent_catch[0] = 0;
	recent_catch[1] = 0;

	//curr_time[current_time] = current_time;

	double biomass1_threshold = biomass1_maxratio * threshold;
	double biomass2_threshold = (1 - biomass1_maxratio) * threshold;

    for (int gap = 0; gap < travel_range + 1; gap++){
    // Loop is done by making a bounding box that increases in
    // width up to the maximum distance.
        int up_x = max(0, max(0, home_x - gap));
        int down_x = min(max(0, dim_x-1), home_x + gap);
        int left_y = max(0, max(0, home_y - gap));
        int right_y = min(max(0, dim_y-1), home_y + gap);

        for (int j = left_y; j < right_y; j++) {
            int i = up_x;
			if (protection_mask[i][j] == 0) {
                double distance = sqrt(pow((home_x - i), 2) + pow((home_y - j), 2));
                //if ((distance < current_distance) && (distance < travel_range) && (fish_biomass[i][j] > threshold) && (fish_biomass[i][j] + threshold > baseline[0][i][j])){
				if ((distance < current_distance) && (distance < travel_range)) {
					if ((fish_biomass[i][j] > biomass1_threshold) && (fish_biomass[i][j] + biomass1_threshold > baseline[0][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass1 = true;
					}
					if ((fish_biomass2[i][j] > biomass2_threshold) && (fish_biomass2[i][j] + biomass2_threshold > baseline[1][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass2 = true;
					}
                }
            }
        }

        for (int j = left_y; j < right_y; j++) {
            int i = down_x;
            if (protection_mask[i][j] == 0) {
                double distance = sqrt(pow((home_x - i), 2) + pow((home_y - j), 2));
				if ((distance < current_distance) && (distance < travel_range)) {
					if ((fish_biomass[i][j] > biomass1_threshold) && (fish_biomass[i][j] + biomass1_threshold > baseline[0][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass1 = true;
					}
					if ((fish_biomass2[i][j] > biomass2_threshold) && (fish_biomass2[i][j] + biomass2_threshold > baseline[1][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass2 = true;
					}
				}
            }
        }

        for (int i = up_x; i < down_x; i++) {
            int j = left_y;
            if (protection_mask[i][j] == 0) {
                double distance = sqrt(pow((home_x - i), 2) + pow((home_y - j), 2));
				if ((distance < current_distance) && (distance < travel_range)) {
					if ((fish_biomass[i][j] > biomass1_threshold) && (fish_biomass[i][j] + biomass1_threshold > baseline[0][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass1 = true;
					}
					if ((fish_biomass2[i][j] > biomass2_threshold) && (fish_biomass2[i][j] + biomass2_threshold > baseline[1][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass2 = true;
					}
				}
            }
        }

        for (int i = up_x; i < down_x; i++) {
            int j = right_y;
            if (protection_mask[i][j] == 0) {
                double distance = sqrt(pow((home_x - i), 2) + pow((home_y - j), 2));
				if ((distance < current_distance) && (distance < travel_range)) {
					if ((fish_biomass[i][j] > biomass1_threshold) && (fish_biomass[i][j] + biomass1_threshold > baseline[0][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass1 = true;
					}
					if ((fish_biomass2[i][j] > biomass2_threshold) && (fish_biomass2[i][j] + biomass2_threshold > baseline[1][i][j])) {
						current_distance = distance;
						current_pos_x = i;
						current_pos_y = j;
						update_fishbiomass2 = true;
					}
				}
            }
        }

        //if (current_pos_x >= 0) {
		if (update_fishbiomass1) {
            //fish_biomass[current_pos_x][current_pos_y] -= threshold;
			fish_biomass[current_pos_x][current_pos_y] -= biomass1_threshold;
            //recent_catch[0] = threshold;
			recent_catch[0] = biomass1_threshold;
            vector<int> position = { current_pos_x, current_pos_y };
            catch_locs[0].push_back(position);
			//break;
        }

		if (update_fishbiomass2) {
			//fish_biomass2[current_pos_x][current_pos_y] -= threshold;
			fish_biomass2[current_pos_x][current_pos_y] -= biomass2_threshold;
			//recent_catch[1] = threshold;
			recent_catch[1] = biomass2_threshold;
			vector<int> position = { current_pos_x, current_pos_y };
			catch_locs[1].push_back(position);
			//break;
		}

		if (update_fishbiomass1 || update_fishbiomass2) {
			break;
		}
    }
}

//void RegionMaximumFisher::fish_out(vector2d<double>& fish_biomass) {
void RegionMaximumFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {
//void RegionMaximumFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {

    int dim_x = fish_biomass.size();
    int dim_y = fish_biomass[0].size();

    catch_locs[0].clear();
    vector<int> first_position = { home_x, home_y };
    catch_locs[0].push_back(first_position);

    int current_pos_x = -1;
    int current_pos_y = -1;
    double current_biomass = 0.0;
    double current_baseline = 0.0;

    // Record the current highest biomass that is above the baseline
    // and is not a protected area
    for (int i = 0; i < dim_x; i++) {
        for (int j = 0; j < dim_y; j++) {
            if ((fish_biomass[i][j] - baseline[0][i][j] > current_biomass - current_baseline) && (protection_mask[i][j] == 0)) {
                current_pos_x = i;
                current_pos_y = j;
                current_biomass = fish_biomass[i][j];
                current_baseline = baseline[0][i][j];
            }
        }
    }

    if ( threshold < current_biomass - current_baseline ) {
        // Fish out the contents of the cell with highest biomass
        fish_biomass[current_pos_x][current_pos_y] -= threshold;
        recent_catch[0] = threshold;
        // Record keeping
        vector<int> position = { current_pos_x, current_pos_y };
        catch_locs[0].push_back(position);
    }

}


//void SmartFisher::fish_out(vector2d<double>& fish_biomass) {
void SmartFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2) {
//void SmartFisher::fish_out(vector2d<double>& fish_biomass, vector2d<double>& fish_biomass2, int current_time) {

    int dim_x = fish_biomass.size();
    int dim_y = fish_biomass[0].size();

    catch_locs[0].clear();
    vector<int> first_position = { home_x, home_y };
    catch_locs[0].push_back(first_position);

    int current_pos_x = -1;
    int current_pos_y = -1;
    double current_biomass = 0;
    double current_baseline = 0;
    recent_catch[0] = 0;

    for (int gap = 0; gap < travel_range + 1; gap++){
    // Loop is done by making a bounding box that increases in
    // width up to the maximum distance.
        int up_x = max(0, max(0, home_x - gap));
        int down_x = min(max(0, dim_x-1), home_x + gap);
        int left_y = max(0, max(0, home_y - gap));
        int right_y = min(max(0, dim_y-1), home_y + gap);

        for (int j = left_y; j < right_y; j++) {
            int i = up_x;
            if (protection_mask[i][j] == 0) {
                double distance = pow(pow((home_x - i), 2) + pow((home_y - j), 2), 0.5);
                if ((distance < travel_range) &&  (fish_biomass[i][j] - baseline[0][i][j] > current_biomass - current_baseline)){
                    current_pos_x = i;
                    current_pos_y = j;
                    current_biomass = fish_biomass[i][j];
                    current_baseline = baseline[0][i][j];
                }
            }
        }

        for (int j = left_y; j < right_y; j++) {
            int i = down_x;
            if (protection_mask[i][j] == 0) {
                double distance = pow(pow((home_x - i), 2) + pow((home_y - j), 2), 0.5);
                if ((distance < travel_range) &&  (fish_biomass[i][j] - baseline[0][i][j] > current_biomass - current_baseline)){
                    current_pos_x = i;
                    current_pos_y = j;
                    current_biomass = fish_biomass[i][j];
                    current_baseline = baseline[0][i][j];
                }
            }
        }

        for (int i = up_x; i < down_x; i++) {
            int j = left_y;
            if (protection_mask[i][j] == 0) {
                double distance = pow(pow((home_x - i), 2) + pow((home_y - j), 2), 0.5);
                if ((distance < travel_range) &&  (fish_biomass[i][j] - baseline[0][i][j] > current_biomass - current_baseline)){
                    current_pos_x = i;
                    current_pos_y = j;
                    current_biomass = fish_biomass[i][j];
                    current_baseline = baseline[0][i][j];
                }
            }
        }

        for (int i = up_x; i < down_x; i++) {
            int j = right_y;
            if (protection_mask[i][j] == 0) {
                double distance = pow(pow((home_x - i), 2) + pow((home_y - j), 2), 0.5);
                if ((distance < travel_range) &&  (fish_biomass[i][j] - baseline[0][i][j] > current_biomass - current_baseline)){
                    current_pos_x = i;
                    current_pos_y = j;
                    current_biomass = fish_biomass[i][j];
                    current_baseline = baseline[0][i][j];
                }
            }
        }
    }

    if ( threshold < current_biomass - current_baseline ) {
        // Fish out the contents of the cell with highest biomass
        fish_biomass[current_pos_x][current_pos_y] -= threshold;
        recent_catch[0] = threshold;
        // Record keeping
        vector<int> position = { current_pos_x, current_pos_y };
        catch_locs[0].push_back(position);
    }

}

} //fishing
/*
int main(int argc, char const *argv[]) {
    return 0;
}
*/
