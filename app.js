var MaxCal = "";
const submit = document.getElementById("submit");
submit.addEventListener("click", function async(e) {
  e.preventDefault();
  MaxCal = document.getElementById("noOfMaxCalories").value;
  console.log(isNaN(MaxCal));
  if (!isNaN(MaxCal)) {
    console.log(typeof MaxCal);
    dataPY();
  } else {
    MaxCal = "";
    alert("Please enter valid Number");
  }
});

async function dataPY() {
  const response = await fetch(`/run-python-script?maxCalories=${MaxCal}`);
  const data = await response.json();

  if (response.ok) {
    console.log(data.result);
  } else {
    console.log(data.error);
  }
}
