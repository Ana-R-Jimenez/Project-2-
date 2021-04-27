// Local Path for the CSV file
const CSVPATH_LOCAL_UNEPMPLOYMENT_STATS = "data/Local_Area_Unemployment_Statistics__LAUS_.csv"
// RESPONSE - a promise result of all the data in the cvs file.
const RESPONSE = d3.csv(CSVPATH_LOCAL_UNEPMPLOYMENT_STATS)

//hardcode dropdown in html since there are only 3 options. 

// This function populates the HTML select element with the correct data
// @Kate
 

// @Jade
function createGraph(areaType) {
  //var unempLabels = areaType.map(row => row.Unemployment);
  RESPONSE.then(function(data){
    var yearFilter = data.filter(function(d){return d.Year > 2011});
    console.log(yearFilter)
    var unempFilter = yearFilter.Unemployment;
    
    //var chart = new Chart('chart',{
    //  type:'bar',
    //  data: {
    //    labels: 
    //  }
    //})
  });
  
}
createGraph('State')

function updateChart(){

}

// function init() {
//   const selector = d3.select("#selDataSet")

//   RESPONSE.then(function(unemploymentArray) { 
//     // unemploymentArray.forEach((unemploymentObj) => {
//     //   selector.append("option").attr("value", unemploymentObj["Area Type"])
//     //           .text( unemploymentObj["Area Type"])
//     // })
//     console.log(unemploymentArray)
//     //forEach and map =>
//     unemploymentArray.forEach(area=>
//       console.log(area));

//       //Object.entries(area)
      
//     for (let i = 0; i < 10; ++i) {
//           selector.append("option").attr("value", unemploymentArray[i]["Area Type"])
//                   .text( unemploymentArray[i]["Area Type"])

//   //console.log(unemploymentArray[0]["Area Type"])
//     }
//   })
// }

// init()

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
// RESPONSE.then(function(data) {
//   console.log(data);
//   console.log()
  
//   // for (var i = 0; i < data.length; i++) {

//   //   }
// })        

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