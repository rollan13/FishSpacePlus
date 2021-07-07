//####### Lib
//dom selectors for reusable components
var canWidth;
var canHeight;
var biomassCanvas;
var biomassContext;
var biomassImage;
var svgContainer;
var landContext;
var landContext2;
var reefContext;
var reefContext2;
var waterContext;
var waterContext2;
var mpaContext;
var fisherCanvas;
var fisherContext;
var rightCanvas;
var rightContext;
var leftCanvas;
var leftContext;
var recordCanvas;
var recordContext;
var timestepCanvas;
var timestepContext;
var tsvg;
var tdata;
//initialize container
var customBase = document.createElement('custom');
var custom = d3.select(customBase); 

//end dom selectors
function drawFlatGrid(ht, wd, grid, context, image, type) {
        console.log("drawing flat map " + type);
        for (var y = ht - 1,  l = 0; y > 0; --y) {
            for (var x = 0; x < wd ; ++x, l += 4) {
                if(grid[y][x] > 0 ) {
                    var c;
                    if(type == 'water') {
                        c = d3.rgb(255, 245, 238);
                    } else if(type == 'land') {
                        c = d3.rgb(0, 111, 101);
                    } else if(type == 'reef') {
                        c = d3.rgb(0, 0, 155);
                    } else if(type == 'mpa') {
                        c = d3.rgb(128, 0, 128);
                    }
                    image.data[l + 0] = c.r;
                    image.data[l + 1] = c.g;
                    image.data[l + 2] = c.b;
                    image.data[l + 3] = 255;
                }
            }
        }
    context.putImageData(image, 0, 0);
}

function changeMinMaxValues(min,max){
	$("#bio-min").text(min.toFixed(6));
	$("#bio-max").text(max.toFixed(6));
}

function drawHeatGrid(ht, wd, preciseGrid, context, image) {
    var tempGrid = JSON.parse(JSON.stringify(preciseGrid));
    var tempGrid2 = [];
    for(var i = 0; i < tempGrid.length; i++) {
        for(var j = 0; j < tempGrid[i].length; j++) {
            if(tempGrid[i][j] > 0) {
                tempGrid2.push(tempGrid[i][j]);
            }
        }
    }

    //var min = d3.min(preciseGrid, function(d) { return d3.min(d); });
    var min = 0;
    if (tempGrid2.length != 0) min = d3.min(tempGrid2);
    console.log(min + " biomass minimum");
    rawOutput.biomass_min[rawOutput.callCount - 1] = min;
    var max = d3.max(preciseGrid, function(d) { return d3.max(d); });
    console.log(max + " biomass maximum");
    rawOutput.biomass_max[rawOutput.callCount - 1] = max;
    var maxCarry = d3.max(modelInput.carrying_capacity, function(d) { return d3.max(d); });
     
    changeMinMaxValues(rawOutput.biomass_min[rawOutput.callCount - 1],rawOutput.biomass_max[rawOutput.callCount - 1]);
    var color = 
    d3.scaleLinear()
    .domain([maxCarry / 10, maxCarry / 4, maxCarry / 2, maxCarry * 3 / 4])
    .range(['#00009b', '#29baff', '#fee100', '#a91600']);
    console.log('drawing heat grid');
    try {
        for (var y = ht-1,  l = 0; y > 0; --y) {
            for (var x = 0; x < wd; ++x, l += 4) {
                if(preciseGrid[y][x] > 0 ) {
                    var c = d3.rgb(color(preciseGrid[y][x]));
                    image.data[l + 0] = c.r;
                    image.data[l + 1] = c.g;
                    image.data[l + 2] = c.b;
                    image.data[l + 3] = 255;
                } else {
                    var c = d3.rgb(color(preciseGrid[y][x]));
                    image.data[l + 0] = c.r;
                    image.data[l + 1] = c.g;
                    image.data[l + 2] = c.b;
                    image.data[l + 3] = 0;
                }
            }
        }
        context.putImageData(image, 0, 0);
    } catch(e) {
        console.log('error at drawHeatGridLoop ' + e);
        console.log(JSON.stringify(e));
    }
}

function drawVideoContainer() {
    leftContext.drawImage(document.getElementById("water-layer1"), 0, 0);
    leftContext.drawImage(document.getElementById("land-layer1"), 0, 0);
    leftContext.drawImage(document.getElementById("reef-layer1"), 0, 0);
    leftContext.drawImage(document.getElementById("mpa-layer"), 0, 0);
    leftContext.drawImage(document.getElementById("fisher-layer"), 0, 0);

    rightContext.drawImage(document.getElementById("water-layer2"), 0, 0);
    rightContext.drawImage(document.getElementById("land-layer2"), 0, 0);
    rightContext.drawImage(document.getElementById("reef-layer2"), 0, 0);
    rightContext.drawImage(document.getElementById("biomass-layer"), 0, 0);

    //recordContext.clearRect(0, canHeight, canWidth*2, 30);
    recordContext.clearRect(0, 0, canWidth*2, canHeight+30);
    recordContext.drawImage(document.getElementById("timestep-canvas"), 0, canHeight);
    recordContext.drawImage(document.getElementById("left-layered"), 0, 0);
    recordContext.drawImage(document.getElementById("right-layered"), canWidth, 0);
}

function drawTimestepImage() {
    timestepContext.clearRect(0, 0, canWidth*2, canHeight+30);
    var canvas = document.getElementById("timestep-canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFF5EE";
    ctx.fillRect(0, 0, canWidth*2, 30);
    ctx.font = "25px Arial";
    ctx.fillStyle = 'black';
    var number = "week #: " + rawOutput.callCount;
    ctx.fillText(number,5,25);
}

function databindFishers(data, catches, color, callback) {
    var totLength = data.length;
    var pData = [];
    var curLength;

    for(var x = 0; x < totLength; x++) {
        if(catches[x] != 0) {
            curLength = data[x].length;
            pData.push(data[x][curLength - 1]);
        }
    }

    var t = d3.transition()
    .duration(95)
    .ease(d3.easeLinear);

    var join = custom.selectAll('custom.rect').data(pData);
    var enterSel = join.enter()
    .append('custom')
    .attr('class', 'rect')
    .attr('x', function (d) { 
        return d[1]; 
    })
    .attr('y', function (d) { 
        return canHeight - d[0]; 
    })
    .attr('width', 0)
    .attr('height', 0);
    //join.merge(join).transition(t)
    join.merge(join)
    .attr("x", function (d) { 
        return d[1]; 
    })
    .attr("y", function (d) { 
        return canHeight - d[0]; 
    })
    .attr('width', 2)
    .attr('height', 2)
    .style('fillStyle', function(d) {
        var returnColor;
        returnColor = color 
        return returnColor;
    });
    join.exit()
        .attr('width', 0) 
        .attr('height', 0)
        .remove();
    callback();
}

function drawFishers() {

    fisherContext.clearRect(0, 0, canWidth, canHeight);

    // Draw each individual custom element with their properties.
    var elements = custom.selectAll('custom.rect');
    // Grab all elements you bound data to in the databind() function.
    elements.each(function(d,i) { // For each virtual/custom element...
        var node = d3.select(this); 
        // This is each individual element in the loop. 
        
        //fisherContext.fillStyle = node.attr('fillStyle'); 
        fisherContext.fillStyle="#FF0000";
        // Here you retrieve the colour from the individual in-memory node and set the fillStyle for the canvas paint
        
        //fisherContext.fillRect(30, 30, 5, 5);
        fisherContext.fillRect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));
        // Here you retrieve the position of the node and apply it to the fillRect context function which will fill and paint the square.
    }); // Loop through each element.
}


function plotCircles(svgContainer, data, color) {
    var t = d3.transition()
        .duration(95)
        .ease(d3.easeLinear);

    //process output json
    var totLength = data.length;
    var pData = [];
    var curLength;
    var con = [];
    
    //flatten 3d array to 2d array: changed to only consider last element in array
    for(var x = 0; x < totLength; x++) {
        curLength = data[x].length;
            pData.push(data[x][curLength - 1]);
    }
    //for testing
        //pData = data;
        //pData = mutate2dArray(pData);
    //end process output json
    var selection = svgContainer.selectAll('circle').data(pData);
    selection.enter()
        .append('circle')
        .attr('cx', function (d) { 
            return d[1]; 
        })
        .attr('cy', function (d) { 
            return canHeight - d[0]; 
        })
        .attr('r', 1 )
        .style('fill', function(d) {
            var returnColor;
            returnColor = color 
            return returnColor;
    }); 
    selection.merge(selection).transition(t)
        .attr('cx', function (d) { 
            return d[1]; 
        })
        .attr('cy', function (d) {
                return canHeight - d[0]; 
        })
        .attr('r', 1 )
        .style('fill', function(d) {
            var returnColor;
            returnColor = color 
            return returnColor;
        });
    selection.exit()
        .remove();
}

//####### Simulation of dynamic values for testing purposes

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
}

function mutate2dArray(arr) {
    for(var x= 0; x < arr.length; x++ ) {
        for(var y = 0; y < arr[x].length; y++) {
            arr[x][y] = arr[x][y] + getRandomIntInclusive(-4,4);
        }
    }
    console.log(JSON.stringify(arr));
    return arr;
}

function growGrid(grid) {
    wd = grid.length;
    ht = grid[0].length;
    for (var y = ht-1,  l = 0; y >= 0; --y) {
        for (var x = 0; x < wd; ++x, l += 4) {
            if(grid[y][x] > 0 && ((grid[y][x]+10) < 255)) {
                grid[y][x] = grid[y][x] + 10;
            } else if(grid[y][x+1] != undefined && grid[y][x+1] > 0 && ((grid[y][x]+10) < 255)) {
                grid[y][x] = grid[y][x] + 10;
                //grid[y+1][x] = grid[y][x] + 10;
                x++;
            } else if(grid[y][x-1] != undefined && grid[y][x-1] > 0 && ((grid[y][x]+10) < 255)) {
                grid[y][x] = grid[y][x] + 10;
                //grid[y+1][x] = grid[y][x] + 10;
                x++;
            }
        }
    }
    return grid;
}
//####### END data simulation

function updateProgressBarValue(percentage){
	var progressBar = document.getElementsByClassName("progress-bar")[0];
	progressBar.style.width = percentage + "%";
	//return percentage;
}

function plotTimestep() {
    if(play && areModelParamsReady && (rawOutput.callCount < formSources.lengthOfRun) ) {
        
        console.log("Previous timestep #" + rawOutput.callCount);
        try {
            callRunTimestep();
        } catch(e) {
            alert('Error in calling the next timestep please rerun');
            console.log("Error in running timestep " + e);
            return false;
        }
        console.log("New..... timestep #" + rawOutput.callCount);
        if(rawOutput.callCount < 3){
        	$("#current-ts").text("Preprocessing data");
        } else {
            $("#current-ts").text(rawOutput.callCount - 2);
        }
        setTimeout(function(){ 
            console.log("Redrawing maps and charts of new timestep: biomass, fishers");
            if(biomassContext != undefined) biomassContext.clearRect(0, 0, canWidth, canHeight);
            //to avoid undefined error on sudden stop/play = false;
            if(rawOutput.callCount != 0) {
                //grid = rawOutput.model[rawOutput.callCount - 1]["biomass_grid"];
                fishersb = rawOutput.model[rawOutput.callCount - 1]["fisher_locs"];
                var catchb = rawOutput.model[rawOutput.callCount - 1]["fisher_catch"];
                drawHeatGrid(canHeight, canWidth, rawOutput.model[rawOutput.callCount - 1]["biomass_grid"], biomassContext, biomassImage);
                 if(fishersb != undefined && fishersb[0] != undefined) {
                     if(fishersb[0].length > 0) {
                         //plotCircles(svgContainer, fishersb, '#5d191c');
                         try {
                             databindFishers(fishersb, catchb, '#5d191c', drawFishers);
                         } catch(e) {
                             console.log('error at plotTimestep databindFishers ' + e);
                             console.log(JSON.stringify(e));
                         }
                     }
                }
                
                drawTimestepImage();
                drawVideoContainer();
                
                var percentage = (rawOutput.callCount / formSources.lengthOfRun * 100);
                updateProgressBarValue(percentage);
                //Charts
                try {
                     getFisherDistance(rawOutput, rawOutput.callCount);                
                     calculateTotalBiomassData(rawOutput, fileSources.reserve.arrays2d[formSources.reserve.type], rawOutput.callCount, formSources.lengthOfRun);
                     getTotalcatchGraph(rawOutput, formSources.fishingParam.quota, formSources.lengthOfRun, rawOutput.callCount);
                     appendValuesForSummaryTable();
                }
                catch(e) {
                     console.log("Error encountered in processing the charts " + e);
                }

                $("#save-reexecution").prop('disabled', false);
                $("#save-reexecution").removeClass('disabled');

                if(rawOutput.callCount == formSources.lengthOfRun){
                	$("#biotres-fixed-txtbox").prop('disabled', false);
                    enableOutputButtons();
                    stopTime();
                    $("#reset-state-btn").click();
                }
            }
            plotTimestep();
        }, 0);
    }
}

function callRunTimestep() {
    curModel = instance.run_timestep();
    console.log(curModel.total_biomass);
    if(curModel != undefined) {
        rawOutput.callCount = rawOutput.callCount + 1;
        rawOutput["timeSteps"] = rawOutput.callCount - 2;
        rawOutput.model.push(curModel);
        console.log("runtimestep success!");
    } else {
        console.log("runtimestep failed");
    }
}

function replay(ts) {
    while(ts <= (rawOutput.callCount - 1)) {
        setTimeout(function(){ 
            console.log(rawOutput.model[ts]["biomass_grid"]);
            grid = rawOutput.model[ts]["biomass_grid"];
            fishersb = rawOutput.model[ts]["fisher_locs"];
            drawHeatGrid(canWidth, canHeight, grid, biomassContext, biomassImage);
            plotCircles(svgContainer, fishersb, '#5d191c');
            ts++;
            replay(ts);
        }, 400);
    }
}

function checkMinimumRunSatisfied() {
    //for refactor to areModelParamsReady in the next iteration
    return (fileSources.habitatGrid.arrays2d.hasOwnProperty(LAND_COL) &&
    fileSources.fisherDocks.arrays2d.hasOwnProperty(headersOf2dArrays.fisherDocks[0]) &&
    checkFileReadingComplete());
    
}

function checkFileReadingComplete() {
    var result = false;
    if(readStartCount == 0) {
        result = false;
    } else if(readStartCount == readEndCount) {
        result = true;
    }
    return result;
}

function clearModel() {
    instance = new model.FISHSpace();
    areModelParamsReady = false;
    rawOutput = {
        "callCount" : 0,
        "pausedTimestep" : 0,
        "model" : [],
        "biomass_min" : [],
        "biomass_max" : []
    };
    
    if(landContext != undefined) landContext.clearRect(0, 0, canWidth, canHeight);
    if(landContext2 != undefined) landContext2.clearRect(0, 0, canWidth, canHeight);
    if(reefContext != undefined) reefContext.clearRect(0, 0, canWidth, canHeight);
    if(reefContext2 != undefined) reefContext2.clearRect(0, 0, canWidth, canHeight);
    if(waterContext != undefined) waterContext.clearRect(0, 0, canWidth, canHeight);
    if(waterContext2 != undefined) waterContext2.clearRect(0, 0, canWidth, canHeight);
    if(mpaContext != undefined) mpaContext.clearRect(0, 0, canWidth, canHeight);
    if(biomassContext != undefined) biomassContext.clearRect(0, 0, canWidth, canHeight);
    if(svgContainer != undefined) svgContainer.remove();
    if(fisherContext != undefined) fisherContext.clearRect(0, 0, canWidth, canHeight);
    if(rightContext != undefined) rightContext.clearRect(0, 0, canWidth, canHeight);
    if(leftContext != undefined) leftContext.clearRect(0, 0, canWidth, canHeight);
    if(recordContext != undefined) recordContext.clearRect(0, 0, canWidth * 2, canHeight + 30);
    if(timestepContext != undefined) timestepContext.clearRect(0, 0, canWidth * 2, 30);
    
}

function arrayLessThan(array1, array2) {
    /*
    Compares the value between two arrays and checks if all cell values
    from array1 (left) is less than array2(right). Returns true if satisfied.
     */
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array1[i][j] > array2[i][j]) return false;
        }
    }

    return true;
}

function runModel() {
    submitForm();
    //if an existing simulation is just paused
    if(rawOutput.callCount > 0) {
        play = true;
        plotTimestep();
    } else {
        //var req1 = headersOf2dArrays.habitatGrid[0];
        var req2 = headersOf2dArrays.fisherDocks[0];
        if (fileSources.habitatGrid.arrays2d.hasOwnProperty(LAND_COL) &&
            fileSources.fisherDocks.arrays2d.hasOwnProperty(req2) &&
            checkFileReadingComplete() 
        ) {
            var invalidValues = false;
            var errorString = "";
            var errorMesArr = [];
            prepareModelParams(function() {
				//Demersal Validation Check
            	if(!arrayLessThan(modelInput.initial_biomass, modelInput.carrying_capacity) || (parseFloat(modelInput.spillover_threshold) > 1 || parseFloat(modelInput.fecundity) > 1 || parseFloat(modelInput.recruitment_rate) > 1 
                		|| parseFloat(modelInput.retention))){
                    invalidValues = true;
                if( !arrayLessThan(modelInput.initial_biomass, modelInput.carrying_capacity) ){
                    errorString += "Invalid values, carrying capacity grid has smaller values than initial biomass grid. ";
                }
                if(parseFloat(modelInput.spillover_threshold) > 1 || parseFloat(modelInput.fecundity) > 1 || parseFloat(modelInput.recruitment_rate) > 1 
                		|| parseFloat(modelInput.retention)){
                	if(parseFloat(modelInput.spillover_threshold) > 1){
                		errorMesArr.push("Spillover Threshold");
                	}
                	if(parseFloat(modelInput.fecundity) > 1){
                		errorMesArr.push("Fecundity");
                	}
                	if(parseFloat(modelInput.recruitment_rate) > 1){
                		errorMesArr.push("Recruitment Rate");
                	}
                	if(parseFloat(modelInput.retention) > 1){
                		console.log(modelInput.retention);
                		errorMesArr.push("Survivorship");
                	}
                	for(var i = 0; i<errorMesArr.length; i++){
                			if (i != errorMesArr.length - 1) {
                		      // build the new query
                				errorString += errorMesArr[i]+ ", "
                		    } else {
                		    	errorString += errorMesArr[i];
                		    }
                	}
                	errorString += " must not exceed 1.";
                }
                return false;
            }
			//Pelagic Validation Check
			if(!arrayLessThan(modelInput.initial_biomass2, modelInput.carrying_capacity2) || (parseFloat(modelInput.spillover_threshold2) > 1 || parseFloat(modelInput.fecundity2) > 1 || parseFloat(modelInput.recruitment_rate2) > 1 
                		|| parseFloat(modelInput.retention2))){
                    invalidValues = true;
                if( !arrayLessThan(modelInput.initial_biomass2, modelInput.carrying_capacity2) ){
                    errorString += "Invalid values, carrying capacity grid has smaller values than initial biomass grid. ";
                }
                if(parseFloat(modelInput.spillover_threshold2) > 1 || parseFloat(modelInput.fecundity2) > 1 || parseFloat(modelInput.recruitment_rate2) > 1 
                		|| parseFloat(modelInput.retention2)){
                	if(parseFloat(modelInput.spillover_threshold2) > 1){
                		errorMesArr.push("Spillover Threshold");
                	}
                	if(parseFloat(modelInput.fecundity2) > 1){
                		errorMesArr.push("Fecundity");
                	}
                	if(parseFloat(modelInput.recruitment_rate2) > 1){
                		errorMesArr.push("Recruitment Rate");
                	}
                	if(parseFloat(modelInput.retention2) > 1){
                		console.log(modelInput.retention2);
                		errorMesArr.push("Survivorship");
                	}
                	for(var i = 0; i<errorMesArr.length; i++){
                			if (i != errorMesArr.length - 1) {
                		      // build the new query
                				errorString += errorMesArr[i]+ ", "
                		    } else {
                		    	errorString += errorMesArr[i];
                		    }
                	}
                	errorString += " must not exceed 1.";
                }
                return false;
            }
                if(formSources.fishingParam.type != "no_fishing") {
                    addFisherSet();
                }
                try {
                    instance.shim(modelInput);
                } catch(e) {
                    console.log("Error in shimming model inputs");
                }
            });

            if(invalidValues) {
                //exit run model alert invalid
            	$("#reset-stop-btn").val(1);
            	console.log($("#reset-stop-btn").val());
                alert(errorString);
                
                return false;
            }
                
                //### PREPARE CANVAS
                var wdLand = fileSources.habitatGrid.arrays2d[REEF_COL].length;
                var htLand = fileSources.habitatGrid.arrays2d[REEF_COL][0].length;
                canWidth = htLand;
                canHeight = wdLand;

                var landCanvas = d3.select("#land-layer1")
                .attr("width",canWidth)
                .attr("height", canHeight);
            
                    landContext = landCanvas.node().getContext("2d"),
                    landImage = landContext.createImageData(canWidth, canHeight);
                    
                    fisherCanvas = d3.select("#fisher-layer")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    fisherContext = fisherCanvas.node().getContext("2d");
                    
                    reefCanvas = d3.select("#reef-layer1")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    reefContext = reefCanvas.node().getContext("2d"),
                    reefImage = reefContext.createImageData(canWidth, canHeight);
            
                    landCanvas2 = d3.select("#land-layer2")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    landContext2 = landCanvas2.node().getContext("2d"),
                    landImage2 = landContext2.createImageData(canWidth, canHeight);
            
                    reefCanvas2 = d3.select("#reef-layer2")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    reefContext2 = reefCanvas2.node().getContext("2d"),
                    reefImage2 = reefContext2.createImageData(canWidth, canHeight);
            
                    mpaCanvas = d3.select("#mpa-layer")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    mpaContext = mpaCanvas.node().getContext("2d"),
                    mpaImage = mpaContext.createImageData(canWidth, canHeight);
                    
                    waterCanvas = d3.select("#water-layer1")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    waterContext = waterCanvas.node().getContext("2d"),
                    waterImage = waterContext.createImageData(canWidth, canHeight);

                    waterCanvas2 = d3.select("#water-layer2")
                    .attr("width",canWidth)
                    .attr("height", canHeight),
                    waterContext2 = waterCanvas2.node().getContext("2d"),
                    waterImage2 = waterContext2.createImageData(canWidth, canHeight);
                    
                biomassCanvas = d3.select("#biomass-layer")
                    .attr("width", canWidth)
                    .attr("height", canHeight);
                    biomassContext = biomassCanvas.node().getContext("2d");
                    biomassImage = landContext.createImageData(canWidth, canHeight);
            
                svgContainer = d3.select("#fishingParent").append("svg")
                    .attr("width", canWidth)
                    .attr("height", canHeight)
                    .attr("z-index", 14)
                    .attr("class", "map-class");

                rightCanvas = d3.select("#right-layered")
                    .attr("width", canWidth)
                    .attr("height", canHeight);
                rightContext = rightCanvas.node().getContext("2d");
                
                leftCanvas = d3.select("#left-layered")
                    .attr("width", canWidth)
                    .attr("height", canHeight);
                leftContext = leftCanvas.node().getContext("2d");

                timestepCanvas = d3.select("#timestep-canvas")
                .attr("width", canWidth*2)
                .attr("height", 30);
                timestepContext = timestepCanvas.node().getContext("2d");

                recordCanvas = d3.select("#record-canvas")
                    .attr("width", canWidth*2)
                    .attr("height", canHeight + 30);
                recordContext = recordCanvas.node().getContext("2d");
                
                //always displayed
                var landg = fileSources.habitatGrid.arrays2d[LAND_COL];
                var reefg = fileSources.habitatGrid.arrays2d[REEF_COL];
                var waterg = fileSources.habitatGrid.arrays2d[WATER_COL];
                //var depthg = fileSources.habitatGrid.arrays2d[DEPTH_COL];
                
                //map selections
                var mpag = fileSources.reserve.arrays2d[formSources.reserve.type];

                drawFlatGrid(wdLand, htLand, waterg, waterContext, waterImage, 'water');
                drawFlatGrid(wdLand, htLand, waterg, waterContext2, waterImage2, 'water');

                drawFlatGrid(wdLand, htLand, landg, landContext, landImage, 'land');
                // drawFlatGrid(wdLand, htLand, reefg, reefContext, reefImage, 'reef');
                drawFlatGrid(wdLand, htLand, landg, landContext2, landImage2, 'land');
                drawFlatGrid(wdLand, htLand, reefg, reefContext2, reefImage2, 'reef');
                drawFlatGrid(wdLand, htLand, mpag, mpaContext, mpaImage, 'mpa');
                play = true;
                plotTimestep();
        } else {
            alert("parameters still processing or are incomplete");
        }
    }
}
//###### 
        
//#### START FISHER MAKER

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
	return drawnCoords;
}

function addFisherSet() {
	console.log("Adding fisher");
	console.log(formSources.fishingParam.type);
	console.log(formSources.fishingParam.quota);
	console.log(formSources.fishingParam.numArg);
	console.log(formSources.fishingParam.fisherCount);
	var coordSet = fetchCoords(fileSources.fisherDocks.arrays2d[headersOf2dArrays.fisherDocks[0]], formSources.fishingParam.fisherCount);
	console.log(coordSet);
    console.log(coordSet.length);

	//CURRENTLY UNUSED (add option for random docks in the future)
    var pointXArr = [];
    var pointYArr = [];
    for(var i = 0; i < coordSet.length; i++) {
        pointXArr.push(coordSet[i][0] );
        pointYArr.push(coordSet[i][1] );
    }

    var paramObj = {
        "arg0" : formSources.fishingParam.type,
        "arg1" : formSources.fishingParam.quota,
        "arg2" : formSources.fishingParam.fisherProperties.homeX,
        "arg3" : formSources.fishingParam.fisherProperties.homeY,
        "arg4" : formSources.fishingParam.fisherProperties.fishingRange,
        "arg5" : formSources.biomassThreshold.value,
		"arg6" : formSources.biomassThresholdPelagic.value,
		"arg7" : formSources.fishingParam.fisherProperties.biomassMaxRatio,
		"arg8" : formSources.fishingParam.fisherProperties.maxThreshold,
		"arg9" : formSources.fishingParam.fisherProperties.fisherId
    }

/* var paramObj = {
        "arg0" : formSources.fishingParam.type,
        "arg1" : formSources.fishingParam.quota,
        "arg2" : pointXArr,
        "arg3" : pointYArr,
        "arg4" : formSources.fishingParam.numArg, //for ClosestFisher this should be the travel range array [from fisher_properties.csv]
        "arg5" : formSources.biomassThreshold.value, //this is the minimum_fishable_ratio used by the C++ add_fisher() method
		"arg6" : formSources.biomass2Threshold.value, //add new argument or biomass2Threshold [for the minimum_fishable_ratio2 in the C++ add_fisher() method]
		"arg7" : biomass1_maxratio_perfisher, //array of maxratio (0 to 1) for biomass1 [from fisher_properties.csv]
		"arg8" : threshold_perfisher //array of max catch threshold [from fisher_properties.csv]
    }*/
    console.log("TEST THIS" + paramObj);
    setTimeout(function () {
        try {
            instance.add_fisher(paramObj);
        } catch(e) {
            console.log("Error in adding fishers " + e);
        }
    }, 50)
	console.log("Fishers added");
}
//#### END FISHER MAKER
