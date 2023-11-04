var MaxCal = "";
var brands = "";
var pref = "";
var resVal = "";
const submit = document.getElementById("submit");
const tbl = document.getElementById("dataTable");
submit.addEventListener("click", function async(e) {
  e.preventDefault();
  MaxCal = document.getElementById("range_cal").value;
  var prefBtn = document.getElementsByName("brands");
  for (var i = 0; i < prefBtn.length; i++) {
    if (prefBtn[0].checked) {
      brands = "0";
      break;
    }
    if (prefBtn[i].checked) {
      brands += prefBtn[i].value;
    }
  }
  var radioButtons = document.getElementsByName("pref");


  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      pref = radioButtons[i].value;
      break;
    }
  }
  console.log(brands);
  console.log(pref);
  if (!isNaN(MaxCal)) {
    dataPY();
  } else {
    MaxCal = "";
    alert("Please enter valid Number");
  }
});

async function dataPY() {
  const response = await fetch(
    `http://localhost:3001/run-python-script?maxCalories=${MaxCal}*${brands}*${pref}`
  );
  const data = await response.json();

  if (response.ok) {
    while (tbl.rows.length > 0) {
      tbl.deleteRow(0);
    }
    const tblBody = document.createElement("tbody");
    tblBody.innerHTML =
      "<tr> <th>Brand</th> <th>Name</th> <th>Calories</th> <th>Fats</th> <th>Carbohydrates</th> <th>Sugar</th> <th>Protiens</th> <th>Quantity</th> <th>Total Protiens</th> </tr>";
    console.log(data.result);
    const resData = data.result;
    var splitArr = [];
    splitArr = resData.split("&");
    console.log(splitArr);
    console.log(splitArr[splitArr.length - 1]);
    document.getElementById("resVal").innerText = `${
      splitArr[splitArr.length - 1]
    }`;
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
    MaxCal = "";
    brands = "";
    pref = "";
  } else {
    console.log(data.error);
  }
}

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
 * Utility function to update the button text and aria-label.
 */
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

/**
 * 3. Update the theme setting and button text accoridng to current settings
 */
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});
