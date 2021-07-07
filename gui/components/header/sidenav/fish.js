//Demersal Fishing
import React, { Component } from 'react';

export class Fish extends Component {
    constructor( props ) {
        super( props );
        this.state = { 
                        displayContent: 1, 
                        initialBiomass: 'scaled', 
                        carryingCapacity: 'scaled', 
                        turnoverRate: 'carrying_capacity', 
                        spilloverRate: 'fixed', 
                        connectivity: 'no_connectivity' ,
                        ibio: 'yes',
                        carcap: 'yes',
                        tovrate: 'yes',
                        sovrate: 'yes',
                        biot: 'yes',
                        biotres: 'yes',
                        fecun: 'yes',
                        surv: 'yes',
                        recrate: 'yes',
                        textValue: ''
                    };

        this.changeInitialBiomass = this.changeInitialBiomass.bind( this );
        this.changeCarryingCapacity = this.changeCarryingCapacity.bind( this );
        this.changeTurnoverRate = this.changeTurnoverRate.bind( this );
        this.changeSpilloverRate = this.changeSpilloverRate.bind( this );
        this.changeConnectivity = this.changeConnectivity.bind( this );
        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
        this.checkCurrentValue = this.checkCurrentValue.bind( this );
        this.isNumeric = this.isNumeric.bind( this );
        this.resetFields = this.resetFields.bind( this );
        this.appendValuesFromReexecutionFile = this.appendValuesFromReexecutionFile.bind( this );
        this.checkConnectivityValues = this.checkConnectivityValues.bind( this );
        this.checkConnectivityValuesAndHabitat = this.checkConnectivityValuesAndHabitat.bind( this );
    }

    changeInitialBiomass( event ) {
        this.setState( { initialBiomass: event.target.value } );
        if(event.target.value == "scaled") {
            $("#ib-scaled-txtbox").val(0);
            $("#ib-fixed-txtbox").val("");
            this.setState ({ibio: "yes"});
        } else {
            $("#ib-fixed-txtbox").val(0);
            $("#ib-scaled-txtbox").val("");
            this.setState ({ibio: "yes"});
        }
    }

    changeCarryingCapacity( event ) {
        this.setState( { carryingCapacity: event.target.value } );
        if(event.target.value == "scaled") {
            $("#cc-scaled-txtbox").val(0);
            $("#cc-fixed-txtbox").val("");
            this.setState ({carcap: "yes"});
        } else {
            $("#cc-fixed-txtbox").val(0);
            $("#cc-scaled-txtbox").val("");
            this.setState ({carcap: "yes"});
        }
    }

    changeTurnoverRate( event ) {
        this.setState( { turnoverRate: event.target.value } );
        if(event.target.value == "carrying_capacity") {
            $("#tr-carrying-txtbox").val(0);
            $("#tr-fixed-txtbox").val("");
            this.setState ({tovrate: "yes"});
        } else {
            $("#tr-fixed-txtbox").val(0);
            $("#tr-carrying-txtbox").val("");
            this.setState ({tovrate: "yes"});
        }
    }
    
    changeSpilloverRate( event ) {
        this.setState( { spilloverRate: event.target.value } );
    }

    changeConnectivity( event ) {
        this.setState( { connectivity: event.target.value } );
         if(event.target.value == "scaled") {
            $("#survivorship-scaled-txtbox").val(0);
            $("#survivorship-full-txtbox").val("");
            $("#survivorship-no-txtbox").val("");
            this.setState ({surv: "yes"});
        } else if(event.target.value == "full_connectivity") {
            $("#survivorship-full-txtbox").val(0);
            $("#survivorship-scaled-txtbox").val("");
            $("#survivorship-no-txtbox").val("");
            this.setState ({surv: "yes"});
        } else if(event.target.value == "fixed") {
            $("#survivorship-fixed-txtbox").val(0);
            $("#survivorship-scaled-txtbox").val("");
            $("#survivorship-no-txtbox").val("");
            this.setState ({surv: "yes"});
        } else {
            $("#survivorship-no-txtbox").val(0);
            $("#survivorship-full-txtbox").val("");
            $("#survivorship-scaled-txtbox").val("");
            this.setState ({surv: "yes"});
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
        } else if (event.currentTarget.dataset.id == 37) {
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
    			if(event.target.id == "ib-scaled-txtbox" || event.target.id == "ib-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({ibio: "no"});
    				} else {
    					this.setState ({ibio: "yes"});
    				}
    			}
    			
    			if(event.target.id == "cc-scaled-txtbox" || event.target.id == "cc-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({carcap: "no"});
    				} else {
    					this.setState ({carcap: "yes"});
    				}
    			}
    		
    			if(event.target.id == "tr-carrying-txtbox" || event.target.id == "tr-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({tovrate: "no"});
    				} else {
    					this.setState ({tovrate: "yes"});
    				}
    			}
    		
    			if(event.target.id == "sr-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({sovrate: "no"});
    				} else {
    					this.setState ({sovrate: "yes"});
    				}
    			}
    		
    			if(event.target.id == "survivorship-scaled-txtbox" || event.target.id == "survivorship-full-txtbox" || event.target.id == "survivorship-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({surv: "no"});
    				} else {
    					this.setState ({surv: "yes"});
    				}
    			}
    			
    			if(event.target.id == "biot-fixed-txtbox"){
    				console.log("HEllo");
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({biot: "no"});
    				} else {
    					this.setState ({biot: "yes"});
    				}
    			}
    			
    			if(event.target.id == "fecun-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({fecun: "no"});
    				} else {
    					this.setState ({fecun: "yes"});
    				}
    			}
    			
    			if(event.target.id == "rec-rate-fixed-txtbox"){
    				if((((event.target.value).replace(/\s/g,'')) == "")){
    					this.setState ({recrate: "no"});
    				} else {
    					this.setState ({recrate: "yes"});
    				}
    			}
        }
    
//    	isNumeric(event){
//    		var x = event.target.value;
//    		
//    		var isValid = isInputZeroToOne(x);
//    		var isValidZeroToPointOneValue = isInputZeroToPointOne(x);
//    		var isValidPositiveDecimalValue = isValidPositiveDecimal(x);
//    		
//    		var regex = /[^[0-9 \.]]*/gi;
//    		var new_value = x.replace(regex,'');
//    		
//    		if(event.target.id == "sr-fixed-txtbox" || event.target.id == "tr-fixed-txtbox"){ // TR fixed and SR
//    			$("#" + event.target.id).val(new_value);
//    			if((event.target.value.match(/\./g)|| []).length > 1){
//   			 	$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//   		 	}
//    			if(isValid){
//    				$("#" + event.target.id).removeClass("error-border");
//    				if(((event.target.value).replace(/\s/g,'')) == ""){
//    					$("#" + event.target.id).addClass("error-border");
//    				} else {
//    					$("#" + event.target.id).removeClass("error-border");
//    				}
//    			} else {
//    				$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//    				$("#" + event.target.id).addClass("error-border");
//    				alert("Input out of range must be 0 to 1");
//    			}
//    		} else if(event.target.id == "ib-fixed-txtbox" || event.target.id == "ib-scaled-txtbox"
//    	|| event.target.id == "cc-fixed-txtbox" || event.target.id == "cc-scaled-txtbox"){        // IB & CC
//    			$("#" + event.target.id).val(new_value);
//    			if((event.target.value.match(/\./g)|| []).length > 1){
//   			 	$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//   		 	}
//    		
//    			if(isValidPositiveDecimalValue){
//    				$("#" + event.target.id).removeClass("error-border");
//    				if(((event.target.value).replace(/\s/g,'')) == ""){
//    					$("#" + event.target.id).addClass("error-border");
//    				} else {
//    					$("#" + event.target.id).removeClass("error-border");
//    				}
//    			} else {
//    				$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//    				$("#" + event.target.id).addClass("error-border");
//    				alert("Input out of range must be a positive value.");
//    			}
//    		} else if(event.target.id == "survivorship-full-txtbox" || event.target.id == "survivorship-scaled-txtbox" || event.target.id == "survivorship-fixed-txtbox"){          //Survivorship
//    			$("#" + event.target.id).val(new_value);
//    			if((event.target.value.match(/\./g)|| []).length > 1){
//   			 	$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//   		 	}
//    		
//    			if(isValid){
//    				$("#" + event.target.id).removeClass("error-border");
//    				if(((event.target.value).replace(/\s/g,'')) == ""){
//    					$("#" + event.target.id).addClass("error-border");
//    				} else {
//    					$("#" + event.target.id).removeClass("error-border");
//    				}
//    			} else {
//    				$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//    				$("#" + event.target.id).addClass("error-border");
//    				alert("Input out of range must be 0 to 1");
//    			}
//    		} else if(event.target.id == "tr-carrying-txtbox"){          //TR Timetoreach
//    			$("#" + event.target.id).val(new_value);
//    			if((event.target.value.match(/\./g)|| []).length > 1){
//   			 	$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//   		 	}
//    		
//    			if(isValidPositiveDecimalValue){
//    				$("#" + event.target.id).removeClass("error-border");
//    				if(((event.target.value).replace(/\s/g,'')) == ""){
//    					$("#" + event.target.id).addClass("error-border");
//    				} else {
//    					$("#" + event.target.id).removeClass("error-border");
//    				}
//    			} else {
//    				$("#" + event.target.id).val(event.target.value.substr(0, new_value.length - 1));
//    				$("#" + event.target.id).addClass("error-border");
//    				alert("Input out of range must be positive value.");
//    			}
//    		}
//    		// End //
//    	}
    	
    
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
                initialBiomass: 'scaled', 
                carryingCapacity: 'scaled', 
                turnoverRate: 'carrying_capacity', 
                spilloverRate: 'fixed', 
                connectivity: 'no_connectivity'});
    		$("#biot-fixed-txtbox").val("0");
    		$("#rec-rate-fixed-txtbox").val("0");
    		$("#fecun-fixed-txtbox").val("0");
    		$("#biotres-fixed-txtbox").val("0");
    	}

        appendValuesFromReexecutionFile() {
            if(headersOf2dArrays.habitatGrid) {
                appendValuesForHabitatGrid();
            }

            if(headersOf2dArrays.habitatQuality) {
                appendValuesForHabitatQuality();
            }

            this.setState({ initialBiomass: formSources.initialBiomass.type, 
                            carryingCapacity: formSources.carryingCapacity.type, 
                            turnoverRate: formSources.growthRate.type,
                            connectivity: formSources.connectivity.type 
                    });

            $("#sr-type-txtbox").val(formSources.spilloverRate.type);
            $("#sr-fixed-txtbox").val(formSources.spilloverRate.value);
            
            var fecun = "";
            var recRate = "";
            var threshold = "";
            
            if(formSources.fecundity.value == "0"){
            		fecun = "0"
            } else {
            		fecun = formSources.fecundity.value;
            }
            
            if(formSources.recruitmentRate.value == "0"){
        			recRate = "0"
            } else {
        			recRate = formSources.recruitmentRate.value;
            }
            
            if(formSources.spilloverThreshold.value == "0"){
        			threshold = "0"
            } else {
        			threshold = formSources.spilloverThreshold.value;
            }
            
            $("#fecun-fixed-txtbox").val(fecun);
            $("#rec-rate-fixed-txtbox").val(recRate);
            $("#biot-fixed-txtbox").val(threshold);
            
            if(formSources.initialBiomass.type == "scaled") {
                $("#ib-scaled-txtbox").val(formSources.initialBiomass.value);
                $("#ib-scaled-dropdown").val(formSources.initialBiomass.map);                
            } else {
                $("#ib-fixed-txtbox").val(formSources.initialBiomass.value);
            }

            if(formSources.carryingCapacity.type == "scaled") {
                $("#cc-scaled-txtbox").val(formSources.carryingCapacity.value);
                $("#cc-scaled-dropdown").val(formSources.carryingCapacity.map);                 
            } else {
                $("#cc-fixed-txtbox").val(formSources.carryingCapacity.value);
            }

            if(formSources.growthRate.type == "carrying_capacity") {
                $("#tr-carrying-txtbox").val(formSources.growthRate.value);                
            } else {
                $("#tr-fixed-txtbox").val(formSources.growthRate.value);
            }

            if(formSources.connectivity.type == "scaled") {
                $("#survivorship-scaled-txtbox").val(formSources.connectivity.value);
                $("#survivorship-scaled-dropdown-demersal").val(formSources.connectivity.map);
            } else {
                $("#survivorship-no-txtbox").val(formSources.connectivity.value);
            }
        
            $("#biotres-fixed-txtbox").val(formSources.biomassThreshold.value);
        }

        checkConnectivityValues() {
            if(!checkIsEmpty(fileSources.connectivityMatrix) && !checkIsEmpty(fileSources.connectivityMetadata)) {
                this.setState( { connectivity: "scaled" } );
                $("#select-surv").prop('disabled', false);
                $("#survivorship-scaled-txtbox").val(0);
                $("#survivorship-no-txtbox").val("");
                $("#rec-rate-fixed-txtbox").val(0);
                $("#fecun-fixed-txtbox").val(0);
                $("#rec-rate-fixed-txtbox").prop('disabled', false);
                $("#fecun-fixed-txtbox").prop('disabled', false);
            } else {
                this.setState( { connectivity: "no_connectivity" } );
                $("#select-surv").prop('disabled', true);
                $("#rec-rate-fixed-txtbox").prop('disabled', true);
                $("#fecun-fixed-txtbox").prop('disabled', true);
                $("#survivorship-no-txtbox").val(0);
                $("#survivorship-scaled-txtbox").val("");
                $("#rec-rate-fixed-txtbox").val(0);
                $("#fecun-fixed-txtbox").val(0);
            }
            
        }
        
        checkConnectivityValuesAndHabitat() {
            if((!checkIsEmpty(fileSources.connectivityMatrix) && !checkIsEmpty(fileSources.connectivityMetadata)) && checkIsEmpty(fileSources.habitatQuality.arrays2d)) {
                this.setState( { connectivity: "fixed" } );
                $("#select-surv").prop('disabled', true);
                $("#survivorship-fixed-txtbox").val(0);
                $("#survivorship-no-txtbox").val("");
                $("#survivorship-scaled-txtbox").val("");
            } else if (!checkIsEmpty(fileSources.connectivityMatrix) && !checkIsEmpty(fileSources.connectivityMetadata) && !(checkIsEmpty(fileSources.habitatQuality.arrays2d))) {
            		this.setState( { connectivity: "scaled" } );
                $("#select-surv").prop('disabled', false);
                $("#survivorship-scaled-txtbox").val(0);
                $("#survivorship-no-txtbox").val("");
                $("#survivorship-fixed-txtbox").val("");
            } else {
            		this.setState( { connectivity: "no_connectivity" } );
            		$("#select-surv").prop('disabled', true);
            		$("#survivorship-no-txtbox").val(0);
            		$("#survivorship-scaled-txtbox").val("");
            		$("#survivorship-fixed-txtbox").val("");
            }
        }

    render() {
        return(
             <div>
                <div id="fish-params" className="row p-t-15">
                    <button className="hidden" id="check-connectivity-btn" onClick={this.checkConnectivityValues}></button>
                    <button className="hidden" id="check-connectivity-habitat-btn" onClick={this.checkConnectivityValuesAndHabitat}></button>
                    <button className="hidden" id="fish-reexecution-btn" onClick={this.appendValuesFromReexecutionFile}></button>
            		<button type="button" id="reset-all" className="hide" onClick={this.resetFields}></button>
                    <label className="col-xs-12 font-size-4 text-bold">DEMERSAL FISH</label>
                    <div className="row full-width">
                        <div className="form-group full-width">
                            <form id="initialBiomassForm">
                            <div className="row form-group">
                                <div className="col-xs-12 p-0 m-t-15">
                                    <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                        <label className="col-xs-12 biomass-label">Initial Biomass</label>
                                    </div>
                                    <div className="col-xs-7 p-l-0">
                                        <select id="select-initial" className="form-control text-left" name="type" onChange={this.changeInitialBiomass} value={this.state.initialBiomass} data-id="8" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            <option value="scaled" defaultValue>Scaled</option>
                                            <option value="fixed">Fixed Value</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={this.state.initialBiomass == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-4 p-0">
                                            <select id="ib-scaled-dropdown" className="form-control text-left maps-dropdown" name="map" data-id="9" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            </select>
                                        </div>
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="ib-scaled-txtbox" className={this.state.ibio == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="10" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">
                                            <label className="font-size-1">kg/sqm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.initialBiomass == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="ib-fixed-txtbox" className={this.state.ibio == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="11" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
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
                            <form id="carryingCapacityForm">
                            <div className="row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Carrying Capacity</label>
                                </div>
                                <div className="col-xs-7 p-l-0">
                                    <select id="select-carrying-cap" className="form-control text-left" name="type" onChange={this.changeCarryingCapacity} value={this.state.carryingCapacity} data-id="12" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                        <option value="scaled" defaultValue>Scaled</option>
                                        <option value="fixed">Fixed Value</option>
                                    </select>
                                </div>
                                <div className={this.state.carryingCapacity == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-4 p-0">
                                            <select id="cc-scaled-dropdown" className="form-control text-left maps-dropdown" name="map" data-id="13" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            </select>
                                        </div>
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="cc-scaled-txtbox" className={this.state.carcap == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="14" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">
                                            <label className="font-size-1">kg/sqm</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.carryingCapacity == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="cc-fixed-txtbox" className={this.state.carcap == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="15" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 p-l-5">
                                            kg
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <form id="biomassThresholdForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Biomass Threshold</label>
									<input type="hidden" id="biot-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="biotres-fixed-txtbox" name="value" className={this.state.biotres == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="turnoverRateForm">
                            <div className="row form-group">
                                <div className="col-xs-12 p-0">
                                    <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                        <label className="col-xs-12 biomass-label">Turnover Rate</label>
                                    </div>
                                    <div className="col-xs-7 p-l-0">
                                        <select id="select-tr" className="form-control text-left" name="type" onChange={this.changeTurnoverRate} value={this.state.turnoverRate} data-id="16" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                            <option value="carrying_capacity">Time to reach carrying capacity</option>
                                            <option value="fixed">Fixed Value</option>
                                        </select>
                                     </div>
                                </div>
                                <div className={this.state.turnoverRate == 'carrying_capacity' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-10 p-r-0 p-l-0">
                                            <input type="text" id="tr-carrying-txtbox" className={this.state.tovrate == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="17" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">weeks</div>
                                    </div>
                                </div>
                                <div className={this.state.turnoverRate == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-12 p-r-0 p-l-0">
                                            <input type="text" id="tr-fixed-txtbox" className={this.state.tovrate == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="18" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                    </div>
                                </div>
                           </div>
                            </form>
                            <form id="spilloverRateForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Spillover</label>
									<input type="hidden" id="sr-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="sr-fixed-txtbox" name="value" className={this.state.sovrate == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="spilloverThresholdForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Spillover Threshold</label>
									<input type="hidden" id="biot-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="biot-fixed-txtbox" name="value" className={this.state.biot == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="fecundityForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Fecundity</label>
									<input type="hidden" id="fecun-type-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="fecun-fixed-txtbox" name="value" className={this.state.fecun == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} disabled/>
                                    </div>
                                    <div className="col-xs-2 p-0 text-right p-l-5"></div>
                                </div>
                            </div>
                            </form>
                            <form id="retentionForm">
                            <div className="row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label">Survivorship</label>
                                </div>
                                <div className="col-xs-7 p-l-0">
                                    <select id="select-surv" className="form-control text-left" name="type" onChange={this.changeConnectivity} value={this.state.connectivity} data-id="19" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} >
                                        <option value="no_connectivity" defaultValue>None</option>
                                        <option value="scaled">Scaled</option>
                                        <option value="fixed">Fixed</option>
                                    </select>
                                </div>
                                <div className={this.state.connectivity == 'scaled' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">
                                        <label className="col-xs-12 font-size-1">Maps:</label>
                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-4 p-0">
                                            <select id="survivorship-scaled-dropdown-demersal" className="form-control text-left maps-dropdown assert-this-value-demersal" name="map" data-id="37" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}>
                                            </select>
                                        </div>
                                        <div className="col-xs-6 p-r-0 p-l-5">
                                            <input type="text" id="survivorship-scaled-txtbox" className={this.state.surv == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="20" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                        <div className="col-xs-2 p-0 text-right p-l-5">

                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.connectivity == 'fixed' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                		<div className="col-xs-5 text-right p-r-28">

                                		</div>
                                		<div className="col-xs-7 p-0">
                                			<div className="col-xs-12 p-r-0 p-l-0">
                                        		<input type="text" id="survivorship-fixed-txtbox" className={this.state.surv == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} name="value" data-id="99" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        		</div>
                                     </div>
                                </div>
                                <div className={this.state.connectivity == 'no_connectivity' ? 'col-xs-12 m-t-5' : 'col-xs-12m-t-5 hidden'}>
                                    <div className="col-xs-5 text-right p-r-28">

                                    </div>
                                    <div className="col-xs-7 p-0">
                                        <div className="col-xs-12 p-r-0 p-l-0">
                                            <input type="text" id="survivorship-no-txtbox" className='form-control text-right' name="value" data-id="22" defaultValue="0" readOnly onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <form id="recruitmentRateForm">
                            <div className="col-xs-12 row form-group">
                                <div className="col-xs-5 p-r-40 p-l-0 text-right l-h-25">
                                    <label className="col-xs-12 biomass-label p-l-0">Recruitment</label>
									<input type="hidden" id="rec-rate-txtbox" name="type" defaultValue="fixed" />
                                </div>
                                <div className="col-xs-7 p-0">
                                    <div className="col-xs-12 p-r-0 p-l-0">
                                        <input type="text" id="rec-rate-fixed-txtbox" name="value" className={this.state.recrate == 'yes' ? 'form-control text-right' : 'form-control text-right error-border'} defaultValue="0" onChange={this.checkCurrentValue} onFocus={(event) => this.isNumeric(event)} disabled/>
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
