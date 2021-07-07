//threshold of catch
var threshold = 0;
var maxT = 0;
var totalCatchDataset =[];
var satisfiedFisherMan = 0;


// get totalcatch array from model 
function getTotalCatchArr(fisher_arr, c_timeStep){
	 var tcatch = fisher_arr.model[c_timeStep - 1].fisher_catch;
	 var total_catch = getSumoftotalCatch(tcatch);
	 totalCatchDataset.push(total_catch);
}

//sum of total catch per timestep
function getSumoftotalCatch(reef_fish_array){
	var temp = JSON.parse(JSON.stringify(reef_fish_array));
	var x = 0;
	for(i in temp){
		if(temp[i] > 0){
			x = x + temp[i];
		}
	}
	return x;
}

//reset datasets
function resetDataset(){
	totalCatchDataset.length = 0;
}
  

//get satisfied fishermen count
function getSatisfiedCatch(threshold,fisher_arr, c_timeStep){
	var count = 0;
	for (i in fisher_arr.model){
	  var tcatch = fisher_arr.model[i].fisher_catch;
	  var c_time = fisher_arr.model[i].current_time;
	  if((c_time+1) == c_timeStep){
		  for (j in tcatch){
			     if(tcatch[j] >= Math.round(threshold*0.9)){
			     	count++;
			     } 
		  }
	  }
	}
return count;   
}



// 2. Creation of graph
function createTotalCatch(totalCatchDataset, maxTimeStep){
   
	var check = d3.select("#line-chart-2 svg g");
	if (!check.empty()){
		updateTotalCatchData(totalCatchDataset, maxTimeStep);
	}else{
    
	    var margin = {top: 0, right: 20, bottom: 40, left: 60},
	    width = 500 - margin.left - margin.right,
	    height = 210 - margin.top - margin.bottom,
	    padding = 100;
	    var border=1;
        var bordercolor='black';

	
	        // 5. X scale will use the index of our data
	        var xScale = d3.scaleLinear()
	            .domain([0, maxTimeStep]) // input
	            .range([0, width]); // output
	
	        // 6. Y scale will use the randomly generate number 
	        var yScale = d3.scaleLinear()
	            .domain([0, d3.max(totalCatchDataset, function(d) { return d; })]) // input 
	            .range([height, 0]); // output 
	
	        // 7. d3's line generator
	
	
	        var line = d3.line()
	                .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
	                .y(function(d) { return yScale(d); }) // set the y values for the line generator 
	                .curve(d3.curveMonotoneX) // apply smoothing to the line
	
	       //number formatter
	       var nf = Intl.NumberFormat();
	       
	        //tool tip
	        var tip = d3.tip()
					    .attr('class', 'd3-tip')
					    .offset([-10, 0])
					    .html(function(d,i) {
					     return "<span style='color:red'>" + i+1 + " ; " + nf.format(d.toFixed(2)) +"</span>";
					    })
	        
	
	        // 1. Add the SVG to the page and employ #2
	        var svg = d3.select("#line-chart-2").append("svg")
	            .attr("width", width + margin.left + margin.right)
	            .attr("height", height + margin.top + margin.bottom)
	          .append("g")
	            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	        	.attr("border",border);
	        // tool tip call
	        svg.call(tip);
	        
	        // 3. Call the x axis in a group tag
	        svg.append("g")
	            .attr("class", "x axis")
	            .attr("transform", "translate(0," + height + ")")
	            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
	
	        // 4. Call the y axis in a group tag
	        svg.append("g")
	            .attr("class", "y axis")
	            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
	
	        // 9. Append the path, bind the data, and call the line generator 
	        svg.append("path")
	            .datum(totalCatchDataset) // 10. Binds data to the line 
	            .attr("class", "line")
	            .style("stroke", "red") // Assign a class for styling 
	            .attr("d", line); // 11. Calls the line generator 
	
	        //Appends a circle for each datapoint 
	       svg.selectAll(".dot-red")
				.data(totalCatchDataset)
				.enter().append("circle") // Uses the enter().append() method
				.attr("class", "dot-red") // Assign a class for styling
				.attr("cx", function(d, i) { return xScale(i) })
				.attr("cy", function(d) { return yScale(d.y) })
				.attr("r", 2)
				.on('mouseover', tip.show)
				.on('mouseout', tip.hide);
	
	        
	
	        // Append Label for x and y axis
	        svg.append("text")             
	              .attr("transform",
	                "translate(" + (width/2) + " ," + 
	                               (height+30) + ")")
	              .style("font-size", "12px")
	              .style("text-anchor", "middle")
	              .text("Timestep");
	
	
	        // text label for the y axis
	          svg.append("text")
	              .attr("transform", "rotate(-90)")
	              .attr("y", 0 - margin.left)
	              .attr("x",0 - (height / 2 + 5))
	              .attr("dy", "1em")
	              .style("text-anchor", "middle")
	              .style("font-size", "12px")
	              .text("Total fish catch (kg)");
	         
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
}                   

function updateTotalCatchData(totalCatchDataset, maxTimeStep) {
	   	var margin = {top: 0, right: 20, bottom: 40, left: 60},
	    width = 500 - margin.left - margin.right,
	    height = 210 - margin.top - margin.bottom,
	    padding = 100;

	   	d3.select(".d3-tip.n").remove();
	   	
	   	var xScale = d3.scaleLinear()
	            .domain([0, maxTimeStep]) // input
	            .range([0, width]); // output

	   

	  //number formatter
	   	var nf = Intl.NumberFormat();
	    
	   	// 6. Y scale will use the randomly generate number 
	   var yScale = d3.scaleLinear()
	            .domain([0, d3.max(totalCatchDataset, function(d) { return d; })]) // input 
	            .range([height, 0]);

	   var line = d3.line()
	                .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
	                .y(function(d) { return yScale(d); }) // set the y values for the line generator 
	                .curve(d3.curveMonotoneX) // apply smoothing to the line

	   var tip = d3.tip()
			      .attr('class', 'd3-tip')
			      .offset([-10, 0])
			      .html(function(d,i) {
			        return "<span style='color:red'>" + (i+1) + " ; " + nf.format(d.toFixed(2)) +"</span>";
			      })


		
	    // Select the section we want to apply our changes to
	    var svg = d3.select("#line-chart-2 svg g");
	    svg.call(tip);
	   
	    // Make the changes
	      	svg.select(".x.axis") // change the x axis
	            .call(d3.axisBottom(xScale));
	        svg.select(".y.axis") // change the y axis
	            .call(d3.axisLeft(yScale));
	        
	        d3.select(".d3-tip").remove();
	        svg.selectAll(".dot-red")
	        	.remove()
	        	.exit();
	        svg.select(".line").remove();
	        
	        
	        svg.append("path")
            .datum(totalCatchDataset) // 10. Binds data to the line 
            .attr("class", "line")
            .style("stroke", "red") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 
;
	     
	        svg.selectAll(".dot-red")
	    		.data(totalCatchDataset)
	  			.enter().append("circle") // Uses the enter().append() method
	    		.attr("class", "dot-red") // Assign a class for styling
	    		.attr("cx", function(d, i) { return xScale(i) })
	    		.attr("cy", function(d) { return yScale(d) })
	    		.attr("r", 2)
	    		.on('mouseover', tip.show)
	            .on('mouseout', tip.hide)
	            .on('remove', tip.hide); 
	        
	        
};
// removes timestep 1 in dataset
function trimDataInput(totalCatchDataset){
	totalCatchDataset.splice(0,2);
	return totalCatchDataset;
}	



function getTotalcatchGraph(fisher_arr, threshold, maxT, c_timeStep){
  
  
  if (c_timeStep-1 == 0){
		  resetDataset();
  }
  if(c_timeStep-1 > 1 ){
	  var maxTimeStep = maxT;
	  getTotalCatchArr(fisher_arr, c_timeStep);
	  // totalCatchDataset =  getSumofTotalCatchArray(totalCatch_array);
	  
	  satisfiedFisherMan = getSatisfiedCatch(threshold,fisher_arr, c_timeStep);
	  createTotalCatch(totalCatchDataset, maxTimeStep);
  }
  
}





