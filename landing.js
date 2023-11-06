var table;
var tabledata;

document.addEventListener("DOMContentLoaded", function(event) { // makes sure HTML page is loaded
     table = document.getElementById("leaderboard");
    
    fetch('http://localhost:8082')
    .then(response => response.json())
    .then(data => {
      tableData = data;
      generateTable(table, data);
      //createChart(data);
  });
  
  document.getElementById("sort-dropdown").addEventListener("change", (event) => {
    sortTable(event.target.value);
  });
  document.getElementById("login-button").addEventListener("click", (event) => {
    filterTable(document.getElementById("login-field").value);
  });
  
});



function filterTable(name) {
  if (this.tableData != null) {
    let sortedData = tableData.filter((element) => {
      return element.Name == name;
    });
    this.table.innerHTML = "";
    generateTable(table, sortedData);
    createChart(sortedData)
  }
}



function generateTable(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key in data[0]) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
  
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

/*function sortTable(sortField) {
  if (this.tableData != null) {
    let sortedData = tableData.sort((a,b) => {
      return a[sortField] - b[sortField];
    });
    this.table.innerHTML = "";
    generateTable(table, sortedData);
  }
}
*/

function sortTable(sortField) {
  if (this.tableData != null) {
    let sortedData = tableData.sort((a,b) => {
      return b[sortField] - a[sortField];
    });
    this.table.innerHTML = "";
    generateTable(table, sortedData);
    
  }
}

function createChart(data) {
  var xyValues = [];
  
  for (let element of data) {
    // Parse date string directly to Date 
    var date = new Date(element.Date);
    var timestamp = date.getTime();
    xyValues.push({x: timestamp, y: element.Combined});
  }
  
	new Chart("myChart", {
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




