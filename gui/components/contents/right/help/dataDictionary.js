import React, { Component } from 'react';

export class DataDictionary extends Component {
    render() {
        return(
            <div>
            	<div className="about-ccres-content p-0">
                    <label className="font-size-4 black-text about-text">Data Dictionary</label>
                    <table className="table black-text help-text">
                        <thead>
                            <tr>
                                <th>Field / Control</th>
                                <th>Type</th>
                                <th>Tooltip Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Habitat grid</td>
                                <td>Text Box</td>
                                <td>Grid with uniform-sized cells that identifies the area occupied by the land and reef within the cell, and their total areal extent across the grid.</td>
                            </tr>
                            <tr>
                                <td>Fisher docks</td>
                                <td>Text Box</td>
                                <td>Grid with cells representing the "dock" or point of departure of fishers at each time step.</td>
                            </tr>
                            <tr>
                                <td>Marine reserves</td>
                                <td>Text Box</td>
                                <td>Grid with cells that describes areas closed to fishing.</td>
                            </tr>
                            <tr>
                                <td>Connectivity metadata</td>
                                <td>Text Box</td>
                                <td>A (n x 3) data table that contains the reef ID, x-position, and y-position of each reef grid in the connectivity matrix.</td>
                            </tr>
                            <tr>
                                <td>Connectivity matrix</td>
                                <td>Text Box</td>
                                <td>A (n x n) matrix that defines the probability of a fish larva dispersed from a source reef (rows) to a sink reef (columns). </td>
                            </tr>
                            <tr>
                                <td>Habitat quality</td>
                                <td>Text Box</td>
                                <td>Grid that describes the quality or condition of corresponding reef cells in the habitat grid.</td>
                            </tr>
                            <tr>
                                <td>Upload File</td>
                                <td>Button</td>
                                <td>Click to select the file to upload.</td>
                            </tr>
                            <tr>
                                <td>Remove File</td>
                                <td>Button</td>
                                <td>Click to delete the uploaded file. </td>
                            </tr>
                            <tr>
                                <td>Initial Biomass Input Mode</td>
                                <td>Selection</td>
                                <td>Select "fixed" or "scaled" to set the initial biomass across reef cells. Selecting "fixed" will set the same initial biomass across all reef cells. Selecting "scaled" will vary the initial biomass across all reef cells based on the map chosen. </td>
                            </tr>
                            <tr>
                                <td>Initial Biomass Map</td>
                                <td>Selection</td>
                                <td>Select map to use to scale the initial biomass (i.e., habitat grid and habitat quality). </td>
                            </tr>
                            <tr>
                                <td>Initial Biomass</td>
                                <td>Text Box</td>
                                <td>Sets basis for scaling the initial biomass. Biomass scaled to the habitat grid will give higher values for larger reef areas, and lower values for smaller reef areas. Biomass scaled to the habitat quality grid will give higher values for reefs with good status, and lower values for reefs with poor status.</td>
                            </tr>
                            <tr>
                                <td>Initial Biomass</td>
                                <td>Text Box</td>
                                <td>Sets the same initial biomass for all reef cells. Recommended for areas with unreliable map data, or for areas with unknown values. </td>
                            </tr>
                            <tr>
                                <td>Carrying Capacity Input Mode</td>
                                <td>Selection</td>
                                <td>Select "fixed" or "scaled" to set the distribution of carrying capacity across reef cells. Selecting "fixed" will set the same carrying capacity across all reef cells. Selecting "scaled" will vary the carrying capacity across all reef cells. </td>
                            </tr>
                            <tr>
                                <td>Carrying Capacity Map</td>
                                <td>Selection</td>
                                <td>Select map to use to scale carrying capacity (i.e., habitat grid and habitat quality).</td>
                            </tr>
                            <tr>
                                <td>Carrying Capacity</td>
                                <td>Text Box</td>
                                <td>Sets basis for scaling carrying capacity. Carrying capacity scaled to the habitat grid will give higher values for larger reef areas, and lower values for smaller reef areas. Carrying capacity scaled to the habitat quality grid will give higher values for reefs with good status, and lower for reefs with poor status. </td>
                            </tr>
                            <tr>
                                <td>Carrying Capacity</td>
                                <td>Text Box</td>
                                <td>Sets the same carrying capacity for all reef cells. Recommended for areas with unreliable map data, or for areas with unknown values. </td>
                            </tr>
                            <tr>
                            	<td>Biomass Threshold</td>
                            	<td>Text Box</td>
                            	<td>Set  the  percentage  of  the  carrying  capacity  that  cannot  be  fished.</td>
                            </tr>
                            <tr>
                                <td>Turnover rate Input Mode</td>
                                <td>Selection</td>
                                <td>Select either "fixed" fish population turnover rate, or estimated "time to reach carrying capacity". The application will calculate the turnover rate if the latter option is selected. </td>
                            </tr>
                            <tr>
                                <td>Turnover rate</td>
                                <td>Text Box</td>
                                <td>Sets a fixed rate for the fish stock. Reduce the value if the connectivity data is available and used in the scenario run. </td>
                            </tr>
                            <tr>
                                <td>Turnover rate</td>
                                <td>Text Box</td>
                                <td>Automatically set the turnover rate based on the inputted number of years it takes to reach carrying capacity.</td>
                            </tr>
                            <tr>
                                <td>Spillover rate</td>
                                <td>Text Box</td>
                                <td>Set a fixed rate or percentage of adult fish that can spillover to adjacent reef cells.</td>
                            </tr>
                            <tr>
                            	<td>Spillover Threshold</td>
                            	<td>Text Box</td>
                            	<td>Set  the  minimum  percentage  of  the  carrying  capacity,  which  will  allow  spillover  to  occur.</td>
                            </tr>
                            <tr>
                        		<td>Fecundity</td>
                        		<td>Text Box</td>
                        		<td>Set the ability of adult fish to produce offspring.</td>
                        	</tr>
                            <tr>
                                <td>Survivorship Input Mode</td>
                                <td>Selection</td>
                                <td>Select option for larvae survivorship based on the availability of connectivity data (none), full connectivity (all reefs are connected), or "scaled" based on a selected map.</td>
                            </tr>
                            <tr>
                            	<td>Survivorship (None)</td>
                            	<td>Selection</td>
                            	<td>Sets  larvae  survivorship  to  zero.  This  option  is  automatically  enabled  when  the  connectivity  data  is  unavailable.</td>
                            </tr>
                            <tr>
                                <td>Survivorship (Map)</td>
                                <td>Selection</td>
                                <td>Select the map to use to scale the survivorship of larvae. This  option  is  only  available  if  a  habitat  quality  map  is  also  loaded.</td>
                            </tr>
                            <tr>
                                <td>Survivorship (Scaled)</td>
                                <td>Textbox</td>
                                <td>The survivorship factor, which is the assumed post-settlement survival of larvae based on the habitat quality parameter selected.</td>
                            </tr>
                            <tr>
                                <td>Survivorship (Fixed)</td>
                                <td>Textbox</td>
                                <td>The survivorship factor, which is the assumed post-settlement survival of larvae.</td>
                            </tr>
                            <tr>
                            	<td>Recruitment</td>
                            	<td>Textbox</td>
                            	<td>The slope of the recruitment curve that determines how much of the larvae will be successfully recruited into the fishable adult population </td>
                            </tr>
                            <tr>
                                <td>Reserve Scenario</td>
                                <td>Selection</td>
                                <td>Select "none" to set the benchmark for the effects of fishing activity on standing stock biomass or the marine reserve map for the simulation.</td>
                            </tr>
                            <tr>
                                <td>Fishing Behavior</td>
                                <td>Selection</td>
                                <td>Select the fishing activity or behaviour in the simulation. Select "no fishing activity" to set the benchmark. "Uniform fishing" refers to single compartment fishing mode. "Closest fishing ground" describes a behaviour wherein fishers are unable to travel long distances, and fish in 'good' reefs nearest to their dock. "Random walk" describes fishers that are able to travel longer distances to satisfy their catch quota. </td>
                            </tr>
                            <tr>
                                <td>Catch per timestep</td>
                                <td>Text Box</td>
                                <td>Indicate the total biomass taken by all fishers as taken uniformly across the grid.</td>
                            </tr>
                            <tr>
                                <td>Number of Fishers</td>
                                <td>Text Box</td>
                                <td>Indicate the number of fishers for the scenario. Number may be hypothetical, or based on actual data.</td>
                            </tr>
                            <tr>
                                <td>Catch Rate</td>
                                <td>Text Box</td>
                                <td>Defines the catch rate per fisher, which can be based on actual or scenario data. This rate is not strictly imposed, as fishers can satisfy their catch or go home empty-handed.</td>
                            </tr>
                            <tr>
                                <td>Fishing Range</td>
                                <td>Text Box</td>
                                <td>Defines the distance limit of each fisher relative to their fishing dock.</td>
                            </tr>
                            <tr>
                                <td>Number of Fishers</td>
                                <td>Text Box</td>
                                <td>Indicate the number of fishers based on actual data or a hypothetical number for your scenario.</td>
                            </tr>
                            <tr>
                                <td>Catch Quota</td>
                                <td>Text Box</td>
                                <td>Defines the catch rate per fisher, which can be based on actual or scenario data. This rate is strictly imposed up to a certain extent, as fishers can travel for extended periods to satisfy their quota.</td>
                            </tr>
                            <tr>
                                <td>Walk Threshold</td>
                                <td>Text Box</td>
                                <td>Limits the number of attempts fishers can have to satisfy their catch. Fishers will be limited by their walk threshold if they have covered all possible reef cells with fishable biomass.</td>
                            </tr>
                            <tr>
                                <td>Raw Data</td>
                                <td>Text Box</td>
                                <td>Saves the raw data in .JSON format. This button will be activated when the session is paused or finished.</td>
                            </tr>
                            <tr>
                                <td>Total Biomass Summary</td>
                                <td>Text Box</td>
                                <td>Saves the total aggregated biomass for all reef cells per timestep. This button will be activated when the session is paused or finished.</td>
                            </tr>
                            <tr>
                                <td>Total Catch Summary</td>
                                <td>Text Box</td>
                                <td>Saves the total aggregated catch for all fishers per timestep. This button will be activated when the session is paused or finished.</td>
                            </tr>
                            <tr>
                                <td>Run Model</td>
                                <td>Button</td>
                                <td>Press to run when all the map data and parameters are loaded.</td>
                            </tr>
                            <tr>
                                <td>Reset</td>
                                <td>Button</td>
                                <td>Press to reset to delete all the loaded map data and parameters.</td>
                            </tr>
                            <tr>
                                <td>Pause Model Execution</td>
                                <td>Button</td>
                                <td>Press to pause model execution and review output data in the Map and Graphs tabs.</td>
                            </tr>
                            <tr>
                                <td>Resume Model Execution</td>
                                <td>Button</td>
                                <td>Press to resume model execution to finish the simulation.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}