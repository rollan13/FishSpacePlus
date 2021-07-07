import React, { Component } from 'react';

export class Line2 extends Component {
	render() {
        return (
            <div className="col-xs-6 full-height">
                <div className="bg-white text-center">
                    <label className="font-size-3 full-width p-15 text-bold label-padding">Total fish catch per timestep</label>
                    <div id="line-chart-2" className="bar">
                    </div>
                </div>
            </div>
        );
    }
}