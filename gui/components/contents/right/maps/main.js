import React, { Component } from 'react';

export class Maps extends Component {
	constructor( props ) {
        super( props );

        this.state = {recordingState: 1};     
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
    };
    
    startRecord(){
    		this.setState({recordingState: 2});
    }
    
    stopRecord(){
    		this.setState({recordingState: 1});
    }
    
    render() {
        return (
            <div className={this.props.displayContent == 2 ? 'row border border-secondary' : 'row border border-secondary hide'}>
                <div className="row var-height">
                    <div className="col-xs-11 var-height var-height-2nd-parent p-0">
                    	    <div className="col-xs-12 text-right p-0">
                    	    <button type="button" id="start-record" className={this.state.recordingState == 1 ? "btn btn-primary cursor-pointer m-l-8" : "btn btn-primary cursor-pointer m-l-8 hidden"} onClick={this.startRecord}>Record</button>
                    	    <button type="button" id="stop-record" className={this.state.recordingState == 2 ? "btn btn-primary cursor-pointer m-l-8" : "btn btn-primary cursor-pointer m-l-8 hidden"} onClick={this.stopRecord}>Stop</button>
                            <canvas id="timestep-canvas" style={{display:'none'}}></canvas>
                            <canvas id="record-canvas" style={{display:'none'}}></canvas>
                    	    </div>
                    	<div id="fishingParent" className="col-xs-6 border border-secondary bg-white p-0 var-height">
                            <label className="font-size-3 full-width p-l-15 font-weight-bold">Fishing Activity</label>
                            	<canvas id="water-layer1" className="fishing-activity-canvas" z-index="9">
                            </canvas>
                            <canvas id="land-layer1" className="fishing-activity-canvas" z-index="10">
                            </canvas>
                            <canvas id="reef-layer1" className="fishing-activity-canvas" z-index="11">
                            </canvas>
                            <canvas id="mpa-layer" className="fishing-activity-canvas" z-index="12">
                            </canvas>
                            <canvas id="fisher-layer" className="fishing-activity-canvas" z-index="13">
                            </canvas>
                            <canvas id="left-layered" className="fishing-activity-canvas" z-index="14">
                            </canvas>
                        </div>
                        <div className="col-xs-6 full-height border border-secondary bg-white p-0 var-height">
                            <div className="col-xs-12 p-0"><label className="font-size-3 font-weight-bold">Biomass </label><span className="font-size-1"> ( Min : <span id="bio-min">0</span> | Max : <span id="bio-max">0 </span>)</span></div>
                            <canvas id="water-layer2" className="biomass-canvas" z-index="19">
                            </canvas>
                            <canvas id="land-layer2" className="biomass-canvas" z-index="20">
                            </canvas>
                            <canvas id="reef-layer2" className="biomass-canvas" z-index="21">
                            </canvas>
                            <canvas id="biomass-layer" className="biomass-canvas" z-index="22">
                            </canvas>
                            <canvas id="right-layered" className="biomass-canvas" z-index="23">
                            </canvas>
                        </div>
                    </div>
                    <div className="col-xs-1">
                        <img className="temp-scale-img var-height" src="assets/temp-scale-image.png"></img>
                    </div>
                </div>
            </div>
        );
    }
}
