import React, { Component } from 'react';

import { About } from './about.js';
import { AboutFishSpace } from './aboutFishSpace.js';
import { SystemSummary } from './systemSummary.js';
import { GettingStarted } from './gettingStarted.js';
import { ErrorMessages } from './errorMessages.js';
import { DataDictionary } from './dataDictionary.js';
import { MeetTheTeam } from './meetTheTeam.js';
import { VideoConvert } from './videoConvert.js';
import { GraphInterpretation } from './graphInterpretation.js';
import { Limitation } from './limitation.js';
import { Acknowledgement } from './acknowledgement.js';

export class Help extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            displayHelpContent: 1
        };

        this.clickHelpTab = this.clickHelpTab.bind(this);       
    };

    clickHelpTab(event) {
        
        if(event.currentTarget.dataset.target == 1) {
            this.setState( { displayHelpContent: 1 } );
        } else if (event.currentTarget.dataset.target == 2) {
            this.setState( { displayHelpContent: 2 } );
        } else if (event.currentTarget.dataset.target == 3) {
            this.setState( { displayHelpContent: 3 } );
        } else if (event.currentTarget.dataset.target == 4) {
            this.setState( { displayHelpContent: 4 } );
        } else if (event.currentTarget.dataset.target == 5) {
            this.setState( { displayHelpContent: 5 } );
        } else if (event.currentTarget.dataset.target == 6) {
            this.setState( { displayHelpContent: 6 } );
        }else if (event.currentTarget.dataset.target == 7) {
            this.setState( { displayHelpContent: 7 } );
        }else if (event.currentTarget.dataset.target == 8) {
            this.setState( { displayHelpContent: 8 } );
        }else if (event.currentTarget.dataset.target == 9) {
            this.setState( { displayHelpContent: 9 } );
        }else if (event.currentTarget.dataset.target == 10) {
            this.setState( { displayHelpContent: 10 } );
        }
    }

    render() {
        return (
                    <div className={this.props.displayContent == 1 ? '' : 'hide'}>
                        <div className="row p-t-15 p-r-15 p-b-15 height-500">
                            <div className="col-xs-4">
                                <div className="about-ccres-area col-xs-12">
                                    <button className="about-ccres-text" data-target="1" onClick={this.clickHelpTab}><label className="font-size-4">About CCRES</label></button>
                                    <button className="about-ccres-text" data-target="2" onClick={this.clickHelpTab}><label className="font-size-4">About Fish SPACE</label></button>
                                    <button className="about-ccres-text" data-target="3" onClick={this.clickHelpTab}><label className="font-size-4">1. System Overview</label></button>
                                    <button className="about-ccres-text" data-target="4" onClick={this.clickHelpTab}><label className="font-size-4">2. Getting Started</label></button>
                                    <button className="about-ccres-text" data-target="5" onClick={this.clickHelpTab}><label className="font-size-4">3. Interpreting  Fish  SPACE  outputs </label></button>
                                    <button className="about-ccres-text" data-target="6" onClick={this.clickHelpTab}><label className="font-size-4">4. Limitations  of  Fish  SPACE</label></button>
                                    <button className="about-ccres-text" data-target="7" onClick={this.clickHelpTab}><label className="font-size-4">5. Error Messages / Troubleshooting</label></button>
                                    <button className="about-ccres-text" data-target="8" onClick={this.clickHelpTab}><label className="font-size-4">6. Data Dictionary</label></button>
                                    <button className="about-ccres-text" data-target="9" onClick={this.clickHelpTab}><label className="font-size-4">7. Video Converter</label></button>
                                    <button className="about-ccres-text" data-target="10" onClick={this.clickHelpTab}><label className="font-size-4">Acknowledgements</label></button>
                                </div>
                            </div>
                            <div className={this.state.displayHelpContent == 1 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <About />
                            </div>
                            <div className={this.state.displayHelpContent == 2 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <AboutFishSpace />
                            </div>
                            <div className={this.state.displayHelpContent == 3 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <SystemSummary />
                            </div>
                            <div className={this.state.displayHelpContent == 4 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <GettingStarted />
                            </div>
                            <div className={this.state.displayHelpContent == 5 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <GraphInterpretation />
                            </div>
                            <div className={this.state.displayHelpContent == 6 ? "col-xs-8" : "col-xs-8 hidden"}>
                                <Limitation />
                            </div>
                            <div className={this.state.displayHelpContent == 7 ? "col-xs-8" : "col-xs-8 hidden"}>
                            	<ErrorMessages />
                            </div>
                            <div className={this.state.displayHelpContent == 8 ? "col-xs-8" : "col-xs-8 hidden"}>
                            	<DataDictionary />
                            </div>
                            <div className={this.state.displayHelpContent == 9 ? "col-xs-8" : "col-xs-8 hidden"}>
                            	<VideoConvert />
                            </div>
                            <div className={this.state.displayHelpContent == 10 ? "col-xs-8" : "col-xs-8 hidden"}>
                            	<Acknowledgement />
                            </div>
                        </div>
                    </div>
                );
            }
}
