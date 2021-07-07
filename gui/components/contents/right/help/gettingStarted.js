import React, { Component } from 'react';

export class GettingStarted extends Component {
    render() {
        return(
            <div>
            	<div className="about-ccres-content p-0">
                    <label className="font-size-4 black-text about-text">Getting Started</label>
                     
                    <label className="font-size-1 help-text help-text black-text">	
                    	<b>4.1 Access and download</b>
                    	<p>You  may  access  and  download  the  latest  version  of  the  Fish  SPACE  application  from  www.ccres.net.  Note  that  there  are  different  installers  appropriate  for  the  Windows  and  Mac  operating  systems.</p>
                    </label>
                    <label className="font-size-1 help-text help-text black-text">       
                    <b>4.2 Windows  installation</b>
                        <p>Step  1: Install  the  application  via  the  “FISHSpaceInstaller”.  Click  the  icon. </p> 
                        <img src="assets/help/fishspace-installer.png" />
                        <p>Step 2: Click “Run” button.</p>
                        <p>**Fish SPACE is now being installed</p>
                        <p>Step 3: Fish SPACE application is now installed</p>
                    
                    <i><b>To uninstall</b></i>

                        <p>Step 1: Go to Control Panel</p>
                        <p>Step 2: Select Program and Features</p>
                        <p>Step 3: Find Fish SPACE application in the list</p>
                        <p>Step 4: Select Fish SPACE Application, use right click then select uninstall</p>
                        <img src="assets/help/uninstall-fishspace.png" />
                        <br/>
                        	
                    <b>4.3. Mac  OSX  installation</b>
                    
                    	<p>Step  1.  Click  on  the  Fish  SPACE  DMG  installer.  Your  Macbook  will  unpack  and  verify  the  application.</p>
                    	<p>Step  2.  Since  the  application  was  not  obtained  from  the  Mac  App  Store,  ensure  that  you  have  the  necessary  permissions  in  your  Security  &  Privacy  settings  to  allow  applications  downloaded  from  other  identified  developers  to  be  installed  into  your  computer.</p>
                    	<img src="assets/help/macos-screen-installation.png" />
                    	<br/>
                    	<p>Step  3.  Once  verification  is  finished,  you  can  drag  and  drop  Fish  SPACE  to  your  Applications  folder. </p>
                    	<img src="assets/help/macos-screen-installation2.png" />
                    	<br/>
                    	<p>Step  4.  You  now  have  Fish  SPACE  installed.</p>
                   
                   <i>To uninstall</i>
                   		
                   		<p>Step  1.  Go  to  your  Applications  folder,  and  locate  the  Fish  SPACE  app.</p>
                    	<p>Step  2.  Right-click  on  the  application,  and  then  select  Move  to  Trash.</p>
                   <b>4.4 Application Walkthrough</b>
                    	<p>Once  you  have  successfully  installed  the  Fish  SPACE  application,  you  will  be  directed  to  the  main  screen. </p>

                    <b>Fish SPACE: Middle Screen</b>
                    	<p>The  middle  screen  provides  information  about  the  application.  It  presents  the  different  tabs,  pages,  and  input  fields  to  describe  how  Fish  SPACE  works.  We  highly  recommend  that  users  read  the  accompanying  documentation  and  other  manuals  to  fully  understand  how  the  tool  works,  and  how  to  prepare  the  data  required  to  run  the  application  (See  Spatial  Data  Preparation  Manual). </p>
                    
                    	<img src="assets/help/tabs.png" />" 
                    	<br/>
                    	<p>On the left side of the screen, we can see the three main tabs: <b>Help (current screen), Map, and Graph ①.</b> The <b>Help</b> page is the main screen, and it describes the <b>CCRES Project </b>that supported the development of Fish SPACE, and the application itself(this manual).The  <b>Maps</b>  and  <b>Graphs</b>  pages  show  the  outputs  of  the  simulation.</p>

                    
                    	<p>On the upper left side of the screen, we have two buttons that allows users to <b>Upload previous simulation②</b>, and <b>Save current simulation③</b>. The  <b>Upload  previous  simulation</b>  button  lets  users  upload  a  re-run  file  that  automatically  loads  all  the  relevant  data  and  information  used  in  the  previous  run,  to  repeat  the  simulation.</p>
                    	<img src="assets/help/previous-simulation.png" />
                    	<br/>
                    	
                    	<p>On the upper right of the application’s screen, we have: the Time Step Slider④, Stop, Run, and Input Parameters⑤. The Time Step Slider is a slider bar that allows users to define the time period of the simulation, with 50 years as a maximum length of a run. We recommend users to accommodate various time periods based on their proposed management plans (i.e., short term at five years, medium term at five to 10 years, long term at >10). The Stop button stops the current simulation; whereas the Run button starts a simulation after the user uploads and inputs all the required data  to run a simulation. The Run button turns into Pause⑥ when a simulation is currently ongoing.</p>
                    	<img src="assets/help/right-actions.png" />
                    	
                    	<br/>	
                    <b>Fish Space: Other Screens from Run Model floating window</b>
                    	
                    	<p>A  <b>floating  window</b>  with  four  tabs  appears  on  the  right  side  of  the  screen  once  the  user  clicks  on  <b>Input  Parameters</b>⑦.  These  tabs  are  the  <b>Maps,  Fish,  Fishing,</b>  and  <b>Outputs</b>.</p>
                    	<img src="assets/help/input-parameters.png" />
                    	<br/>	
                    <b>Maps Tab:</b>
                    
                   
                    	<p>The Maps⑧ tab contains six fields where the users can upload the corresponding map files to be used in a simulation. To upload, simply click on the upload⑨ button and choose the corresponding file. To  delete  the  file  you  uploaded,  click  the  flush⑩ button. Please  read  the  Spatial  Data  Preparation  Manual  that  describes  the  following  map  files  in  more  detail,  and  how  they  are  prepared.  </p> 

                    <p>The application requires the <b>Habitat Grid</b> and <b>Fisher Docks</b> to run a simulation, whereas other maps such as <b>Marine Reserve</b>, <b>Connectivity Matrix</b>, <b>Connectivity Metadata</b>, and <b>Habitat Quality</b> are optional.</p> 
                    <img src="assets/help/maps-tab.png" />
                    <br/>
                    
                    <p><b>Habitat Grid:</b> A grid with uniform-sized cells that identifies the area occupied by the land and reef within the cell, and their total areal extent across the grid. </p>
                    <p><b>Fisher Docks:</b> A grid with cells representing the ‘dock’ or point of departure of fishers at each time step.</p>
                    <p><b>Marine Reserve:</b> A grid with cells that describes areas closed to fishing.</p>

                    <p><b>Connectivity Matrix:</b> A (n x n) matrix that defines the probability of a fish larva dispersed from a source reef (rows) to a sink reef (columns).</p>
                    <p><b>Connectivity Metadata:</b> A (n x 3) data table that contains the reef ID, x-position, and y-position of each reef grid in the connectivity matrix.</p>
                    <p><b>Habitat Quality:</b> A grid that describes the quality or condition of corresponding reef cells in the habitat grid.</p>

                    <b>Fish Tab:</b>
                   
					<p>The <b>Fish Tab</b>⑪ describes the characteristics of a particular fish stock (e.g., grouper, snapper) to be used in the simulation.  These include the <b>Initial Biomass</b>, <b>Carrying Capacity</b>, <b>Biomass Threshold</b>, <b>Turnover Rate</b>, <b>Spillover</b>, <b>Spillover Theshold</b>, <b>Fecundity</b>, <b>Survivorship</b> and <b>Recruitment</b>. The input fields below are all required prior to running a simulation, and users have the option to select <b>‘Fixed’</b> or <b>‘Scaled’</b> options for  the  <b>Initial  Biomass</b>,  <b>Carrying  Capacity</b>,  and  <b>Survivorship</b> fields.Selecting  the  <b>‘Scaled’</b> option  allows  users  to  select  a  <b>‘Map’</b> that  they  have  uploaded  (i.e.,  habitat  map,  habitat  quality)  to  scale  the  respective  input  parameter.   </p>
					<img src="assets/help/fish-tab.png" />
		            <br/>
                    <p><b>Initial Biomass:</b>   Select  the  option  to  set  the  initial  standing  stock  biomass  across  reef  cells.  Selecting  <b>‘Fixed’</b>  sets  same  biomass  across  all  reef  cells  (i.e.,  all  cells  will  have  the  same  initial  biomass).  Selecting  <b>‘Scaled’</b>  varies  the  initial  biomass  according  to  the  map  uploaded  (i.e.,  reef  cells  can  have  different  initial  biomass  values  based  on  the  area  of  reefs  in  the  habitat,  or  the  quality  of  reefs).  You  may  use  the  average  biomass  conditions  for  a  particular  fish  stock  from  census  data  to  set  the  initial  biomass  in  kg/  sqm.   .</p>

                    <p><b>Carrying Capacity:</b>  Select  the  option  to  set  the  carrying  capacity  (i.e.,  maximum  quantity)  of  a  particular  coral  reef  fish  stock.  Selecting  <b>‘Fixed’</b>  sets  the  same  carrying  capacity  for  all  reef  cells.  Selecting    <b>‘Scaled’</b>  varies  the  carrying  capacity  according  to  the  map  uploaded.  For  the  scaled  option,  we  assume  that  carrying  capacity  can  vary  across  space  based  on  the  area  of  the  reefs  and  the  quality  of  reefs.  You  may  use  estimated  carrying  capacities  from  long-term  monitoring  data  in  kg/sqm.  </p>

                    <p><b>Biomass Threshold:</b> This  is  an  arbitrary  parameter  created  to  prevent  fishing  until  the  fish  biomass  reaches  zero  values.  Set  the  percentage  of  the  carrying  capacity  that  cannot  be  fished.  The  default  value  is  0.10. </p>
                    
                    <p><b>Turnover Rate:</b> This  parameter  serves  as  the  intrinsic  natural  rate  of  increase  of  a  fish  population,  and  implicitly  considers  natural  growth  and  mortality.  Select  the  option  to  set  a  <b>‘Fixed’</b>  fish  population  turnover  rate,  or  estimated  <b>‘Time  to  reach  carrying  capacity</b>.  The  <b>‘Fixed’</b> turnover  rate  sets  a  fixed  rate  for  the  fish  stock,  which  can  be  obtained  in  the  life  history  parameters  of  various  fish  species  in  www.fishbase.org.  Note  that  the  timesteps  used  are  in  weeks.  Hence,  you  should  divide  the  annual  turnover  rate  (i.e.,  growth  rate  –  K  in  Fishbase)  by  52,  to  get  the  weekly  turnover  rate.  The  <b>‘Time  to  reach  carrying  capacity’</b> is  based  on  estimated  time  of  recovery  of  a  particular  fish  stock.  The  application  will  automatically  adjust  the  turnover  rate  based  on  the  number  of  years  inputted  if  the  latter  option  is  selected. </p>

                    <p><b>Spillover:</b> This  parameter  is  the  diffusion  coefficient  or  how  far  the  fish  can  travel  and  spillover  to  adjacent  reef  cel </p>
                    	
                    <p><b>Spillover Threshold:</b> Set  the  minimum  percentage  of  the  carrying  capacity,  which  will  allow  spillover  to  occur.  The  default  value  is  0.90,  wherein  adult  spillover  will  only  occur  when  fish  biomass  reaches  90%  of  the  carrying  capacity. </p>
                    
                    <p><b>Fecundity</b> This  input  parameter  is  the  ability  of  adult  fish  to  produce  offspring.  Its  use  requires  the  connectivity  matrix  and  metadata  uploaded  in  the  <b>Maps</b>  tab.  The  default  value  is  1,  wherein  we  assume  that  fishing  pressure  has  no  effect  on  the  adult  fish  population’s  ability  to  produce  larvae. </p>
                    
                    <p><b>Survivorship:</b> This  input  parameter  requires  the  connectivity  matrix  and  metadata  uploaded  in  the  <b>Maps</b>  tab.  Select  the  option  to  set  the  survivorship  of  fish  larvae.    Selecting  <b>‘None’</b> disables  the connectivity  feature.  Selecting  <b>‘Scaled’</b> varies  the  survivorship  of  larvae  based  on  the  variable  selected  from  the  habitat  quality  map  (i.e.,  mean  hard  coral  cover).  This  assumes  that  post-settlement  survival  depends  on  the  condition  of  the  coral  reef  (i.e.,  more  larvae  will  survive  when  coral  cover  is  high).  The  default  value  if  using  this  option  is  0.10.  Selecting  <b>‘Fixed’</b> will  set  a  fixed  percentage  of  larvae  that  will  survive.  The  default  value  if  using  this  option  is  0.05</p>

                    <p><b>Recruitment Rate:</b> This  input  parameter  requires  the  connectivity  matrix  and  metadata  uploaded  in  the  Maps  tab.  This  parameter  is  slope  of  the  recruitment  curve,  and  will  help  determine  how  much  of  the  larvae  will  be  successfully  recruited  into  the  fishable  adult  population.  The  default  value  is  1. </p>
                    
                    <b>Fishing Tab:</b>
                   
                    	<p>The <b>Fishing tab⑫</b> corresponds  to  the  fishing  activity  specific  to  a  demersal  coral  reef  fishery,  and  the  input  parameters  in  this  tab  will  simulate  the  effects  of  fishing  on  fish  biomass.  The  fishing  activity  also  adjusts  based  on  the  status  of  the  fish  biomass,  and  imposed  marine  reserves.</p>
                    	 	<img src="assets/help/fishing-tab.png" />
                    	 	<br/>
                    	
                    	<p>Users  can  also  select  a  Reserve⑬ scenario  (from  the  Marine  Reserve  Map)  that  they  want  to  use  in  the  simulation.  We  recommend  users  to  also  run  no  fishing,  and  no  reserve  with  fishing  activity  scenarios;  to  set  the  benchmark  for  the  time  needed  to  reach  carrying  capacity,  and  fisheries  collapse.</p>
                    	
                    	<p>The  application  has  different  kinds  of  fishing  activity,  which  accommodates  different  kinds  of  fishing  behavior  (i.e.  limitations  to  movement,  number  of  attempts,  and  catch  rates).  The  fishing  activity  can  be  selected  via  the  <b>Fishing  Behavior</b>  dropdown  list. </p>
                    	
                    	<p><b>No Fishing Activity:</b> Fishing  will  not  be  included  in  the  scenario.  We  recommend  users  to  first  run  a  simulation  without  fishing  activity  to  set  the  benchmark  to  determine  how  many  years  it  takes  to  reach  carrying  capacity  in  an  ideal  scenario. </p>
                    	<img src="assets/help/no-fishing.png" />
                        <br/>
                    	<p><b>Closest fishing ground:</b>  Describes  the  behavior  of  some  artisanal  fishers  that  are  unable  to  travel  longer  distances.  Fishers  fish  in  reefs  closest  to  where  they  live  or  dock  their  boats.  Contains  the  textboxes  <b>Number  of  Fishers</b>,  <b>Catch  Rate  (kg/fisher)</b>,  and  <b>Fishing  Range  (cells)</b>.  Fishers  can  go  home  without  catch  if  the  <b>catch  rate</b>  is  greater  than  the  fishable  biomass  threshold.  The  <b>Fisher  Range</b>  is  the  radius,  or  allowable  number  of  cells  fishers  can  go  to  from  their  dock.  Users  can  adjust  this  based  on  the  type  of  gear  and  fishing  boat  being  simulated.  For  example,  non-motorized  fishing  boats  can  have  a  smaller  fishing  rangecompared  to  motorized  boats. </p>
                    	<img src="assets/help/closest-fishing.png" />
                    	<br/>	
                        <p><b>Productive fishing ground:</b>  Describes  the  behavior  of  experienced  artisanal  fishers  that  know  and  target  'good'  reefs,  within  a  certain  distance  from  their  home  or  where  they  dock  their  boat.  Contains  the  textboxes  <b>Number  of  Fishers</b>,  <b>Catch  Rate  (kg/fisher)</b>,  and  <b>Fishing  Range  (cells)</b>.  Fishers  can  go  home  without  catch  if  the  <b>Catch  Rate</b>  is  greater  than  the  fishable  biomass  threshold.  The  <b>Fisher  Range</b>  is  the  radius,  or  allowable  number  of  cells  fishers  can  go  to  from  their  dock.  Users  can  adjust  this  based  on  the  gear  and  fishing  boat  type  being  simulated.  Users  can  also  set  the  <b>range</b>  to  the  maximum  distance  to  remove  the  travel  constraints  of  the  fisher</p>
                    	
                        <p><b>Random Walk:</b>  Describes  the  behavior  of  most  commercial  fishers  that  are  able  to  travel  longer  distances  to  satisfy  their  catch  quota.  Contains  the  fields  <b>Number  of  Fishers</b>,  <b>CatchQuota  (kg/fisher)</b>,  and  <b>Walk  Threshold  (steps)</b>.  Fishers  in  this  scenario  are  required  to  satisfy  a  <b>CatchQuota  (kg/fisher)</b>,  and  can  travel  longer  distances  to  satisfy  their  quota  provided  that  they  do  not  exceed  the  <b>Walk  threshold</b>.  The  walk  threshold  is  the  number  of  allowable  fishing  attempts,  which  represents  finite  fishing  effort.  For  example,  users  can  set  this  parameter  to  1000  steps,  wherein  each  fisher  can  have  1000  attempts  to  fish  in  different  cells  to  satisfy  their  catch.  </p>
                    	<img src="assets/help/random-walk.png" />
                    	<br/>
                    		
                    		<p><b>Some  caveats  and  things  to  remember:</b></p> 	

                            <p>1.Fisher  behavior  with  respect  to  marine  reserves  –  In  Fish  SPACE  we  assume  that  marine  reserves  are  strictly  enforced  and  that  all  of  the  fishers  are  compliant.  However,  fishers  are  allowed  to  pass  through  marine  reserves.  In  reality,  most  enforcers  do  not  allow  fishers  to  pass  through  marine  reserves,  because  it  is  considered  as  a  violation  of  marine  reserve  laws  (i.e.,  no-take,  and  no-go).  Hence,  compliant  fishers  avoid  marine  reserves  when  they  go  out  on  a  fishing  trip.  Since  Fish  SPACE  requires  data  to  be  interpreted  in  a  grid,  this  limits  the  movement  of  fishers  to  cell  units  with  four  directions  only,  which  can  sometimes  causes  fishers  to  get  stuck  if  there  are  reserves  around  their  docks.  </p>
                            
                            <p>2.Setting  the  catch  rates  –  Fish  SPACE  uses  weekly  timesteps,  and  assumes  that  fishingoccurs  all  throughout  the  year.  However,  in  reality,  fishers  fish  daily  and  for  a  certain  number  of  days  only  within  a  year.  We  recommend  that  users  convert  the  catch  rate  to  weekly  a  rate.  For  example,  if  the  average  daily  catch  rate  per  fishing  day  is  2kg  and  that  fishers  fish  5  days  a  week,  this  translates  to  10  kg  of  catch  per  week  in  Fish  SPACE.   </p>
                            
                            <p>3.Setting  the  fishing  range  –  Fish  SPACE  uses  cell  units  to  describe  the  radius  of  where  fishers  can  go  fishing.  Users  have  to  be  aware  of  the  side  length  (please  see  the  Spatial  Data  Preparation  Manual),  and  how  this  translates  to  fishing  distance.  For  example,  in  the  El  Nido  data  grid,  the  side  length  of  each  cell  is  280  m.  Setting  a  50-cell  range  roughly  translates  to  14,000  m  or  14  km.   </p>
                            
                            
                           <p><b>Output Tab:</b></p>
                            
                            <p>The  Output  tab⑭  contains  the  outputs  of  the  simulation  that  can  be  saved  by  the  user.  The  user  has  the  option  to  save  the  Raw  Data,  the  aggregated  Total  Biomass  across  all  reef  cells,  and  the  aggregated  total  catch  of  fishers  in  the  Fisher  Summary.  The  Raw  Data  in  .JSON  format  contains  all  the  data  for  each  simulation.  The  raw  data  is  a  huge  dataset,  which  can  only  be  opened  and  analyzed  using  powerful  computing  software  (e.g.,  R,  MatLab).  The  total  biomass  and  the  total  catch  are  also  shown  in  the  Graphs  tab.  Users  can  click  the  Save  button⑮  on  the  corresponding  output  that  they  want  to  save.  Note  that  the  outputs  can  only  be  saved  after  the  simulation  is  finished  or  when  it  is  paused.   </p>
                            <img src="assets/help/output-tab.png" />
                            <br/>
                            
                            <b>Map Page:</b>
                            <p>Displays  the  fishing  activity  (left  panel)  and  fish  biomass  (right  panel)  for  each  time  step.    The  <b>Fishing  Activity</b>  map  displays  how  fishers  respond  to  changing  fish  biomass  and  imposed  marine  reserves  during  the  simulation;  whereas  the  <b>Biomass</b>  map  displays  the  changes  in  fish  biomass  based  on  the  input  parameters,  fishing  activity,  and  imposed  marine  reserves.  You  can  also  save  a  video  of  both  maps  by  clicking  on  the  <b>Record</b>  button.  The  recording  starts  upon  clicking  the  button  and  will  end  when  clicked  again.  Once  you  have  stopped  recording,  you  will  be  prompted  to  save  the  simulated  map  videos  as  WEBM  file  into  your  computer.  Please  see  Section  7,  to  convert  the  WEBM  file  to  another  format  (e.g.,  MP4,  AVI),  and  save  it  into  your  computer.    </p>
                            <img src="assets/help/map-page.png" />
                            <br/>
                            
                            <p><b>Graphs Page:</b></p>
                            <p>Displays  the  summarized  outputs  of  the  simulation.  The  <b>Distance  Travelled</b>  histogram(top  left)  describes  the  distances  travelled  by  all  the  fishers  over  time.  The  <b>Total  Biomass</b>  (top  right)  line  graph  shows  the  total  standing  stock  biomass  per  unit  area  over  time,  whereas  the  <b>Total  Catch</b>(bottom  left)  graph  displays  the  catch  of  fishers  over  time.  This  page  also  contains  a  <b>Summary  Table</b>  (bottom  right)  describing  the  outputs  of  the  simulation  for  each  time  period.  Note  that  the  values  and  the  axes  on  the  graphs  change  and  adjust  over  time  until  the  last  time  step  or  when  the  simulation  is  paused.  </p>
                            <img src="assets/help/graph-page.png" />
                            <br/>
                            
                            <p><b>Some  caveats  and  things  to  remember:</b></p>
                            <p>1.Distance  travelled  per  timestep  –</p>
                            <p>a.For  the  random  walk  fishing  behavior,  only  the  last  cell  fished  is  recorded,  and  used  in  the  calculation.  The  other  fishing  behaviors  can  only  have  1  cell  fished,  or  none.  If  the  fisher  was  not  able  to  fish,  it  is  not  presented  in  the  distance-travelled  graph. </p>
                            <p>b.Fish  SPACE  uses  a  Cartesian  coordinate  system  where  each  cell  is  represented  by  a  pair  of  numerical  coordinates  (i.e.,  POINT_X,  and  POINT_Y)  (Please  read  the  Spatial  Data  Preparation  manual  for  more  details).  Fish  SPACE  estimates  the  distance  travelled  as  the  Euclidean  distance  (straight-line)  from  the  dock  to  the  fished  reef  cell. </p>
                            <p>2.To  get  the  total  number  of  fishers  that  were  able  to  fish  in  each  timestep,  you  can  divide  the  total  fish  catch  by  the  catch  rate.</p>	
                  
                                        
                </label>
                  
                    
                </div>
            </div>
        )
    }
}