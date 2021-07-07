
var biomass_grid = [];
var c_timeStep = 0;
var total_biomass = 0;
var total_bioRes = 0;
var max_timeStep = 0;
var a = [];
var b =[];
var reefArea_grid = [];
var reserve_area = 0;
var total_area = 0;
var reef_fish_area  = 0;
var reserveBio_perArea = 0;
var nonReserve_bioPerArea = 0;
//for output save file
var non_reserve_bioMass = [];
var reserve_biomass_area = 0; 
var non_reserve_biomass_area = 0; 
var biomass_reserve_data = [];
var totalBiomass_data = [];	
var timeStep_data  = [];
var non_reserve_data_perArea = [];
var reserveBiomass_perArea = [];


//get timeStep Array
	function getTimeStep(reef_fish_arr){
		var timeStep_arr = [];
		
		for(i in reef_fish_arr.model){
	       var timeStep = reef_fish_arr.model[i].current_time;
	       timeStep_arr.push(timeStep);
	   }
	return timeStep_arr;
	}

	function getProtectedArea(reefArea_grid, netlock_arr){
		var internal_area = 0;
	   for (i in netlock_arr){
	   	 for(j in netlock_arr[i]){
	       var flag = netlock_arr[i][j];
		       if(flag != 0){
	             var areaVal = reefArea_grid[i][j];
	             internal_area = internal_area + areaVal; 
	         } 
	    
	   	 }
	   }
	return internal_area;
	}
	
	
	function getTotalReefArea(reefArea_grid, netlock_arr){
	   var total_area = 0;
	   for (i in netlock_arr){
	   	 for(j in netlock_arr[i]){
	             var areaVal = reefArea_grid[i][j];
	             total_area = total_area + areaVal; 
	     }
	   }
	return total_area;
	}
	
	
	
	
	
	function fishArea(netlock_arr){
		reefArea_grid = fileSources.habitatGrid.arrays2d.REEF_AREA;
		total_area = getTotalReefArea(reefArea_grid, netlock_arr);
		total_area = total_area / 1000000;
		reserve_area = getProtectedArea(reefArea_grid, netlock_arr);
		reserve_area = reserve_area / 1000000;
		reserve_biomass_area.push(reserve_area);
		reef_fish_area = total_area - reserve_area;
		non_reserve_biomass_area.push(reef_fish_area);
	}
	
	
	// get total_biomass per timestep add to array
	function getTotalBiomass(reef_fish_arr, c_timeStep, netlock_arr){
			
			total_biomass = reef_fish_arr.model[c_timeStep-1].total_biomass;
			total_bioRes =  reef_fish_arr.model[c_timeStep-1].biomass_inside;
			totalBiomass_data.push(total_biomass);
			biomass_reserve_data.push(total_bioRes);
			//kg to metric tons
			total_bioRes = total_bioRes / 1000;
			total_biomass = total_biomass / 1000;
			
			// push data to data sets 
			if(total_bioRes != 0){
				reserveBio_perArea = total_bioRes / reserve_area;
			}else{
				reserveBio_perArea = 0;
			}
			reserveBiomass_perArea.push(reserveBio_perArea); 
			
			total_biomass = total_biomass - total_bioRes;
			
			non_reserve_bioMass.push(total_biomass);
			
			nonReserve_bioPerArea = total_biomass / reef_fish_area;
			non_reserve_data_perArea.push(nonReserve_bioPerArea);
	
	}


// graph creation
function createBiomassGraph(non_reserve_data_perArea, reserveBiomass_perArea, max_timeStep){
     a = non_reserve_data_perArea;
     b = reserveBiomass_perArea;
    
     var dataset = a.map(function (e, i) {
        return [e,b[i]];
    });
    
    

    // 2. Use the margin convention practice 
     var margin = {top: 0, right: 20, bottom: 40, left: 60},
     width = 500 - margin.left - margin.right,
     height = 210 - margin.top - margin.bottom,
     padding = 100;
     //check if svg is existing
     var border=1;
     var bordercolor='black';
     
     var check = d3.select("#line-chart svg g");
     
     if(!check.empty()){
    	 updateTotalBiomassData(dataset,max_timeStep)
     }else{



		    // 5. X scale will use the index of our data
		    var xScale = d3.scaleLinear()
		        .domain([0, max_timeStep]) // input
		        .range([0, width]); // output
		
		    // 6. Y scale will use the randomly generate number 
		    var yScale = d3.scaleLinear()
		        .domain([0, d3.max(dataset, function(d) { return d3.max(d); })]) // input 
		        .range([height, 0]); // output 
		
		    // 7. d3's line generator
		
		
		      var line = d3.line()
		        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
		        .y(function(d) { return yScale(d[1]); }) // set the y values for the line generator 
		        .curve(d3.curveMonotoneX) // apply smoothing to the line
		
		      var line2 = d3.line()
		         .x(function(d, i) { return xScale(i); })
		         .y(function(d) { return yScale(d[0]); });  
		
		
		    //number formatter
			 var nf = Intl.NumberFormat();
		      
		    //Tool tip 1 for total_biomass
		    var tip1 = d3.tip()
		      .attr('class', 'd3-tip')
		      .offset([-10, 0])
		      .html(function(d,i) {
		        return "<span style='color:red'>" + (i+1) + " ; " + nf.format(d[0].toFixed(2)) +"</span>";
		      })
		    
		    //Tool tip 2 for total_biomass_res   
		    var tip2 = d3.tip()
		      .attr('class', 'd3-tip')
		      .offset([-10, 0])
		      .html(function(d,i) {
		        return "<span style='color:red'>" + (i+1) + " ; " + nf.format(d[1].toFixed(2)) +"</span>";
		      })   
		
		      
		
		    
		
		    // 1. Add the SVG to the page and employ #2
		    var svg = d3.select("#line-chart").append("svg")
		        .attr("width", width + margin.left + margin.right)
		        .attr("height", height + margin.top + margin.bottom)
		      .append("g")
		        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		    // to display tip1 and tip2
		    	svg.call(tip1);
		    	svg.call(tip2);  
		
		    
		    // 3. Call the x axis in a group tag
		    svg.append("g")
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
		
		    // 4. Call the y axis in a group tag
		    svg.append("g")
		        .attr("class", "y axis")
		        .call(d3.axisLeft(yScale).ticks(5)); // Create an axis component with d3.axisLeft
		
		    // 9. Append the path, bind the data, and call the line generator 
		    svg.append("path")
		        .datum(dataset) // 10. Binds data to the line 
		        .attr("class", "line1")
		        .style("stroke", "blue")// Assign a class for styling 
		        .attr("d", line); // 11. Calls the line generator 
		
		    // append the path, bind the data, and call the line generator
		
		    svg.append("path")
		          .datum(dataset)
		          .attr("class", "line2")
		          .style("stroke", "red")
		          .attr("d", line2);
		    
		    
		    //append dot for each data
		    svg.selectAll(".dot-red")
				.data(dataset)
					.enter().append("circle") // Uses the enter().append() method
				.attr("class", "dot-red") // Assign a class for styling
				.attr("cx", function(d, i) { return xScale(i) })
				.attr("cy", function(d) { return yScale(d[0]) })
				.attr("r", 2)
				.on('mouseover', tip1.show)
			    .on('mouseout', tip1.hide);
			
		    svg.selectAll(".dot-yel")
				.data(dataset)
					.enter().append("circle") // Uses the enter().append() method
				.attr("class", "dot-yel") // Assign a class for styling
				.attr("cx", function(d, i) { return xScale(i) })
				.attr("cy", function(d) { return yScale(d[1]) })
				.attr("r", 2)
				.on('mouseover', tip2.show)
			    .on('mouseout', tip2.hide);
		
		     
		    // Append Label for x and y axis
		    svg.append("text")             
		          .attr("transform",
		                "translate(" + (width/2) + " ," + 
		                               (height+30) + ")")
		          .style("font-size", "12px")
		          .style("fill","steelblue")
		          .style("text-anchor", "middle")
		          .text("Timestep");
		
		
		    svg.append("text")
		          .attr("transform", "rotate(-90)")
		          .attr("y", 0 - margin.left)
		          .attr("x",0 - (height / 2))
		          .attr("dy", "1em")
		          .style("text-anchor", "middle")
		          .style("fill","steelblue")
		          .style("font-size", "10.5px")
		          .text("Biomass (mt/ sqkm)"); 
		  //append border line
	          svg.append("rect")
	  			.attr("x", 0)
			  	.attr("y", 0)
			  	.attr("height", height)
			  	.attr("width", width)
			 	.style("stroke", bordercolor)
			  	.style("fill", "none")
			  	.style("stroke-width", border);  
     
     }
     $("#biomass-legend-div").removeClass("hide");
}


function updateTotalBiomassData(dataset,max_timeStep) {
	   
	d3.select(".d3-tip.n").remove();

	var margin = {top: 0, right: 20, bottom: 40, left: 60},
	    width = 500 - margin.left - margin.right,
	    height = 210 - margin.top - margin.bottom,
	    padding = 100; // Use the window's height


	    // 5. X scale will use the index of our data
	    var xScale = d3.scaleLinear()
	        .domain([0, max_timeStep]) // input
	        .range([0, width]); // output

	    // 6. Y scale will use the randomly generate number 
	    var yScale = d3.scaleLinear()
	        .domain([0, d3.max(dataset, function(d) { return d3.max(d); })]) // input 
	        .range([height, 0]); // output 

	    // 7. d3's line generator


	      var line = d3.line()
	        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
	        .y(function(d) { return yScale(d[1]); }) // set the y values for the line generator 
	        .curve(d3.curveMonotoneX) // apply smoothing to the line

	      var line2 = d3.line()
	          .x(function(d, i) { return xScale(i); })
	          .y(function(d) { return yScale(d[0]); });  

	   //number formatter
	   var nf = Intl.NumberFormat();
	   
	   //Tool tip 1 fot total_biomass   
	   var tip1 = d3.tip()
	      .attr('class', 'd3-tip')
	      .offset([-10, 0])
	      .html(function(d,i) {
	        return "<span style='color:red'>" + (i+1) + ";" + nf.format(d[0].toFixed(2)) +"</span>";
	      })
	    
	    //Tool tip 2 for tota;_biomass_res   
	    var tip2 = d3.tip()
	      .attr('class', 'd3-tip')
	      .offset([-10, 0])
	      .html(function(d,i) {
	        return "<span style='color:red'>" + (i+1) + ";" + nf.format(d[1].toFixed(2)) +"</span>";
	      })   


		
	    // Select the section we want to apply our changes to
	    var svg = d3.select("#line-chart svg g");

	    svg.call(tip1);
	    svg.call(tip2);

	    svg.select(".line1").remove();
		svg.select(".line2").remove();
	    // Make the changes
	    
		      

    // append the path, bind the data, and call the line generator

		    svg.append("path")
		       .datum(dataset)
		       .attr("class", "line2")
		       .style("stroke", "red")
		       .attr("d", line2);
  
	        
	        svg.select(".x.axis") // change the x axis
	            .call(d3.axisBottom(xScale));
	        
	        svg.select(".y.axis") // change the y axis
	            .call(d3.axisLeft(yScale));

	        svg.selectAll(".dot-red")
	        	.remove()
	        	.exit();
	        
	        svg.selectAll(".dot-red")
	    		.data(dataset)
	  			.enter().append("circle") // Uses the enter().append() method
	    		.attr("class", "dot-red") // Assign a class for styling
	    		.attr("cx", function(d, i) { return xScale(i) })
	    		.attr("cy", function(d) { return yScale(d[0]) })
	    		.attr("r", 2)
	    		.on('mouseover', tip1.show)
	            .on('mouseout', tip1.hide);
	        var netWorkScen = document.getElementById("reserve-dropdown").value;
	        if(netWorkScen != "no_reserve"){
			        svg.append("path")
			        .datum(dataset) // 10. Binds data to the line 
			        .attr("class", "line1")
			        .style("stroke", "blue")// Assign a class for styling 
			        .attr("d", line); // 11. Calls the line generator
			        
			        svg.selectAll(".dot-yel")
			        	.remove()
			        	.exit();
			        
			        svg.selectAll(".dot-yel")
			    		.data(dataset)
			  			.enter().append("circle") // Uses the enter().append() method
			    		.attr("class", "dot-yel") // Assign a class for styling
			    		.attr("cx", function(d, i) { return xScale(i) })
			    		.attr("cy", function(d) { return yScale(d[1]) })
			    		.attr("r", 2)
			    		.on('mouseover', tip2.show)
			            .on('mouseout', tip2.hide);   
	        	}	 
		
	};

// trim data with timestep 1 
function trimDataSetInput(totalCatchDataset){
	totalCatchDataset.splice(0,2);
	return totalCatchDataset;
}
	
	
	
	
	
function calculateTotalBiomassData (reef_fish_arr, netlock_arr, c_timeStep, max_timeStep){
	if(c_timeStep-1 == 0){
		resetTotalBiomassData();
	}
	if(reefArea_grid.length == 0){
		fishArea(netlock_arr);
	} 
	if(c_timeStep-1 > 1){
		// Getting initial data for graphs
		 getTotalBiomass(reef_fish_arr,c_timeStep, netlock_arr);
		 
		 timeStep_data = getTimeStep(reef_fish_arr);
		//create graph
	    createBiomassGraph(non_reserve_data_perArea, reserveBiomass_perArea, max_timeStep);
	}
 }



function resetTotalBiomassData(){
	totalBiomass_data = [];
	biomass_reserve_data = [];
	reefArea_grid = [];
	reserve_area = 0;
	total_area = 0;
	reef_fish_area  = 0;
	non_reserve_bioMass = [];
	reserve_biomass_area = []; 
	non_reserve_biomass_area = []; 
	biomass_reserve_data = [];
	totalBiomass_data = [];	
	timeStep_data  = [];
	non_reserve_data_perArea = [];
	reserveBiomass_perArea = [];
}