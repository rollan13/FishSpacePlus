import React, { Component } from 'react';

export class Histogram extends Component {
	render() {
        return (
            <div className="col-xs-6 m-b-5 full-height">
                <div className="bg-white text-center">
                    <label className="font-size-3 full-width p-15 text-bold label-padding">Distance travelled by fishers</label>
                    <div id="histogram">
                    </div>
                </div>
            </div>
        );
    }
}