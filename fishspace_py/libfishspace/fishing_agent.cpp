#include <algorithm>
#include <iostream>
#include <random>
#include <vector>

#include "fishing_agent.h"

using namespace std;

namespace Fishing {

    std::default_random_engine gen;

    // Constructors; initialize variables.
    Fisher::Fisher(){};
    Fisher::Fisher(double _threshold){
        threshold = _threshold;
    };

    vector<vector<double>> Fisher::fish_out(
        int initial_posx, int initial_posy, vector<vector<double>> baseline,
        vector<vector<double>> fish_weights, vector<vector<double>> bias_matrix,
        vector<vector<double>> protection_mask
    ){
        /* Main code for a single fisher. Requires re-initialization for
        fishing (agents not reusable). */
        int dim_x = fish_weights.size();
        int dim_y = fish_weights[0].size();

        int pos_x = initial_posx;
        int pos_y = initial_posy;

        int attempts = 5000;

        double current_threshold = threshold;
        fishing_record.clear();

        //
        std::vector<double> current_state = {
            static_cast<double>(initial_posx),
            static_cast<double>(initial_posy),
            current_threshold
        };
        fishing_record.push_back(current_state);


        /*  */
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
            std::discrete_distribution<int> picker {
                bias_matrix[pos_x_left][pos_y], bias_matrix[pos_x_right][pos_y],
                bias_matrix[pos_x][pos_y_up], bias_matrix[pos_x][pos_y_down]
            };

            int pick = picker(gen);
            pos_x = action[pick][0];
            pos_y = action[pick][1];

            // Run action if fish is present in the current cell.
            if (fish_weights[pos_x][pos_y] > 0){
                double fish_out = std::max(0.0, std::min(current_threshold, 0.5  * (fish_weights[pos_x][pos_y] * (1 - protection_mask[pos_x][pos_y])) - baseline[pos_x][pos_y]));
                current_threshold = current_threshold - fish_out;
                fish_weights[pos_x][pos_y] = fish_weights[pos_x][pos_y] - fish_out;
            }
            // Update agent variable for position
            current_pos_x = pos_x;
            current_pos_y = pos_y;
            // Record state;
            std::vector<double> current_state = {
                static_cast<double>(current_pos_x),
                static_cast<double>(current_pos_y),
                current_threshold
            };
            fishing_record.push_back(current_state);
        }

        return fish_weights;
    }

    vector<int> Fisher::get_position(){
        /* Returns the current position of the fisher. */
        vector<int> the_position = {current_pos_x, current_pos_y};
        return the_position;
    }

    vector<vector<double>> Fisher::get_state_history(){
        return fishing_record;
    }

}

int main(int argc, char const *argv[]) {
    return 0;
}
