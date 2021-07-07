import React, { Component } from 'react';

export class SystemSummary extends Component {
    render() {
        return(
            <div>
            	<div className="about-ccres-content p-0">
                    <label className="font-size-4 black-text about-text">System Overview</label>
                    
                    <label className="font-size-1 help-text black-text">                                        
                        <b>3.1 Software Description</b>
                        
                        <p>Fish  SPACE  is  a  stand-alone  desktop  software  application  that  presents  the  status  of  a  particular  coral  reef  fish  in  biomass  terms  (i.e.,  kilograms,  metric  tons)  for  a  particular  area  with  different  levels  of  habitat  quality  and  fishing  pressure,  and  marine  reserve  designs.</p>
                        
                        <b>3.2 Minimum Requirements:</b>

                        <p><b>For Windows:</b></p>
                        <ul>
                            <li>2GB RAM</li>
                            <li>System Type: 64-bit Operating System</li>
                            <li>Processor: Intel(R) Core(™) i5-2500 CPU @3.30GHz 3.30 GHz</li>
                            <li>Windows 7</li>
                        </ul>

                        <p><b>For Macbook:</b></p>
                        <ul>
                            <li>Processor: 2.4 GHz Intel Core i5</li>
                            <li>Memory 4 GB 1333 MHz DDR3</li>
                            <li>Graphics Intel HD Graphics 3000 384 MB</li>
                        </ul>
                    </label>
                </div>
            </div>
        )
    }
}