function habitatQualityFactoring(type, selection, value) {
	var unitFactor = 0.01;
    //var reef = Object.assign([] ,fileSources.habitatGrid.arrays2d[REEF_COL]);
    var reef = JSON.parse(JSON.stringify(fileSources.habitatGrid.arrays2d[REEF_COL]));
    if(type.toLowerCase() == 'scaled') {
        if(selection.toUpperCase() == REEF_COL) {
            for(var x = 0; x < reef.length; x++ ) {
                for(var y = 0; y < (reef[x].length); y++) {
                    reef[x][y] = reef[x][y] * value;
                }
            }
        } else {
            var matrixFactor = fileSources.habitatQuality.arrays2d[selection];
            for(var x = 0; x < reef.length; x++ ) {
                for(var y = 0; y < (reef[x].length); y++) {
                    reef[x][y] = ( (reef[x][y] * matrixFactor[x][y]) * value ) * unitFactor ;
                }
            }
        }
    } else if (type.toLowerCase() == 'fixed') {
        for (var x = 0; x < reef.length; x++ ) {
            for (var y = 0; y < (reef[x].length); y++) {
                if (reef[x][y] > 0) reef[x][y] = 1.0 * value;
            }
        }
    } else {
        for(var x = 0; x < reef.length; x++ ) {
            for(var y = 0; y < (reef[x].length); y++) {
                reef[x][y] = reef[x][y] * value;
            }
        }
    }
    return reef;
}

function habitatQualityFactoringRetention(type, selection, value) { // TODO: SHOULD NOT INCLUDE REEF VALUES HERE [26Oct2018]
	var unitFactor = 0.01;
    //var reef = Object.assign([] ,fileSources.habitatGrid.arrays2d[REEF_COL]);
    var retention_val = JSON.parse(JSON.stringify(fileSources.habitatGrid.arrays2d[REEF_COL]));
    if(type.toLowerCase() == 'scaled') {
        console.log(selection);
        for (i in fileSources.habitatQuality.arrays2d[selection]) {
            console.log(fileSources.habitatQuality.arrays2d[selection][i]);
        }
        console.log("###############");

        var matrixFactor = fileSources.habitatQuality.arrays2d[selection];
        for(var x = 0; x < retention_val.length; x++ ) {
            for(var y = 0; y < (retention_val[x].length); y++) {
                retention_val[x][y] = ( (matrixFactor[x][y]) * value ) * unitFactor ;
                // if (matrixFactor[x][y] > 0){
                //     console.log("(" + x + "," + y + "," + matrixFactor[x][y] + "),");
                // }
            }
        }
    } else if (type.toLowerCase() == 'fixed') {
        for (var x = 0; x < retention_val.length; x++ ) {
            for (var y = 0; y < (retention_val[x].length); y++) {
                // If reef exists in the cell 
                if (retention_val[x][y] > 0) retention_val[x][y] = 1.0 * value;
            }
        }
    } else {
        for(var x = 0; x < retention_val.length; x++ ) {
            for(var y = 0; y < (retention_val[x].length); y++) {
                retention_val[x][y] = 0;
            }
        }
    }
    return retention_val;
}

function habitatQualityFactoringPelagic(type, selection, value) {
    var unitFactor = 0.01;
    //var reef = Object.assign([] ,fileSources.habitatGrid.arrays2d[REEF_COL]);
    var reef = JSON.parse(JSON.stringify(fileSources.habitatGrid.arrays2d[REEF_COL]));
    if (type.toLowerCase() == 'scaled') {
        if (selection.toUpperCase() == REEF_COL) {
            for (var x = 0; x < reef.length; x++) {
                for (var y = 0; y < (reef[x].length) ; y++) {
                    reef[x][y] = reef[x][y] * value;
                }
            }
        } else {
            var matrixFactor = fileSources.habitatQuality.arrays2d[selection];
            for (var x = 0; x < reef.length; x++) {
                for (var y = 0; y < (reef[x].length) ; y++) {
                    reef[x][y] = ((reef[x][y] * matrixFactor[x][y]) * value) * unitFactor;
                }
            }
        }
    } else if (type.toLowerCase() == 'fixed') {
        for (var x = 0; x < reef.length; x++) {
            for (var y = 0; y < (reef[x].length) ; y++) {
                if (reef[x][y] > 0) reef[x][y] = 1.0 * value;
            }
        }
    } else {
        for (var x = 0; x < reef.length; x++) {
            for (var y = 0; y < (reef[x].length) ; y++) {
                reef[x][y] = reef[x][y] * value;
            }
        }
    }
    return reef;
}

function habitatQualityFactoringRetentionPelagic(type, selection, value) { // TODO: SHOULD NOT INCLUDE REEF VALUES HERE [26Oct2018]
    var unitFactor = 0.01;
    //var reef = Object.assign([] ,fileSources.habitatGrid.arrays2d[REEF_COL]);
    var retention_val = JSON.parse(JSON.stringify(fileSources.habitatGrid.arrays2d[REEF_COL]));
    if (type.toLowerCase() == 'scaled') {
        console.log(selection);
        for (i in fileSources.habitatQuality.arrays2d[selection]) {
            console.log(fileSources.habitatQuality.arrays2d[selection][i]);
        }
        console.log("###############");

        var matrixFactor = fileSources.habitatQuality.arrays2d[selection];
        for (var x = 0; x < retention_val.length; x++) {
            for (var y = 0; y < (retention_val[x].length) ; y++) {
                retention_val[x][y] = ((matrixFactor[x][y]) * value) * unitFactor;
                // if (matrixFactor[x][y] > 0){
                //     console.log("(" + x + "," + y + "," + matrixFactor[x][y] + "),");
                // }
            }
        }
    } else if (type.toLowerCase() == 'fixed') {
        for (var x = 0; x < retention_val.length; x++) {
            for (var y = 0; y < (retention_val[x].length) ; y++) {
                // If reef exists in the cell 
                if (retention_val[x][y] > 0) retention_val[x][y] = 1.0 * value;
            }
        }
    } else {
        for (var x = 0; x < retention_val.length; x++) {
            for (var y = 0; y < (retention_val[x].length) ; y++) {
                retention_val[x][y] = 0;
            }
        }
    }
    return retention_val;
}

function translateNonZeros(grid, value) {
    for(var x = 0; x < grid.length; x++) {
        for(var y = 0; y < grid[x].length; y++) {
            if(grid[x][y] > 0) {
                grid[x][y] = value;
            }
        }
    }
    return grid;
}

function calculateGrowthRate(type, value) {
    if(type.toLowerCase() == 'fixed') {
        return value;
    } else {
        var totalCarry = sum2dArray(modelInput.carrying_capacity);
        var totalInitial = sum2dArray(modelInput.initial_biomass);
        var turnover_rate = 
        (1 / value) * 
        (Math.log((totalCarry - totalInitial) / totalInitial) - Math.log(1 - (0.9 / 1)));
        console.log(turnover_rate + " = carrying capacity turnover rate");
        if(isNaN(turnover_rate) || turnover_rate === undefined) {
         turnover_rate = 0;
        }
        return turnover_rate;
    }
}

function createSeasonalClosureMatrix() {
	
	var seasonalClosureMatrix= [];
	
	if(formSources.reserve.type == undefined || formSources.reserve.type.toUpperCase() == 'NO_RESERVE'){
		
		seasonalClosureMatrix= [];
		
	} else {
		
		var mpaIDArray = marineReserveMetadata.mpa_id;
		var startCloseArray = marineReserveMetadata.start_close;
		var endCloseArray = marineReserveMetadata.end_close;
		
		for (var i = 0; fileSources.reserve.arrays2d[formSources.reserve.type].length > i; i++) {
			var seasonalClosureArray = [];
			for (var j = 0; fileSources.reserve.arrays2d[formSources.reserve.type][i].length > j; j++) {
				var closureLength = [];
				var getId = mpaIDArray.indexOf(fileSources.reserve.arrays2d["MPA_ID"][i][j].toString());
				if(getId === -1){
					closureLength.push("0");
					closureLength.push("0");
				} else {
					closureLength.push(startCloseArray[getId]);
					closureLength.push(endCloseArray[getId]);
				}
				seasonalClosureArray.push(closureLength);
			}
			seasonalClosureMatrix.push(seasonalClosureArray);
		}
		//console.log(seasonalClosureMatrix);
	}
	return seasonalClosureMatrix;
}

function prepareModelParams(callback) {
    
	var iBfloat = parseFloat(formSources.initialBiomass.value);
	var finalIB = (iBfloat / 1000);
	
	var ccFloat = parseFloat(formSources.carryingCapacity.value);
	var finalCC = (ccFloat / 1000);
	
    modelInput.initial_biomass = habitatQualityFactoring(formSources.initialBiomass.type, 
        formSources.initialBiomass.map, formSources.initialBiomass.value);
    modelInput.carrying_capacity = habitatQualityFactoring(formSources.carryingCapacity.type, 
        formSources.carryingCapacity.map, formSources.carryingCapacity.value);
    modelInput.geog_mask = translateNonZeros(fileSources.habitatGrid.arrays2d[LAND_COL], 1);
    modelInput.depth_grid = fileSources.habitatGrid.arrays2d[DEPTH_COL];
    try {
        modelInput.protection_mask = fileSources.reserve.arrays2d[formSources.reserve.type];
    } catch(e) {
        console.log("no reserve input will use zero grid");
    }
    modelInput.retention = habitatQualityFactoringRetention(formSources.connectivity.type, 
        formSources.connectivity.map, formSources.connectivity.value);

    modelInput.spillover_rate = formSources.spilloverRate.value;
    modelInput.growth_rate = calculateGrowthRate(formSources.growthRate.type, formSources.growthRate.value);
    modelInput.fecundity = formSources.fecundity.value;
    modelInput.spillover_threshold = formSources.spilloverThreshold.value;
    modelInput.recruitment_rate = formSources.recruitmentRate.value;

	//Pelagic Fish inputs
	modelInput.initial_biomass2 = habitatQualityFactoring(formSources.initialBiomassPelagic.type, 
        formSources.initialBiomassPelagic.map, formSources.initialBiomassPelagic.value);
    modelInput.carrying_capacity2 = habitatQualityFactoring(formSources.carryingCapacityPelagic.type, 
        formSources.carryingCapacityPelagic.map, formSources.carryingCapacityPelagic.value);
    modelInput.retention2 = habitatQualityFactoringRetention(formSources.connectivityPelagic.type, 
        formSources.connectivityPelagic.map, formSources.connectivityPelagic.value);

    modelInput.spillover_rate2 = formSources.spilloverRatePelagic.value;
    modelInput.growth_rate2 = calculateGrowthRate(formSources.growthRate.type, formSources.growthRatePelagic.value);
    modelInput.fecundity2 = formSources.fecundityPelagic.value;
    modelInput.spillover_threshold2 = formSources.spilloverThresholdPelagic.value;
    modelInput.recruitment_rate2 = formSources.recruitmentRatePelagic.value;
    modelInput.seasonal_closure_matrix = createSeasonalClosureMatrix();
	
    formConnectivities();
    // modelInput.connectivity_matrix = fileSources.connectivityMatrix;
    // modelInput.metadata = fileSources.connectivityMetadata;
    addBlankDefaults();
    //Can include in shim as callback to avoid possible error since shim should be done before flagging
    areModelParamsReady = true;
    callback();
}

function addBlankDefaults() {
    if(formSources.reserve.type == undefined) formSources.reserve.type = 'no_reserve';
    var xDim = fileSources.habitatGrid.xDim;
    var yDim = fileSources.habitatGrid.yDim;
    // if( checkIsEmpty(fileSources.reserve.arrays2d) ) {
    //     (console.log('processing.. no reserve map uploaded..'));
    //     fileSources.reserve.arrays2d[formSources.reserve.type] = {};
    //     fileSources.reserve.arrays2d[formSources.reserve.type] = createZeroedGrid(xDim, yDim);
    //     console.log('done creating zero grid default for reserve');
    // }
    fileSources.reserve.arrays2d['no_reserve'] = createZeroedGrid(xDim, yDim);
    if(modelInput.initial_biomass == undefined) modelInput.initial_biomass = createZeroedGrid(xDim, yDim);
    if(modelInput.carrying_capacity == undefined) modelInput.carrying_capacity = createZeroedGrid(xDim, yDim);
 	if(modelInput.initial_biomass2 == undefined) modelInput.initial_biomass = createZeroedGrid(xDim, yDim);
    if(modelInput.carrying_capacity2 == undefined) modelInput.carrying_capacity = createZeroedGrid(xDim, yDim);
    //if(modelInput.geog_mask == undefined) modelInput.geog_mask = createZeroedGrid(xDim, yDim);
    if(modelInput.protection_mask == undefined) modelInput.protection_mask = createZeroedGrid(xDim, yDim);
    if(modelInput.retention == undefined) modelInput.retention = createZeroedGrid(xDim, yDim);
    if(checkIsEmpty(modelInput.metadata)) modelInput.metadata = zeroMetadata();
    if(checkIsEmpty(modelInput.connectivity_matrix)) modelInput.connectivity_matrix = zeroMatrix();
    if(checkIsEmpty(modelInput.metadata2)) modelInput.metadata2 = zeroMetadata();
    if(checkIsEmpty(modelInput.connectivity_matrix2)) modelInput.connectivity_matrix2 = zeroMatrix();
}
function zeroMetadata() {
    
    var meta = [{'x_pos' : 0,
        'y_pos' : 0,
        'index' : 0
    }];
    return meta;
}

function zeroMatrix() {
    var matrix = [[0]];
    return matrix;
}

function checkIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function createZeroedGrid(xDim, yDim) {
    var innerArr = [];
    var twoDArray = [];
    x = 0;
    while(x < xDim) {
        innerArr = [];
        for(var i = 0; i < yDim; i++) {
            innerArr.push(0);
        }
        x++;
        twoDArray.push(innerArr);
    }
    return twoDArray;
}

function sum2dArray(arr) {
    var sum = 0;
    for(var x = 0; x < arr.length; x++) {
        for(var y = 0; y < arr[x].length; y++) {
            sum += arr[x][y];
        }
    }
    return sum;
}

function formConnectivities() {
    
    if(formSources.connectivity.type == 'no_connectivity') {
        modelInput.metadata = {};
        modelInput.connectivity_matrix = {};
    } else if(formSources.connectivity.type == 'full_connectivity') {
        modelInput.connectivity_matrix = translateNonZeros(fileSources.connectivityMatrix, 1/fileSources.connectivityMatrix.length);
    } else {
        modelInput.connectivity_matrix = fileSources.connectivityMatrix;
        modelInput.metadata = fileSources.connectivityMetadata;
    }

	//Pelagic Fish
	if(formSources.connectivityPelagic.type == 'no_connectivity') {
        modelInput.metadata2 = {};
        modelInput.connectivity_matrix = {};
    } else if(formSources.connectivityPelagic.type == 'full_connectivity') {
        modelInput.connectivity_matrix2 = translateNonZeros(fileSources.connectivityMatrixPelagic, 1/fileSources.connectivityMatrixPelagic.length);
    } else {
        modelInput.connectivity_matrix2 = fileSources.connectivityMatrixPelagic;
        modelInput.metadata2 = fileSources.connectivityMetadataPelagic;
    }
}

//samplePOD is fisher docks, pair is from the front
function fetchCoords(samplePod, pairCount) {

    var xpos = [];
    var ypos = [];
    var freq = [];

    for (i = 0; i < samplePod.length; i++) {
        for (j = 0; j < samplePod[i].length; j++) {
            if (samplePod[i][j] > 0){
                freq.push(samplePod[i][j]);
                xpos.push(i);
                ypos.push(j);
            }
        }
    }
    // See implementation of cumsum sample here:
    // https://stackoverflow.com/questions/41654006/numpy-random-choice-in-javascript
    // draw from a uniform distribution, then subtract until the drawn number
    // reaches zero. This performs sampling to the CDF.
    var drawnCoords = [];
    var cumfreq = [];
    var maxValue = freq.reduce((a,b,i) => { return cumfreq[i] = a + b; }, 0);
    for (fisher = 0; fisher < pairCount; fisher++) {
        var drawn = Math.random() * maxValue;
        var draw_idx = cumfreq.findIndex((x) => drawn - x < 0);	
        drawnCoords.push([xpos[draw_idx], ypos[draw_idx]]);
        // the position for the current fisher 
    }
    return drawCoords;
}

function addFisherParams(pod2dArray, fisherCount) {
    var coordSet = fetchCoords(pod2dArray, fisherCount);
    for (i = 0; i < coordSet.length; i++){
        instance.add_fisher(type, catchThreshold, coordSet[i][0], coordSet[i][1]);
    }
}