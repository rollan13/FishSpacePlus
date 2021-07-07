# Fish SPACE

> Fish SPACE: Fisheries for Sustaining People’s Access through Conservation and Equitable Systems

Fish SPACE is a spatially explicit fisheries model developed to support decisions on the design of no-take marine reserves (NTMRs) to sustain fisheries. The tool allows users to evaluate alternative decisions on marine reserve design planning by describing the potential benefits (e.g., gains in fish biomass, sustained catch of fishers) and consequences (i.e., limiting fishing access) of such decisions. The tool can also help users explore complementary fisheries management decisions, such as prescribing catch quotas to increase the effectiveness of NTMRs. 

Fish SPACE has two parts: a) a fish population sub-model that presents changes of fish biomass based on the coral reef area and condition, ecological processes, and fishing activity; and, b) a fishing sub-model that presents the effects of changing fish biomass and coral reef protection on the distance travelled and catch of fishers.  The tool requires both spatial and non-spatial data to run. The spatial data (i.e., maps) are used to create a grid with uniformly sized cells that represents a particular planning region. The non-spatial data are input parameters that inform the kind of fish stock (e.g., groupers, snappers) and level of fishing activity. 

This repository contains code for building the core FishSPACE model in C++ (in `addons/fishspace-model`), a Python library, and an Electron GUI. Running Fish SPACE requires preparing grid files to feed into the model .Please refer to the [Fish SPACE Spatial Data preparation manual](https://ccres.net/resources/ccres-tool/fish-space) for instructions and tips on how to prepare the grid files. 


## Installation

### Python Library

For Mac and Linux, we suggest using the [Anaconda Python](https://www.anaconda.com/download) distribution for Python 3.6 or higher. For Windows machine, we suggest installing Anaconda within [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and follow install instructions for Linux. For Mac, we highly suggest installing [Homebrew](https://brew.sh/) after installing Xcode.

* Install the required C++ compilers: for Linux/WSL install g++ (e.g. `sudo apt install g++`), for Mac the compilers come with downloading Xcode for the App Store. 

* To run the sample notebook file, compile the extensions in place with `python setup.py build_ext --inplace`.

* To install as a Python library, generate the `.whl` file by running `python setup.py bdist_wheel` then install with `pip install dist/fishspace-<version>.whl`.

### Electron GUI

Building the GUI requires Node and compatible C++ compilers. For Mac/Linux, install the required compilers as with building the Python library and install yarn (e.g. `apt install yarn` for Ubuntu, `brew install yarn` for Mac). For Windows, npm provides a complete package that includes compatible compilers installed by `npm install --global windows-build-tools`. 

* Install the required Node modules by running `yarn`.

* Build the extensions for the model backend and the JS sorces by running `npm run build`.

* To generate the executables, run `npm run electron-build` for Mac/Linux or `npm run electron-build-win` for Windows. This will generate a distributable zip file that can be run without installing additional files.

### C++ Source Code Documentation

The documentation of the C++ API can be found in the file \FishSPACE2\addons\fishspace-model\lib\Dox\html\index.html

## Citation

To cite Fish SPACE: 

> Horigue, V., Balingit A.C., Pata P.R., Villanoy, C.L., Quibilan, M.C., Licuanan, W.Y., and Aliño, P.M. 2018. Fish SPACE: a spatial tool for marine reserve design and fisheries management [Computer Software]. Capturing Coral Reefs and Related Ecosystems Project (CCRES). Quezon City, Philippines.
