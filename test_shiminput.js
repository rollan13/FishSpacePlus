#!/usr/bin/env node
const { model } = require("./addons/fishspace-model");

function generate_2d_float(dim_x, dim_y, min_val, max_val) {
	// Generates a 2D array of floats uniformly distributed
	// from 0 to max_val.
	return Array(dim_x).fill().map(
		() => Array(dim_y).fill().map(() => min_val + ((max_val - min_val) * Math.random()))
	)
};

function generate_2d_intcond(dim_x, dim_y, fillpct) {
	// Creates a 2D array of integers with a set fill-rate,
	// i.e. each cell has a fixed probability that it has 
	// a non-zero value.
	return Array(dim_x).fill().map(
			() => Array(dim_y).fill().map(() => (
		Math.random() < fillpct) ? Math.ceil(Math.random() * 20) : 0
	));
};

function generate_2d_boolprob(dim_x, dim_y, fillpct) {
	// Creates a 2D array of bool (represented by int 0/1) 
	// with rate fillpct.
	return Array(dim_x).fill().map(
		() => Array(dim_y).fill().map(() => 1.0 * (Math.random() < fillpct))
	);
};

function generate_metadata(dim_x, dim_y, md_count) {
	return Array(md_count).fill().map((x, idx, arr) => { return {
			x_pos: Math.floor(Math.random() * dim_x),
			y_pos: Math.floor(Math.random() * dim_y),
			index: idx
		};
	});
};


var dim_x = 300;
var dim_y = 300;

var md_count = 30;

var inputs  = {
	// map inputs
	initial_biomass: generate_2d_float(dim_x, dim_y, 1, 100),
	carrying_capacity: generate_2d_float(dim_x, dim_y, 100, 300),
	geog_mask: generate_2d_boolprob(dim_x, dim_y, 0.3),
	protection_mask: generate_2d_boolprob(dim_x, dim_y, 0.3),
	retention: generate_2d_float(dim_x, dim_y, 0.0, 0.0),
	connectivity_matrix: generate_2d_float(md_count, md_count, 0.0, 0.5),
	metadata: generate_metadata(dim_x, dim_y, md_count),
	// parameter inputs
	growth_rate: 0.01,
	spillover_rate: 0,
}

var instance = new model.FISHSpace();
console.log(instance.shim(inputs));
console.log(inputs.connectivity_matrix);
console.log(inputs.metadata);
for (i = 0; i < 100; i++) {
	instance.add_fisher("random_walk", 2, 1, 1, 2000);
	// instance.add_fisher("closest", 3, 1, 1, 60);
	// instance.add_fisher("uniform", 3, 1, 1, 2000); //should just be one
}

for (i = 0; i < 1000; i++) {
	var current = instance.run_timestep();
	console.log(current.total_biomass);
}
instance.run_timestep()