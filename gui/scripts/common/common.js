$(document).ready(function() {

	setTimeout(function(){ 
		$("#main-page").hide();
		$("#main-page").removeClass('hidden');	
		$("#welcome-page").fadeIn();
	}, 100);

	setTimeout(function(){ 
		$("#main-page").fadeIn();
		$("#welcome-page").hide();
		// FIXME: arbitrary pause to wait for assets to load.
		// Not sure where they got the number.
	}, 1000);

	disableOutputButtons();
	$("#save-reexecution").prop('disabled', true);
	$("#save-reexecution").addClass('disabled');
	$("#select-surv").prop('disabled', true);
	$("#select-survp").prop('disabled', true);
});

function isFileExtCSV(sFileName) {
	var validFileExtension = ".csv";
	var blnValid = false;
	if (sFileName.length > 0) {
		var sCurExtension = validFileExtension;
		if (sFileName.substr(sFileName.length - sCurExtension.length,
				sCurExtension.length).toLowerCase() == sCurExtension
				.toLowerCase()) {
			blnValid = true;
		}

		if (!blnValid) {
			
			alert("Please upload a .CSV format Map File");
			return false;
		}
	}
	return true;
}

function showUploadedFile(fileName, elem) {
	var isValid = isFileExtCSV(fileName);
	if (isValid) {
		$(elem).closest(".row").children(".maps-input").children("input").val(fileName);
	}
	return isValid;
}

//Header upload
function showHeaderUploadedFile(fileName, elem) {
	if (isFileExtCSV(fileName)) {
		console.log(fileName);
		$("#previous-upload-text").innerHTML = fileName;
	}
}

function appendValuesForHabitatQuality() {
	var habitatQualityList = headersOf2dArrays.habitatQuality;
	var elem = $(".maps-dropdown");
	var option = '';
	$.each(habitatQualityList, function(key, value) {
		elem.append($("<option></option>").attr("value", value).text(value));
	});
	$("#survivorship-scaled-dropdown-demersal option[value='REEF_AREA']").remove();
	$("#survivorship-scaled-dropdownp option[value='REEF_AREA']").remove();
}

function appendValuesForHabitatGrid() {
	var habitatGridList = [];
	var elem = $(".maps-dropdown");
	var option = '';
	
	//only one option from grid
	habitatGridList.push(REEF_COL);
	$.each(habitatGridList, function(key, value) {
		if (value.toUpperCase() == REEF_COL) {
			elem.append($("<option selected></option>")
					.attr("value", value).text(value));
		} else {
			elem.append($("<option></option>").attr("value", value).text(
					value));
		}
	});
}

function appendValuesForReserve() {
	var elem = $("#reserve-dropdown");
	//var reserveLength = $("#reserve-dropdown > option").length;
	var option = "";

	/*if (reserveLength < 2) {
		$.each(headersOf2dArrays.reserve, function(key, value) {
					.append($("<option></option>").attr("value", value).text(
							value));
		});
	}*/
	elem.append($("<option>With Reserve</option>").attr("value", "MPA_AREA").text(
			"With Reserve"));
}

function editNotesContent(elem) {
	var tooltip = "";
	var content = document.getElementById("tooltip-content");
	var guide = document.getElementById("tooltip-guide");

	if (elem == 0) {
		guide.classList.add("hidden");
	} else {
		if (elem == 2) {
			tooltip = tt_habitatGrid;
		} else if (elem == 3) {
			tooltip = tt_fisherDocks;
		} else if (elem == 4) {
			tooltip = tt_marineReserve;
		} else if (elem == 5) {
			tooltip = tt_connectivityMatrix;
		} else if (elem == 6) {
			tooltip = tt_connectivityMetadata;
		} else if (elem == 7) {
			tooltip = tt_habitatQuality;
		} else if (elem == 8) {
			tooltip = tt_initialBioSelect;
		} else if (elem == 9) {
			tooltip = tt_initialBioMap;
		} else if (elem == 10) {
			tooltip = tt_initialBioScaled;
		} else if (elem == 11) {
			tooltip = tt_initialBioFixed;
		} else if (elem == 12) {
			tooltip = tt_carryingCapSelect;
		} else if (elem == 13) {
			tooltip = tt_carryingCapMap;
		} else if (elem == 14) {
			tooltip = tt_carryingCapScaled;
		} else if (elem == 15) {
			tooltip = tt_carryingCapFixed;
		} else if (elem == 16) {
			tooltip = tt_turnoverSelect;
		} else if (elem == 17) {
			tooltip = tt_turnoverTime;
		} else if (elem == 18) {
			tooltip = tt_turnoverFixed;
		} else if (elem == 19) {
			tooltip = tt_retentionSelect;
		} else if (elem == 20) {
			tooltip = tt_retentionScaled;
		} else if (elem == 21) {
			tooltip = tt_retentionFixed;
		} else if (elem == 22) {
			tooltip = tt_retentionNone;
		} else if (elem == 23) {
			tooltip = tt_uniformFishing;
		} else if (elem == 24) {
			tooltip = tt_cfgFisherCount;
		} else if (elem == 25) {
			tooltip = tt_cfgCatchRate;
		} else if (elem == 26) {
			tooltip = tt_cfgFishRange;
		} else if (elem == 27) {
			tooltip = tt_rwFisherCount;
		} else if (elem == 28) {
			tooltip = tt_rwCatchQuota;
		} else if (elem == 29) {
			tooltip = tt_rwWalkThreshold;
		} else if (elem == 30) {
			tooltip = tt_rawData;
		} else if (elem == 31) {
			tooltip = tt_totalBioSummary;
		} else if (elem == 32) {
			tooltip = tt_totalCatchSummary;
		} else if (elem == 33) {
			tooltip = tt_runModel;
		} else if (elem == 34) {
			tooltip = tt_pauseModel;
		} else if (elem == 35) {
			tooltip = tt_resumeModel;
		} else if (elem == 36) {
			tooltip = tt_stopModel;
		} else if (elem == 37){
			tooltip = tt_retentionScaledMap;
		} else if (elem == 38){
			tooltip = tt_uploadFileBtn;
		} else if (elem == 39){
			tooltip = tt_removeFileBtn;
		} else if (elem == 40){
			tooltip = tt_marineReserveMap;
		} else if (elem == 41){
			tooltip = tt_fishingBehavior;
		} else if (elem == 42){
			tooltip = tt_finalBiomassPerCell;
		} else if (elem == 43){
			tooltip = tt_fisherPropertiesCsv;
		} else if (elem == 44){
			tooltip = tt_connectivityMatrixPelagic;
		} else if (elem == 45){
			tooltip = tt_connectivityMetadataPelagic;
		} else {
			tooltip = "";
		}

		content.innerHTML = tooltip;
		guide.classList.remove("hidden");
	}
}

function hideTool(elem) {
	var guide = document.getElementById("tooltip-guide")

	if (elem) {
		console.log("nothing happened");
	} else {
		guide.classList.add("hidden");
	}
}

function submitForm() {
	var formSourcesObject = {
		initialBiomass : {
		},
		carryingCapacity : {
		},
		growthRate : {
		},
		spilloverRate : {
		},
		connectivity : {
		},
		fecundity : {
		},
		spilloverThreshold : {
		},
		recruitmentRate : {
		},
		biomassThreshold : {
		},
		reserve : {
		},
		fishingParam : {
			fisherProperties: {}
		},
		lengthOfRun : {
			
		},
		initialBiomassPelagic : {
		},
		carryingCapacityPelagic : {
		},
		growthRatePelagic : {
		},
		spilloverRatePelagic : {
		},
		connectivityPelagic : {
		},
		fecundityPelagic : {
		},
		spilloverThresholdPelagic : {
		},
		recruitmentRatePelagic : {
		},
		biomassThresholdPelagic : {
		}
	};

	//Demersal Forms
	formSourcesObject.initialBiomass = initialBiomassForm();

	formSourcesObject.carryingCapacity = carryingCapacityForm();

	formSourcesObject.growthRate = turnoverRateForm();

	formSourcesObject.spilloverRate = spilloverRateForm();

	formSourcesObject.connectivity = retentionForm();

	formSourcesObject.fishingParam = fishingForm();
	
	formSourcesObject.fishingParam.fisherProperties = fisherPropertiesForm();
	
	formSourcesObject.spilloverThreshold = spilloverThresholdForm();
	
	formSourcesObject.biomassThreshold = biomassThresholdForm();
	
	formSourcesObject.fecundity = fecundityForm();
	
	formSourcesObject.recruitmentRate = recruitmentRateForm();
	//END OF DEMERSAL
	
	//Pelagic Forms
	formSourcesObject.initialBiomassPelagic = initialBiomassPelagicForm();

	formSourcesObject.carryingCapacityPelagic = carryingCapacityPelagicForm();

	formSourcesObject.growthRatePelagic = turnoverRatePelagicForm();

	formSourcesObject.spilloverRatePelagic = spilloverRatePelagicForm();

	formSourcesObject.connectivityPelagic = retentionPelagicForm();
	
	formSourcesObject.spilloverThresholdPelagic = spilloverThresholdPelagicForm();
	
	formSourcesObject.biomassThresholdPelagic = biomassThresholdPelagicForm();
	
	formSourcesObject.fecundityPelagic = fecundityPelagicForm();
	
	formSourcesObject.recruitmentRatePelagic = recruitmentRatePelagicForm();
	//END OF PELAGIC
	
	formSourcesObject.reserve.type = $("#reserve-dropdown").val();
	
	formSourcesObject.lengthOfRun = ($("#timestep-range").val() * 52) + 2;
	
	console.log(formSourcesObject);
	formSources = formSourcesObject;
	return formSourcesObject;
}

//Demersal Forms
function initialBiomassForm() {
	var initialBiomassFormArray = $('#initialBiomassForm').serializeArray();
	var returnInitialBiomassArray = {};

	for (var i = 0; i < initialBiomassFormArray.length; i++) {
		if (initialBiomassFormArray[i].value != undefined
				&& initialBiomassFormArray[i].value != "") {
			returnInitialBiomassArray[initialBiomassFormArray[i]['name']] = initialBiomassFormArray[i]['value'];
		}
	}

	return returnInitialBiomassArray;
}

function carryingCapacityForm() {
	var carryingCapacityFormArray = $('#carryingCapacityForm').serializeArray();
	var returnCarryingCapacityArray = {};

	for (var i = 0; i < carryingCapacityFormArray.length; i++) {
		if (carryingCapacityFormArray[i].value != undefined
				&& carryingCapacityFormArray[i].value != "") {
			returnCarryingCapacityArray[carryingCapacityFormArray[i]['name']] = carryingCapacityFormArray[i]['value'];
		}
	}

	return returnCarryingCapacityArray;
}

function turnoverRateForm() {
	var turnoverRateFormArray = $('#turnoverRateForm').serializeArray();
	var returnTurnoverRateArray = {};

	for (var i = 0; i < turnoverRateFormArray.length; i++) {
		if (turnoverRateFormArray[i].value != undefined
				&& turnoverRateFormArray[i].value != "") {
			returnTurnoverRateArray[turnoverRateFormArray[i]['name']] = turnoverRateFormArray[i]['value'];
		}
	}

	return returnTurnoverRateArray;
}

function spilloverRateForm() {
	var spilloverRateFormArray = $('#spilloverRateForm').serializeArray();
	var returnSpilloverRateArray = {};

	for (var i = 0; i < spilloverRateFormArray.length; i++) {
		if (spilloverRateFormArray[i].value != undefined
				&& spilloverRateFormArray[i].value != "") {
			returnSpilloverRateArray[spilloverRateFormArray[i]['name']] = spilloverRateFormArray[i]['value'];
		}
	}

	return returnSpilloverRateArray;
}

function biomassThresholdForm() {
	var biomassThresholdFormArray = $('#biomassThresholdForm').serializeArray();
	var returnBiomassThresholdArray = {};

	for (var i = 0; i < biomassThresholdFormArray.length; i++) {
		if (biomassThresholdFormArray[i].value != undefined
				&& biomassThresholdFormArray[i].value != "") {
			returnBiomassThresholdArray[biomassThresholdFormArray[i]['name']] = biomassThresholdFormArray[i]['value'];
		}
	}

	return returnBiomassThresholdArray;
}

function fecundityForm() {
	var fecundityFormArray = $('#fecundityForm').serializeArray();
	var returnFecundityArray = {};

	for (var i = 0; i < fecundityFormArray.length; i++) {
		if (fecundityFormArray[i].value != undefined
				&& fecundityFormArray[i].value != "") {
			returnFecundityArray[fecundityFormArray[i]['name']] = fecundityFormArray[i]['value'];
		}
	}

	return returnFecundityArray;
}

function spilloverThresholdForm() {
	var spilloverThresholdFormArray = $('#spilloverThresholdForm').serializeArray();
	var returnSpilloverThresholdArray = {};

	for (var i = 0; i < spilloverThresholdFormArray.length; i++) {
		if (spilloverThresholdFormArray[i].value != undefined
				&& spilloverThresholdFormArray[i].value != "") {
			returnSpilloverThresholdArray[spilloverThresholdFormArray[i]['name']] = spilloverThresholdFormArray[i]['value'];
		}
	}

	return returnSpilloverThresholdArray;
}

function recruitmentRateForm() {
	var recruitmentRateFormArray = $('#recruitmentRateForm').serializeArray();
	var returnRecruitmentRateArray = {};

	for (var i = 0; i < recruitmentRateFormArray.length; i++) {
		if (recruitmentRateFormArray[i].value != undefined
				&& recruitmentRateFormArray[i].value != "") {
			returnRecruitmentRateArray[recruitmentRateFormArray[i]['name']] = recruitmentRateFormArray[i]['value'];
		}
	}

	return returnRecruitmentRateArray;
}

function retentionForm() {
	if(!(!checkIsEmpty(fileSources.connectivityMatrix) && !checkIsEmpty(fileSources.connectivityMetadata)))
	$('#select-surv').prop('disabled', false); 

	
	var retentionFormArray = $('#retentionForm').serializeArray();
	var returnRetentionArray = {};

	for (var i = 0; i < retentionFormArray.length; i++) {
		if (retentionFormArray[i].value != undefined
				&& retentionFormArray[i].value != "") {
			returnRetentionArray[retentionFormArray[i]['name']] = retentionFormArray[i]['value'];
		}
	}

	if(!(!checkIsEmpty(fileSources.connectivityMatrix) && !checkIsEmpty(fileSources.connectivityMetadata)))
	$('#select-surv').prop('disabled', true);
	
	return returnRetentionArray;
}

//Pelagic Forms
function initialBiomassPelagicForm() {
	var initialBiomassFormArray = $('#initialBiomassPelagicForm').serializeArray();
	var returnInitialBiomassArray = {};

	for (var i = 0; i < initialBiomassFormArray.length; i++) {
		if (initialBiomassFormArray[i].value != undefined
				&& initialBiomassFormArray[i].value != "") {
			returnInitialBiomassArray[initialBiomassFormArray[i]['name']] = initialBiomassFormArray[i]['value'];
		}
	}

	return returnInitialBiomassArray;
}

function carryingCapacityPelagicForm() {
	var carryingCapacityFormArray = $('#carryingCapacityPelagicForm').serializeArray();
	var returnCarryingCapacityArray = {};

	for (var i = 0; i < carryingCapacityFormArray.length; i++) {
		if (carryingCapacityFormArray[i].value != undefined
				&& carryingCapacityFormArray[i].value != "") {
			returnCarryingCapacityArray[carryingCapacityFormArray[i]['name']] = carryingCapacityFormArray[i]['value'];
		}
	}

	return returnCarryingCapacityArray;
}

function turnoverRatePelagicForm() {
	var turnoverRateFormArray = $('#turnoverRatePelagicForm').serializeArray();
	var returnTurnoverRateArray = {};

	for (var i = 0; i < turnoverRateFormArray.length; i++) {
		if (turnoverRateFormArray[i].value != undefined
				&& turnoverRateFormArray[i].value != "") {
			returnTurnoverRateArray[turnoverRateFormArray[i]['name']] = turnoverRateFormArray[i]['value'];
		}
	}

	return returnTurnoverRateArray;
}

function spilloverRatePelagicForm() {
	var spilloverRateFormArray = $('#spilloverRatePelagicForm').serializeArray();
	var returnSpilloverRateArray = {};

	for (var i = 0; i < spilloverRateFormArray.length; i++) {
		if (spilloverRateFormArray[i].value != undefined
				&& spilloverRateFormArray[i].value != "") {
			returnSpilloverRateArray[spilloverRateFormArray[i]['name']] = spilloverRateFormArray[i]['value'];
		}
	}

	return returnSpilloverRateArray;
}

function biomassThresholdPelagicForm() {
	var biomassThresholdFormArray = $('#biomassThresholdPelagicForm').serializeArray();
	var returnBiomassThresholdArray = {};

	for (var i = 0; i < biomassThresholdFormArray.length; i++) {
		if (biomassThresholdFormArray[i].value != undefined
				&& biomassThresholdFormArray[i].value != "") {
			returnBiomassThresholdArray[biomassThresholdFormArray[i]['name']] = biomassThresholdFormArray[i]['value'];
		}
	}

	return returnBiomassThresholdArray;
}

function fecundityPelagicForm() {
	var fecundityFormArray = $('#fecundityPelagicForm').serializeArray();
	var returnFecundityArray = {};

	for (var i = 0; i < fecundityFormArray.length; i++) {
		if (fecundityFormArray[i].value != undefined
				&& fecundityFormArray[i].value != "") {
			returnFecundityArray[fecundityFormArray[i]['name']] = fecundityFormArray[i]['value'];
		}
	}

	return returnFecundityArray;
}

function spilloverThresholdPelagicForm() {
	var spilloverThresholdFormArray = $('#spilloverThresholdPelagicForm').serializeArray();
	var returnSpilloverThresholdArray = {};

	for (var i = 0; i < spilloverThresholdFormArray.length; i++) {
		if (spilloverThresholdFormArray[i].value != undefined
				&& spilloverThresholdFormArray[i].value != "") {
			returnSpilloverThresholdArray[spilloverThresholdFormArray[i]['name']] = spilloverThresholdFormArray[i]['value'];
		}
	}

	return returnSpilloverThresholdArray;
}

function recruitmentRatePelagicForm() {
	var recruitmentRateFormArray = $('#recruitmentRatePelagicForm').serializeArray();
	var returnRecruitmentRateArray = {};

	for (var i = 0; i < recruitmentRateFormArray.length; i++) {
		if (recruitmentRateFormArray[i].value != undefined
				&& recruitmentRateFormArray[i].value != "") {
			returnRecruitmentRateArray[recruitmentRateFormArray[i]['name']] = recruitmentRateFormArray[i]['value'];
		}
	}

	return returnRecruitmentRateArray;
}

function retentionPelagicForm() {
	if(!(!checkIsEmpty(fileSources.connectivityMatrixPelagic) && !checkIsEmpty(fileSources.connectivityMetadataPelagic)))
	$('#select-survp').prop('disabled', false); 

	
	var retentionFormArray = $('#retentionPelagicForm').serializeArray();
	var returnRetentionArray = {};

	for (var i = 0; i < retentionFormArray.length; i++) {
		if (retentionFormArray[i].value != undefined
				&& retentionFormArray[i].value != "") {
			returnRetentionArray[retentionFormArray[i]['name']] = retentionFormArray[i]['value'];
		}
	}

	if(!(!checkIsEmpty(fileSources.connectivityMatrixPelagic) && !checkIsEmpty(fileSources.connectivityMetadataPelagic)))
	$('#select-survp').prop('disabled', true);
	
	return returnRetentionArray;
}
//End of Pelagic Forms

function fishingForm() {
	var fishingFormArray = $('#fishingForm').serializeArray();

	var returnFishingArray = {};

	for (var i = 0; i < fishingFormArray.length; i++) {
		console.log(fishingFormArray[i]);
		if(fishingFormArray[i].name == "type") {
			if(fishingFormArray[i].value != 1) {
				if (fishingFormArray[i].value != undefined
						&& fishingFormArray[i].value != "") {
					returnFishingArray[fishingFormArray[i]['name']] = fishingFormArray[i]['value'];
				}
			}
		} else {
			if (fishingFormArray[i].value != undefined
					&& fishingFormArray[i].value != "") {
				returnFishingArray[fishingFormArray[i]['name']] = fishingFormArray[i]['value'];
			}
		}
	}

	return returnFishingArray;
}

function fisherPropertiesForm(){
	var returnFishingArray = {
		homeX : [],
		homeY: [],
		maxThreshold : [],
		fishingRange : [],
		fisherId : [],
		biomassMaxRatio : []
	};

	returnFishingArray.fisherId = formSources.fishingParam.fisherProperties.fisherId;
	returnFishingArray.homeX = formSources.fishingParam.fisherProperties.homeX;
	returnFishingArray.homeY = formSources.fishingParam.fisherProperties.homeY;
	returnFishingArray.maxThreshold = formSources.fishingParam.fisherProperties.maxThreshold;
	returnFishingArray.fishingRange = formSources.fishingParam.fisherProperties.fishingRange;
	returnFishingArray.biomassMaxRatio = formSources.fishingParam.fisherProperties.biomassMaxRatio;
	
	return returnFishingArray;
}

function clearAllUploadFields(){
	/**Start of Maps Clear**/
	$( "#habitat-grid" ).val("");
    $( "#habitat-grid-upload" ).val( "" );
    $( "#fisher-docks" ).val("");
    $( "#fisher-docks-upload" ).val( "" );
    $( "#marine-reserve" ).val("");
    $( "#mpa-upload" ).val( "" );
    $( "#marine-reserve-metadata" ).val("");
    $( "#mpa-upload-metadata" ).val( "" );
    $( "#connectivity-matrix" ).val("");
    $( "#connectivity-matrix-upload" ).val( "" );
    $( "#connectivity-metadata" ).val( "" );
    $( "#connectivity-metadata" ).val( "" );
    $( "#connectivity-metadata-upload" ).val( "" );
    $( "#connectivity-matrix-pelagic" ).val("");
    $( "#connectivity-matrix-upload-pelagic" ).val( "" );
    $( "#connectivity-metadata-pelagic" ).val( "" );
    $( "#connectivity-metadata" ).val( "" );
    $( "#connectivity-metadata-upload-pelagic" ).val( "" );
    $( "#habitat-quality" ).val( "" );
    $( "#habitat-quality-upload" ).val( "" );
    $('.maps-dropdown').empty();
    $( ".maps-dropdown" ).append($("<option></option>"));
    clearFileInput("habitatGrid");
    clearFileInput("fisherDocks");
    clearFileInput("reserve");
    clearFileInput("connectivityMatrix");
    clearFileInput("connectivityMetadata");
    clearFileInput("connectivityMatrixPelagic");
    clearFileInput("connectivityMetadataPelagic");
    clearFileInput("habitatQuality");
	clearFileInput("fisherProperties");
    /**End of Maps Clear**/
    
	//Clear Demersal Fields
    $("#ib-scaled-txtbox").val(0);
    $("#cc-scaled-txtbox").val(0);
    $("#tr-carrying-txtbox").val(0);
    $("#sr-fixed-txtbox").val(0);
    $("#survivorship-scaled-txtbox").val(0);

    $("#ib-fixed-txtbox").val("");
    $("#cc-fixed-txtbox").val("");
    $("#tr-fixed-txtbox").val("");;
    $("#survivorship-no-txtbox").val("");

	//Clear Pelagic Fields
	$("#ib-scaled-txtboxp").val(0);
    $("#cc-scaled-txtboxp").val(0);
    $("#tr-carrying-txtboxp").val(0);
    $("#sr-fixed-txtboxp").val(0);
    $("#survivorship-scaled-txtboxp").val(0);

    $("#ib-fixed-txtboxp").val("");
    $("#cc-fixed-txtboxp").val("");
    $("#tr-fixed-txtboxp").val("");;
    $("#survivorship-no-txtboxp").val("");

	$("#fisher-properties-csv").val("");

    $('#reserve-dropdown').empty();
    $( "#reserve-dropdown" ).append($("<option value='no_reserve'>No Reserve</option>"));

    if($("#previous-upload-text").text() != "No uploaded file yet")
    $("#previous-upload-text").text("File Removed");
}

function isFishingFieldsEmpty(){
	var param = $("#select-param-mode").val();
	var uniform = "";
	var closestfc = "";
	var closestquota = "";
	var closestnum = "";
	var randomfc = "";
	var randomquota = "";
	var randomnum = "";
	var fishingError = "";
	
	if(param == "uniform"){
		if($("#uniform-quota-txtbox").val() == ""){
			$("#uniform-quota-txtbox").addClass("error-border");
			uniform = "Uniform Fishing Quota field is empty";
		} else {
			uniform = ""
		}
	}
	
	if(param == "closest"){
		if($("#closest-fc-txtbox").val() == ""){
			$("#closest-fc-txtbox").addClass("error-border");
			closestfc = "Fisher count field is empty";
		} else {
			closestfc = "";
		}
		
		if($("#closest-quota-txtbox").val() == ""){
			$("#closest-quota-txtbox").addClass("error-border");
			closestquota = "Quota (kg/fisher) field is empty";
		} else {
			closestquota = "";
		}
		
		if($("#closest-num-txtbox").val() == ""){
			$("#closest-num-txtbox").addClass("error-border");
			closestnum = "Fisher range field is empty";
		} else {
			closestnum = "";
		}
	}
	
	if(param == "random_walk"){
		if($("#random-fc-txtbox").val() == ""){
			$("#random-fc-txtbox").addClass("error-border");
			randomfc = "Fisher count field is empty";
		} else {
			randomfc = "";
		}
		
		if($("#random-quota-txtbox").val() == ""){
			$("#random-quota-txtbox").addClass("error-border");
			randomquota = "Quota (kg/fisher) field is empty";
		} else {
			randomquota = "";
		}
		
		if($("#random-num-txtbox").val() == ""){
			$("#random-num-txtbox").addClass("error-border");
			randomnum = "Walk threshold (Steps) field is empty";
		} else {
			randomnum = "";
		}
	}
	
	if(uniform == "" && closestfc == "" && closestquota == "" && closestnum == "" && randomfc == "" && randomquota == "" && randomnum == ""){
		fishingError = "";
	} else {
	fishingError = (uniform == "" ? "" : "• " + uniform + "\n") + (closestfc == "" ? "" : "• " + closestfc + "\n")  + (closestquota == "" ? "" : "• " + closestquota + "\n") 
	+ (closestnum == "" ? "" : "• " + closestnum + "\n") + (randomfc == "" ? "" : "• " + randomfc + "\n") 
	+ (randomquota == "" ? "" : "• " + randomquota + "\n") + (randomnum == "" ? "" : "• " + randomnum + "\n");
	}
	return fishingError;
}

function isBiomassFieldsEmpty(){
	var initialB = "";
	var carryingCap = "";
	var turnRate = "";
	var spillRate = "";
	var surv = "";
	var biomassError = "";
	
	/*Initial Biomass Check*/
   if($("#select-initial").val() == "scaled"){
		if($("#ib-scaled-txtbox").val() == ""){
			initialB = "Initial Biomass field is empty";
			$("#ib-scaled-txtbox").addClass("error-border");
		} else {
			initialB = "";
		}
	} else if($("#select-initial").val() == "fixed"){
		if($("#ib-fixed-txtbox").val() == ""){
			initialB = "Initial Biomass field is empty";
			$("#ib-fixed-txtbox").addClass("error-border");
		} else {
			initialB = "";
		}
	}
	/*Initial Biomass Check */
	
   /*Carrying Capacity Check*/
   if($("#select-carrying-cap").val() == "scaled"){
		if($("#cc-scaled-txtbox").val() == ""){
			carryingCap = "Carrying Capacity field is empty";
			$("#cc-scaled-txtbox").addClass("error-border");
		} else {
			carryingCap = "";
		}
	} else if($("#select-carrying-cap").val() == "fixed"){
		if($("#cc-fixed-txtbox").val() == ""){
			carryingCap = "Carrying Capacity field is empty";
			$("#cc-fixed-txtbox").addClass("error-border");
		} else {
			carryingCap = "";
		}
	}
	/*Carrying Capacity Check */
   
   /*Turnover rate Check*/
   if($("#select-tr").val() == "carrying_capacity"){
		if($("#tr-carrying-txtbox").val() == ""){
			turnRate = "Turnover rate field is empty";
			$("#tr-carrying-txtbox").addClass("error-border");
		} else {
			turnRate = "";
		}
	} else if($("#select-carrying-cap").val() == "fixed"){
		if($("#tr-fixed-txtbox").val() == ""){
			turnRate = "Turnover rate field is empty";
			$("#tr-fixed-txtbox").addClass("error-border");
		} else {
			turnRate = "";
		}
	}
	/*Turnover rate Check */
   
   /* Spillover rate Check */
   if($("#sr-fixed-txtbox").val() == ""){
	   spillRate = "Spillover Rate field is empty";
	   $("#sr-fixed-txtbox").addClass("error-border");
   } else {
	   spillRate = "";
   }
   /* Spillover rate Check */
   
    /*Survivorship Check*/
   console.log("select-surve.val : " + $("#select-surv").val());
   console.log("survivorship-scaled-txtbox : " + $("#survivorship-scaled-txtbox").val());

   if($("#select-surv").val() == "scaled"){
		if($("#survivorship-scaled-txtbox").val() == ""){
			surv = "Survivorship field is empty";
			$("#survivorship-scaled-txtbox").addClass("error-border");
		} else {
			surv = "";
		}
	} else if($("#select-carrying-cap").val() == "full_connectivity"){
		if($("#survivorship-full-txtbox").val() == ""){
			surv = "Survivorship field is empty";
			$("#survivorship-full-txtbox").addClass("error-border");
		} else {
			surv = "";
		}
	}
	/*Survivorship Check */
   
	console.log("INITIAL BIOMASS RESULT IS : " + initialB);
	console.log("CARRYING CAPACITY RESULT IS : " + carryingCap);
	console.log("TURNOVER RATE RESULT IS : " + turnRate);
	console.log("SPILLOVER RATE RESULT IS : " + spillRate);
	console.log("SURVIVORSHIP RESULT IS : " + surv);
	
	if(initialB == "" && carryingCap == "" && turnRate == "" && spillRate == "" && surv == ""){
		biomassError = "";
	} else {
		biomassError = (initialB == "" ? "" : "• " + initialB + "\n") + (carryingCap == "" ? "" : "• " + carryingCap + "\n")
						+ (turnRate == "" ? "" : "• " + turnRate + "\n") + (spillRate == "" ? "" : "• " + spillRate + "\n")
						+ (surv == "" ? "" : "• " + surv + "\n");
	}
	return biomassError;
}

function isConnectivityBothUploaded(){
	var matrix = !checkIsEmpty(fileSources.connectivityMatrix);
	var metadata = !checkIsEmpty(fileSources.connectivityMetadata);
	var result;
	
	if((!matrix && !metadata) || (matrix && metadata)){
		result = true;
	} else {
		result = false;
	}
	
	return result;
}

function isConnectivityPelagicBothUploaded(){
	var matrix = !checkIsEmpty(fileSources.connectivityMatrixPelagic);
	var metadata = !checkIsEmpty(fileSources.connectivityMetadataPelagic);
	var result;
	
	if((!matrix && !metadata) || (matrix && metadata)){
		result = true;
	} else {
		result = false;
	}
	
	return result;
}

function isReserveMetadataBothUploaded(){
	var metadata = marineReserveMetadata.mpa_id.length;
	var result;
	
	if(((metadata == 0) && !fileSources.reserve.uploadStatus) || ((metadata > 0) && fileSources.reserve.uploadStatus)){
		result = true;
	} else {
		result = false;
	}
	
	return result;
}

function isHabitatGridEmpty(){
	var result = !checkIsEmpty(fileSources.habitatGrid.arrays2d);
	return result;
}

function removeLoader(type) {
	if(type == "habitatQuality") {
		$("#hq-loader").addClass("hide");
        $("#habitat-quality-remove-button").removeClass("disabled");
		$("#habitat-quality-remove-button").prop('disabled', false);
	} else if(type == "habitatGrid") {
		$("#hg-loader").addClass("hide");
		$("#habitat-grid-remove-button").removeClass("disabled");
		$("#habitat-grid-remove-button").prop('disabled', false);
	} else if(type == "reserve") {
		$("#mr-loader").addClass("hide");
		$("#mpa-remove-button").removeClass("disabled");
		$("#mpa-remove-button").prop('disabled', false);
	} else if(type == "reserveMetadata") {
		$("#mr-loader-metadata").addClass("hide");
		$("#mpa-remove-button-metadata").removeClass("disabled");
		$("#mpa-remove-button-metadata").prop('disabled', false);
	} else if(type == "fisherDocks") {
		$("#fd-loader").addClass("hide");
		$("#fisher-docks-remove-button").removeClass("disabled");
		$("#fisher-docks-remove-button").prop('disabled', false);
	} else if(type == "connectivityMetadata") {
		$("#cmet-loader").addClass("hide");
		$("#connectivity-metadata-remove-button").removeClass("disabled");
		$("#connectivity-metadata-remove-button").prop('disabled', false);
	} else if(type == "connectivityMatrix") {
		$("#cmat-loader").addClass("hide");
		$("#connectivity-matrix-remove-button").removeClass("disabled");
		$("#connectivity-matrix-remove-button").prop('disabled', false);
	} else if(type == "connectivityMetadataPelagic") {
		$("#cmetpelagic-loader").addClass("hide");
		$("#connectivity-metadata-remove-button-pelagic").removeClass("disabled");
		$("#connectivity-metadata-remove-button-pelagic").prop('disabled', false);
	} else if(type == "connectivityMatrixPelagic") {
		$("#cmatpelagic-loader").addClass("hide");
		$("#connectivity-matrix-remove-button-pelagic").removeClass("disabled");
		$("#connectivity-matrix-remove-button-pelagic").prop('disabled', false);
	}else if(type == "fisherProperties") {
		$("#fpcsv-loader").addClass("hide");
		$("#fisher-properties-csv-remove-button").removeClass("disabled");
		$("#fisher-properties-csv-remove-button").prop('disabled', false);
	}
}

function enableOutputButtons() {
	$("#raw-data-btn").prop("disabled", false);
	$("#total-biomass-btn").prop("disabled", false);
	$("#fisher-summary-btn").prop("disabled", false);
	$("#bpc-btn").prop("disabled", false);
	$("#bpt-btn").prop("disabled", false);
	$("#fcpt-btn").prop("disabled", false);
	$("#raw-data-btn").removeClass("disabled");
	$("#total-biomass-btn").removeClass("disabled");
	$("#fisher-summary-btn").removeClass("disabled");
	$("#bpc-btn").removeClass("disabled");
	$("#bpt-btn").removeClass("disabled");
	$("#fcpt-btn").removeClass("disabled");
}

function disableOutputButtons() {
	$("#raw-data-btn").prop("disabled", true);
	$("#total-biomass-btn").prop("disabled", true);
	$("#fisher-summary-btn").prop("disabled", true);
	$("#bpc-btn").prop("disabled",true);
	$("#bpt-btn").prop("disabled",true);
	$("#fcpt-btn").prop("disabled",true);
	$("#save-reexecution").prop('disabled', true);
	$("#raw-data-btn").addClass("disabled");
	$("#total-biomass-btn").addClass("disabled");
	$("#fisher-summary-btn").addClass("disabled");
	$("#save-reexecution").addClass('disabled');
	$("#bpc-btn").addClass("disabled");
	$("#bpt-btn").addClass("disabled");
	$("#fcpt-btn").addClass("disabled");
}

function uploadPreviousFile() {
	console.log("previousFile");
	var fileOptions = {
			  filters: [
			    {name: 'Fish SPACE Model Re-run File', extensions: ['ccres']},
			    {name: 'All Files', extensions: ['*']}
			  ],
			  properties: [ 
			        'openFile'
			  ]
		};
	openReexecutionFile(fileOptions);
}

function saveReexecutionFile() {
	var reexecutionJSON = {};
	reexecutionJSON["fileSources"] = fileSources;
	reexecutionJSON["formSources"] = formSources;
	reexecutionJSON["marineReserveMetadata"] = marineReserveMetadata;
	reexecutionJSON["headerArrayTwoDim"] = headersOf2dArrays;
	var fileOptions = {
			  filters: [
			    {name: 'Fish SPACE Model Re-run File', extensions: ['ccres']},
			    {name: 'All Files', extensions: ['*']}
			  ]
		};
	saveReexecutionFileAction(fileOptions, reexecutionJSON);
}

function openReexecutionFile(fileOptions){
	dialog.showOpenDialog(fileOptions, function (fileNames) {
			  
	  	if (fileNames === undefined) return;
	  	var fileName = fileNames[0];
	  	console.log(fileName);
	  	activeReexecutionFile = path.basename(fileName);
	  	
	  	
	  	    fs.readFile(fileName, 'utf-8', function (err, data) {
		    play = false;
            	    clearModel();
            	    var progressBar = document.getElementsByClassName("progress-bar")[0];
            	    progressBar.style.width =  "0%";
            	    $("#bio-min").text("0");
            	    $("#bio-max").text("0");
            	    $("#current-ts").text(0);
            	    resetTime();
            	    enableMapUpload();
            	    $("#reset-state-btn").click();
            	    $("#habitat-grid-upload-button").prop('disabled', false);
		    $("#habitat-grid-upload-button").removeClass("disabled");
        	    clearGraphsData();
		    var reexecutionJSON = JSON.parse(data);
		    clearAllUploadFields();
			fileSources = reexecutionJSON.fileSources;
		    formSources = reexecutionJSON.formSources;
		    marineReserveMetadata = reexecutionJSON.marineReserveMetadata;
		    headersOf2dArrays = reexecutionJSON.headerArrayTwoDim;
		    $("#check-connectivity-btn").click();
			$("#check-connectivitypelagic-btn").click();
		    $("#check-connectivity-habitat-btn").click();
			$("#check-connectivity-habitatpelagic-btn").click();
		    alert("Previous simulation is loaded.");
		    readStartCount = 1;
		    readEndCount = 1;
		    $("#fish-reexecution-btn").click();
			$("#pelagic-reexecution-btn").click();
		    $("#fishing-reexecution-btn").click();
		    insertContentInMapsFields();
			insertContentInFisherProperties();
		    $("#previous-upload-text").text(activeReexecutionFile);
	  });
	}); 
}

function saveReexecutionFileAction(fileOptions, reexecutionJSON){
	 dialog.showSaveDialog(fileOptions, function (fileName) {

		 if (fileName === undefined){
		        console.log("You didn't save the file");
		        return;
		    }

		    // fileName is a string that contains the path and filename created in the save file dialog.  
		    fs.writeFile(fileName, JSON.stringify(reexecutionJSON), (err) => {
		        if(err){
		            alert("An error ocurred creating the file "+ err.message)
		        }
		                    
		        alert("The file has been succesfully saved");
		    });

	  }); 
}

function uploadFile(currentTarget) {
	var fileOptions = {
			  filters: [
			    {name: 'CSV File', extensions: ['csv']},
			    {name: 'All Files', extensions: ['*']}
			  ],
			  properties: [ 
			        'openFile'
			  ]
		};
	dialog.showOpenDialog(fileOptions, function(files) {
    
	    // fileNames is an array that contains all the selected
	    if(files === undefined){
	        console.log("No file selected");
	        return;
	    }

	    var file = files[0];

	    if ( currentTarget == "habitatGrid" ) {
            var habitatGrid = isHabitatGridEmpty;
            var elem = $( "#habitat-grid-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#habitat-grid-remove-button").prop('disabled', true);
                $("#habitat-grid-remove-button").addClass("disabled");
                $("#hg-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "fisherDocks" ) {
            var elem = $( "#fisher-docks-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#fisher-docks-remove-button").prop('disabled', true);
                $("#fisher-docks-remove-button").addClass("disabled");
				$("#fd-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "reserve" ) {
            var elem = $( "#mpa-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#mpa-remove-button").prop('disabled', true);
                $("#mpa-remove-button").addClass("disabled");
				$("#mr-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "reserveMetadata" ) {
            var elem = $( "#mpa-upload-button-metadata" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#mpa-remove-button-metadata").prop('disabled', true);
                $("#mpa-remove-button-metadata").addClass("disabled");
				$("#mr-loader-metadata").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "connectivityMatrix" ) {
            var elem = $( "#connectivity-matrix-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#connectivity-matrix-remove-button").prop('disabled', true);
                $("#connectivity-matrix-remove-button").addClass("disabled");
				$("#cmat-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "connectivityMetadata" ) {
            var elem = $( "#connectivity-metadata-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#connectivity-metadata-remove-button").prop('disabled', true);
                $("#connectivity-metadata-remove-button").addClass("disabled");
				$("#cmet-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        }  else if ( currentTarget == "connectivityMatrixPelagic" ) {
            var elem = $( "#connectivity-matrix-upload-button-pelagic" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#connectivity-matrix-remove-button-pelagic").prop('disabled', true);
                $("#connectivity-matrix-remove-button-pelagic").addClass("disabled");
				$("#cmatpelagic-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        }  else if ( currentTarget == "connectivityMetadataPelagic" ) {
            var elem = $( "#connectivity-metadata-upload-button-pelagic" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#connectivity-metadata-remove-button-pelagic").prop('disabled', true);
                $("#connectivity-metadata-remove-button-pelagic").addClass("disabled");
				$("#cmetpelagic-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        }  else if ( currentTarget == "habitatQuality" ) {
            var elem = $( "#habitat-quality-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#habitat-quality-remove-button").prop('disabled', true);
                $("#habitat-quality-remove-button").addClass("disabled");
				$("#hq-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        } else if ( currentTarget == "fisherProperties" ) {
            var elem = $( "#fisher-properties-csv-upload-button" );
            var fileName = file.replace(/^.*[\\\/]/, '');
            if(showUploadedFile( fileName, elem ) && fileName != "") {
                $("#fisher-properties-csv-remove-button").prop('disabled', true);
                $("#fisher-properties-csv-remove-button").addClass("disabled");
				$("#fpcsv-loader").removeClass("hide");
                parseFile(file, currentTarget);
            }
        }
	});
}

function removeFile(currentTarget) {
	if ( currentTarget == "habitatGrid" ) {
        if(!$("#habitat-grid-remove-button").hasClass("disabled")){
    		var yesno = confirm("Removing the Habitat Grid Map will reset this simulation run. Would you like to proceed?");
			if(yesno) {
                $( "#habitat-grid-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
                $( "#habitat-grid-upload" ).val( "" );
                $(".maps-dropdown option").remove();
                $("#hg-loader").addClass("hide");
                disableMapUpload();
                disableOutputButtons();
                clearAllUploadFields();
                resetBtnTriggered();
                clickConnectivityButton();
                clickConnectivityHabitatButton();
				clickConnectivityPelagicButton();
				clickConnectivityHabitatPelagicButton();
			}
        }
    } else if ( currentTarget == "fisherDocks" ) {
        if(!$("#fisher-docks-remove-button").hasClass("disabled")){
        	$( "#fisher-docks" ).val("");
            $( "#fisher-docks-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#fisher-docks-upload" ).val( "" );
            $("#fd-loader").addClass("hide");
            clearFileInput(currentTarget);
        }
    } else if ( currentTarget == "reserve" ) {
        if(!$("#mpa-remove-button").hasClass("disabled")){
        	$( "#marine-reserve" ).val("");
            $( "#mpa-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#mpa-upload" ).val( "" );
            $('#reserve-dropdown').empty();
            $( "#reserve-dropdown" ).append($("<option value='no_reserve'>No Reserve</option>"));
            $("#mr-loader").addClass("hide");
            clearFileInput(currentTarget);
        }
    } else if ( currentTarget == "reserveMetadata" ) {
        if(!$("#mpa-remove-button-metadata").hasClass("disabled")){
        	$( "#marine-reserve-metadata" ).val("");
            $( "#mpa-upload-metadata" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#mpa-upload-metadata" ).val( "" );
            $("#mr-loader-metadata").addClass("hide");
            clearFileInput(currentTarget);
        }
    } else if ( currentTarget == "connectivityMatrix" ) {
        if(!$("#connectivity-matrix-remove-button").hasClass("disabled")){
        	$( "#connectivity-matrix" ).val("");
            $( "#connectivity-matrix-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#connectivity-matrix-upload" ).val( "" );
            $("#cmat-loader").addClass("hide");
            clearFileInput(currentTarget);
            clickConnectivityButton();
            clickConnectivityHabitatButton();
			clickConnectivityPelagicButton();
			clickConnectivityHabitatPelagicButton();
        }
    } else if ( currentTarget == "connectivityMetadata" ) {
        if(!$("#connectivity-metadata-remove-button").hasClass("disabled")){
        	$( "#connectivity-metadata" ).val( "" );
            $( "#connectivity-metadata-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#connectivity-metadata-upload" ).val( "" );
            $("#cmet-loader").addClass("hide");
            clearFileInput(currentTarget);
            clickConnectivityButton();
            clickConnectivityHabitatButton();
			clickConnectivityPelagicButton();
			clickConnectivityHabitatPelagicButton();
        }
    } else if ( currentTarget == "connectivityMatrixPelagic" ) {
        if(!$("#connectivity-matrix-remove-button-pelagic").hasClass("disabled")){
        	$( "#connectivity-matrix-pelagic" ).val("");
            $( "#connectivity-matrix-upload-pelagic" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#connectivity-matrix-upload-pelagic" ).val( "" );
            $("#cmatpelagic-loader").addClass("hide");
            clearFileInput(currentTarget);
            clickConnectivityButton();
            clickConnectivityHabitatButton();
			clickConnectivityPelagicButton();
			clickConnectivityHabitatPelagicButton();
        }
    } else if ( currentTarget == "connectivityMetadataPelagic" ) {
        if(!$("#connectivity-metadata-remove-button-pelagic").hasClass("disabled")){
        	$( "#connectivity-metadata-pelagic" ).val( "" );
            $( "#connectivity-metadata-upload-pelagic" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#connectivity-metadata-upload-pelagic" ).val( "" );
            $("#cmetpelagic-loader").addClass("hide");
            clearFileInput(currentTarget);
            clickConnectivityButton();
            clickConnectivityHabitatButton();
			clickConnectivityPelagicButton();
			clickConnectivityHabitatPelagicButton();
        }
    } else if ( currentTarget == "habitatQuality" ) {
        if(!$("#habitat-quality-remove-button").hasClass("disabled")){
        	$( "#habitat-quality" ).val( "" );
            $( "#habitat-quality-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#habitat-quality-upload" ).val( "" );
            $('.maps-dropdown').empty();
            $( ".maps-dropdown" ).append($("<option></option>"));
            $("#hq-loader").addClass("hide");
		    appendValuesForHabitatGrid();
            clearFileInput(currentTarget);
            $(".maps-dropdown option:eq('0')").remove();
            $(".maps-dropdown option:eq('1')").remove();
            $(".maps-dropdown option:eq('2')").remove();
            clickConnectivityHabitatButton();
			clickConnectivityHabitatPelagicButton();
        }
    } else if ( currentTarget == "fisherProperties" ) {
        if(!$("#fisher-properties-csv-remove-button").hasClass("disabled")){
        	$( "#fisher-properties-csv" ).val( "" );
            $( "#fisher-properties-csv-upload" ).closest( "div" ).children( "div" ).children( "input" ).val( "" );
            $( "#fisher-properties-csv-upload" ).val( "" );
            $("#fpcsv-loader").addClass("hide");
            clearFileInput(currentTarget);
        }
    }
}

function isInputZeroToOne(input) {
	var result = false;
    if ((input >= 0 || input == ".") && input <= 1){
    		result = true;
    }
    
    return result;
}

function isInputZeroToPointOne(input) {
	var result = false;
    if (input >= 0 || input == "."){
    		result = true;
    }
    
    return result;
}

function isValidPositive(input) {
	var result = false;
    if (input >= 0){
    		result = true;
    }
    
    return result;
}

function isValidPositiveDecimal(input){
	var result = false;
    if (input >= 0 || input == "."){
    		result = true;
    }
    
    return result;
}

function resetBtnTriggered(){
	$("#reset-all").click();
	$("#reset-fishing").click();
}

function insertContentInMapsFields() {
	if(!checkIsEmpty(fileSources.habitatGrid.arrays2d)) {
		$("#habitat-grid").val("Uploaded File");
		enableMapUpload();
	}

	if(!checkIsEmpty(fileSources.fisherDocks.arrays2d)) {
		$("#fisher-docks").val("Uploaded File");
	}

	console.log(fileSources.reserve.arrays2d);
	if(!checkIsEmpty(fileSources.reserve.arrays2d) && Object.keys(fileSources.reserve.arrays2d).length > 1) {
		$("#marine-reserve").val("Uploaded File");
	}
	
	if(!checkIsEmpty(marineReserveMetadata)) {
		$("#marine-reserve-metadata").val("Uploaded File");
	}

	if(!checkIsEmpty(fileSources.habitatQuality.arrays2d)) {
		$("#habitat-quality").val("Uploaded File");
	}

	if(!checkIsEmpty(fileSources.connectivityMatrix)) {
		$("#connectivity-matrix").val("Uploaded File");
	}

	if(!checkIsEmpty(fileSources.connectivityMetadata)) {
		$("#connectivity-metadata").val("Uploaded File");
	}
	
	if(!checkIsEmpty(fileSources.connectivityMatrixPelagic)) {
		$("#connectivity-matrix-pelagic").val("Uploaded File");
	}

	if(!checkIsEmpty(fileSources.connectivityMetadataPelagic)) {
		$("#connectivity-metadata-pelagic").val("Uploaded File");
	}
}

function insertContentInFisherProperties() {
	if(!checkIsEmpty(formSources.fishingParam.fisherProperties)) {
		$("#fisher-properties-csv").val("Uploaded File");
	}
}

function clickConnectivityButton() {
	$("#check-connectivity-btn").click();
}

function clickConnectivityHabitatButton() {
	$("#check-connectivity-habitat-btn").click();
}

function clickConnectivityPelagicButton() {
	$("#check-connectivitypelagic-btn").click();
}

function clickConnectivityHabitatPelagicButton() {
	$("#check-connectivity-habitatpelagic-btn").click();
}
