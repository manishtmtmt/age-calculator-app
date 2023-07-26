const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayOutput = document.getElementById("days");
const monthOutput = document.getElementById("months");
const yearOutput = document.getElementById("years");

const form = document.querySelector("form");
const errorTextElements = document.querySelectorAll("small");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;

const currentYear = new Date().getFullYear();

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateAge();
});

function validateAge() {
  cleanStyle();
  cleanOutput();
  const input = [dayInput.value, monthInput.value, yearInput.value];

  const isFieldEmpty = checkEmptyField(input);

  const isValidDate = checkForValidDate(input);
  if (!isFieldEmpty && isValidDate) {
    calculateAge(input);
  }
}

function checkEmptyField(input) {
  let empty = false;

  const inputCombination = [];

  for (let i = 0; i < input.length; i++) {
    if (!input[i]) {
      empty = true;
      inputCombination.push(i);
    }
  }

  if (!empty) return false;

  inputCombination.forEach((el) => {
    errorTextElements[el].textContent = "This field is required";
    labels[el].classList.add("red");
    inputs[el].classList.add("red-border");
  });

  return true;
}

function cleanStyle() {
  errorTextElements.forEach((el) => (el.textContent = null));
  labels.forEach((el) => el.classList.remove("red"));
  inputs.forEach((el) => el.classList.remove("red-border"));
}

function cleanOutput() {
  dayOutput.textContent = "--";
  monthOutput.textContent = "--";
  yearOutput.textContent = "--";
}

function checkForValidDate(input) {
  const year = input[2];
  const month = input[1];
  const day = input[0];

  let validDate = true;

  if (year > currentYear) {
    errorTextElements[2].textContent = "Must be in the past";
    labels[2].classList.add("red");
    inputs[2].classList.add("red-border");
    validDate = false;
  }
  if (month > 12) {
    errorTextElements[1].textContent = "Must be a valid month";
    labels[1].classList.add("red");
    inputs[1].classList.add("red-border");
    validDate = false;
  }
  if (day > 31) {
    errorTextElements[0].textContent = "Must be a valid day";
    labels[0].classList.add("red");
    inputs[0].classList.add("red-border");
    validDate = false;
  }
  if (year == currentYear && month <= 12 && month > currentMonth && day <= 31) {
    errorTextElements[1].textContent = "Must be in the past";
    labels[1].classList.add("red");
    inputs[1].classList.add("red-border");
    validDate = false;
  }
  if (year < currentYear && month > 12 && day <= 31) {
    errorTextElements[1].textContent = "Must be a valid month";
    labels[1].classList.add("red");
    inputs[1].classList.add("red-border");
    validDate = false;
  }
  if (year == currentYear && month == currentMonth && day > currentDay) {
    errorTextElements[0].textContent = "Must be in the past";
    labels[0].classList.add("red");
    inputs[0].classList.add("red-border");
    validDate = false;
  }
  if (
    year <= currentYear &&
    !isLeapYear(year) &&
    month <= 12 &&
    day > daysInMonth[month - 1]
  ) {
    errorTextElements[0].textContent = "Must be a valid day";
    labels[0].classList.add("red");
    inputs[0].classList.add("red-border");
    validDate = false;
  }

  return validDate;
}

function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function calculateAge(date) {
  const year = date[2];
  const month = date[1];
  const day = date[0];

  let ageYears = currentYear - year;
  let ageMonths = currentMonth - month;
  let ageDays = currentDay - day;

  // Adjust for negative months or days
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    ageMonths--;
    ageDays += daysInLastMonth;
  }

  dayOutput.textContent = ageDays;
  monthOutput.textContent = ageMonths;
  yearOutput.textContent = ageYears;
}
