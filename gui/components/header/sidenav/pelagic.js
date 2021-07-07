import React, { Component } from 'react';

export class Pelagic extends Component {
    constructor( props ) {
        super( props );
        this.state = { 
                        displayContent: 1, 
                        initialBiomassPelagic: 'scaled', 
                        carryingCapacityPelagic: 'scaled', 
                        turnoverRatePelagic: 'carrying_capacity', 
                        spilloverRatePelagic: 'fixed', 
                        connectivityPelagic: 'no_connectivity' ,
                        ibioPelagic: 'yes',
                        carcapPelagic: 'yes',
                        tovratePelagic: 'yes',
                        sovratePelagic: 'yes',
                        biotPelagic: 'yes',
                        biotresPelagic: 'yes',
                        fecunPelagic: 'yes',
                        survPelagic: 'yes',
                        recratePelagic: 'yes',
                        textValue: ''
                    };

        this.changeInitialBiomassPelagic = this.changeInitialBiomassPelagic.bind( this );
        this.changeCarryingCapacityPelagic = this.changeCarryingCapacityPelagic.bind( this );
        this.changeTurnoverRatePelagic = this.changeTurnoverRatePelagic.bind( this );
        this.changeSpilloverRatePelagic = this.changeSpilloverRatePelagic.bind( this );
        this.changeConnectivityPelagic = this.changeConnectivityPelagic.bind( this );
        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
        this.checkCurrentValue = this.checkCurrentValue.bind( this );
        this.isNumeric = this.isNumeric.bind( this );
        this.resetFields = this.resetFields.bind( this );
        this.appendValuesFromReexecutionFile = this.appendValuesFromReexecutionFile.bind( this );
        this.checkConnectivityPelagicValues = this.checkConnectivityPelagicValues.bind( this );
        this.checkConnectivityPelagicValuesAndHabitat = this.checkConnectivityPelagicValuesAndHabitat.bind( this );
    }

    changeInitialBiomassPelagic( event ) {
        this.setState( { initialBiomassPelagic: event.target.value } );
        if(event.target.value == "scaled") {
            $("#ib-scaled-txtboxp").val(0);
            $("#ib-fixed-txtboxp").val("");
            this.setState ({ibioPelagic: "yes"});
        } else {
            $("#ib-fixed-txtboxp").val(0);
            $("#ib-scaled-txtboxp").val("");
            this.setState ({ibioPelagic: "yes"});
        }
    }

    changeCarryingCapacityPelagic( event ) {
        this.setState( { carryingCapacityPelagic: event.target.value } );
        if(event.target.value == "scaled") {
            $("#cc-scaled-txtboxp").val(0);
            $("#cc-fixed-txtboxp").val("");
            this.setState ({carcapPelagic: "yes"});
        } else {
            $("#cc-fixed-txtboxp").val(0);
            $("#cc-scaled-txtboxp").val("");
            this.setState ({carcapPelagic: "yes"});
        }
    }

    changeTurnoverRatePelagic( event ) {
        this.setState( { turnoverRatePelagic: event.target.value } );
        if(event.target.value == "carrying_capacity") {
            $("#tr-carrying-txtboxp").val(0);
            $("#tr-fixed-txtboxp").val("");
            this.setState ({tovratePelagic: "yes"});
        } else {
            $("#tr-fixed-txtboxp").val(0);
            $("#tr-carrying-txtboxp").val("");
            this.setState ({tovratePelagic: "yes"});
        }
    }
    
    changeSpilloverRatePelagic( event ) {
        this.setState( { spilloverRatePelagic: event.target.value } );
    }

    changeConnectivityPelagic( event ) {
        this.setState( { connectivityPelagic: event.target.value } );
         if(event.target.value == "scaled") {
            $("#survivorship-scaled-txtboxp").val(0);
            $("#survivorship-full-txtboxp").val("");
            $("#survivorship-no-txtboxp").val("");
            this.setState ({survPelagic: "yes"});
        } else if(event.target.value == "full_connectivity") {
            $("#survivorship-full-txtboxp").val(0);
            $("#survivorship-scaled-txtboxp").val("");
            $("#survivorship-no-txtboxp").val("");
            this.setState ({survPelagic: "yes"});
        } else if(event.target.value == "fixed") {
            $("#survivorship-fixed-txtboxp").val(0);
            $("#survivorship-scaled-txtboxp").val("");
            $("#survivorship-no-txtboxp").val("");
            this.setState ({survPelagic: "yes"});
        } else {
            $("#survivorship-no-txtboxp").val(0);
            $("#survivorship-full-txtboxp").val("");
            $("#survivorship-scaled-txtboxp").val("");
            this.setState ({survPelagic: "yes"});
        }
    }
    
    hoverInput( event ) {
        if(event.currentTarget.dataset.id == 8) {
            this.setState( { displayContent: 8 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 9) {
            this.setState( { displayContent: 9 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 10) {
            this.setState( { displayContent: 10 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 11) {
            this.setState( { displayContent: 11 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 12) {
            this.setState( { displayContent: 12 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 13) {
            this.setState( { displayContent: 13 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 14) {
            this.setState( { displayContent: 14 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 15) {
            this.setState( { displayContent: 15 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 16) {
            this.setState( { displayContent: 16 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 17) {
            this.setState( { displayContent: 17 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 18) {
            this.setState( { displayContent: 18 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 19) {
            this.setState( { displayContent: 19 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 20) {
            this.setState( { displayContent: 20 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 21) {
            this.setState( { displayContent: 21 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 22) {
            this.setState( { displayContent: 22 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 70) {
            this.setState( { displayContent: 37 }, function() {
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
    			if(event.target.id == "ib-scaled-txtboxp" || event.target.id == "ib-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({ibioPelagic: "no"});
    				} else {
    					this.setState ({ibioPelagic: "yes"});
    				}
    			}
    			
    			if(event.target.id == "cc-scaled-txtboxp" || event.target.id == "cc-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({carcapPelagic: "no"});
    				} else {
    					this.setState ({carcapPelagic: "yes"});
    				}
    			}
    		
    			if(event.target.id == "tr-carrying-txtboxp" || event.target.id == "tr-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({tovratePelagic: "no"});
    				} else {
    					this.setState ({tovratePelagic: "yes"});
    				}
    			}
    		
    			if(event.target.id == "sr-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({sovratePelagic: "no"});
    				} else {
    					this.setState ({sovratePelagic: "yes"});
    				}
    			}
    		
    			if(event.target.id == "survivorship-scaled-txtboxp" || event.target.id == "survivorship-full-txtboxp" || event.target.id == "survivorship-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({survPelagic: "no"});
    				} else {
    					this.setState ({survPelagic: "yes"});
    				}
    			}
    			
    			if(event.target.id == "biot-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({biotPelagic: "no"});
    				} else {
    					this.setState ({biotPelagic: "yes"});
    				}
    			}
    			
    			if(event.target.id == "fecun-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({fecunPelagic: "no"});
    				} else {
    					this.setState ({fecunPelagic: "yes"});
    				}
    			}
    			
    			if(event.target.id == "rec-rate-fixed-txtboxp"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({recratePelagic: "no"});
    				} else {
    					this.setState ({recratePelagic: "yes"});
    				}
    			}
        }

    		isNumeric(event){
    			console.log("EVENT VALUE : " + event.target.value + " :::: " + event.target.id);
    			$("#"+event.target.id).keydown(function (e) {
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
    		
    		isZeroOrOne(event){
    			console.log("EVENT VALUE : " + event.target.value + " :::: " + event.target.id);
    			$("#"+event.target.id).keydown(function (e) {
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
    		        if (e.keyCode != 48 && e.keyCode != 49 && e.keyCode != 96 && e.keyCode != 97) {
    		            e.preventDefault();
    		        }
    		    });
    		}
    		
    	resetFields(){
    		console.log("Reset fields");
    		this.setState({displayContent: 1, 
                initialBiomassPelagic: 'scaled', 
                carryingCapacityPelagic: 'scaled', 
                turnoverRatePelagic: 'carrying_capacity', 
                spilloverRatePelagic: 'fixed', 
                connectivityPelagic: 'no_connectivity'});
    		$("#biot-fixed-txtboxp").val("0");
    		$("#rec-rate-fixed-txtboxp").val("0");
    		$("#fecun-fixed-txtboxp").val("0");
    		$("#biotres-fixed-txtbox").val("0");
    	}
		
        appendValuesFromReexecutionFile() {
            if(headersOf2dArrays.habitatGrid) {
                appendValuesForHabitatGrid();
            }

            if(headersOf2dArrays.habitatQuality) {
                appendValuesForHabitatQuality();
            }

            this.setState({ initialBiomassPelagic: formSources.initialBiomassPelagic.type, 
                            carryingCapacityPelagic: formSources.carryingCapacityPelagic.type, 
                            turnoverRatePelagic: formSources.growthRatePelagic.type,
                            connectivityPelagic: formSources.connectivityPelagic.type 
                    });

            $("#sr-type-txtboxp").val(formSources.spilloverRatePelagic.type);
            $("#sr-fixed-txtboxp").val(formSources.spilloverRatePelagic.value);
            
            var fecun = "";
            var recRate = "";
            var threshold = "";
            
            if(formSources.fecundityPelagic.value == "0"){
            		fecun = "0"
            } else {
            		fecun = formSources.fecundityPelagic.value;
            }
            
            if(formSources.recruitmentRatePelagic.value == "0"){
        			recRate = "0"
            } else {
        			recRate = formSources.recruitmentRatePelagic.value;
            }
            
            if(formSources.spilloverThresholdPelagic.value == "0"){
        			threshold = "0"
            } else {
        			threshold = formSources.spilloverThresholdPelagic.value;
            }
            
            $("#fecun-fixed-txtboxp").val(fecun);
            $("#rec-rate-fixed-txtboxp").val(recRate);
            $("#biot-fixed-txtboxp").val(threshold);
            
            if(formSources.initialBiomassPelagic.type == "scaled") {
                $("#ib-scaled-txtboxp").val(formSources.initialBiomassPelagic.value);
                $("#ib-scaled-dropdownp").val(formSources.initialBiomassPelagic.map);
				if(formSources.initialBiomass.type == "scaled") {
                	$("#ib-scaled-txtbox").val(formSources.initialBiomass.value);
                	$("#ib-scaled-dropdown").val(formSources.initialBiomass.map);                
            	} else {
                	$("#ib-fixed-txtbox").val(formSources.initialBiomass.value);
            	}            
            } else {
                $("#ib-fixed-txtboxp").val(formSources.initialBiomassPelagic.value);
            }

            if(formSources.carryingCapacityPelagic.type == "scaled") {
                $("#cc-scaled-txtboxp").val(formSources.carryingCapacityPelagic.value);
                $("#cc-scaled-dropdownp").val(formSources.carryingCapacityPelagic.map);
				if(formSources.carryingCapacity.type == "scaled") {
                	$("#cc-scaled-txtbox").val(formSources.carryingCapacity.value);
                	$("#cc-scaled-dropdown").val(formSources.carryingCapacity.map);                 
            	} else {
                	$("#cc-fixed-txtbox").val(formSources.carryingCapacity.value);
            	}          
            } else {
                $("#cc-fixed-txtboxp").val(formSources.carryingCapacityPelagic.value);
            }

            if(formSources.growthRatePelagic.type == "carrying_capacity") {
                $("#tr-carrying-txtboxp").val(formSources.growthRatePelagic.value);                
            } else {
                $("#tr-fixed-txtboxp").val(formSources.growthRatePelagic.value);
            }

            if(formSources.connectivityPelagic.type == "scaled") {
                $("#survivorship-scaled-txtboxp").val(formSources.connectivityPelagic.value);
                $("#survivorship-scaled-dropdownp").val(formSources.connectivityPelagic.map);
				if(formSources.connectivity.type == "scaled"){
					$(".assert-this-value-demersal").val(formSources.connectivity.map); 
				} else {
					$("#survivorship-no-txtbox").val(formSources.connectivity.value);
				}
            } else {
                $("#survivorship-no-txtboxp").val(formSources.connectivityPelagic.value);
            }
        
            $("#biotres-fixed-txtboxp").val(formSources.biomassThresholdPelagic.value);
        }

        checkConnectivityPelagicValues() {
            if(!checkIsEmpty(fileSources.connectivityMatrixPelagic) && !checkIsEmpty(fileSources.connectivityMetadataPelagic)) {
                this.setState( { connectivityPelagic: "scaled" } );
                $("#select-survp").prop('disabled', false);
                $("#survivorship-scaled-txtboxp").val(0);
                $("#survivorship-no-txtboxp").val("");
                $("#rec-rate-fixed-txtboxp").val(0);
                $("#fecun-fixed-txtboxp").val(0);
                $("#rec-rate-fixed-txtboxp").prop('disabled', false);
                $("#fecun-fixed-txtboxp").prop('disabled', false);
            } else {
                this.setState( { connectivityPelagic: "no_connectivity" } );
                $("#select-survp").prop('disabled', true);
                $("#rec-rate-fixed-txtboxp").prop('disabled', true);
                $("#fecun-fixed-txtboxp").prop('disabled', true);
                $("#survivorship-no-txtboxp").val(0);
                $("#survivorship-scaled-txtboxp").val("");
                $("#rec-rate-fixed-txtboxp").val(0);
                $("#fecun-fixed-txtboxp").val(0);
            }
            
        }
        
        checkConnectivityPelagicValuesAndHabitat() {
            if((!checkIsEmpty(fileSources.connectivityMatrixPelagic) && !checkIsEmpty(fileSources.connectivityMetadataPelagic)) && checkIsEmpty(fileSources.habitatQuality.arrays2d)) {
                this.setState( { connectivityPelagic: "fixed" } );
                $("#select-survp").prop('disabled', true);
                $("#survivorship-fixed-txtboxp").val(0);
                $("#survivorship-no-txtboxp").val("");
                $("#survivorship-scaled-txtboxp").val("");
            } else if (!checkIsEmpty(fileSources.connectivityMatrixPelagic) && !checkIsEmpty(fileSources.connectivityMetadataPelagic) && !(checkIsEmpty(fileSources.habitatQuality.arrays2d))) {
            		this.setState( { connectivityPelagic: "scaled" } );
                $("#select-survp").prop('disabled', false);
                $("#survivorship-scaled-txtboxp").val(0);
                $("#survivorship-no-txtboxp").val("");
                $("#survivorship-fixed-txtboxp").val("");
            } else {
            		this.setState( { connectivityPelagic: "no_connectivity" } );
            		$("#select-survp").prop('disabled', true);
            		$("#survivorship-no-txtboxp").val(0);
            		$("#survivorship-scaled-txtboxp").val("");
            		$("#survivorship-fixed-txtboxp").val("");
            }
        }

    render() {
        return(
             <div>
                <div id="fish-params" className="row p-t-15">
                    <button className="hidden" id="check-connectivitypelagic-btn" onClick={this.checkConnectivityPelagicValues}></button>
                    <button className="hidden" id="check-connectivity-habitatpelagic-btn" onClick={this.checkConnectivityPelagicValuesAndHabitat}></button>
                    <button className="hidden" id="pelagic-reexecution-btn" onClick={this.appendValuesFromReexecutionFile}></button>
            		<button type="button" id="reset-all" className="hide" onClick={this.resetFields}></button>
                    <label className="col-xs-12 font-size-4 text-bold">PELAGIC FISH</label>
                    <div className="row full-width">
                        <div className="form-group full-width">
                            <form id="initialBiomassPelagicForm">
                            <div className="row form-group">
                                <div className="col-xs-12 p-0 m-t-15">
                                    <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                        <label className="col-xs-12 biomass-label">Initial Biomass</label>
                                    </div>
                                    <div className="col-xs-7 p-l-0">
                                        <select id="select-initial" className="form-control text-left" name="type" onChange={this.changeInitialBiomassPelagic} value={this.state.initialBiomassPelagic} data-id="8" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            <option value="scaled" defaultValue>Scaled</option>
                                            <option value="fixed">Fixed Value</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={this.state.initialBiomassPelagic == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                 <div className="hide col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div> 
                                    <div className="col-xs-offset-5 col-xs-7 p-0">
                                     <div className="hide col-xs-4 p-0">
                                            <select id="ib-scaled-dropdownp" className="form-control text-left maps-dropdown" name="map" data-id="9" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            </select>
                                        </div> 
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="ib-scaled-txtboxp" className={this.state.ibioPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="10" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">
                                            <label className="font-size-1">kg/sqm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.initialBiomassPelagic == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="ib-fixed-txtboxp" className={this.state.ibioPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="11" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                            <div className="col-xs-2 p-0 p-l-5">	
                                            <div className="col-xs-2 p-0 text-right p-l-5">
                                            kg
                                            </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </form>
                            <form id="carryingCapacityPelagicForm">
                            <div className="row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Carrying Capacity</label>
                                </div>
                                <div className="col-xs-7 p-l-0">
                                    <select id="select-carrying-cap" className="form-control text-left" name="type" onChange={this.changeCarryingCapacityPelagic} value={this.state.carryingCapacity} data-id="12" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                        <option value="scaled" defaultValue>Scaled</option>
                                        <option value="fixed">Fixed Value</option>
                                    </select>
                                </div>
                                <div className={this.state.carryingCapacityPelagic == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                 <div className="hide col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div> 
                                    <div className="col-xs-offset-5 col-xs-7 p-0">
                                      <div className="hide col-xs-4 p-0">
                                            <select id="cc-scaled-dropdownp" className="form-control text-left maps-dropdown" name="map" data-id="13" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            </select>
                                        </div> 
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="cc-scaled-txtboxp" className={this.state.carcapPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="14" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">
                                            <label className="font-size-1">kg/sqm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.carryingCapacityPelagic == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="cc-fixed-txtboxp" className={this.state.carcapPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="15" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 p-l-5">
                                            kg
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <form id="biomassThresholdPelagicForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Biomass Threshold</label>
									<input type="hidden" id="biot-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="biotres-fixed-txtboxp" name="value" className={this.state.biotresPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="turnoverRatePelagicForm">
                            <div className="row form-group">
                                <div className="col-xs-12 p-0">
                                    <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                        <label className="col-xs-12 biomass-label">Turnover Rate</label>
                                    </div>
                                    <div className="col-xs-7 p-l-0">
                                        <select id="select-tr" className="form-control text-left" name="type" onChange={this.changeTurnoverRatePelagic} value={this.state.turnoverRatePelagic} data-id="16" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            <option value="carrying_capacity">Time to reach carrying capacity</option>
                                            <option value="fixed">Fixed Value</option>
                                        </select>
                                     </div>
                                </div>
                                <div className={this.state.turnoverRatePelagic == 'carrying_capacity' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="tr-carrying-txtboxp" className={this.state.tovratePelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="17" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">weeks</div>
                                    </div>
                                </div>
                                <div className={this.state.turnoverRatePelagic == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-12 p-r-0 p-l-0">
                                            <input type="text" id="tr-fixed-txtboxp" className={this.state.tovratePelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="18" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                    </div>
                                </div>
                           </div>
                            </form>
                            <form id="spilloverRatePelagicForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Spillover</label>
									<input type="hidden" id="sr-type-txtboxp" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="sr-fixed-txtboxp" name="value" className={this.state.sovratePelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="spilloverThresholdPelagicForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Spillover Threshold</label>
									<input type="hidden" id="biot-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="biot-fixed-txtboxp" name="value" className={this.state.biotPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="fecundityPelagicForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Fecundity</label>
									<input type="hidden" id="fecun-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="fecun-fixed-txtboxp" name="value" className={this.state.fecunPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} disabled/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="retentionPelagicForm">
                            <div className="row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Survivorship</label>
                                </div>
                                <div className="col-xs-7 p-l-0">
                                    <select id="select-survp" className="form-control text-left" name="type" onChange={this.changeConnectivityPelagic} value={this.state.connectivityPelagic} data-id="19" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                        <option value="no_connectivity" defaultValue>None</option>
                                        <option value="scaled">Scaled</option>
                                        <option value="fixed">Fixed</option>
                                    </select>
                                </div>
                                <div className={this.state.connectivityPelagic == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-4 p-0">
                                            <select id="survivorship-scaled-dropdownp" className="form-control text-left maps-dropdown" name="map" data-id="70" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}>
                                            </select>
                                        </div>
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="survivorship-scaled-txtboxp" className={this.state.survPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="20" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">

                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.connectivityPelagic == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                		<div className="col-xs-5 text-right p-r-28">

                                		</div>
                                		<div className="col-xs-7 p-0">
                                			<div className="col-xs-12 p-r-0 p-l-0">
                                        		<input type="text" id="survivorship-fixed-txtboxp" className={this.state.survPelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="99" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        		</div>
                                     </div>
                                </div>
                                <div className={this.state.connectivityPelagic == 'no_connectivity' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-12 p-r-0 p-l-0">
                                            <input type="text" id="survivorship-no-txtboxp" className='form-control text-right' name="value" data-id="22" defaultValue="0" readOnly onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <form id="recruitmentRatePelagicForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Recruitment</label>
									<input type="hidden" id="rec-rate-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="rec-rate-fixed-txtboxp" name="value" className={this.state.recratePelagic == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)} disabled/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
       );
    }
}
