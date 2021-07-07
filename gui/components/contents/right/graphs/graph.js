import React, { Component } from 'react';

export class Graph extends Component {
	render() {
        return (
            <div className="col-xs-5 m-l-45 full-height summaryTable">
                <div id="summaryTable">
                    <table>
                        <tbody>
                            <tr><td>Summary Table</td></tr>
                          <tr>
                            <td>Length of Run</td>
                            <td><span id="runYears"></span> years</td>
                          </tr>
                          <tr>
                            <td>Non-reserve Biomass</td>
                            <td><span id="bioMass"></span> mt/sqkm</td>
                          </tr>
                          <tr>
                            <td>Reserve Biomass</td>
                            <td><span id="bioRes"></span> mt/sqkm</td>
                          </tr>
                          <tr>
                          	<td>Reserve Area</td>
                          	<td><span id="resArea"></span> sqkm</td>
                          </tr>
                          <tr>
                            <td>Non-reserve Area</td>
                            <td><span id="NonResArea"></span> sqkm</td>
                          </tr>
                          <tr>
                            <td>Minimum Distance Travelled</td>
                            <td><span id="minDis"></span> cells</td>
                          </tr>
                          <tr>
                            <td>Maximum Distance Travelled</td>
                            <td><span id="maxDis"></span> cells</td>
                          </tr>
                          <tr>
                            <td>Number of fishers that satisfied catch</td>
                            <td><span id="satFisher"></span></td>
                          </tr>
                          </tbody>
                    </table>
                </div>
            </div>
        );
    }
}