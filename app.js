var MaxCal = "";
var brands = "";
const submit = document.getElementById("submit");
submit.addEventListener("click", function async(e) {
  e.preventDefault();
  MaxCal = document.getElementById("noOfMaxCalories").value;
  console.log(isNaN(MaxCal));
  if (!isNaN(MaxCal)) {
    dataPY();
  } else {
    MaxCal = "";
    alert("Please enter valid Number");
  }
});

async function dataPY() {
  const response = await fetch(
    `http://localhost:3001/run-python-script?maxCalories=${MaxCal}*12`
  );
  const data = await response.json();

  if (response.ok) {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    tblBody.innerHTML =
      "<tr> <th>Brand</th> <th>Name</th> <th>Calories</th> <th>Fats</th> <th>Carbohydrates</th> <th>Sugar</th> <th>Protiens</th> <th>Quantity</th> <th>Total Protiens</th> </tr>";
    console.log(data.result);
    const resData = data.result;
    var splitArr = [];
    splitArr = resData.split("&");
    console.log(splitArr);
    for (let i = 1; i < splitArr.length - 1; i++) {
      const row = document.createElement("tr");
      const dataArr = splitArr[i].split("+");
      for (let j = 0; j < dataArr.length; j++) {
        if (
          j == 0 ||
          j == 1 ||
          j == 2 ||
          j == 4 ||
          j == 9 ||
          j == 11 ||
          j == 12 ||
          j == dataArr.length - 2
        ) {
          const cell = document.createElement("td");
          const cellText = document.createTextNode(`${dataArr[j]}`);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      }
      const cell = document.createElement("td");
      const cellText = document.createTextNode(
        `${dataArr[dataArr.length - 2] * dataArr[12]}`
      );
      cell.appendChild(cellText);
      row.appendChild(cell);
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tblBody);
  } else {
    console.log(data.error);
  }
}
