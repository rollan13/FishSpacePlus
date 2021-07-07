import React, { Component } from 'react';

export class ErrorMessages extends Component {
    render() {
        return(
            <div>
            	<div className="about-ccres-content p-0">
                    <label className="font-size-4 black-text about-text">Error Messages</label>
                    <table className="table black-text help-text">
                        <thead>
                            <tr>
                                <th>Validation</th>
                                <th>When</th>
                                <th>Message Notification</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Habitat Grid Existence Check</td>
                                <td>During Upload</td>
                                <td>Pls. upload a Habitat Grid Map.</td>
                            </tr>
                            <tr>
                                <td>File Format Check</td>
                                <td>During Upload</td>
                                <td>Pls. upload a .CSV format Map File</td>
                            </tr>
                            <tr>
                                <td>Header Check - Habitat Grid</td>
                                <td>During Upload</td>
                                <td>Habitat Grid Map File Invalid. Pls. verify if the following file headers are existing: ID, POINT_X, POINT_Y, and REEF_AREA</td>
                            </tr>
                            <tr>
                                <td>Header Check</td>
                                <td>During Upload</td>
                                <td>Map File Invalid. Pls. verify if the following file headers are existing: ID, POINT_X, POINT_Y.</td>
                            </tr>
                            <tr>
                                <td>Dimension Check</td>
                                <td></td>
                                <td>Pls. upload a map file matching the dimensions of the Habitat Grid Map referenced</td>
                            </tr>
                            <tr>
                                <td>Remove Habitat Grid Check</td>
                                <td>During Removal</td>
                                <td>Removing the Habitat Grid Map will reset this simulation run. Would you like to proceed? [Yes, No]</td>
                            </tr>
                            <tr>
                                <td>Re-upload Habitat Grid Check</td>
                                <td>During Replacement</td>
                                <td>Uploading a new Habitat Grid Map will reset this simulation run. Would you like to proceed? [Yes, No]</td>
                            </tr>
                            <tr>
                                <td>Co-existence of Connectivity and Connectivity Metadata Maps</td>
                                <td>When Run is Invoked</td>
                                <td>Connectivity Map and Connectivity Metadata should be uploaded together</td>
                            </tr>
                            <tr>
                                <td>Completeness of Biomass Parameters</td>
                                <td>When Run is Invoked</td>
                                <td>Kindly provide complete parameter values for Biomass</td>
                            </tr>
                            <tr>
                                <td>Completeness of Fishing Parameters</td>
                                <td>When Run is Invoked</td>
                                <td>Kindly provide complete parameter values for Fishing</td>
                            </tr>
                            <tr>
                                <td>Existence of Required Maps</td>
                                <td>When Run is Invoked</td>
                                <td>Pls. upload the required maps</td>
                            </tr>
                            <tr>
                                <td>Confirm Re-run</td>
                                <td>During upload of a re-run file</td>
                                <td>Uploading a Re-run file will reset this simulation run. Would you like to proceed? [Yes, No]</td>
                            </tr>
                            <tr>
                                <td>Remove Re-run</td>
                                <td>When re-run file is removed</td>
                                <td>Removing this re-run reference will reset this simulation run. Would you like to proceed? [Yes, No]</td>
                            </tr>
                            <tr>
                                <td>Validate File Format of a Re-run file</td>
                                <td>When Run is Invoked</td>
                                <td>Pls. upload a .json file format for the re-run file</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}