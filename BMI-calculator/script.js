const weight = document.getElementById("weight");
const height = document.getElementById("height");
const display = document.getElementById("display");

function bmi() {
  const w = parseFloat(weight.value);
  const h = parseFloat(height.value);

  if (isNaN(w) || isNaN(h) || h <= 0) {
    display.textContent = " Please enter valid weight and height.";
    display.style.color = "red";
    return;
  }

  const result = w / (h ** 2);
  let message = "";

  if (result <= 19) {
    message = "You are underweight.";
    display.style.color = "#ffa500"; // orange
  } else if (result <= 25) {
    message = "You are in the normal range.";
    display.style.color = "green";
  } else {
    message = "You are overweight.";
    display.style.color = "red";
  }

  display.innerHTML = `Your BMI is <strong>${result.toFixed(2)}</strong>. ${message}`;
}
