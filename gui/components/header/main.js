import React, { Component } from 'react';

import { ButtonWithTooltip } from './../common/buttonWithTooltip.js';

export class Header extends Component {
    constructor( props ) {
        super( props );

        this.state = {runningState: 1};
        this.runMap = this.runMap.bind(this);
        this.stopMap = this.stopMap.bind(this);
        this.pauseMap = this.pauseMap.bind(this);
        this.resumeMap = this.resumeMap.bind(this);
        this.triggerSideNav = this.triggerSideNav.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadPreviousFile = this.uploadPreviousFile.bind(this);
        this.saveReexecutionFile = this.saveReexecutionFile.bind(this);  
        this.resetBtnState = this.resetBtnState.bind(this);
    };
    
    runMap() {
        var habitatGrid = isHabitatGridEmpty();
        var minimumRun = checkMinimumRunSatisfied();
        //var connectivityCheck = isConnectivityBothUploaded();
        //var connectivityPelagicCheck = isConnectivityPelagicBothUploaded();
        var demersalAndPelagicActive = (isConnectivityBothUploaded() && isConnectivityPelagicBothUploaded());
        var reserveMetadataPresent = isReserveMetadataBothUploaded();
        var biomass = isBiomassFieldsEmpty();
        var fishing = isFishingFieldsEmpty();

        play = false;
        clearModel();
        var progressBar = document.getElementsByClassName("progress-bar")[0];
        progressBar.style.width =  "0%";
        $("#bio-min").text("0");
        $("#bio-max").text("0");
        this.setState({runningState: 1});
        $("#current-ts").text(0);
        resetTime();
        enableMapUpload();
        $("#habitat-grid-upload-button").prop('disabled', false);
    		$("#habitat-grid-upload-button").removeClass("disabled");
    		$("#initialBiomassForm :input").prop("disabled", false);
    		$("#carryingCapacityForm :input").prop("disabled", false);
    		$("#turnoverRateForm :input").prop("disabled", false);
    		$("#spilloverRateForm :input").prop("disabled", false);
    		$("#retentionForm :input").prop("disabled", false);
    		$("#fishingForm :input").prop("disabled", false);
    		$("#spilloverThresholdForm :input").attr("disabled", false);
    		$("#recruitmentRateForm :input").attr("disabled", false);
    		$("#fecundityForm :input").attr("disabled", false);
			$("#initialBiomassPelagicForm :input").prop("disabled", false);
    		$("#carryingCapacityPelagicForm :input").prop("disabled", false);
    		$("#turnoverRatePelagicForm :input").prop("disabled", false);
    		$("#spilloverRatePelagicForm :input").prop("disabled", false);
    		$("#retentionPelagicForm :input").prop("disabled", false);
    		$("#spilloverThresholdPelagicForm :input").attr("disabled", false);
    		$("#recruitmentRatePelagicForm :input").attr("disabled", false);
    		$("#fecundityPelagicForm :input").attr("disabled", false);
		$("#fisher-properties-csv-upload-button").prop("disabled", false);
		$("#fisher-properties-csv-upload-button").removeClass("disabled");
		$("#fisher-properties-csv-remove-button").prop("disabled", false);
		$("#fisher-properties-csv-remove-button").removeClass("disabled");
		$("#data-timestep-range").css({pointerEvents: "all"});
		$("#year-timestep-slider").css({cursor: "auto"});
		
        	if(habitatGrid){
                if(minimumRun){
                    if(reserveMetadataPresent){
                	if(demersalAndPelagicActive){
                        if(biomass === "" && fishing === ""){
                            this.setState({runningState: 2});
                            $("#current-running-state").val(2);
                            var progressBar = document.getElementsByClassName("progress-bar")[0];
                            progressBar.style.width =  "0%";
                            clearModel();
                            $("#bio-min").text("0");
                            $("#bio-max").text("0");
                            $("#current-ts").text(0);
                            runModel();
                            resetTime();
                            startTime();
                            disableMapUpload();
                            $("#initialBiomassForm :input").attr("disabled", true);
                            $("#carryingCapacityForm :input").attr("disabled", true);
                            $("#turnoverRateForm :input").attr("disabled", true);
                            $("#spilloverRateForm :input").attr("disabled", true);
                            $("#retentionForm :input").attr("disabled", true);
                            $("#fishingForm :input").attr("disabled", true);
                            $("#data-timestep-range").css({pointerEvents: "none"});
                            $("#year-timestep-slider").css({cursor: "not-allowed"});
                            $("#habitat-grid-upload-button").prop('disabled', true);
                            $("#habitat-grid-upload-button").addClass("disabled");
                            $("#spilloverThresholdForm :input").attr("disabled", true);
                            $("#recruitmentRateForm :input").attr("disabled", true);
                            $("#fecundityForm :input").attr("disabled", true);
                            $("#biomassThresholdForm :input").attr("disabled", true);
                            $("#initialBiomassPelagicForm :input").attr("disabled", true);
                            $("#carryingCapacityPelagicForm :input").attr("disabled", true);
                            $("#turnoverRatePelagicForm :input").attr("disabled", true);
                            $("#spilloverRatePelagicForm :input").attr("disabled", true);
                            $("#retentionPelagicForm :input").attr("disabled", true);
							$("#spilloverThresholdPelagicForm :input").attr("disabled", true);
                            $("#recruitmentRatePelagicForm :input").attr("disabled", true);
                            $("#fecundityPelagicForm :input").attr("disabled", true);
                            $("#biomassThresholdPelagicForm :input").attr("disabled", true);
							$("#fisher-properties-csv-upload-button").attr("disabled", true);
							$("#fisher-properties-csv-remove-button").attr("disabled", true);
                            if($("#reset-stop-btn").val() == 1){
                            		play = false;
                                clearModel();
                                var progressBar = document.getElementsByClassName("progress-bar")[0];
                                progressBar.style.width =  "0%";
                                $("#bio-min").text("0");
                                $("#bio-max").text("0");
                                this.setState({runningState: 1});
                                $("#current-ts").text(0);
                                resetTime();
                                enableMapUpload();
                                $("#habitat-grid-upload-button").prop('disabled', false);
                        		$("#habitat-grid-upload-button").removeClass("disabled");
                        		$("#initialBiomassForm :input").prop("disabled", false);
                        		$("#carryingCapacityForm :input").prop("disabled", false);
                        		$("#turnoverRateForm :input").prop("disabled", false);
                        		$("#spilloverRateForm :input").prop("disabled", false);
                        		$("#retentionForm :input").prop("disabled", false);
                        		$("#fishingForm :input").prop("disabled", false);
                        		$("#spilloverThresholdForm :input").attr("disabled", false);
                                $("#recruitmentRateForm :input").attr("disabled", false);
                                $("#fecundityForm :input").attr("disabled", false);
								$("#initialBiomassPelagicForm :input").prop("disabled", false);
                         		$("#carryingCapacityPelagicForm :input").prop("disabled", false);
                        	    $("#turnoverRatePelagicForm :input").prop("disabled", false);
                         	    $("#spilloverRatePelagicForm :input").prop("disabled", false);
                      	  	    $("#retentionPelagicForm :input").prop("disabled", false);
								$("#spilloverThresholdPelagicForm :input").attr("disabled", false);
                     	        $("#recruitmentRatePelagicForm :input").attr("disabled", false);
                    	        $("#fecundityPelagicForm :input").attr("disabled", false);
                  	            $("#biomassThresholdPelagicForm :input").attr("disabled", false);
								$("#fisher-properties-csv-upload-button").prop("disabled", false);
								$("#fisher-properties-csv-upload-button").removeClass("disabled");
								$("#fisher-properties-csv-remove-button").prop("disabled", false);
								$("#fisher-properties-csv-remove-button").removeClass("disabled");
                        		$("#data-timestep-range").css({pointerEvents: "all"});
                        		$("#year-timestep-slider").css({cursor: "auto"});
                        		$("#reset-stop-btn").val(0);
                            	}
                        		} else {
                        			alert("Cannot Proceed on running the model. \nPlease Review the following: \n" + biomass + fishing);
                        		}
                    		} else {
                    			alert("Connectivity Map and Connectivity Metadata should be uploaded together!");
                    		}
                    	} else {
                    		alert("Marine Reserve and Marine Reserve Metadata should be uploaded together!");
                    	}
                	} else {
                		alert("Please upload the required maps");
                	}
        		} else {
        			alert("Please upload a Habitat Grid Map");
        		}
    }
    
    pauseMap() {
        play = false;
        stopTime();
        disableMapUpload();
        $("#habitat-grid-upload-button").prop('disabled', true);
		$("#habitat-grid-upload-button").addClass("disabled");
        this.setState({runningState: 3});
    }
    
    resumeMap(){
        play = true;
        plotTimestep();
        startTime();
        disableMapUpload();
        $("#habitat-grid-upload-button").prop('disabled', true);
		$("#habitat-grid-upload-button").addClass("disabled");
        this.setState({runningState: 2});
    }
    
    stopMap() {
            console.log(this.state.runningState);
            
            if(this.state.runningState != 1 && $("#current-running-state").val() == 2){
                var confirmation = confirm("This process will terminate the current simulation run. Would you like to proceed?");
                if (confirmation){
                    play = false;
                    clearModel();
                    var progressBar = document.getElementsByClassName("progress-bar")[0];
                    progressBar.style.width =  "0%";
                    $("#bio-min").text("0");
                    $("#bio-max").text("0");
                    this.setState({runningState: 1});
                    $("#current-ts").text(0);
                    resetTime();
                    enableMapUpload();
                    clearGraphsData();
                    $("#habitat-grid-upload-button").prop('disabled', false);
            			$("#habitat-grid-upload-button").removeClass("disabled");
            			$("#initialBiomassForm :input").prop("disabled", false);
            			$("#carryingCapacityForm :input").prop("disabled", false);
            			$("#turnoverRateForm :input").prop("disabled", false);
            			$("#spilloverRateForm :input").prop("disabled", false);
            			$("#retentionForm :input").prop("disabled", false);
            			$("#fishingForm :input").prop("disabled", false);
            			$("#spilloverThresholdForm :input").attr("disabled", false);
            			$("#recruitmentRateForm :input").attr("disabled", false);
            			$("#fecundityForm :input").attr("disabled", false);
            			$("#biomassThresholdForm :input").attr("disabled", false);
						$("#initialBiomassPelagicForm :input").prop("disabled", false);
            			$("#carryingCapacityPelagicForm :input").prop("disabled", false);
            			$("#turnoverRatePelagicForm :input").prop("disabled", false);
            			$("#spilloverRatePelagicForm :input").prop("disabled", false);
            			$("#retentionPelagicForm :input").prop("disabled", false);
            			$("#spilloverThresholdPelagicForm :input").attr("disabled", false);
            			$("#recruitmentRatePelagicForm :input").attr("disabled", false);
            			$("#fecundityPelagicForm :input").attr("disabled", false);
            			$("#biomassThresholdPelagicForm :input").attr("disabled", false);
						$("#fisher-properties-csv-upload-button").prop("disabled", false);
						$("#fisher-properties-csv-upload-button").removeClass("disabled");
						$("#fisher-properties-csv-remove-button").prop("disabled", false);
						$("#fisher-properties-csv-remove-button").removeClass("disabled");
            			$("#data-timestep-range").css({pointerEvents: "all"});
            			$("#year-timestep-slider").css({cursor: "auto"});
                    }
            } else {
                play = false;
                clearModel();
                clearGraphsData();
                var progressBar = document.getElementsByClassName("progress-bar")[0];
                progressBar.style.width =  "0%";
                $("#bio-min").text("0");
                $("#bio-max").text("0");
                this.setState({runningState: 1});
                $("#current-ts").text(0);
                resetTime();
                enableMapUpload();
                $("#habitat-grid-upload-button").prop('disabled', false);
            		$("#habitat-grid-upload-button").removeClass("disabled");
            		$("#initialBiomassForm :input").prop("disabled", false);
            		$("#carryingCapacityForm :input").prop("disabled", false);
            		$("#turnoverRateForm :input").prop("disabled", false);
            		$("#spilloverRateForm :input").prop("disabled", false);
            		$("#retentionForm :input").prop("disabled", false);
            		$("#fishingForm :input").prop("disabled", false);
            		$("#spilloverThresholdForm :input").attr("disabled", false);
        			$("#recruitmentRateForm :input").attr("disabled", false);
        			$("#fecundityForm :input").attr("disabled", false);
					$("#initialBiomassPelagicForm :input").prop("disabled", false);
            		$("#carryingCapacityPelagicForm :input").prop("disabled", false);
            		$("#turnoverRatePelagicForm :input").prop("disabled", false);
            		$("#spilloverRatePelagicForm :input").prop("disabled", false);
            		$("#retentionPelagicForm :input").prop("disabled", false);
            		$("#spilloverThresholdPelagicForm :input").attr("disabled", false);
            		$("#recruitmentRatePelagicForm :input").attr("disabled", false);
            		$("#fecundityPelagicForm :input").attr("disabled", false);
            		$("#biomassThresholdPelagicForm :input").attr("disabled", false);
					$("#fisher-properties-csv-upload-button").prop("disabled", false);
					$("#fisher-properties-csv-upload-button").removeClass("disabled");
					$("#fisher-properties-csv-remove-button").prop("disabled", false);
					$("#fisher-properties-csv-remove-button").removeClass("disabled");
        			$("#data-timestep-range").css({pointerEvents: "all"});
        			$("#year-timestep-slider").css({cursor: "auto"});
            }  
    }

    triggerSideNav() {
        document.getElementById( "sidebar" ).classList.toggle( "active" );
    }
    
    uploadFile( event ) {
        dialog.showOpenDialog((files) => {
    
            // fileNames is an array that contains all the selected
            if(files === undefined){
                console.log("No file selected");
                return;
            }

            var file = files[0];

            var currentTarget = event.currentTarget.dataset.target;
            if ( currentTarget == "previousUpload" ) {
                var elem = $( "#previous-upload" );
                var fileName = file.replace(/^.*[\\\/]/, '');
                if(showUploadedFile( fileName, elem ) && fileName != "") {
                    parseFile(file, currentTarget);
                }
            }
        });
    }

    uploadPreviousFile() {
            if(this.state.runningState != 1){
                var conf = confirm("Uploading a Re-run file will reset this simulation run. Would you like to proceed?");
                if(conf){           
                    uploadPreviousFile();           
                }           
            } else {            
                uploadPreviousFile();   
            }
    }

    saveReexecutionFile() {
        saveReexecutionFile();
    }
    
    resetBtnState(){
    		play = false;
    		this.setState({runningState: 1});
    		enableMapUpload();
    		$("#habitat-grid-upload-button").prop('disabled', false);
    		$("#habitat-grid-upload-button").removeClass("disabled");
    		$("#initialBiomassForm :input").prop("disabled", false);
    		$("#carryingCapacityForm :input").prop("disabled", false);
    		$("#turnoverRateForm :input").prop("disabled", false);
    		$("#spilloverRateForm :input").prop("disabled", false);
    		$("#retentionForm :input").prop("disabled", false);
    		$("#fishingForm :input").prop("disabled", false);
    		$("#spilloverThresholdForm :input").attr("disabled", false);
			$("#initialBiomassPelagicForm :input").prop("disabled", false);
            $("#carryingCapacityPelagicForm :input").prop("disabled", false);
            $("#turnoverRatePelagicForm :input").prop("disabled", false);
            $("#spilloverRatePelagicForm :input").prop("disabled", false);
            $("#retentionPelagicForm :input").prop("disabled", false);
            $("#spilloverThresholdPelagicForm :input").attr("disabled", false);
            $("#recruitmentRatePelagicForm :input").attr("disabled", false);
            $("#fecundityPelagicForm :input").attr("disabled", false);
            $("#biomassThresholdPelagicForm :input").attr("disabled", false);
			$("#recruitmentRateForm :input").attr("disabled", false);
			$("#fecundityForm :input").attr("disabled", false);
			$("#fisher-properties-csv-upload-button").prop("disabled", false);
			$("#fisher-properties-csv-upload-button").removeClass("disabled");
			$("#fisher-properties-csv-remove-button").prop("disabled", false);
			$("#fisher-properties-csv-remove-button").removeClass("disabled");
    		$("#data-timestep-range").css({pointerEvents: "all"});
    		$("#year-timestep-slider").css({cursor: "auto"});
    		$("#reset-stop-btn").val(0);
    }
    
    render() {
        return (
                <div className="ccres-header col-xs-12">
                <input type="hidden" id="current-running-state"/>			
                	<input type="hidden" value={this.state.runningState} id="current-runner-state"/>
                <input type="button" className="hidden" id="reset-state-btn" onClick={this.resetBtnState}/>
                <input type="hidden" className="hidden" id="reset-stop-btn" value=""/>
                		<div className="navbar-header m-t-10 m-l-5 col-xs-12">
                    <div className="col-xs-6">
                        <div className="row full-width">
                            <ButtonWithTooltip buttonId="previous-upload" dataTarget="previousUpload" tooltipId="previous-upload-tooltip" buttonClass="btn btn-default cursor-pointer m-r-5 header-button font-size-20" iconName="file_upload" className="btn deck-btn m-r-5" iconClass="material-icons" tooltip="Upload previous simulation" clickEvent={this.uploadPreviousFile}></ButtonWithTooltip>
                            <ButtonWithTooltip buttonId="save-reexecution" tooltipId="saveReexecution-file-tooltip" buttonClass="btn btn-default cursor-pointer m-r-25 header-button font-size-20" iconName="save" className="btn deck-btn m-r-5" iconClass="material-icons" tooltip="Save simulation" clickEvent={this.saveReexecutionFile}></ButtonWithTooltip>
                            <span id="" className="file-name" id="previous-upload-text" name="previousUploadText">No uploaded file yet</span>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <ButtonWithTooltip buttonId="stop-model-btn" tooltipId="stop-model-tooltip" buttonClass="btn btn-default cursor-pointer m-l-8 header-button font-size-20" iconName="stop" className="btn deck-btn m-r-5" iconClass="material-icons font-size-16" tooltip="Reset" clickEvent={this.stopMap}></ButtonWithTooltip>
                        <ButtonWithTooltip buttonId="pause-model-btn" tooltipId="pause-model-tooltip" buttonClass={this.state.runningState == 2 ? 'btn btn-default cursor-pointer m-l-8 header-button font-size-20' : 'btn btn-default cursor-pointer m-l-8 header-button font-size-20 hidden'} iconName="pause" className="btn deck-btn m-r-5" iconClass="material-icons font-size-16" tooltip="Pause" clickEvent={this.pauseMap}></ButtonWithTooltip>
                        <ButtonWithTooltip buttonId="resume-model-btn" tooltipId="resume-model-tooltip" buttonClass={this.state.runningState == 3 ? 'btn btn-default cursor-pointer m-l-8 header-button font-size-20' : 'btn btn-default cursor-pointer m-l-8 header-button font-size-20 hidden'} iconName="play_arrow" className="btn deck-btn m-r-5" iconClass="material-icons font-size-16" tooltip="Resume" clickEvent={this.resumeMap}></ButtonWithTooltip>
                        <ButtonWithTooltip buttonId="play-model-btn" tooltipId="play-model-tooltip" buttonClass={this.state.runningState == 1 ? 'btn btn-default cursor-pointer m-l-8 header-button font-size-20' : 'btn btn-default cursor-pointer m-l-8 header-button font-size-20 hidden'} iconName="play_circle_outline" className="btn deck-btn m-r-5" iconClass="material-icons font-size-16" tooltip="Run" clickEvent={this.runMap}></ButtonWithTooltip>
                        <ButtonWithTooltip buttonId="sidebarCollapse" tooltipId="sideBar-collapse-tooltip" buttonClass="btn btn-default cursor-pointer m-l-8" iconName="tune" className="btn deck-btn m-r-5" iconClass="material-icons font-size-16 rotate-90" tooltip="Model Parameters" clickEvent={this.triggerSideNav}></ButtonWithTooltip>
                        
                        <div className="float-left m-r-25">Years</div>
                        <div id="year-timestep-slider" className="float-left">
                        
                            <input id="timestep-range" type="text"
                                data-slider-id="data-timestep-range"
                                data-provide="slider"
                                data-slider-ticks="[5, 50]"
                                data-slider-ticks-positions="[0,100]"
                                data-slider-ticks-labels='["5","50"]'
                                data-slider-min="5"
                                data-slider-max="50"
                                data-slider-step="5"
                                data-slider-value="5" />   	 
                        </div>
                       
                         <div className="col-xs-3 float-right">
                        	    
                        	</div>
                    </div>
                </div>
            </div>
        );
    }
}
