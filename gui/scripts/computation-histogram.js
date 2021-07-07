
var minDistance = 0;
var maxDistance = 0;
var c_timeStep = 0;

function getFisherLocs(fisher_arr, c_timeStep){
  var fisher_locs = [];
 if(c_timeStep <= 1){
	 return fisher_locs;
 }
  for (i in fisher_arr.model){
     var c_time =  fisher_arr.model[i].current_time;
        if((c_time+1) == c_timeStep){
		    fisher_locs = fisher_arr.model[i].fisher_locs;
		}
  }
 
  return fisher_locs;
}


// Distance Formula
function getDistance(xOne,yOne,xTwo,yTwo){
	var x = xTwo - xOne;
    var y = yTwo - yOne;
    var z = Math.pow(x, 2) + Math.pow(y, 2);
    var d = Math.sqrt(z);
    return d;
}



// check and remove zero fisher catch 
function removeZeroCatch(fisherDisArr, fisher_arr, c_timeStep){
	var distanceArr = [];
	var fisher_catch_Arr = fisher_arr.model[c_timeStep - 1].fisher_catch;
		for (i in fisher_catch_Arr){
			if (fisher_catch_Arr[i] != 0){
				distanceArr.push(fisherDisArr[i]);
			}
		}
	return distanceArr;
}


// remove 0 fisher distance
function removeZeroDistance(distanceArr){
	var fisherDis = [];
	for (i in distanceArr){
		if(i != 0){
			fisherDis.push(i);
		}
	}
	return fisherDis;
}


    
 // set the dimensions and margins of the graph

function createHistogramChart(histogramData){
	var check = d3.select("#histogram svg g");
	var border=1;
    var bordercolor='black'; 

	
	var margin = {top: 0, right: 20, bottom: 40, left: 60},
    width = 500 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;
	
	if(!check.empty()){
		updateDataHistogram(histogramData);
	}else{	
		const [min, max] = d3.extent(histogramData);
		
	    var x = d3.scaleLinear()
	             .domain([0, max + 1])
	             .range([0, width]);
	
	    var y = d3.scaleLinear()
	              .range([height, 0]);
	
	
	
	    // set the parameters for the histogram
	    var histogram = d3.histogram()
	        .domain(x.domain())
	        .thresholds(x.ticks());
	
	
	
	    var tip = d3.tip()
	      .attr('class', 'd3-tip')
	      .offset([-10, 0])
	      .html(function(d) {
	        return "<span style='color:red'>" + d.length + "</span>";
	      })
	
	    // append the svg object to the body of the page
	    // append a 'group' element to 'svg'
	    // moves the 'group' element to the top left margin
	    var svg = d3.select("#histogram").append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	      .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");
	
	    svg.call(tip); 
	
	
	
	   
			// group the data for the bars
		      var bins = histogram(histogramData);
		      
		      
		      // Scale the range of the data in the y domain
		      y.domain([0, d3.max(bins, function(d) { return d.length; })]);
		
		      // append the bar rectangles to the svg element
		      svg.selectAll("rect")
		          .data(bins)
		        .enter().append("rect")
		          .attr("class", "bar")
		          .attr("x", 1)
		          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
		          .attr("width", function(d) { return x(d.x1) - x(d.x0)  ; })
		          .attr("height", function(d) { return height - y(d.length); })
		          .on('mouseover', tip.show)
		          .on('mouseout', tip.hide);
		      
		   // add the x Axis
	      svg.append("g")
	          .attr("transform", "translate(0," + height + ")")
	          .attr("class", "x axis")
	          .call(d3.axisBottom(x));
	
	      // add the y Axis
	      svg.append("g")
	      	  .attr("class", "y axis")
	          .call(d3.axisLeft(y));
	          
	    // add label to x axis
	    svg.append("text")             
	          .attr("transform",
	                "translate(" + (width/2) + " ," + 
	                               (height+30) + ")")
	          .style("font-size", "12px")
	          .style("text-anchor", "middle")
	          .style("fill","steelblue")
	          .text("Distance (cells)");
	
	
	    // text label for the y axis
	      svg.append("text")
	          .attr("transform", "rotate(-90)")
	          .attr("y", 0 - margin.left)
	          .attr("x",0 - (height / 2))
	          .attr("dy", "1em")
	          .style("text-anchor", "middle")
	          .text("Number of Fishers");
		
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




//get fisher distance 
function getFisherDistance(fisher_arr, c_timeStep){
    var input = getFisherLocs(fisher_arr, c_timeStep); 
   	var fisherDisArr = [];
	
	for(i in input){
        if(input[i].length == 0){
        	fisherDisArr.push(0);
        }else{
			var xOne = input[i][0][0];
	    	var yOne = input[i][0][1];
	    	var xTwo = input[i][input[i].length - 1][0];
	    	var yTwo = input[i][input[i].length - 1][1];
	    	var fisherDis = getDistance(xOne,yOne,xTwo,yTwo);
	    	fisherDisArr.push(fisherDis);
        }
        
    }	
	//remove fisher without catch
	var histogramData = removeZeroCatch(fisherDisArr, fisher_arr, c_timeStep);
	    histogramdata = removeZeroDistance(histogramData);
	
	
	if(histogramData.length != 0){
		// minimum distance
		 minDistance =  Math.min.apply(null, histogramData);
		 //maximum distance
		 maxDistance = Math.max.apply(null, histogramData);
		//create histogram data 
		 createHistogramChart(histogramData);
	}else if (!d3.select("#histogram svg g").empty()){
		// if histogram chart exist remove existing data when no data input
		var svg = d3.select("#histogram svg g");
			svg.selectAll(".bar").remove();
	}else{
		// create  an empty grid for zero input 
		var border=1;
	    var bordercolor='black'; 

		
		var margin = {top: 0, right: 20, bottom: 40, left: 60},
	    width = 500 - margin.left - margin.right,
	    height = 210 - margin.top - margin.bottom;
		
		var x = d3.scaleLinear()
         .domain([0, 10])
         .range([0, width]);

		 var y = d3.scaleLinear()
          .range([height, 0])
		  .domain([0,10]);
		 
		 var svg = d3.select("#histogram").append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	      .append("g")
	        .attr("transform", 
	              "translate(" + margin.left + "," + margin.top + ")");
		 
		 // add the x Axis
	      svg.append("g")
	          .attr("transform", "translate(0," + height + ")")
	          .attr("class", "x axis")
	          .call(d3.axisBottom(x));
	
	      // add the y Axis
	      svg.append("g")
	      	  .attr("class", "y axis")
	          .call(d3.axisLeft(y));
	          
	    // add label to x axis
	    svg.append("text")             
	          .attr("transform",
	                "translate(" + (width/2) + " ," + 
	                               (height+30) + ")")
	          .style("font-size", "12px")
	          .style("text-anchor", "middle")
	          .style("fill","steelblue")
	          .text("Distance (cells)");
	
	
	    // text label for the y axis
	      svg.append("text")
	          .attr("transform", "rotate(-90)")
	          .attr("y", 0 - margin.left)
	          .attr("x",0 - (height / 2))
	          .attr("dy", "1em")
	          .style("text-anchor", "middle")
	          .style("fill","steelblue")
	          .style("font-size", "12px")
	          .text("Number of Fishers");
		
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

//update histogram data
function updateDataHistogram(histogramData){
	
	d3.select(".d3-tip.n").remove();
	var margin = {top: 0, right: 20, bottom: 40, left: 60},
    width = 500 - margin.left - margin.right,
    height = 210 - margin.top - margin.bottom;
	
	var border=1;
    var bordercolor='black'; 

	const [min, max] = d3.extent(histogramData);

     x = d3.scaleLinear()
             .domain([0, max + 1])
             .range([0, width]);

     y = d3.scaleLinear()
           .range([height, 0]);

	// set the parameters for the histogram
    var histogram = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks());



    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:red'>" + d.length + "</span>";
      })

    
    // group the data for the bars
    var bins = histogram(histogramData);

    

    var svg = d3.select("#histogram svg g");

    svg.call(tip);

    svg.selectAll("rect").remove();
    
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);
    
   
	svg.selectAll("rect")
    	.data(bins)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0)  ; })
          .attr("height", function(d) { return height - y(d.length); })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

	
	// update the x Axis
	svg.select(".x.axis")
       .call(d3.axisBottom(x));

      // update the y Axis
    svg.select(".y.axis")
       .call(d3.axisLeft(y));
    
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







