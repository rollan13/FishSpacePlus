//######### C++ node modules 
const { model } = require('../addons/fishspace-model');
var instance = new model.FISHSpace();

//var fileDirectory = "C:/ccres/ccres_maps/";
//var outputFileDirectory = "C:/ccres/ccres_output/";
var fileDirectory = "./gui/scripts/csv-reader/";
var activeReexecutionFile = "";

//######### FLAGS
var play = false;
var areModelParamsReady = false;
var readStartCount = 0;
var readEndCount = 0;

//######### FILE HEADER CONFIG VARS

const REEF_COL = "REEF_AREA";
const LAND_COL = "LAND_AREA";
const WATER_COL = "WATER";
const DEPTH_COL = "DEPTH";

//######### SERIALIZED INPUTS
/* for reference
prototype fileSources.type {
     headers,
     xDim,
     yDim,
     arrays2d {
         name : val,
         sample - NETLOCK1 : [[]]
     }
}
*/
var fileSources = {
    "habitatGrid" : {"arrays2d" : {}},
    "fisherDocks" : {"arrays2d" : {}},
    "reserve" : {"arrays2d" : {}, "uploadStatus" : false},
    "habitatQuality" : {"arrays2d" : {}},
	"connectivityMetadata" : {},
	"connectivityMatrix" : {},
	"connectivityMetadataPelagic" : {},
	"connectivityMatrixPelagic" : {}
};

var formSources = {
	"initialBiomass" : {"type" : {},
						 "map" : {},
						 "value" : {}
						},
	"carryingCapacity" : {"type" : {},
						  "map" : {},
						  "value" : {}
						 },
	"growthRate" : {
						"type" : {},
						"value" : {}
						},
	"fecundity" : {
						"value" : {}
						},
	"recruitmentRate" : {
						"value" : {}
						},
	"spilloverThreshold" : {
						"value" : {}
						},
	"spilloverRate" : {
						"value" : {}
					},
	"biomassThreshold" : {
						"value" : {}
					},
	"initialBiomassPelagic" : {"type" : {},
						 "map" : {},
						 "value" : {}
						},
	"carryingCapacityPelagic" : {"type" : {},
						  "map" : {},
						  "value" : {}
						 },
	"growthRatePelagic" : {
						"type" : {},
						"value" : {}
						},
	"fecundityPelagic" : {
						"value" : {}
						},
	"recruitmentRatePelagic" : {
						"value" : {}
						},
	"spilloverThresholdPelagic" : {
						"value" : {}
						},
	"spilloverRatePelagic" : {
						"value" : {}
					},
	"biomassThresholdPelagic" : {
						"value" : {}
					},				
    "connectivity" : {"map" : {}},
	"connectivityPelagic" : {"map" : {}},
    "reserve" : {"type" : {}, "uploadStatus" : false},
	"fishingParam" : {
		"type" : {},
		"fisherCount" : {},
		"quota" : {},
		"numArg" : {},
		"fisherProperties" : {
			"biomassMaxRatio": [],
			"homeX" : [],
			"homeY" : [],
			"maxThreshold" : [],
			"fishingRange" : [],
			"fisherId" : []
		}
	},
	"lengthOfRun" : {}
};

var marineReserveMetadata = {
		"mpa_id" : [],
		"mpa_name" : [],
		"start_close" : [],
		"end_close" : []
		
};
//######### END SERIALIZED INPUTS

//######### MODEL I/O
var modelInput = {
	"initial_biomass" : {},
	"carrying_capacity" : {},
	"geog_mask" : {},
	"depth_grid" : {},
	"protection_mask" : {},
	"retention" : {},
	"spillover_rate" : {},
	"growth_rate" : {},
	"connectivity_matrix" : {},
	"fecundity" : {},
	"recruitment_rate" : {},
	"spillover_threshold" : {},
	"metadata" : {},
	"initial_biomass2" : {},
	"carrying_capacity2" : {},
	"retention2" : {},
	"spillover_rate2" : {},
	"growth_rate2" : {},
	"connectivity_matrix2" : {},
	"fecundity2" : {},
	"recruitment_rate2" : {},
	"spillover_threshold2" : {},
	"metadata2" : {},
	"seasonal_closure_matrix" : {} 
};

var rawOutput = {
	"timeSteps" : 0,
	"callCount" : 0,
	"pausedTimestep" : 0,
	"model" : [],
	"biomass_min" : [],
	"biomass_max" : []
};
//######### END MODEL I/O

//######### FILE CONSTANTS
const fileHeaders = {
	habitatGrid : [
		'ID',
		'POINT_X',
		'POINT_Y',
		REEF_COL,
		LAND_COL,
		WATER_COL,
		DEPTH_COL
	],
	fisherDocks : [
		'ID',
		'POINT_X',
		'POINT_Y'
	],
	reserve : [
		'ID',
		'POINT_X',
		'POINT_Y',
		'MPA_ID',
		'MPA_AREA'
	],
	connectivity : [],
	habitatQuality : [
		'ID',
		'POINT_X',
		'POINT_Y'
	],
	fisherProperties : [
		'fisher_id',
		'home_x',
		'home_y',
		'biomass1_maxratio',
		'maxthreshold',
		'fishing_range'
	],
	reserveMetadata : [
		'MPA_ID',
		'MPA_NAME',
		'START_CLOSE',
		'END_CLOSE'
	]
};

//feed everything except connectivity
var headersOf2dArrays = {
	habitatGrid : [],
	fisherDocks : [],
	reserve : [],
	connectivity : [],
	habitatQuality : []
};
//######### END FILE CONSTANTS


// Tooltip constants //

/**Start of Maps Tab**/
//Fields
const tt_habitatGrid = "Grid with uniform-sized cells that identifies the area occupied by the land and reef within the cell, and their total areal extent across the grid. ";
const tt_fisherDocks = "Grid with cells representing the 'dock' or point of departure of fishers at each time step. ";
const tt_marineReserve = "Grid with cells that describes areas closed to fishing.";
const tt_connectivityMetadata = "A (n x 3) data table that contains the reef ID, x-position, and y-position of each reef grid in the connectivity matrix.";
const tt_connectivityMatrix = "A (n x n) matrix that defines the probability of a fish larva dispersed from a source reef (rows) to a sink reef (columns).";
const tt_connectivityMetadataPelagic = "A (n x 3) data table that contains the reef ID, x-position, and y-position of each reef grid in the connectivity matrix for pelagic fish.";
const tt_connectivityMatrixPelagic = "A (n x n) matrix that defines the probability of a pelagic fish larva dispersed from an area.";
const tt_habitatQuality = "Grid that describes the quality or condition of corresponding reef cells in the habitat grid.";

//Buttons
const tt_uploadFileBtn = "Click to select the file to upload.";
const tt_removeFileBtn = "Click to delete the uploaded file. ";
/**End of Maps Tab**/

/**Start of Biomass Tab**/
//Initial Biomass
const tt_initialBioSelect = "Select \"fixed\" or \"scaled\" to set the initial biomass across reef cells. Selecting \"fixed\" will set the same initial biomass across all reef cells. Selecting \"scaled\" will vary the initial biomass across all reef cells based on the map chosen. ";
const tt_initialBioMap = "Select map to use to scale the initial biomass (i.e., habitat grid and habitat quality). ";
const tt_initialBioScaled = "Sets basis for scaling the initial biomass. Biomass scaled to the habitat grid will give " +
		"higher values for larger reef areas, and lower values for smaller reef areas. Biomass scaled to the habitat quality grid " +
		"will give higher values for reefs with good status, and lower values for reefs with poor status.";
const tt_initialBioFixed = "Sets the same initial biomass for all reef cells. Recommended for areas with unreliable map data, or for areas with unknown values. ";
//Carrying Capacity
const tt_carryingCapSelect = "Select \"fixed\" or \"scaled\" to set the distribution of carrying capacity across reef cells. Selecting \"fixed\" will set the same carrying capacity across all reef cells. Selecting \"scaled\" will vary the carrying capacity across all reef cells. ";
const tt_carryingCapMap = "Select map to use to scale carrying capacity (i.e., habitat grid or habitat quality). ";
const tt_carryingCapScaled = "Sets basis for scaling carrying capacity. Carrying capacity scaled to the habitat grid will" +
		" give higher values for larger reef areas, and lower values for smaller reef areas. Carrying capacity scaled to the habitat quality grid will give higher values for reefs with good status, and lower for reefs with poor status. "
const tt_carryingCapFixed = "Sets the same carrying capacity for all reef cells. Recommended for areas with unreliable map data, or for areas with unknown values. ";
//Turnover Rate
const tt_turnoverSelect = "Select either \"fixed\" fish population turnover rate, or estimated \"time to reach carrying capacity\". The application will calculate the turnover rate if the latter option is selected. ";
const tt_turnoverFixed = "Sets a fixed rate for the fish stock. Reduce the value if the connectivity data is available and used in the scenario run. ";
const tt_turnoverTime = "Automatically set the turnover rate based on the inputted number of years it takes to reach carrying capacity.";
//Survivorship
const tt_retentionSelect = "Select option for larvae survivorship based on the availability of connectivity data (none), full connectivity (all reefs are connected), or \"scaled\" based on a selected map.";
const tt_retentionScaledMap = "Select the map to use to scale the survivorship of larvae.";
const tt_retentionScaled = "The survivorship factor which is based on assumed spawning output, larval dispersal, settlement, post-settlement survival, and juvenile fish growth.";
const tt_retentionFixed = "Sets a fixed value for survivorship of fish larvae, and ignores spatial variation of the map.";
const tt_retentionNone = "Sets larvae survivorship to zero. Use this option if the connectivity data is unavailable or to disable it in the simulation.";
/**End of Biomass Tab**/

/** Start Fishing Tab **/
const tt_marineReserveMap = "Select \"none\" to set the benchmark for the effects of fishing activity on standing stock biomass or the marine reserve map for the simulation.";
const tt_fishingBehavior = "Select the fishing activity or behaviour in the simulation.  Select \"no fishing activity\" to set the benchmark. \"Uniform fishing\" refers to single compartment fishing mode. \"Closest fishing ground\" describes a behaviour wherein fishers are unable to travel long distances, and fish in 'good' reefs nearest to their dock. \"Random walk\" describes fishers that are able to travel longer distances to satisfy their catch quota. ";
const tt_uniformFishing = "Indicate the total biomass taken by all fishers as taken uniformly across the grid.";
const tt_cfgFisherCount = "Indicate the number of fishers for the scenario. Number may be hypothetical, or based on actual data.";
const tt_cfgCatchRate = "Defines the catch rate per fisher, which can be based on actual or scenario data. This rate is not strictly imposed, as fishers can satisfy their catch or go home empty-handed. ";
const tt_cfgFishRange = "Defines the distance limit of each fisher relative to their fishing dock. ";
const tt_rwFisherCount = "Indicate the number of fishers based on actual data or a hypothetical number for your scenario. ";
const tt_rwCatchQuota = "Defines the catch rate per fisher, which can be based on actual or scenario data. This rate is strictly imposed up to a certain extent, as fishers can travel for extended periods to satisfy their quota. ";
const tt_rwWalkThreshold = "Limits the number of attempts fishers can have to satisfy their catch. Fishers will be limited by their walk threshold if they have covered all possible reef cells with fishable biomass. ";
const tt_rawData = "Saves the raw data in .JSON format. This button will be activated when the session is paused or finished. ";
const tt_totalBioSummary = "Saves the total aggregated biomass for all reef cells per timestep. This button will be activated when the session is paused or finished. ";
const tt_totalCatchSummary = "Saves the total aggregated catch for all fishers per timestep. This button will be activated when the session is paused or finished. ";
const tt_finalBiomassPerCell = "Saves the biomass grid of the last time step.";
const tt_fisherPropertiesCsv = "CSV file that contains number of fishers, fishing docks, and biomass ratio, maximum threshold and fishing range for each individual fisher."

/** End of Fishing Tab **/
//Controls in the header
const tt_runModel = "Press to run when all the map data and parameters are loaded.";
const tt_pauseModel = "Press to pause model execution and review output data in the Map and Graphs tabs.";
const tt_resumeModel = "Press to resume model execution to finish the simulation.";
const tt_stopModel = "Press to stop model execution and reset all the loaded map data and parameters.";

// End of tooltip constants //

var timeBegan = null			
	, timeStopped = null			
	, stoppedDuration = 0			
	, started = null;			
				
function startTime() {			
	if (timeBegan === null) {			
		timeBegan = new Date();			
	}			
			
	if (timeStopped !== null) {			
		stoppedDuration += (new Date() - timeStopped);			
	}			
	console.log(stoppedDuration);			
			
	started = window.setInterval(clockRunningTime, 10);        			
}			
			
function stopTime() {			
	timeStopped = new Date();			
	window.clearInterval(started);			
}			
 			
function resetTime() {			
	 window.clearInterval(started);			
	stoppedDuration = 0;			
	timeBegan = null;			
	timeStopped = null;			
	document.getElementById("display-area").innerHTML = "00:00:00.000";			
}			
			
function clockRunningTime(){			
	var currentTime = new Date()			
	, timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)			
	, hour = timeElapsed.getUTCHours()			
	, min = timeElapsed.getUTCMinutes()			
	, sec = timeElapsed.getUTCSeconds()			
	, ms = timeElapsed.getUTCMilliseconds();			
			
    document.getElementById("display-area").innerHTML =			
        (hour > 9 ? hour : "0" + hour) + ":" +			
        (min > 9 ? min : "0" + min) + ":" +			
        (sec > 9 ? sec : "0" + sec) + "." +			
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);			
};
