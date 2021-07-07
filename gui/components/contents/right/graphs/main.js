import React, { Component } from 'react';

import { Histogram } from './histogram.js';
import { Line } from './line.js';
import { Line2 } from './line2.js';
import { Graph } from './graph.js';

export class Graphs extends Component {
	render() {
        return (
            <div className={this.props.displayContent == 3 ? '' : 'hide'}>
                <div className="row border border-secondary height-500">
                <div id="biomass-legend-div" className="hide">
                <img src="assets/biomass-legend.PNG"/>
                </div>
                    <div className="row">
                        <Histogram />
                        <Line />
                        <Line2 />
                        <Graph />
                    </div>
                </div>
            </div>
        );
    }
}