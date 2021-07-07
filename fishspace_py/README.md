# Fish SPACE: Fisheries for Sustaining People’s Access through Conservation and Equitable Systems

## NOTE -- Packaging details
Fish SPACE has been re-organized to be used as a Python package instead of just being a collection of scripts. This allows the user to download and install the package, and write separate scripts for running Fish SPACE simulations without touching the code base.

To build and install, run the following on the top directory of the source:

```bash
python setup.py build
python setup.py install
```

Extra `CFLAGS` can also be passed to the build command, e.g. `-march=native`, which should speed up the model runs. On an i7-4790, running the model with `ClosestFisher` fishing agent runs less than 5 seconds per time-step.

## META: File Description
`FISHSPACE` contains the following files:
* `fishing_agent.cpp`, `fishing_agent.h` -- C++ implementation of the random-walk based fishing strategy.
* `fishing_agent.pxd` -- Cython header for `fishing_agent`.
* `fishing.pyx` -- Cython implementation of fishing strategies. Each class can be imported and used for the fishing layers in `fishspace.py`. Strategies include
	* Random walk (`WalkFisher`) - performs a biased random walk on the lattice, catching a particular amount of biomass for each cell it lands. Class is a shim to the C++ implementation.
	* Even rate (`EqualFisher`) - simulates FISHBE fishing behavior: biomass are evenly taken from all cells as a fraction of its current biomass.
	* Fixed rate (`ClosestFisher`) - scans nearby cells up to a maximum distance for the closest cell that has sufficent biomass for the minimum catch requirement.
* `fishspace.py`
* `fisheries.py` -- contains classes that computes the biomass and spillover. The class is independent of fisheries type; the types should be handled by the main model.
* `fishspace.py` -- the main FISHSPACE model, including fisheries and fisher types. The `FishSPACE` class is the starting point when running the model for any scenario/dataset.
* `simulation.py` -- command line script for running the model on different scenarios on the El Nido dataset. Data for the initial conditions of the model are in the `/data/` directory. If the script is run correctly, a JSON file containing the raw data of the model is created.
* `outputs.py` -- command line script for parsing the raw data in the JSON file into figures and videos used in our analysis of the model.

## Initialization
You can obtain the code by downloading the zip file or cloning the private git repository. `FISHSPACE` depends on Python and its scientific libraries; the easiest way to install Python on any platform is to use a distribution, e.g. Anaconda Python. Other than building the C++ code for the fishing sub-model, `FISHSPACE` does not require any further build instructions.

* Unzip the contents into a directory, e.g. `FISHSPACE/` inside the home directory.
* Open a terminal and type `cd ~/FISHSPACE/` to go the directory.
* Run the script to build the fishing sub-model, `python setup.py build_ext --inplace`. The build script needs to be run once unless changes were made to the submodel.

NOTE: Instructions for running the model assumes the user is inside the `FISHSPACE` directory.

## Running the Model
To allow flexibility in studying the model, the `FISHSPACE` code splits running the model into two scripts: the implementation of the model (`fishspace.py`) and the script running the simulation (`simulation.py`). Changes to the model must be done in `fishspace.py`, and varying the parameters in `simulation.py`

`simulation.py` already includes parameters for running the single compartment model and the El Nido model. For the El Nido model, the user is given the following choices for the scenario:

1. `NOFISHER`: run the model with no fishing.
2. `NOPROTECTION`: run the model with 600 fishers @ 6 kg/fisher-day (the default fishing pressure)
3. `CBMPAS`: run the model with default fishing pressure, but with community-based MPA cells inaccessible to the fishers.
4. `CBMPASLESS`: run the model similar to `CBMPAS`, but with 50% less fishing pressure.
5. `NIPAS`: run the model with default fishing pressure, but with NIPAS cells inaccessible to the fishers.

To run the model using `simulation.py`, type the following in the terminal:

    python simulation.py [SCENARIO] [REEF_GROWTH_RATE] [REEF_CARRY_CAP] [PELAGIC_GROWTH_RATE] [PELAGIC_CARRY_CAP]

For example (no fishing scenario; reef: r = 0.002, K = 800; pelagic: r = 0.02, K = 10):

    python simulation.py NOFISHER 0.02 800 0.02 10

Other scenarios for El  Nido can be defined in the `scenario_config` dictionary, where you can change the protected area (`protection_mask`) and the number of fishers (`fisher_count`). Initial conditions can also be defined inside `scenario_config`, overriding the default values inside `params`.

## Inside the Model

The `FishSPACE` class

The simplest way to run the model is to initialize the model class and create a for-loop to run the current timestep:

```python
the_model = FishSPACE(**params)
for i in range(365*20): # 20 years @ daily timestep
    the_model.run_timestep()
```

where `params` contains both the simulation parameters and initial conditions of the models. Adding code after `run_timestep()` creates post-processing instruction after every time step. For `simulation.py`, this includes saving the total biomass and the current state to a JSON file using the `save_state(file)` method.

## Parsing data

`outputs.py` provides scripts for parsing the JSON file returned by `save_state` such as plotting the data or converting to CSV. To convert the data into a CSV file, run the following script in the terminal:

    python outputs.py TO_CSV [JSON_FILENAME]

For example (using the results from *Running the Model*):

    python outputs.py TO_CSV fishspace_r-0.02_K-2000.0_r-0.02_K-10.0__CBMPAS.json

The output should be a valid CSV that can be opened using Excel or any supporting spreadsheet application. The script looks for the `reef_fish` and `pelagic_fish` layers in the model and lists down the total biomass of each layer present for every time step.

The script also generates the video showing the reef fish biomass for each cell and the location of the fishers at each timestep. To generate the video, run the following scirpt:

    python outputs.py PLOT_FIGURE [JSON_FILENAME]

The output is an MP4 video with two panels, showing fish biomass and fishing behavior. The generated video displays 12 frames (time step) per second, with approximately 30 seconds for 1-year simulation.

NOTE: The video parser requires `ffmpeg` that is *not* provided by the Anaconda Python distribution. Use your system package manager to install: for OSX (Homebrew), `brew install ffmpeg` and for Ubuntu (APT), `apt install ffmpeg`.

For the fishing behavior panel (left), each red pixel corresponds to the last cell where a fisher was located before satisfying the daily catch threshold. Fishing behavior allows moving through open waters but imposes a limit on the number of steps they could take in a day. Due to this limitation, some of the fishers may end up in open waters where no reef fish biomass is present.

For the fish biomass panel (right), the color of each cell indicates the reef fish biomass present, where blue indicates low biomass and red indicates high biomass. Cells designated as open water or land are colored differently to distinguish with the reef cells. The index for the current time step is also displayed in the frame.



---
