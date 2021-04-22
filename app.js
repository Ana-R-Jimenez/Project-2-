// Read csv
// Filter Metropolitian areas and Counties, loop through: d3.select?? forEach =>??? 
// Bar chart
// Line chart
d3.csv("LAUS.csv").then(function(unempltData) {
    console.log("The csv file")
    unempltData.forEach(function(data) {
        data.areaType= +data.areaType;
        data.areaName = +data.areaName;
        
   });