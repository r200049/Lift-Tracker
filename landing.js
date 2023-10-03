document.addEventListener("DOMContentLoaded", function(event) { // makes sure HTML page is loaded
    var table = document.getElementById("leaderboard");
    
    fetch('http://localhost:8082')
        .then(response => response.json())
        .then(data => generateTable(table, data));
  });
  
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