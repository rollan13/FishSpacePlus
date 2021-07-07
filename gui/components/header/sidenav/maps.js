import React, { Component } from 'react';

export class Maps extends Component {
    constructor( props ) {
        super( props );
        this.state = {displayContent : 1};

        this.uploadFile = this.uploadFile.bind( this );
        this.removeFile = this.removeFile.bind( this );
        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
    }

    uploadFile( event ) {
        var currentTarget = event.currentTarget.dataset.target;
        var eventId = event.target.id;
        if(!$("#" + eventId).hasClass("disabled")){
        		if($("#current-runner-state").val() != 1 && currentTarget == "habitatGrid"){
        			var conf = confirm("Uploading a new Habitat Grid Map will reset this simulation run. Would you like to proceed?");
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
    
    hoverInput( event ) {
        var currentTarget = event.currentTarget.dataset.id;
        if (currentTarget == 2) {
            this.setState( { displayContent: 2 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (currentTarget == 3) {
            this.setState( { displayContent: 3 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (currentTarget == 4) {
            this.setState( { displayContent: 4 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (currentTarget == 5) {
            this.setState( { displayContent: 5 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (currentTarget == 6) {
            this.setState( { displayContent: 6 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (currentTarget == 7) {
            this.setState( { displayContent: 7 }, function() {
            	editNotesContent(this.state.displayContent);	
            	});			
        } else if (currentTarget == 38) {			
            	this.setState( { displayContent: 38 }, function() {			
            	editNotesContent(this.state.displayContent);			
            	});			
        } else if (currentTarget == "habitatGrid" || currentTarget == "fisherDocks" || currentTarget == "reserve" || currentTarget == "reserveMetadata"		
            	|| currentTarget == "connectivityMatrix" || currentTarget == "connectivityMetadata"	
            	|| currentTarget == "connectivityMatrixPelagic" || currentTarget == "connectivityMetadataPelagic"	
            	|| currentTarget == "habitatQuality") {			
              	this.setState( { displayContent: 39 }, function() {
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
                    <div className="row p-t-15 p-b-15">
                         <div className="row full-width">
                            <label className="col-xs-8 p-r-0">Habitat Grid (Land & Reef)<label className="red-text">*</label></label>
                            <div id="hg-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                <div className="col-xs-2 p-l-0 p-r-0">
                                    <div className="loader"></div>
                                </div>
                                <div className="col-xs-7 p-l-0 l-h-13">
                                    <span className="font-size-1">Uploading...</span>
                                </div>
                            </div>
                            <div className="col-xs-8 maps-input">
                                <input type="text" className="form-control" id="habitat-grid" name="habitatGrid" data-id="2" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                            </div>
                            <div className="col-xs-4 p-l-0">
                            		<button type="button" data-target="habitatGrid" data-id="38" className="btn deck-btn m-r-5" id="habitat-grid-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                            		<button type="button" className="btn deck-btn" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.removeFile} data-id="habitatGrid" id="habitat-grid-remove-button"><i className="material-icons red-text" onMouseLeave={this.hideGuide}>clear</i></button>
                            </div>
                        </div>
                        <hr></hr>
                        <form id="leftMapsForm">
                            <div className="row full-width">
                                <label className="col-xs-8 p-r-0">Fisher Docks<label className="red-text">*</label></label>
                                <div id="fd-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="fisher-docks" name="fisherDocks" data-id="3" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="fisherDocks" data-id="38" className="btn deck-btn m-r-5" id="fisher-docks-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="fisherDocks" id="fisher-docks-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                            </div>
                            <div className="row full-width">
                                <label className="col-xs-8 m-t-5">Marine Reserve</label>
                                <div id="mr-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="marine-reserve" name="marineReserve" data-id="4" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="reserve" data-id="38" className="btn deck-btn m-r-5" id="mpa-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="reserve" id="mpa-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                            </div>
                            <div className="row full-width">
                            	<label className="col-xs-8 m-t-5">Marine Reserve Metadata</label>
                            	<div id="mr-loader-metadata" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                            		<div className="col-xs-2 p-l-0 p-r-0">
                            			<div className="loader"></div>
                            		</div>
                            		<div className="col-xs-7 p-l-0 l-h-13">
                                    	<span className="font-size-1">Uploading...</span>
                                    	</div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                	<input type="text" className="form-control" id="marine-reserve-metadata" name="reserveMetadata" data-id="46" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                            		<button type="button" data-target="reserveMetadata" data-id="38" className="btn deck-btn m-r-5" id="mpa-upload-button-metadata" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                            		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="reserveMetadata" id="mpa-remove-button-metadata" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                            	</div>
                            </div>
                            <div className="row full-width">
                                <label className="col-xs-8 m-t-5">Connectivity Matrix (Demersal)</label>
                                <div id="cmat-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="connectivity-matrix" name="connectivityMatrix" data-id="5" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="connectivityMatrix" data-id="38" className="btn deck-btn m-r-5" id="connectivity-matrix-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="connectivityMatrix" id="connectivity-matrix-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                            </div>
                            <div className="row full-width">
                                <label className="col-xs-8 m-t-5">Connectivity Metadata (Demersal)</label>
                                <div id="cmet-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="connectivity-metadata" name="connectivityMetadata" data-id="6" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="connectivityMetadata" data-id="38" className="btn deck-btn m-r-5" id="connectivity-metadata-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="connectivityMetadata" id="connectivity-metadata-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                            </div>
                            <div className="row full-width">
                            	<label className="col-xs-8 m-t-5">Connectivity Matrix (Pelagic)</label>
                            	<div id="cmatpelagic-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                <div className="col-xs-2 p-l-0 p-r-0">
                                    <div className="loader"></div>
                                </div>
                                <div className="col-xs-7 p-l-0 l-h-13">
                                    <span className="font-size-1">Uploading...</span>
                                </div>
                            </div>
                            <div className="col-xs-8 maps-input">
                                <input type="text" className="form-control" id="connectivity-matrix-pelagic" name="connectivityMatrixPelagic" data-id="44" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                            </div>
                            <div className="col-xs-4 p-l-0">
                            		<button type="button" data-target="connectivityMatrixPelagic" data-id="38" className="btn deck-btn m-r-5" id="connectivity-matrix-upload-button-pelagic" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                            		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="connectivityMatrixPelagic" id="connectivity-matrix-remove-button-pelagic" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                            </div>
                            </div>
                            <div className="row full-width">
                            	<label className="col-xs-8 m-t-5">Connectivity Metadata (Pelagic)</label>
                            		<div id="cmetpelagic-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                            			<div className="col-xs-2 p-l-0 p-r-0">
                            				<div className="loader"></div>
                            			</div>
                            			<div className="col-xs-7 p-l-0 l-h-13">
                                    		<span className="font-size-1">Uploading...</span>
                                    	</div>
                                    </div>
                                    <div className="col-xs-8 maps-input">
                                    	<input type="text" className="form-control" id="connectivity-metadata-pelagic" name="connectivityMetadataPelagic" data-id="45" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                    </div>
                                    <div className="col-xs-4 p-l-0">
                            			<button type="button" data-target="connectivityMetadataPelagic" data-id="38" className="btn deck-btn m-r-5" id="connectivity-metadata-upload-button-pelagic" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                            			<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="connectivityMetadataPelagic" id="connectivity-metadata-remove-button-pelagic" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                            		</div>
                            		</div>
                            <div className="row full-width">
                            	<label className="col-xs-8 m-t-5">Habitat Quality</label>
                                <div id="hq-loader" className="loader-area hide col-xs-4 p-l-0 m-t-8 m-b-5">
                                    <div className="col-xs-2 p-l-0 p-r-0">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="col-xs-7 p-l-0 l-h-13">
                                        <span className="font-size-1">Uploading...</span>
                                    </div>
                                </div>
                                <div className="col-xs-8 maps-input">
                                    <input type="text" className="form-control" id="habitat-quality" name="habitatQuality" data-id="7" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} readOnly />
                                </div>
                                <div className="col-xs-4 p-l-0">
                                		<button type="button" data-target="habitatQuality" data-id="38" className="btn deck-btn m-r-5" id="habitat-quality-upload-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide} onClick={this.uploadFile}><i className="material-icons">file_upload</i></button>
                                		<button type="button" className="btn deck-btn" onClick={this.removeFile} data-id="habitatQuality" id="habitat-quality-remove-button" onMouseOver={this.hoverInput} onMouseLeave={this.hideGuide}><i className="material-icons red-text">clear</i></button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
         );
    }
}
