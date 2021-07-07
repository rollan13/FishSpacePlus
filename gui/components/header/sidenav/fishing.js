import React, { Component } from 'react';

export class Fishing extends Component {
    constructor( props ) {
        super( props );
        this.state = { parameterMode: "no_fishing",
                        displayContent: 1, 
        				uniform: 'yes', 
        				closestfc: 'yes', 
        				closestquota: 'yes', 
        				closestnum: 'yes',
        				smartfc: 'yes',
        				smartquota: 'yes',
        				smartnum: 'yes',
        				randomfc: 'yes', 
        				randomquota: 'yes', 
        				randomnum: 'yes'
        				};

        this.changeParameterMode = this.changeParameterMode.bind( this );
        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
        this.isNumeric = this.isNumeric.bind( this );
        this.checkCurrentValue = this.checkCurrentValue.bind ( this );
        this.resetAllFishing = this.resetAllFishing.bind( this );
        this.appendValuesFromReexecutionFile = this.appendValuesFromReexecutionFile.bind( this );
        this.uploadFile = this.uploadFile.bind( this );
        this.removeFile = this.removeFile.bind( this );
    }

   	uploadFile( event ) {
        var currentTarget = event.currentTarget.dataset.target;
        var eventId = event.target.id;
        if(!$("#" + eventId).hasClass("disabled")){
        		if($("#current-runner-state").val() != 1 && currentTarget == "fisherProperties"){
        			var conf = confirm("Uploading a new Fisher Properties File will reset this simulation run. Would you like to proceed?");
        			if(conf){
        				$("#current-running-state").val(3);
        				$("#stop-model-btn").click();
        				uploadFile(currentTarget);
        			}
        		} else {
    				uploadFile(currentTarget);
    			}
        }
    }

    removeFile( event ) {
        var currentTarget = event.currentTarget.dataset.id;
        removeFile(currentTarget);
    }

    changeParameterMode( event ) {
        this.setState( { parameterMode: event.target.value } );
        if(event.target.value == "uniform") {
            $("#uniform-quota-txtbox").val(0);
            $("#closest-fc-txtbox").val("");
            $("#closest-quota-txtbox").val("");
            $("#closest-num-txtbox").val("");
            $("#random-fc-txtbox").val("");
            $("#random-quota-txtbox").val("");
            $("#random-num-txtbox").val("");
            $("#smart-fc-txtbox").val("");
            $("#smart-quota-txtbox").val("");
            $("#smart-num-txtbox").val("");
        } else if(event.target.value == "closest") {
            $("#uniform-quota-txtbox").val("");
            $("#closest-fc-txtbox").val(0);
            $("#closest-quota-txtbox").val(0);
            $("#closest-num-txtbox").val(0);
            $("#random-fc-txtbox").val("");
            $("#random-quota-txtbox").val("");
            $("#random-num-txtbox").val("");
            $("#smart-fc-txtbox").val("");
            $("#smart-quota-txtbox").val("");
            $("#smart-num-txtbox").val("");
        } else if(event.target.value == "smart_fisher") {
            $("#uniform-quota-txtbox").val("");
            $("#closest-fc-txtbox").val("");
            $("#closest-quota-txtbox").val("");
            $("#closest-num-txtbox").val("");
            $("#smart-fc-txtbox").val(0);
            $("#smart-quota-txtbox").val(0);
            $("#smart-num-txtbox").val(0);
            $("#random-fc-txtbox").val("");
            $("#random-quota-txtbox").val("");
            $("#random-num-txtbox").val("");
        } else if(event.target.value == "random_walk"){
            $("#uniform-quota-txtbox").val("");
            $("#closest-fc-txtbox").val("");
            $("#closest-quota-txtbox").val("");
            $("#closest-num-txtbox").val("");
            $("#random-fc-txtbox").val(0);
            $("#random-quota-txtbox").val(0);
            $("#random-num-txtbox").val(0);
            $("#smart-fc-txtbox").val("");
            $("#smart-quota-txtbox").val("");
            $("#smart-num-txtbox").val("");
        }
    }
    
    hoverInput( event ) {
        if(event.currentTarget.dataset.id == 23) {
            this.setState( { displayContent: 23 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 24) {
            this.setState( { displayContent: 24 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 25) {
            this.setState( { displayContent: 25 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 26) {
            this.setState( { displayContent: 26 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 27) {
            this.setState( { displayContent: 27 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 28) {
            this.setState( { displayContent: 28 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 29) {
            this.setState( { displayContent: 29 }, function() {
                editNotesContent(this.state.displayContent);
            });
        }  else if (event.currentTarget.dataset.id == 40) {
            this.setState( { displayContent: 40 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 41) {
            this.setState( { displayContent: 41 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 38) {
            this.setState( { displayContent: 38 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 39) {
            this.setState( { displayContent: 39 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 43) {
            this.setState( { displayContent: 43 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else {
            this.setState( { displayContent: 0 }, function() {
                editNotesContent(this.state.displayContent);
            });
        }
    }
    
    
    hideGuide( event ) {
        this.setState( { displayContent: 0 }, function() {
            hideTool(this.state.displayContent);
        });
    }
    
    checkCurrentValue( event ){
    		if(event.target.id == "uniform-quota-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({uniform: "no"});
    			} else {
    				this.setState ({uniform: "yes"});
    			}
            }
    		
    		if(event.target.id == "closest-fc-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestfc: "no"});
    			} else {
    				this.setState ({closestfc: "yes"});
    			}
    		}
    		
    		if(event.target.id == "closest-quota-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestquota: "no"});
    			} else {
    				this.setState ({closestquota: "yes"});
    			}
    		}
    		
    		if(event.target.id == "closest-num-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestnum: "no"});
    			} else {
    				this.setState ({closestnum: "yes"});
    			}
    		}
    		
    		if(event.target.id == "smart-fc-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestfc: "no"});
    			} else {
    				this.setState ({closestfc: "yes"});
    			}
    		}
    		
    		if(event.target.id == "smart-quota-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestquota: "no"});
    			} else {
    				this.setState ({closestquota: "yes"});
    			}
    		}
    		
    		if(event.target.id == "smart-num-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({closestnum: "no"});
    			} else {
    				this.setState ({closestnum: "yes"});
    			}
    		}
    		
    		if(event.target.id == "random-fc-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({randomfc: "no"});
    			} else {
    				this.setState ({randomfc: "yes"});
    			}
    		}
    		
    		if(event.target.id == "random-quota-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({randomquota: "no"});
    			} else {
    				this.setState ({randomquota: "yes"});
    			}
    		}
    		
    		if(event.target.id == "random-num-txtbox"){
    			if((((event.target.value).replace(/\s/g,'')) == "")){
    				this.setState ({randomnum: "no"});
    			} else {
    				this.setState ({randomnum: "yes"});
    			}
    		}
    }
 
    isNumeric(event){
		console.log("EVENT VALUE : " + event.target.value + " :::: " + event.target.id);
		$("#"+event.target.id).keydown(function (e) {
			console.log("test");
	        // Allow: backspace, delete, tab, escape, enter and .
	        
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
	    });
	}    
    
    resetAllFishing(){
    		console.log("reset fishing");
    		this.setState({parameterMode: "no_fishing",
                displayContent: 1});
    }

    appendValuesFromReexecutionFile() {
        this.setState({ parameterMode: formSources.fishingParam.type });

        if(headersOf2dArrays.reserve) {
            appendValuesForReserve();
        }

        appendValuesForReserve();
        $("#reserve-dropdown").val(formSources.reserve.type);

        if(formSources.fishingParam.type == "uniform") {
            $("#uniform-quota-txtbox").val(formSources.fishingParam.quota);
        } else if(formSources.fishingParam.type == "closest") {
            $("#closest-fc-txtbox").val(formSources.fishingParam.fisherCount);
            $("#closest-quota-txtbox").val(formSources.fishingParam.quota);
            $("#closest-num-txtbox").val(formSources.fishingParam.numArg);
        } else if(formSources.fishingParam.type == "random_walk") {
            $("#random-fc-txtbox").val(formSources.fishingParam.fisherCount);
            $("#random-quota-txtbox").val(formSources.fishingParam.quota);
            $("#random-num-txtbox").val(formSources.fishingParam.numArg);
        } else if(formSources.fishingParam.type == "smart_fisher"){
        		$("#smart-fc-txtbox").val(formSources.fishingParam.fisherCount);
        		$("#smart-quota-txtbox").val(formSources.fishingParam.quota);
        		$("#smart-num-txtbox").val(formSources.fishingParam.numArg);
        }
    }
    
    render() {
        return (
            <div>
                <div className="row p-t-15">
                    <button className="hidden" id="fishing-reexecution-btn" onClick={this.appendValuesFromReexecutionFile}></button>
                    <button type="button" id="reset-fishing" className="hide" onClick={this.resetAllFishing}></button>
                    <form id="fishingForm">
                    <div className="row full-width new-csv-upload-feature-for-fisher-properties">
                        <label className="font-size-4 text-bold col-xs-5 p-r-0 l-h-25 m-r-25">Reserve Scenario</label>
                        <div className="col-xs-6 p-l-0 p-r-0">
                            <select id="reserve-dropdown" className="form-control text-left" data-id="40" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}>
                            <option defaultValue value="no_reserve">No Reserve</option>
                            </select>
                        </div>
                        <label className="font-size-4 text-bold col-xs-5 p-r-0 l-h-29 m-r-25 m-t-10">Fishing Behaviour</label>
                        <div className="col-xs-6 p-l-0 p-r-0 m-t-10">
                            <select id="select-param-mode" className="form-control text-left" data-id="41" name="type" onChange={this.changeParameterMode} value={this.state.parameterMode} onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}>
                                <option value="no_fishing" defaultValue>No Fishing Activity</option>
                                <option value="closest">Closest fishing ground</option>
                                <option value="random_walk">Random Walk</option>
                                <option value="smart_fisher">Productive fishing ground </option>
                            </select>
                        </div>
                    </div>
                    <div className={this.state.parameterMode != "no_fishing" ? 'col-xs-12' : 'col-xs-12 hidden'}>
                        <hr></hr>
                    </div>
                    <div className="row full-width">
                        <div className="form-group col-xs-12 p-l-0">
                            <div className={this.state.parameterMode == "uniform" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Catch/time step (kg/time step)</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="uniform-quota-txtbox" className={this.state.uniform == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="quota" data-id="23" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                            <div className={this.state.parameterMode == "closest" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Number of Fishers</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="closest-fc-txtbox" className={this.state.closestfc == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="24" name="fisherCount" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                            <div className={this.state.parameterMode == "closest" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Catch Rate (kg/fisher)</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="closest-quota-txtbox" className={this.state.closestquota == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="25" name="quota" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                            <div className={this.state.parameterMode == "closest" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Fishing Range (cells)</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="closest-num-txtbox" className={this.state.closestnum == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="26" name="numArg" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>

                            <div className={this.state.parameterMode == "smart_fisher" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                            		<label className="font-size-2 col-xs-6 p-r-0">Number of Fishers</label>
                            		<div className="col-xs-1 p-l-0"></div>
                            		<div className="col-xs-5 p-l-0">
                            			<input type="text" id="smart-fc-txtbox" className={this.state.closestfc == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="24" name="fisherCount" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                            		</div>
                            </div>
                            <div className={this.state.parameterMode == "smart_fisher" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                            		<label className="font-size-2 col-xs-6 p-r-0">Catch Rate (kg/fisher)</label>
                            		<div className="col-xs-1 p-l-0"></div>
                            		<div className="col-xs-5 p-l-0">
                            			<input type="text" id="smart-quota-txtbox" className={this.state.closestquota == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="25" name="quota" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                            		</div>
                            </div>
                            <div className={this.state.parameterMode == "smart_fisher" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                            		<label className="font-size-2 col-xs-6 p-r-0">Fishing Range (cells)</label>
                            		<div className="col-xs-1 p-l-0"></div>
                            		<div className="col-xs-5 p-l-0">
                            			<input type="text" id="smart-num-txtbox" className={this.state.closestnum == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="26" name="numArg" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                            		</div>
                            </div>
                            <div className={this.state.parameterMode == "random_walk" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Number of Fishers</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="random-fc-txtbox" className={this.state.randomfc == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="27" name="fisherCount" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                            <div className={this.state.parameterMode == "random_walk" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Catch Quota (kg/fisher)</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="random-quota-txtbox" className={this.state.randomquota == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="28" name="quota" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                            <div className={this.state.parameterMode == "random_walk" ? 'row m-t-10' : 'row m-t-10 hidden'}>
                                <label className="font-size-2 col-xs-6 p-r-0">Walk threshold (steps)</label>
                                <div className="col-xs-1 p-l-0">
                                </div>
                                <div className="col-xs-5 p-l-0">
                                    <input type="text" id="random-num-txtbox" className={this.state.randomnum == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} data-id="29" name="numArg" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
					<div className="row full-width fisher-properties-styling">
                                <label className="col-xs-8 m-t-5">Fisher Properties</label>
                                <div id="fpcsv-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="fisher-properties-csv" name="fisherProperties" data-id="43" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="fisherProperties" data-id="38" className="btn deck-btn m-r-5" id="fisher-properties-csv-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="fisherProperties" id="fisher-properties-csv-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                         </div>
                </div>
            </div>
        );
        
    }
}
