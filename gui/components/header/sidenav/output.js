import React, { Component } from 'react';

export class Output extends Component {
    constructor( props ) {
        super( props );
        this.state = { displayContent: 1 };

        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
        this.onClickOutputButtons = this.onClickOutputButtons.bind( this );
    }
    
    onClickOutputButtons( event ) {
    	if(event.currentTarget.dataset.id == 30) {
            if(!$("#raw-data-btn").hasClass("disabled")) {
                onClickRawData();
            }
        } else if (event.currentTarget.dataset.id == 31) {
            if(!$("#total-biomass-btn").hasClass("disabled")) {
                onClickTotalBiomass();
            }
        } else if (event.currentTarget.dataset.id == 32) {
            if(!$("#fisher-summary-btn").hasClass("disabled")) {
                onClickFisherSummary();
            }
        } else if (event.currentTarget.dataset.id == 42) {
            if(!$("#bpc-btn").hasClass("disabled")) {
            	onClickFinalBiomassPerCell();
            }
        } else if (event.currentTarget.dataset.id == 43) {
            if(!$("#bpt-btn").hasClass("disabled")) {
            	onClickBiomassPerTimeStep();
            }
        } else if (event.currentTarget.dataset.id == 44) {
            if(!$("#fcpt-btn").hasClass("disabled")) {
            	onClickFisherCatchPerTimestep();
            }
        }
    }
    
    hoverInput( event ) {
        if(event.currentTarget.dataset.id == 30) {
            this.setState( { displayContent: 30 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 31) {
            this.setState( { displayContent: 31 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 32) {
            this.setState( { displayContent: 32 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 33) {
            this.setState( { displayContent: 33 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 42) {
            this.setState( { displayContent: 42 }, function() {
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
    render() {
        return (
            <div>
                <div className="row p-t-15">
                    <div className="row full-width">
                        <div className="form-group col-xs-12">
                            <div className="row m-t-10 m-t-10">
                                <label className="font-size-2 col-xs-5 p-r-0">Raw Data</label>
                                <button type="button" id="raw-data-btn" className="btn deck-btn" data-id="30" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                            </div>
                            <div className="row m-t-10">
                                <label className="font-size-2 col-xs-5 p-r-0">Total Biomass</label>
                                <button type="button" id="total-biomass-btn" className="btn deck-btn" data-id="31" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                            </div>
                            <div className="row m-t-10">
                                <label className="font-size-2 col-xs-5 p-r-0">Fisher Summary</label>
                                <button type="button" id="fisher-summary-btn" className="btn deck-btn" data-id="32" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                            </div>
                            <div className="row m-t-10">
                            	<label className="font-size-2 col-xs-5 p-r-0">Final Biomass per Cell</label>
                            	<button type="button" id="bpc-btn" className="btn deck-btn" data-id="42" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                            </div>
                            <div className="row m-t-10">
                        		<label className="font-size-2 col-xs-5 p-r-0">Biomass per Timestep</label>
                        		<button type="button" id="bpt-btn" className="btn deck-btn" data-id="43" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                        	</div>
                        	<div className="row m-t-10">
                    			<label className="font-size-2 col-xs-5 p-r-0">Catch per Timestep</label>
                    			<button type="button" id="fcpt-btn" className="btn deck-btn" data-id="44" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.onClickOutputButtons} ><i className="material-icons">save</i></button>
                    		</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}