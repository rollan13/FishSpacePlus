import React, { Component } from 'react';

import { LeftNav } from './leftNav.js';
import { SideNav } from './../header/sideNav.js';
import { Right } from './right.js';

export class Content extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            progressBarValue: 0,
            displayContent: 1,
        };

        // This binding is necessary to make `this` work in the callback
        this.clickLeftTabs = this.clickLeftTabs.bind( this );
        this.clickTab = this.clickTab.bind( this );
    }

    clickLeftTabs( key ) {
        if ( key === 1 ) {
            this.setState( {
                progressBarValue: 0
            } );
        } else if ( key === 2 ) {
            this.setState( {
                progressBarValue: 25
            } );
        } else if ( key === 3 ) {
            this.setState( {
                progressBarValue: 50
            } );
        } else {
            this.setState( {
                progressBarValue: 75
            } );
        }
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
                <LeftNav clickTab={this.clickTab} />
                <SideNav clickLeftTabs={this.clickLeftTabs} />
                <Right progressBarValue={this.state.progressBarValue} displayContent={this.state.displayContent} />
            </div>
        );
    }
}