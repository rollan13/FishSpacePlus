function appendValuesForSummaryTable() {
	//number formatter
	var nf = Intl.NumberFormat();
	var maxYears = $("#timestep-range").val();
	$("#runYears").text(maxYears);
 	$("#bioMass").text(nf.format(nonReserve_bioPerArea.toFixed(2)));
 	$("#bioRes").text(nf.format(reserveBio_perArea.toFixed(2)));
 	$("#minDis").text(minDistance.toFixed(2));
 	$("#maxDis").text(maxDistance.toFixed(2));
 	$("#satFisher").text(satisfiedFisherMan);
 	$("#resArea").text(nf.format(reserve_area.toFixed(2)));
 	$("#NonResArea").text(nf.format(reef_fish_area.toFixed(2)));
}

function disableMapUpload(){
	$("#habitat-grid-remove-button").prop('disabled', true);
	$("#habitat-grid-remove-button").addClass("disabled");

	$("#fisher-docks-upload-button").prop('disabled', true);
	$("#fisher-docks-remove-button").prop('disabled', true);
	$("#fisher-docks-upload-button").addClass("disabled");
	$("#fisher-docks-remove-button").addClass("disabled");
	
	$("#mpa-upload-button").prop('disabled', true);
	$("#mpa-remove-button").prop('disabled', true);
	$("#mpa-upload-button").addClass("disabled");
	$("#mpa-remove-button").addClass("disabled");
	
	$("#mpa-upload-button-metadata").prop('disabled', true);
	$("#mpa-remove-button-metadata").prop('disabled', true);
	$("#mpa-upload-button-metadata").addClass("disabled");
	$("#mpa-remove-button-metadata").addClass("disabled");

	$("#connectivity-matrix-upload-button").prop('disabled', true);
	$("#connectivity-matrix-remove-button").prop('disabled', true);
	$("#connectivity-matrix-upload-button").addClass("disabled");
	$("#connectivity-matrix-remove-button").addClass("disabled");

	$("#connectivity-metadata-upload-button").prop('disabled', true);
	$("#connectivity-metadata-remove-button").prop('disabled', true);
	$("#connectivity-metadata-upload-button").addClass("disabled");
	$("#connectivity-metadata-remove-button").addClass("disabled");
	
	$("#connectivity-matrix-upload-button-pelagic").prop('disabled', true);
	$("#connectivity-matrix-remove-button-pelagic").prop('disabled', true);
	$("#connectivity-matrix-upload-button-pelagic").addClass("disabled");
	$("#connectivity-matrix-remove-button-pelagic").addClass("disabled");

	$("#connectivity-metadata-upload-button-pelagic").prop('disabled', true);
	$("#connectivity-metadata-remove-button-pelagic").prop('disabled', true);
	$("#connectivity-metadata-upload-button-pelagic").addClass("disabled");
	$("#connectivity-metadata-remove-button-pelagic").addClass("disabled");

	$("#habitat-quality-upload-button").prop('disabled', true);
	$("#habitat-quality-remove-button").prop('disabled', true);
	$("#habitat-quality-upload-button").addClass("disabled");
	$("#habitat-quality-remove-button").addClass("disabled");
}

//onload function calls
disableMapUpload();

function enableMapUpload(){
	$("#habitat-grid-remove-button").prop('disabled', false);
	$("#habitat-grid-remove-button").removeClass("disabled");


	$("#fisher-docks-upload-button").prop('disabled', false);
	$("#fisher-docks-remove-button").prop('disabled', false);
	$("#fisher-docks-upload-button").removeClass("disabled");
	$("#fisher-docks-remove-button").removeClass("disabled");
	
	$("#mpa-upload-button").prop('disabled', false);
	$("#mpa-remove-button").prop('disabled', false);
	$("#mpa-upload-button").removeClass("disabled");
	$("#mpa-remove-button").removeClass("disabled");
	
	$("#mpa-upload-button-metadata").prop('disabled', false);
	$("#mpa-remove-button-metadata").prop('disabled', false);
	$("#mpa-upload-button-metadata").removeClass("disabled");
	$("#mpa-remove-button-metadata").removeClass("disabled");

	$("#connectivity-matrix-upload-button").prop('disabled', false);
	$("#connectivity-matrix-remove-button").prop('disabled', false);
	$("#connectivity-matrix-upload-button").removeClass("disabled");
	$("#connectivity-matrix-remove-button").removeClass("disabled");

	$("#connectivity-metadata-upload-button").prop('disabled', false);
	$("#connectivity-metadata-remove-button").prop('disabled', false);
	$("#connectivity-metadata-upload-button").removeClass("disabled");
	$("#connectivity-metadata-remove-button").removeClass("disabled");
	
	$("#connectivity-matrix-upload-button-pelagic").prop('disabled', false);
	$("#connectivity-matrix-remove-button-pelagic").prop('disabled', false);
	$("#connectivity-matrix-upload-button-pelagic").removeClass("disabled");
	$("#connectivity-matrix-remove-button-pelagic").removeClass("disabled");

	$("#connectivity-metadata-upload-button-pelagic").prop('disabled', false);
	$("#connectivity-metadata-remove-button-pelagic").prop('disabled', false);
	$("#connectivity-metadata-upload-button-pelagic").removeClass("disabled");
	$("#connectivity-metadata-remove-button-pelagic").removeClass("disabled");

	$("#habitat-quality-upload-button").prop('disabled', false);
	$("#habitat-quality-remove-button").prop('disabled', false);
	$("#habitat-quality-upload-button").removeClass("disabled");
	$("#habitat-quality-remove-button").removeClass("disabled");
}

appendValuesForSummaryTable();
 
function clearGraphsData(){
	//call d3 svg of each chart
	var histogramChart = d3.select("#histogram svg g");	
	var tCatchChart = d3.select("#line-chart-2 svg g");
	var tBiomassChart = d3.select("#line-chart svg g");
	
	//remove data from each chart
	//histogram
	histogramChart.selectAll(".bar").remove();
	
	//total-catch
	tCatchChart.select(".line").remove();
	tCatchChart.selectAll(".dot-red")
	.remove();
	
	//total-biomass
	tBiomassChart.select(".line1").remove();
	tBiomassChart.select(".line2").remove();
	
	tBiomassChart.selectAll(".dot-red")
 	.remove()
 	.exit();
	
	tBiomassChart.selectAll(".dot-yel")
	.remove()
	.exit();
	
	//remove tooltips
	d3.select(".d3-tip.n").remove();
	
	$("#runYears").text(0);
 	$("#bioMass").text(0.00);
 	$("#bioRes").text(0.00);
 	$("#minDis").text(0);
 	$("#maxDis").text(0);
 	$("#satFisher").text(0);
 	$("#resArea").text(0);
 	$("#NonResArea").text(0);
 	
 	resetDataset();
 	resetTotalBiomassData();
}

