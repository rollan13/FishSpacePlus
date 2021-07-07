import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, ProgressBar, FlatButton, Popover, ReactBootstrapSlider } from 'react-bootstrap';

/* Header */
import { Header } from './components/header/main.js';
import { SideNav } from './components/header/sidenav/main.js';

/* Content */
import { LeftNav } from './components/contents/left/main.js';
// import { Right } from './components/contents/right/main.js';

import { Maps } from './components/contents/right/maps/main.js';
import { Help } from './components/contents/right/help/main.js';
import { Graphs } from './components/contents/right/graphs/main.js';

/* Footer */
import { Footer } from './components/footer/main.js';

class App extends Component {
    render() {
        return (
            <div>
                <div id="main-page" className="hidden">
                    <Header />
                    <Content />
                    <Footer />
                </div>
                <div id="welcome-page" className="text-center">
                    <img src="assets/fish-space-logov2.png" />
                    <div className="col-xs-12">
                        <h3 id="splash-text">
                            Fisheries for sustaining people’s access through conservation and equitable systems
                        </h3>
                    </div>
                    <div className="col-xs-12">
                            <div className="loader-2"></div>
                    </div>        
                </div>
            </div>
        );
    }
}

class Content extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            progressBarValue: 0,
            displayContent: 1,
        };

        // This binding is necessary to make `this` work in the callback
        this.clickTab = this.clickTab.bind( this );
    }

    updateProgressBar(){
    	this.setState({ progressBarValue: document.getElementById("progress-bar-value").value }); 
    }
    
    clickTab( event ) {
        var helpButton = $("#help-btn");
        var mapButton = $("#map-btn");
        var graphButton = $("#graph-btn");
        
        if(event.currentTarget.dataset.id == 1) {
            this.setState( { displayContent: 1 } );
            $(helpButton).addClass("sidenav-active");
            $(mapButton).removeClass("sidenav-active");
            $(graphButton).removeClass("sidenav-active");
        } else if (event.currentTarget.dataset.id == 2) {
            this.setState( { displayContent: 2 } );
            $(mapButton).addClass("sidenav-active");
            $(graphButton).removeClass("sidenav-active");
            $(helpButton).removeClass("sidenav-active");
        } else if (event.currentTarget.dataset.id == 3) {
            this.setState( { displayContent: 3 } );
            $(graphButton).addClass("sidenav-active");
            $(mapButton).removeClass("sidenav-active");
            $(helpButton).removeClass("sidenav-active");
        }
    }

    render() {
        return (
            <div className="ccres-content">
            	<input type="hidden" id="progress-bar-value"/>
  				<button id="progress-bar-btn" className="hidden" onClick={this.updateProgressBar}></button>
                <LeftNav clickTab={this.clickTab} />
                <SideNav />
                <Right progressBarValue={this.state.progressBarValue} displayContent={this.state.displayContent} />
            </div>
        );
    }
}

class Right extends Component {
    render() {
        return (
            <div className="col-xs-11 p-0">
                <div className="col-xs-12 p-t-15">
                    <Help displayContent={this.props.displayContent} />
                    <Maps displayContent={this.props.displayContent} />
                    <Graphs displayContent={this.props.displayContent} />
                    <div className="col-xs-12 row font-size-1">
                        <div className="col-xs-6 m-t-5">
                            <span>Current Time step: </span>
                            <span id="current-ts"> 0</span>
                        </div>
                        <div className="col-xs-6 text-right m-t-5">
                            <span>Elapsed Time: <span id="display-area">00:00:00.000</span></span>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <ProgressBar now={this.props.progressBarValue} label={this.props.progressBarValue}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
