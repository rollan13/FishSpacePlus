import React, { Component } from 'react';
import { Tab, Tabs, ProgressBar, FlatButton, Popover, ReactBootstrapSlider } from 'react-bootstrap';

import { Maps } from './maps.js';
import { Fish } from './fish.js';
import { Pelagic } from './pelagic.js';
import { Fishing } from './fishing.js';
import { Output } from './output.js';

export class SideNav extends Component {
	constructor( props ) {
        super( props );
        this.state = {runningState: 1, displayContent: 1};
    
        this.runMap = this.runMap.bind(this);
        this.stopMap = this.stopMap.bind(this);
        this.pauseMap = this.pauseMap.bind(this);
        this.resumeMap = this.resumeMap.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.hoverInput = this.hoverInput.bind( this );
        this.hideGuide = this.hideGuide.bind( this );
    }

    hoverInput( event ) {
        if(event.currentTarget.dataset.id == 33) {
            this.setState( { displayContent: 33 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 34) {
            this.setState( { displayContent: 34 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 35) {
            this.setState( { displayContent: 35 }, function() {
                editNotesContent(this.state.displayContent);
            });
        } else if (event.currentTarget.dataset.id == 36) {
            this.setState( { displayContent: 36 }, function() {
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
    
    runMap() {
        var x = checkMinimumRunSatisfied();
        console.log(x);
        
        if(x){
            this.setState({runningState: 2});
            runModel();
        } else {
            alert("Minimum requirement not satisfied");
        }
    }
    
    pauseMap() {
        play = false;
        this.setState({runningState: 3});
    }
    
    resumeMap(){
            play = true;
            plotTimestep();
            this.setState({runningState: 2});
    }
    
    stopMap() {
            play = false;
            this.setState({runningState: 1});
    }
    
    closeNav() {
        document.getElementById("sidebar").classList.toggle("active");
    }

    render() {
        return (
            <div>
                <nav id="sidebar" ref="sidebar" className="p-b-15 box-shadow">
                    <div className="sidebar-header row">
                        <div className="col-xs-7" id="close-button">
                            <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&gt;</a>
                        </div>
                    </div>
                    <ul className="list-unstyled components m-0 p-0">
                        <div className="col-xs-12 p-0">
                            <div className="row">
                                <Tabs defaultActiveKey={1} animation={false} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Maps"><Maps /></Tab>
                                    <Tab eventKey={2} title="Demersal"><Fish /></Tab>
									<Tab eventKey={5} title="Pelagic"><Pelagic /></Tab>
                                    <Tab eventKey={3} title="Fishing"><Fishing /></Tab>
                                    <Tab eventKey={4} title="Output"><Output /></Tab>
                                </Tabs>
                            </div>
                            <div className="full-width m-l-5 m-r-5 hidden" id="tooltip-guide">
                                <div className="col-xs-12" id="tooltip-header">
                                    <span>NOTES:</span>
                                </div>
                                <div className="col-xs-12" id="tooltip-content">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </nav>
            </div>
        );
    }
}