const CSVPATH_LOCAL_UNEPMPLOYMENT_STATS = "data/Local_Area_Unemployment_Statistics__LAUS_.csv"

// Read csv
// Filter Metropolitian areas and Counties, loop through: d3.select?? forEach =>??? 
// Bar chart
// Line chart
//d3.csv("Local_Area_Unemployment_Satistics_LAUS.csv")
//d3.csv("Local_Area_Unemployment_Satistics_LAUS.csv").then(function(unemplData) {
    //console.log("The csv file")
    //unempltData.forEach(function(data) {
        //data.areaType= +data.areaType;
        //data.areaName = +data.areaName

// Read csv
d3.csv(CSVPATH_LOCAL_UNEPMPLOYMENT_STATS).then(function(data) {
  console.log(data);
  console.log()
  
  // for (var i = 0; i < data.length; i++) {

  //   }
})        

      // Step 1: Set up our chart
//= ================================
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
       top: 20,
       right: 40,
       bottom: 60,
       left: 50
};

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
   var svg = d3
      .select("body")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var chartGroup = svg.append("g")
       .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv(CSVPATH_LOCAL_UNEPMPLOYMENT_STATS).then(function(unemplData) {
    console.log("The csv file")
    unempltData.forEach(function(data) {
        // It's for numeric data.areaType= +data.areaType;  //????? d.areaType or d.county / d3.metropolitan  d3.state
        // data.areaName = +data.areaName
    })

  // Step 5: Create Scales
  //= ============================================
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(unemplData, d => d.year))
    .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(unemplData, d => d.areaType)]) //????? d.areaType or d.county / d3.metropolitan  d3.state
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(unemplData, d => d.metropolitan)])
    .range([height, 0]);

  // Step 6: Create Axes
  // =============================================
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%d-%b"));
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);


  // Step 7: Append the axes to the chartGroup - ADD STYLING
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // CHANGE THE TEXT TO THE CORRECT COLOR
  chartGroup.append("g")
    .attr("stroke", "green") // NEW!
    .call(leftAxis);

  // CHANGE THE TEXT TO THE CORRECT COLOR
  chartGroup.append("g")
    .attr("transform", `translate(${width}, 0)`)
    .attr("stroke", "orange") // NEW!
    .call(rightAxis);


  // Step 8: Set up two line generators and append two SVG paths
  // ==============================================
  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d.county));

  var line2 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d.metropolitan));

    // Add state 

  // Append a path for line1
  chartGroup.append("path")
    .data([unemplData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([unemplData])
    .attr("d", line2)
    .classed("line orange", true);

  

  chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "green")
    .text("Insert Text Here: County");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "orange")
    .text("Insert Text Here: Metropolitan");
    // Add state

}).catch(function(error) {
  console.log(error);
});