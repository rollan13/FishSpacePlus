import React, { Component } from 'react';

export class Limitation extends Component {
	render() {
        return(
        	<div>
	        	<div className="about-ccres-content p-0">
		            <label className="font-size-4 black-text about-text">Limitations  of  Fish  SPACE</label>
		        </div>
		        <div className="about-ccres-content-2 p-0">
		        <label className="font-size-1 help-text black-text">
		        	<ul>
		                <li>Models  a  single  coral  reef  fish  stock  (or  species)  per  simulation;</li>
		                <li>Model  processes  using  weekly  timesteps.  However,  turnover  rates  of  fish  occur  at  an  annual  rate,  larval  dispersal  changes  based  on  seasons,  and  fishing  occurs  at  daily  timesteps; </li>
		                <li>Used  very  simple  assumptions  to  describe  reef  fish  and  coral  reef  relationships,  and  movement  of  fish  and  larvae  across  space; </li>
		                <li>The  habitat  quality  and  connectivity  data  loaded  cannot  be  changed  for  a  simulation.  Hence,  the  effects  of  pulses  of  disturbances  and  other  dynamic  processes  were  not  considered.  For  example,  certain  fishing  practices  and  other  human  activities,  and  natural  stressors  (e.g.,  typhoons,  bleaching  brought  on  by  increased  sea  surface  temperatures)  can  cause  degradation  of  coral  reefs  and  reduction  in  fish  biomass.  Various  stressors  also  affect  larval  output  of  adult  fish  stocks,  and  larval  dispersal,  settlement  and  post-settlement  processes.  </li>
		                <li>Individual-based  model  includes  simple  rules  to  describe  different  fishing  behaviors  and  movement  of  fishers.  Assumes  fishing  behaviors  to  be  simple,  and  that  fishers  are  limited  to  a  single  gear,  single  target  stock,  has  a  catch  requirement  that  can  or  cannot  be  met,  and  strictly  complies  to  imposed  marine  reserves; </li>
		                <li>Models  strictly  protected  no-take  reserves,  and  do  not  consider  other  kinds  of  management  zones;</li>
		                <li>Still  has  properties  of  a  black  box  model,  as  some  of  the  assumptions  used  are  not  mechanistic;</li>
		                <li>A  simulation  results  to  a  single  outcome.  However,  we  recommend  exercising  caution  when  interpreting  the  results,  because  the  model  is  not  entirely  deterministic  since  we  have  used  simple  assumptions  with  some  recommended  default  values  that  are  arbitrary.</li>
		            </ul>
		         </label>
		        </div>
		    </div>
		)
	}
}
