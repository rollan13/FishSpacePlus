# distutils: language = c++

from libcpp.vector cimport vector
import numpy as np

from fishspace.fishing_agent cimport Fisher

cdef class WalkFisher:
    ''' Fisher agent based on the bias random walk: the agent randomly selects
    cells with biases defined by the bias matrix, e.g. depth, biomass. Hard
    barriers, where the agent cannot enter, are also imposed using a protection
    mask. '''
    cdef Fisher the_fisher
    cdef int home_posx
    cdef int home_posy

    def __cinit__(self, double threshold, int home_posx, int home_posy):
        self.the_fisher = Fisher(threshold)
        self.home_posx = home_posx
        self.home_posy = home_posy

    @property
    def home_posx(self):
        return self.home_posx

    @property
    def home_posy(self):
        return self.home_posy

    def fish_out(self, vector[vector[double]] baseline,
                vector[vector[double]] fish_weights,
                vector[vector[double]] bias_matrix,
                vector[vector[double]] protection_mask
            ):
        ## NOTE: WalkFisher forces that the starting point for running the
        ## fishing routine the location specified upon initialization.
        return self.the_fisher.fish_out(
            self.home_posx, self.home_posy, baseline,
            fish_weights, bias_matrix, protection_mask
        )

    def get_position(self):
        return self.the_fisher.get_position()

    def get_history(self):
        return self.the_fisher.get_state_history()


cdef class EqualFisher:
    ''' Fisher agent that fishes all of the cells equally: the total biomass
    is computed, then based on the ratio between the total biomass and the
    fisher threshold the same percentage of biomass is subtraced for all the
    cells. Can be used when the spatial element of the model is neglected.
    '''
    cdef double threshold

    def __cinit__(self, double threshold):
        self.threshold = threshold

    def fish_out(self, vector[vector[double]] fish_weights,
                       vector[vector[double]] protection_mask,
                       vector[vector[double]] baseline):
        dim_x = len(fish_weights)
        dim_y = len(fish_weights[0])

        total_biomass = 0.0

        for i in range(dim_x):
            for j in range(dim_y):
                if protection_mask[i][j] == 0:
                    total_biomass = total_biomass + fish_weights[i][j]

        if self.threshold <= total_biomass:
            take_out = 1.0 - (self.threshold / total_biomass)
        else:
            take_out = 0.0

        for i in range(dim_x):
            for j in range(dim_y):
                if protection_mask[i][j] == 0:
                    fish_weights[i][j] = fish_weights[i][j] * take_out

        return fish_weights

cdef class ClosestFisher:
    ''' Strictly fishes only inside cells with biomass that satisfies the 
    daily catch requirement of the fisher for one fishing action. '''

    ## TODO: implementation in Cython may be too slow; consider moving the
    ## code to C++ as well. Goal is computation of biomass and fishing 
    ## within 2s.

    cdef double threshold
    cdef double max_distance
    cdef int home_posx, home_posy
    cdef int current_pos_x, current_pos_y


    def __cinit__(self, double threshold, double max_distance, 
                        int home_posx, int home_posy):
        self.threshold = threshold
        self.max_distance = max_distance
        self.home_posy = home_posy
        self.home_posx = home_posx

    @property
    def home_posx(self):
        return self.home_posx

    @property
    def home_posy(self):
        return self.home_posy

    def get_last_position(self):
        ''' Fisher takes only two cells per timestep: '''
        return [ [self.current_pos_x, self.current_pos_y] ]


    def fish_out(self, vector[vector[double]] fish_weights,
                       vector[vector[double]] protection_mask,
                       vector[vector[double]] baseline,
        ):
        
        dim_x = len(fish_weights)
        dim_y = len(fish_weights[0])

        current_distance = dim_x * dim_y * 1.0
        current_pos_x, current_pos_y = -1, -1
        ## Traverse the area. Check if 1) the cell falls inside the maximum distance
        ## possible, 2) the cell has enough biomass to satisfy the threshold but not
        ## fall below the baseline, and 3) the cell is closest to the home port so far.
        for pad in range(1,int(self.max_distance)):
            ## Loop is done by making a bounding box that increases in width
            ### up to the maximum distance.
            up_x, down_x = int(max(0, self.home_posx - pad)), int(min(dim_x-1, self.home_posx + pad))
            left_y, right_y = int(max(0, self.home_posy - pad)), int(min(dim_y-1, self.home_posy + pad))

            for j in range(left_y, right_y):
                i = up_x
                if protection_mask[i][j] == 0:
                    distance = (((self.home_posx - i) ** 2.0) + ((self.home_posy - j) ** 2.0) ** 0.5)
                    # if (fish_weights[i][j] > self.threshold):
                    if (distance < current_distance) and \
                       (fish_weights[i][j] > self.threshold) and \
                       (fish_weights[i][j] + self.threshold > baseline[i][j]):
                        current_distance = distance
                        current_pos_x = i
                        current_pos_y = j

            for j in range(left_y, right_y):
                i = down_x
                if protection_mask[i][j] == 0:
                    distance = (((self.home_posx - i) ** 2.0) + ((self.home_posy - j) ** 2.0) ** 0.5)
                    # if (fish_weights[i][j] > self.threshold):
                    if (distance < current_distance) and \
                       (fish_weights[i][j] > self.threshold) and \
                       (fish_weights[i][j] + self.threshold > baseline[i][j]):
                        current_distance = distance
                        current_pos_x = i
                        current_pos_y = j

            for i in range(up_x, down_x):
                j = left_y
                if protection_mask[i][j] == 0:
                    distance = (((self.home_posx - i) ** 2.0) + ((self.home_posy - j) ** 2.0) ** 0.5)
                    # if (fish_weights[i][j] > self.threshold):
                    if (distance < current_distance) and \
                       (fish_weights[i][j] > self.threshold) and \
                       (fish_weights[i][j] + self.threshold > baseline[i][j]):
                        current_distance = distance
                        current_pos_x = i
                        current_pos_y = j

            for i in range(up_x, down_x):
                j = right_y
                if protection_mask[i][j] == 0:
                    distance = (((self.home_posx - i) ** 2.0) + ((self.home_posy - j) ** 2.0) ** 0.5)
                    # if (fish_weights[i][j] > self.threshold):
                    if (distance < current_distance) and \
                       (fish_weights[i][j] > self.threshold) and \
                       (fish_weights[i][j] + self.threshold > baseline[i][j]):
                        current_distance = distance
                        current_pos_x = i
                        current_pos_y = j

            if current_pos_x > 0:
                fish_weights[current_pos_x][current_pos_y] -= self.threshold
                self.current_pos_x = current_pos_x
                self.current_pos_y = current_pos_y
                break

        if current_pos_x < 0:
            self.current_pos_x = -1
            self.current_pos_y = -1

        return fish_weights 


def initialize_fisher_positions(fisher_count, fisher_initial_locs):
    ''' Takes an array of fisher density for each cell, then creates a
    numpy array containing the coordinates sampled from the fisher density. '''
    z = fisher_initial_locs / np.sum(fisher_initial_locs)
    dim_x, dim_y = np.shape(fisher_initial_locs)
    loc_index = np.random.choice(range(z.size), size=fisher_count,
            p=z.reshape(z.size))
    fisher_locs = np.array([np.floor(loc_index/dim_y), loc_index%dim_y]).T

    return fisher_locs

