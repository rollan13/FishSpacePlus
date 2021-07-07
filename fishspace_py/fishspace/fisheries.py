import numpy as np


class FishLayer(object):
    def __init__(self, **kwargs):
        ## Main biomass lattice
        self.biomass = np.array(kwargs['initial_lattice'])
        ## Simulation parameters
        self.growth_rate = np.array(kwargs['growth_rate'])
        self.carrying_capacity = np.array(kwargs['carrying_capacity'])
        self.spillover_rate = kwargs['spillover_rate']

        self.delay = kwargs['delay'] # int
        dim_x, dim_y = self.biomass.shape
        self.connectivity_matrix = np.zeros(shape=(dim_x, dim_y, self.delay))

        if not self._check_array_sizes(self.biomass):
            raise Exception("Inconsistent array dimensions.")

    def solve_biomass(self):
        ''' Compute the logistic equation for the biomass. '''
        restock_rate = self.biomass * self.growth_rate * np.nan_to_num(1 - (self.biomass/(self.carrying_capacity)))
        restock_rate[np.invert(np.isfinite(restock_rate))] = 0 # Remove infs due to 0 carrying capacity
        restock_rate[restock_rate < 0] = 0 # Remove negative growth rate
        self.biomass = self.biomass + restock_rate

        self.connectivity_matrix = np.roll(self.connectivity_matrix, 1, axis=2)
        self.connectivity_matrix[:,:,0] = np.zeros(shape=self.biomass.shape)

    def solve_spillover(self, boundaries, spill_iters=1):
        ''' Compute the spillover for the biomass. '''
        for i in range(spill_iters):
            spillover_reef = diffusion_eqn(
                self.biomass, boundaries, ## NOTE: boundaries is self.geog_mask
                self.spillover_rate, self.spillover_rate
            )
            # Impose zero gradient at boundaries after spillover
            self.biomass = boundaries * impose_zero_gradient(self.biomass + 0.01*spillover_reef)

    # Supporting methods
    def _check_array_sizes(self, *array_set):
        ''' Check if all the arrays have the same dimensions. '''
        size = np.array(array_set[0]).shape
        for array in array_set:
            if size != np.array(array).shape:
                return False
        return True


def diffusion_eqn(lattice, diff_weights, dx, dy):
    ''' Performs one time step of the diffusion equation, with masking to reflect
    the boundary conditions.
    '''
    # Initialize empty lattice
    lattice = lattice * diff_weights
    dim_x, dim_y = np.shape(lattice)
    diff_lattice = np.zeros(shape=(dim_x, dim_y))
    # Roll lattices accdg to:
    diff_lattice += (np.roll(lattice, +1)   + np.roll(lattice, -1)   - 2.0*lattice)/(dx**2)
    diff_lattice += (np.roll(lattice.T, +1) + np.roll(lattice.T, -1) - 2.0*lattice.T).T/(dy**2)
    # Apply diffusion weights for each cell
    diff_lattice *= diff_weights

    return diff_lattice


def impose_zero_gradient(lattice):
    ''' Reflect the values at the boundaries'''
    lattice[:,  0] = lattice[:,  1]
    lattice[:, -1] = lattice[:, -2]
    lattice[0,  :] = lattice[1,  :]
    lattice[-1, :] = lattice[-2, :]
    return lattice
