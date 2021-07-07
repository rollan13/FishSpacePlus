var fs = require('fs');
var moment = require('moment');
var mkdirp = require('mkdirp');

const {dialog} = require('electron').remote;


// Change the content of the file as you want
// or either set fileContent to null to create an empty
function checkIfFolderExists(directory, callback) {  
	  fs.stat(directory, function(err, stats) {
	    //Check if error defined and the error code is "not exists"
	    if (err && err.errno === 34) {
	      //Create the directory, call the callback.
	      fs.mkdir(directory, callback);
	    } else {
	      callback(err)
	    }
	  });
}


function onClickRawData() {
	console.log("Raw Data");
	var fileContent = JSON.stringify(rawOutput);
	var fileOptions = {
		  filters: [
		    {name: 'JavaScript Object Notation', extensions: ['json']},
		    {name: 'All Files', extensions: ['*']}
		  ]
	};
	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, fileContent);
}

function saveOutputFileAction(fileOptions, fileContent){
	 dialog.showSaveDialog(fileOptions, function (fileName) {

		 if (fileName === undefined){
		        console.log("You didn't save the file");
		        $('#raw-data-btn').prop("disabled", false);
    				$('#total-biomass-btn').prop("disabled", false);
    				$('#fisher-summary-btn').prop("disabled", false);
    				$('#bpc-btn').prop("disabled",false);
    				$('#bpt-btn').prop("disabled",false);
    				$('#fcpt-btn').prop("disabled",false);
		        return;
		    }

		    // fileName is a string that contains the path and filename created in the save file dialog.  
		    fs.writeFile(fileName, fileContent, (err) => {
		        if(err){
		            alert("An error ocurred creating the file "+ err.message);
		            $('#raw-data-btn').prop("disabled", false);
		    			$('#total-biomass-btn').prop("disabled", false);
		    			$('#fisher-summary-btn').prop("disabled", false);
		    			$('#bpc-btn').prop("disabled",false);
		    			$('#bpt-btn').prop("disabled",false);
		    			$('#fcpt-btn').prop("disabled",false);
		        }
		                    
		        alert("The file has been succesfully saved");
		        $('#raw-data-btn').prop("disabled", false);
		    		$('#total-biomass-btn').prop("disabled", false);
		    		$('#fisher-summary-btn').prop("disabled", false);
		    		$('#bpc-btn').prop("disabled",false);
		    		$('#bpt-btn').prop("disabled",false);
		    		$('#fcpt-btn').prop("disabled",false);
		    });

	  }); 
}

function onClickTotalBiomass() {
	var totalBiomassCSVHeaders = "";
	var totalBiomassArray = [];
	var fileOptions = {
			  filters: [
			    {name: 'CSV File', extensions: ['csv']},
			    {name: 'All Files', extensions: ['*']}
			  ]
	};

	for(var i = 0; i < rawOutput.model.length; i++){
		var biomassInstanceObject = {};
		
		if(i > 1){
			biomassInstanceObject["current_time"] = rawOutput.model[i].current_time - 1;
			biomassInstanceObject["total_biomass"] = rawOutput.model[i].total_biomass / 1000.0; // in MT
			biomassInstanceObject["reserve_biomass"] = rawOutput.model[i].biomass_inside / 1000.0; // in MT
			biomassInstanceObject["nonreserve_biomass"] = non_reserve_bioMass[i-2];
			biomassInstanceObject["reserve_biomass_area"] = reserveBiomass_perArea[i-2];
			biomassInstanceObject["non_reserve_biomass_area"] = non_reserve_data_perArea[i-2];
			totalBiomassArray.push(biomassInstanceObject);
		}
	}

	var headers = Object.keys(totalBiomassArray[0])+"\n";
	var stringBuilder = "";

	for(var i = 0; i < totalBiomassArray.length; i++){
		stringBuilder += totalBiomassArray[i].current_time+","+totalBiomassArray[i].total_biomass+","+totalBiomassArray[i].reserve_biomass+","+
		totalBiomassArray[i].nonreserve_biomass+","+totalBiomassArray[i].reserve_biomass_area+","+totalBiomassArray[i].non_reserve_biomass_area+"\n";
	}
	var totalBiomassCSV = headers + stringBuilder;

	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, totalBiomassCSV);

}

function onClickFisherSummary() {
	var totalBiomassArray = [];
	var fileOptions = {
			  filters: [
			    {name: 'CSV File', extensions: ['csv']},
			    {name: 'All Files', extensions: ['*']}
			  ]
	};
	var headers = "timestep,total_fisher_catch\n";
	var stringBuilder = "";

	for(var i = 0; i < totalCatchDataset.length; i++){
		stringBuilder += (i+1)+","+totalCatchDataset[i]+"\n";
	}
	var totalFisherCatchCSV = headers + stringBuilder;

	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, totalFisherCatchCSV);
}

function onClickFinalBiomassPerCell() {
	var fileOptions = {
			  filters: [
			    {name: 'CSV File', extensions: ['csv']},
			    {name: 'All Files', extensions: ['*']}
			  ]
	};
	var stringBuilder = "";
	
	for(var i = 0; i < fileSources.habitatGrid.xDim; i++){
		stringBuilder += rawOutput.model[rawOutput.model.length - 1].biomass_grid[i].join()+"\n";
	}
	
	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, stringBuilder);
}

function onClickBiomassPerTimeStep() {
	var fileOptions = {
			filters: [
				{name: 'CSV File', extensions: ['csv']},
				{name: 'All Files', extensions: ['*']}
			]
	};
	var stringBuilder = ",";
	
	//Timestep headers
	for(var i = 0; i < formSources.lengthOfRun - 2; i++){
		stringBuilder += "t"+(i+1)+",";
	}
	stringBuilder += "\n";
	
	var coordX = 0;
	//Timestep contents
	for(var i = 0; i < fileSources.habitatGrid.xDim; i++){
		var coordY = 0;
		for(var k = 0; k < fileSources.habitatGrid.yDim; k++){
			stringBuilder += "["+coordX+"|"+coordY+"]"+",";
			for(var j = 0; j < formSources.lengthOfRun - 2; j++){
				stringBuilder += rawOutput.model[j+2].biomass_grid[coordX][coordY]+",";
			}
			coordY++;
			stringBuilder += "\n";
		}
		coordX++;
	}
	
	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, stringBuilder);
}

function onClickFisherCatchPerTimestep() {
	var fileOptions = {
			filters: [
				{name: 'CSV File', extensions: ['csv']},
				{name: 'All Files', extensions: ['*']}
			]
	};
	var stringBuilder = ",";
	
	//Timestep headers
	for(var i = 0; i < formSources.lengthOfRun - 2; i++){
		stringBuilder += "t"+(i+1)+",";
	}
	stringBuilder += "\n";
	
	//Timestep contents
	for(var i = 0; i < parseInt(formSources.fishingParam.fisherCount); i++){
		stringBuilder += i+",";
		for(var j = 0; j < formSources.lengthOfRun - 2; j++){
			stringBuilder += rawOutput.model[j+2].fisher_catch[i]+",";
		}
		stringBuilder += "\n";
	}
	
	$('#raw-data-btn').prop("disabled", true);
	$('#total-biomass-btn').prop("disabled", true);
	$('#fisher-summary-btn').prop("disabled", true);
	$('#bpc-btn').prop("disabled",true);
	$('#bpt-btn').prop("disabled",true);
	$('#fcpt-btn').prop("disabled",true);
	saveOutputFileAction(fileOptions, stringBuilder);
}
