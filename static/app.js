// Local Path for the CSV file
const CSVPATH_LOCAL_UNEPMPLOYMENT_STATS = "data/yearly-unemployment-data.csv" 
const CSVPATH_CLEANED_STATS = "data/new_cleaned_LAUS.csv"
// RESPONSE - a promise result of all the data in the cvs file.

//hardcode dropdown in html since there are only 3 options. 

// This function populates the HTML select element with the correct data
// @Kate
 

// @Jade
function createGraph(areaType) {
  //var unempLabels = areaType.map(row => row.Unemployment);

  if (!areaType) {
    areaType = "State"
  }
  
  d3.csv(CSVPATH_CLEANED_STATS).then(function(data){
    var filteredAreaType = data.filter(aType => aType.Area_Type ==areaType);
    console.log(filteredAreaType)
    var YearData = filteredAreaType.map(d => d.Year);
    // console.log(filteredYears)
    var unsortedYearLabel  = [... new Set(YearData)]
    var sortedYearLabel  = [... new Set(YearData)].sort()
    //console.log(unsortedYearLabel)
    var unemploymentData = filteredAreaType.map(d => d.Unemployment);
    //var maxUnemploymentData = unemploymentData.max()
    //console.log(YearData)
    console.log(unemploymentData)

    var groupUnemploy = unemploymentData.reduce((a,b) =>a+b,0)

    const ctx = document.getElementById('mycanvas').getContext('2d');
    //const chart = new Chart(ctx,{
    if(window.chart != undefined)
    window.chart.destroy();
    window.chart = new Chart(ctx, {
      type:'bar',
      data: {
        labels: unsortedYearLabel,
        datasets: [{
          data: unemploymentData,
          backgroundColor:[
            'rgba(224,20,20,0.3)',
            'rgba(255,221,68,0.3)',
            'rgba(176,225,25,0.3)',
            'rgba(40,255,25,0.3)',
            'rgba(63,217,158,0.3)',
            'rgba(147,255,239,0.3)',
            'rgba(12,82,186,0.3)',
            'rgba(5,0,255,0.3)',
            'rgba(196,105,255,0.3)',
            'rgba(205,12,213,0.3)',
            'rgba(255,27,185,0.3)'
          ]
        }]
      }
    })
  }); 
}


function optionChanged(areaType){
  createGraph(areaType)
}

function init() {
  const selector = d3.select("#selDataset")
  const distinctAreaTypes =  ["State", "County", "Metropolitan Area"]
  d3.csv(CSVPATH_LOCAL_UNEPMPLOYMENT_STATS).then(function(unemploymentArray) {
    // var AreaTypes = []
    // unemploymentArray.forEach((unemploymentObj) => {
    //   AreaTypes.push(unemploymentObj["Area_Type"])
    // })
    // var distinctAreaTypes = [... new Set(AreaTypes)]

    distinctAreaTypes.forEach(AType => {
      selector.append("option")
          .attr("value",AType) 
          .text(AType)
    })
    
    createGraph(distinctAreaTypes[0]) 
  })
}

 init()







      // Step 1: Set up our chart
//= ================================
    var svgWidth = 1060;
    var svgHeight = 500;

    var margin = {
       top: 20,
       right: 10,
       bottom: 60,
       left: 10
};

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;


   var svg = d3
      .select("body")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var chartGroup = svg.append("g")
       .attr("transform", `translate(${margin.left}, ${margin.top})`);




// }).catch(function(error) {
//   console.log(error);
// })