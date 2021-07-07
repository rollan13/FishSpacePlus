import React, { Component } from 'react';

export class LeftNav extends Component {
	render() {
        return (
            <div className="sidenav col-xs-1 p-l-0 p-r-0">
                <div className="col-xs-12 p-0">
                    <a id="help-btn" href="#" onClick={this.props.clickTab} data-id="1" className="black-text"><i className="material-icons float-left p-l-15">info_outline</i><span className="sidenav-text">Help</span></a>
                </div>
                <div className="col-xs-12 p-0">
                    <a id="map-btn" href="#" onClick={this.props.clickTab} data-id="2" className="black-text"><i className="material-icons float-left p-l-15">map</i><span className="sidenav-text">Maps</span></a>
                </div>
                <div className="col-xs-12 p-0">
                    <a id="graph-btn" href="#" onClick={this.props.clickTab} data-id="3" className="black-text"><i className="material-icons float-left p-l-15">multiline_chart</i><span className="sidenav-text">Graphs</span></a>
                </div>
            </div>
        );
    }
}