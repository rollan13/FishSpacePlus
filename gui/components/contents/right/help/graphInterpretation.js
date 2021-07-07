import React, { Component } from 'react';

export class GraphInterpretation extends Component {
	render() {
        return(
        	<div>
	        	<div className="about-ccres-content p-0">
		            <label className="font-size-4 black-text about-text">Interpreting  Fish  SPACE  outputs  </label>
		            <label className="font-size-1 help-text black-text">
        				<p>We  recommend  running  a  no  fishing  scenario,  and  a  no  reserve  with  fishing  scenario  to  set  benchmarks.  The  no  fishing  scenario  allows  us  to  determine  how  much  time  it  takes  for  the  fish  stock  to  reach  carrying  capacity  in  an  ideal  scenario;  whereas,  the  no  reserve  with  fishing  scenario  describes  what  happens  to  the  system  when  there  are  no  interventions  in  place,  and  when  the  fishery  would  collapse.  You  may  then  opt  to  use  different  marine  reserve  designs  and  fishing  intensities  (i.e.,  change  the  number  of  fishers,  catch  rates  and  fishing  ranges)  to  determine  potential  effects  such  decisions  on  the  fishery,  and  compare  the  benefits  and  consequences  of  such  decisions. </p>
        				<p>You  may  use  the  Graphs  tab  to  refer  to  the  outputs  of  Fish  SPACE  for  each  scenario  and  save  screen  grabs,  and/or  save  output  files  in  CSV  format  (Please  refer  to  the  Outputs  tab  in  the  Model  Parameters  floating  window).    You  can  save  the  output  data  for  the  biomass  and  fisher  catch  summary,  and  plot  them  using  MS  Excel  (or  other  computing  and  plotting  software,  such  as  R,  MatLab)  such  as  the  outputs  below.</p>
        				 <img src="assets/help/graph-interpretation.png" />
        				<br/>
        				<p>When  comparing  scenarios,  we  recommend  that  you  evaluate  the  overall  effects  of  marine  reserve  designs  on  the  number  of  fishers  supported  through  time.  The  total  area  protected  (i.e.,  percentage  of  reefs  in  reserves),  individual  sizes  and  placement  of  marine  reserves  may  be  able  to  support  the  fishery.  However,  certain  area  coverage,  size  and  placement  may  have  more  benefits  compared  to  other  scenarios,  and  potential  consequences.  Very  large  reserves  may  be  beneficial  for  fish  biomass  recovery,  but  they  can  also  limit  the  area  available  to  fishers,  and  force  fishers  to  travel  farther  to  be  able  to  satisfy  their  catch  requirement.  Protected  reefs  with  poor  habitat  quality  can  take  longer  periods  to  recover,  thereby  reducing  their  ability  to  provide  subsidies  through  adult  spillover  and  larval  dispersal  to  fished  reefs.    Moreover,  it  is  also  important  to  note  that  very  high  fishing  intensities  can  also  null  the  benefits  of  marine  reserves.  Please  refer  to  the  Fish  SPACE  exercise  results  accompanying  this  User  Guide.   </p> 
        			</label>
		        </div>
		    </div>
		)
	}
}
