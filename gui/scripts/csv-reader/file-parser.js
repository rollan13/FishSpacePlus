//global space variables
var BigInteger = require("big-integer");
var BigDecimal = require("bigdecimal");
var csv = require("fast-csv");
var lodash = require('lodash');

const path = require('path');

function parseConnectivityFiles(location, type) {
	console.log(type);
	var arr = [];
	var options = {
		"headers" : false
	}
	if(type == 'connectivityMetadata' || type == 'connectivityMetadataPelagic') {
		options.headers = true;
		readStartCount += 1;
		csv.fromPath(location, options)
		.on("data",
			function(data) {
				arr.push(data);
		})
		.on("end",
			function() {
				var csvFileHeaders = Object.getOwnPropertyNames(arr[0]);
				var res = [];
				var meta = {};
				if(type == 'connectivityMetadata' || type == 'connectivityMetadataPelagic') {
					// var isValidHeaders = checkHeaders(csvFileHeaders, fileHeaders[type]);
					// console.log("header check " + isValidHeaders);		
					//if(!isValidHeaders) return false;
					for (var i = 0; i < arr.length; i++) {
						meta = {};
						meta.x_pos = parseInt(arr[i]['XPOS']);
						meta.y_pos = parseInt(arr[i]['YPOS']);
						meta.index = parseInt(arr[i]['INDEX']);
						res.push(meta);
					}
				}
				console.log("created model arrays of " + type)
				fileSources[type] = res;
				console.log("read end " + type);
				removeLoader(type);
				clickConnectivityButton();
				clickConnectivityHabitatButton();
				clickConnectivityPelagicButton();
				clickConnectivityHabitatPelagicButton();
				readEndCount += 1;
		});
	} else {
		options.headers = false;
		readStartCount += 1;
		csv.fromPath(location, options)
		.on("data",
			function(data) {
				arr.push(data);
		})
		.on("end",
			function() {
				var csvFileHeaders = Object.getOwnPropertyNames(arr[0]);
				var res = [];
				for (var i = 0; i < arr.length; i++) {
					res.push(arr[i].map((a) => parseFloat(a)));
					
				}
				console.log("created model arrays of " + type);
				fileSources[type] = res;
				console.log("read end " + type);
				removeLoader(type);
				clickConnectivityButton();
				clickConnectivityHabitatButton();
				clickConnectivityPelagicButton();
				clickConnectivityHabitatPelagicButton();
				readEndCount += 1;
		});
	}
	
}

function firstLayerKeysToUpperCase(obj) {
	var output = {};
	for (i in obj) {
	   output[i.toUpperCase()] = obj[i];
	}
	return output;
}

function parseFile(location, type) {
	if( !(type == 'connectivityMetadata' || type == 'connectivityMatrix' || type == 'connectivityMetadataPelagic' || type == 'connectivityMatrixPelagic') && (type !== 'fisherProperties' && type !== 'reserveMetadata'))  {
		isReadingFile = true;
		var arr = [];
		var arbitraryBigDecimal = new BigDecimal.BigDecimal("1000000000000000000000");
		
		var options = {
			"headers" : true
		}
		
		readStartCount += 1;
		csv.fromPath(location, options)
			.on("data",
				function(data) {
					//bmab! standardize headers to uppercasetry {				
						data = firstLayerKeysToUpperCase(data);
						try {
						data["ABSOLUTE_SORT_VALUE"] = BigDecimal.BigDecimal(data.POINT_Y)
							.multiply(arbitraryBigDecimal).add(
									BigDecimal.BigDecimal(data.POINT_X)).multiply(
											arbitraryBigDecimal).valueOf().setScale(0)
											.toString();
						}	
						catch(err) {
							console.log("INVALID FILE" + err);
						}	
							arr.push(data);
			})
			.on("end",
				function() {
					fileSources[type].rowsArray = arr;
					var csvFileHeaders = Object.getOwnPropertyNames(arr[0]);
					var isValidHeaders = checkHeaders(csvFileHeaders, fileHeaders[type]);
					console.log("header check for " + type + " " + isValidHeaders);
					removeLoader(type);
					if(!isValidHeaders) {
						if(type == "habitatGrid"){
							alert("Habitat Grid Map File Invalid. Please verify if the following file headers are existing: ID, POINT_X, POINT_Y, " + REEF_COL +", "+ LAND_COL +", " + WATER_COL + " and " + DEPTH_COL);
						} else {
							alert("Map File Invalid. Please verify if the following file headers are existing: ID, POINT_X, POINT_Y.");
						}
						jqueryClearMapsInput(type);
						readStartCount -= 1;
						return false;
					}
					var maxDigitLength = arr[0]["ABSOLUTE_SORT_VALUE"].length;
					for(var i=0; i<arr.length; i++){
						if(maxDigitLength < arr[i]["ABSOLUTE_SORT_VALUE"].length)
							maxDigitLength =  arr[i]["ABSOLUTE_SORT_VALUE"].length;
					}
					var zeroChar = "0";
					for(var i=0; i<arr.length; i++){
						while(arr[i]["ABSOLUTE_SORT_VALUE"].length<maxDigitLength){
							arr[i]["ABSOLUTE_SORT_VALUE"] = zeroChar + arr[i]["ABSOLUTE_SORT_VALUE"];
						}
					}
					//READEND WILL BE PLACED AFTER THE CALLBACKS
					fileSources[type].headers = csvFileHeaders;
					//separate handling of habitat quality;
					if(type != "habitatQuality") {
						var sortedObj = sorter(arr, type, to2DArrays);
					} else {
						//fileSources[type].rowsArray = mergeHabitat(fileSources.habitatGrid.rowsArray, arr);
						//var sortedObj = sorter(mergeHabitat(fileSources.habitatGrid.rowsArray, arr), type, to2DArrays);
						mergeHabitat(fileSources.habitatGrid.rowsArray, arr);
			            clickConnectivityHabitatButton();
						clickConnectivityHabitatPelagicButton();
					}	
			});
		if (type == 'reserve'){
			fileSources.reserve.uploadStatus = true;
		}
		
	} else if (type == 'fisherProperties') {
		var options = {
			"headers" : true
		}
		var arr = [];
		readStartCount += 1;
		csv.fromPath(location, options)
		.on("data",
			function(data) {
				arr.push(data);
		})
		.on("end",
			function() {
				var csvFileHeaders = Object.getOwnPropertyNames(arr[0]);

			    var isValidHeaders = checkHeaders(csvFileHeaders, fileHeaders[type]);
			    console.log("header check " + isValidHeaders);		
				if(!isValidHeaders) {
					alert("Fisher Properties File Invalid. Please verify if the following file headers are existing: fisher_id, home_x, home_y, biomass1_maxratio, maxthreshold, fishing_range");
					return false
				}
				clearFileInput(type);
				for(var i = 0; i < arr.length; i++){
					formSources.fishingParam.fisherProperties.fisherId.push(arr[i].fisher_id);
					formSources.fishingParam.fisherProperties.biomassMaxRatio.push(arr[i].biomass1_maxratio);
					formSources.fishingParam.fisherProperties.homeX.push(arr[i].home_x);
					formSources.fishingParam.fisherProperties.homeY.push(arr[i].home_y);
					formSources.fishingParam.fisherProperties.maxThreshold.push(arr[i].maxthreshold);
					formSources.fishingParam.fisherProperties.fishingRange.push(arr[i].fishing_range);
				}
				removeLoader(type);
				readEndCount += 1;
		});
	} else if (type == 'reserveMetadata') {
		var options = {
				"headers" : true
			}
			var arr = [];
			readStartCount += 1;
			csv.fromPath(location, options)
			.on("data",
				function(data) {
					arr.push(data);
			})
			.on("end",
				function() {
					var csvFileHeaders = Object.getOwnPropertyNames(arr[0]);

				    var isValidHeaders = checkHeaders(csvFileHeaders, fileHeaders[type]);
				    console.log("header check " + isValidHeaders);		
					if(!isValidHeaders) {
						alert("Fisher Properties File Invalid. Please verify if the following file headers are existing: MPA_ID, MPA_NAME, START_CLOSE, END_CLOSE");
						return false
					}
					clearFileInput(type);
					for(var i = 0; i < arr.length; i++){
						marineReserveMetadata.mpa_id.push(arr[i].MPA_ID);
						marineReserveMetadata.mpa_name.push(arr[i].MPA_NAME);
						marineReserveMetadata.start_close.push(arr[i].START_CLOSE);
						marineReserveMetadata.end_close.push(arr[i].END_CLOSE);
					}
					removeLoader(type);
					readEndCount += 1;
			});
		} else {
		parseConnectivityFiles(location, type);
	}
}

function sorter(arr, type, callback) {
	var xDimension = 1;
	var x = 1;
	var y = 1;
	var yDimension = 1;
	var initialYdim = 1;
	
	arr.sort(compare);

	for(var i = 0; arr.length > i; i++){
		var previous = x - 1;
		if(typeof arr[x] != 'undefined'){
			if(!(arr[x].POINT_Y === arr[previous].POINT_Y)){
				xDimension++;
			}
		}
		x++;
	}
	
	while(arr[y].POINT_Y === arr[y - 1].POINT_Y){
		yDimension++;
		y++;
	}
	
	//property initialization of a global var
	//fileSources[type].sortedRows =  arr;
	fileSources[type].xDim = xDimension;
	fileSources[type].yDim = yDimension;

	isReadingFile = false;
	callback(arr, yDimension, type);
}

function createDynamicHeaders(type) {
	var headerListTemp = JSON.parse(JSON.stringify(fileSources[type].headers));
	var extraHeaders = ['FID','ABSOLUTE_SORT_VALUE', 'AREA_SQM'];
	for(var i = 0; i < fileHeaders[type].length; i++) {
		var index = headerListTemp.indexOf(fileHeaders[type][i]);
		if (index > -1) {
			headerListTemp.splice(index, 1);
		}
	}
	for(var i = 0; i < extraHeaders.length; i++) {
		var index = headerListTemp.indexOf(extraHeaders[i]);
		if (index > -1) {
			headerListTemp.splice(index, 1);
		}
	}
	//exceptions
	if(type =='habitatGrid') {
		headerListTemp.push(REEF_COL);
		headerListTemp.push(LAND_COL);
		headerListTemp.push(WATER_COL);
		headerListTemp.push(DEPTH_COL);
	}
	if(type =='reserve') {
		headerListTemp.push('MPA_ID');
		headerListTemp.push('MPA_AREA');
	}
	headersOf2dArrays[type] = JSON.parse(JSON.stringify(headerListTemp));
}

function arrayToUpperCase(inputArr) {
	for (var x = 0; x < inputArr.length; x++) {
		inputArr[x] = inputArr[x].toUpperCase();
	}
}


function to2DArrays(sortedRows, yDim, type) {
	var isInconsistentDimensions = false;
	createDynamicHeaders(type);
	var headerList = headersOf2dArrays[type];
	var innerArr = [];
	var twoDArray = [];
	var x = 0;
	try {
		for(index in headerList) {
			twoDArray = [];
			x = 0;
			while(x < sortedRows.length) {
				innerArr = [];
				for(var i = 0; i < yDim; i++, x++) {
					if(type != 'reserve') {
						innerArr.push(parseFloat(sortedRows[x][headerList[index]]));
					} else {
						innerArr.push(parseInt(sortedRows[x][headerList[index]]));
					}
				}
				twoDArray.push(innerArr);
			}
			console.log("created 2d array of "+ headerList[index])
			fileSources[type]["arrays2d"][headerList[index]] = twoDArray;
		}
	} catch(e) {
		console.log("inconsistent dimensions " + e);
		isInconsistentDimensions = true;
	}
	//for doneness Checking
	console.log("read end " + type);
	removeLoader(type);
	readAndTransformEnd(type, isInconsistentDimensions);
	readEndCount += 1;
}

function readAndTransformEnd(type, isInconsistentDimensions) {
	isInconsistentDimensions = checkDimensionConsistency(type, isInconsistentDimensions);
	if(!isInconsistentDimensions) {
		if(type == 'habitatGrid') {
			enableMapUpload();
			appendValuesForHabitatGrid();
		} else if(type == 'habitatQuality') {
			appendValuesForHabitatQuality();
		} else if(type == 'reserve') {
			appendValuesForReserve();
		}
	}
}

function checkDimensionConsistency(type, isInconsistentDimensions) {
	if(type != 'habitatGrid' && type != 'connectivityMetadata' && type != 'connectivityMatrix' && type != 'habitatQuality') {
		if( !(fileSources.habitatGrid.xDim == fileSources[type].xDim &&
		fileSources.habitatGrid.yDim == fileSources[type].yDim) ) {
			isInconsistentDimensions = true;
		} 
	}
	if(isInconsistentDimensions) {
		alert("Please upload a map file matching the dimensions of the Habitat Grid Map referenced.");
		jqueryClearMapsInput(type);
	} else {
		console.log('good dimensions ' + type);
	}

	return isInconsistentDimensions;
}

function checkHeaders(csvFileHeaders, validHeaders) {
	for(var i = 0; i < validHeaders.length; i++) {
		if( !(csvFileHeaders.includes(validHeaders[i])) ) {
			return false;
		}
	}
    return true;
}

function compare(a, b) {
	if (a.ABSOLUTE_SORT_VALUE < b.ABSOLUTE_SORT_VALUE)
		return -1;
	if (a.ABSOLUTE_SORT_VALUE > b.ABSOLUTE_SORT_VALUE)
		return 1;
	return 0;
}

function clearFileInput(type) {
	//type is from fileSources[type]
	fileSources[type] = {"arrays2d" : {}};
	if (! (type == 'connectivityMetadata' || type == 'connectivityMatrix') && (type !== 'fisherProperties' && type !== 'reserveMetadata' && type !== 'reserve')) {
		fileSources[type] = {"arrays2d" : {}};
	} else if (type == 'fisherProperties') {
		formSources.fishingParam.fisherProperties.biomassMaxRatio = [];
		formSources.fishingParam.fisherProperties.homeX = [];
		formSources.fishingParam.fisherProperties.homeY = [];
		formSources.fishingParam.fisherProperties.maxThreshold = [];
		formSources.fishingParam.fisherProperties.fishingRange = [];
		formSources.fishingParam.fisherProperties.fisherId = [];
	} else if (type == 'reserveMetadata') {
		marineReserveMetadata = {
				"mpa_id" : [],
				"mpa_name" : [],
				"start_close" : [],
				"end_close" : []
			};
	} else if (type == 'reserve') {
		fileSources.reserve = {"arrays2d" : {}, "uploadStatus" : false};
	} else {
		fileSources[type] = {};
	}
}

function jqueryClearMapsInput(currentTarget) {
	if (currentTarget == "habitatGrid") {
		$("#habitat-grid-upload").closest("div").children("div").children("input").val("");
		$("#habitat-grid-upload").val("");
		$("#habitat-grid").val("");
		clearAllUploadFields();
		disableMapUpload();
	} else if (currentTarget == "fisherDocks") {
		$("#fisher-docks-upload").closest("div").children("div").children("input").val("");
		$("#fisher-docks-upload").val("");
		$( "#fisher-docks" ).val("");
		clearFileInput(currentTarget);
	} else if (currentTarget == "reserve") {
		$("#mpa-upload").closest("div").children("div").children("input").val("");
		$("#mpa-upload").val("");
		$( "#marine-reserve" ).val("");
		clearFileInput(currentTarget);
	} else if (currentTarget == "reserveMetadata") {
		$("#mpa-upload-metadata").closest("div").children("div").children("input").val("");
		$("#mpa-upload-metadata").val("");
		$( "#marine-reserve-metadata" ).val("");
		clearFileInput(currentTarget);
	} else if (currentTarget == "connectivityMatrix") {
		$("#connectivity-matrix-upload").closest("div").children("div").children("input").val("");
		$("#connectivity-matrix-upload").val("");
		$( "#connectivity-matrix" ).val("");
		clearFileInput(currentTarget);
	} else if (currentTarget == "connectivityMetadata") {
		$("#connectivity-metadata-upload").closest("div").children("div").children("input").val("");
		$("#connectivity-metadata-upload").val("");
		$( "#connectivity-metadata" ).val( "" );
		clearFileInput(currentTarget);
	} else if (currentTarget == "connectivityMatrixPelagic") {
		$("#connectivity-matrix-upload-pelagic").closest("div").children("div").children("input").val("");
		$("#connectivity-matrix-upload-pelagic").val("");
		$( "#connectivity-matrix-pelagic" ).val("");
		clearFileInput(currentTarget);
	} else if (currentTarget == "connectivityMetadataPelagic") {
		$("#connectivity-metadata-upload-pelagic").closest("div").children("div").children("input").val("");
		$("#connectivity-metadata-upload-pelagic").val("");
		$( "#connectivity-metadata-pelagic" ).val( "" );
		clearFileInput(currentTarget);
	} else if (currentTarget == "habitatQuality") {
		$("#habitat-quality-upload").closest("div").children("div").children("input").val("");
		$("#habitat-quality-upload").val("");
		$( "#habitat-quality" ).val( "" );
		$('.maps-dropdown').empty();
		appendValuesForHabitatGrid();
		clearFileInput(currentTarget);
	}
}

function mergeHabitat(habitat_grid_JSON, habitat_quality_targetJSON) {

//recursive for safety without habitat_grid
var recall = false;
if(habitat_grid_JSON == undefined || habitat_quality_targetJSON == undefined) {
	recall = true;
} else {
	var missingIDs = [];
	var newHabitatGridArray = [];
	var habitatGridStringify = [];
	var habitatQualityStringify = [];
	var mergedObject = [];
	var habitatQualityNotPresentList = [];
	var arbitraryValue = 1;
	habitat_grid_JSON = JSON.parse(JSON.stringify(habitat_grid_JSON));

	function diffir (arri, a) {
		return arri.filter(function(i) {return a.indexOf(i) < 0;});
	};
	
	console.log(habitat_grid_JSON.length);
	for(var i = 0; i < habitat_grid_JSON.length ; i++){
		for(var j = 0; j < headersOf2dArrays.habitatQuality.length; j++) {
			oldHeaders = Object.getOwnPropertyNames(fileSources.habitatGrid.rowsArray[i]);
			for(var k = 0; k < oldHeaders.length; k++) {
				if( !(fileHeaders.habitatQuality.includes(oldHeaders[k]))) {
					delete habitat_grid_JSON[i][oldHeaders[k]];
				}
			}
			habitat_grid_JSON[i][headersOf2dArrays.habitatQuality[j]] = 0;
		}
		newHabitatGridArray.push(habitat_grid_JSON[i]);
	}
	console.log(habitatGridStringify.length);

	for(var i = 0; i < habitat_quality_targetJSON.length ; i++){
		for( var j = 0; j < headersOf2dArrays.habitatQuality.length; j++) {
			if(habitat_quality_targetJSON[i][j] == 'NaN'){
				habitat_quality_targetJSON[i][j] = arbitraryValue;
			}
		}
	}
	console.log("Habitat Quality" + habitat_quality_targetJSON.length);

	missingIDs = diffir(habitat_grid_JSON.map(a => a.ID), habitat_quality_targetJSON.map(a => a.ID));
	console.log("MISSING ID LENGTH: " + missingIDs.length);
	var aw = lodash.zipObject(newHabitatGridArray.map(a => a.ID), newHabitatGridArray);

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	var size = Object.size(aw);
	console.log(size);

	console.log(habitat_grid_JSON.length);
		console.log(Object.values(aw).length);
	for(var i = 0; i < missingIDs.length; i++){
		var key = missingIDs[i];
		habitatQualityNotPresentList.push(aw[key]);
	}
		mergedObject = habitatQualityNotPresentList.concat(habitat_quality_targetJSON);
		fileSources.habitatQuality.rowsArray = mergedObject;
		sortAnd2dGrid(fileSources.habitatQuality.rowsArray, 'habitatQuality');
		
	}
	if(recall == true) {
		console.log('recursive merging habitat quality');
		setTimeout(function(){ 
			mergeHabitat(fileSources.habitatGrid.rowsArray, fileSources.habitatQuality.rowsArray);
		}, 400);
	}

	function sortAnd2dGrid(grid, type) {
		grid.sort(compare);
		to2DArrays(grid, fileSources.habitatGrid.yDim, type);
	}
}//end of code


