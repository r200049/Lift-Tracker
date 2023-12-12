var table;
var tableData;

console.log('mango')
/* Verify HTML content is loaded */
document.addEventListener("DOMContentLoaded", function(event) {
  table = document.getElementById("leaderboard");
   
  fetch("http://127.0.0.1:8083")
    .then(response => response.json())
    .then(data => {
      tableData = data;
      generateTable(table, data);
      sortTable("Name");
      //createChart(data);
  });
 
  document.getElementById("sort-dropdown").addEventListener("change", (event) => {
    sortTable(event.target.value);
  });
 
  document.getElementById("login-button").addEventListener("click", (event) => {
    filterTable(document.getElementById("login-field").value);
  });
});


function generateTable(table, data) {
  /* Insert table header */
  const tableColumns = ["Name", "Date", "Lift", "Weight (lbs)", "Weight (kg)", "Reps", "Combined"];
  let tableHead = table.createTHead();
  let tableRow = tableHead.insertRow();
  for (let column of tableColumns) {
    let text = document.createTextNode(column);
    let cell = document.createElement("th");
    cell.appendChild(text);
    tableRow.appendChild(cell);
  }
 
  /* Insert table rows */
  for (let row of data) {
    let tableRow = table.insertRow();
    for (let column of tableColumns) {
      let text = document.createTextNode(row[column]);
      let cell = tableRow.insertCell();
      cell.appendChild(text);
    }
  }
}


function sortTable(sortField) {
  if (this.tableData == null) { return; }
 
  let sortedData = tableData.sort((a,b) => {
    if (sortField == "Name" || sortField == "Lift") {
      return b[sortField].localeCompare(a[sortField]);
    } else {
      return b[sortField] - a[sortField];
    }
  });
 
  this.table.innerHTML = "";
  generateTable(table, sortedData);
}


function filterTable(name) {
  if (this.tableData == null) { return; }
 
  let sortedData = tableData.filter((element) => {
    return element.Name == name;
  });
   
  this.table.innerHTML = "";
  generateTable(table, sortedData);
  createChart(sortedData)
}


function createChart(data) {
  var xyValues = [];
 
  for (let element of data) {
    /* Parse date string directly to Date */
    var date = new Date(element.Date + "T24:00:00");
    var timestamp = date.getTime();
    xyValues.push({x: timestamp, y: element["Combined"]});
  }
 
  new Chart("lift-chart", {
    type: "line",
    data: {
      datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: xyValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        xAxes: [{type : 'time', time:{unit:'day'}}]
        //yAxes: [{ticks: {min: 0, max:1000}}],
      }
    }
  });
}





