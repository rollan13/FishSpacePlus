// #include <boost/random/uniform_real.hpp>
// #include <boost/random/uniform_int.hpp>

namespace Fishing {

    class Fisher {

    public:
    	// Constructor/Destructor
    	Fisher(); // DISABLE: REQUIRE PARAMS
    	Fisher(double _threshold);
    	// ~BeliefPropagation();
    	// Class Methods
    	int current_pos_x;
    	int current_pos_y;
        double threshold;

    	// Record fishing positions and obtained fish
    	std::vector<std::vector<double>> fishing_record;
    	std::vector<std::vector<double>> fish_out(
    		int initial_posx, int initial_posy,
            std::vector<std::vector<double>> baseline,
    		std::vector<std::vector<double>> fish_weights,
    		std::vector<std::vector<double>> bias_matrix,
    		std::vector<std::vector<double>> protection_mask
    	);
    	std::vector<int> get_position();
    	std::vector<std::vector<double>> get_state_history();
    };
}
