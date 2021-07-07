import React, { Component } from 'react';
import { Tab, Tabs, ProgressBar, FlatButton, Popover, ReactBootstrapSlider } from 'react-bootstrap';

import { Help } from './help/help.js';
import { Maps } from './maps/maps.js';
import { Graphs } from './graphs/graph.js';

export class Right extends Component {
    render() {
        return (
            <div className="col-xs-10 p-0">
                <div className="col-xs-12 p-t-15">
                    <Help displayContent={this.props.displayContent} />
                    <Maps displayContent={this.props.displayContent} />
                    <Graphs displayContent={this.props.displayContent} />
                    <ProgressBar now={this.props.progressBarValue} />
                </div>
            </div>
        );
    }
}