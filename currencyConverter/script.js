// Pass in the id of select cell and the dynamic list of various options will be generated
function createListOfOptions(id) {
  const data = [
    "CNY Chinese Yuan",
    "CHF Swiss Franc",
    "AUD Australian Dollar",
    "PLN Polish Zloty",
    "TRY Turkish New Lira",
    "GBP British Pound",
    "NZD New Zealand Dollar",
    "KRW South Korean Won",
    "DKK Danish Krone",
    "HKD Hong Kong Dollar",
  ];

  const options = document.getElementById(id);
  options.innerHTML = ""; // Clear existing options
  for (let i = 0; i < data.length; i++) {
    const selectField = document.createElement("option");
    selectField.innerText = data[i];
    selectField.value = data[i].split(" ")[0]; // Set the value to the currency code
    selectField.classList.add("chosenOption"); // Add class to the option
    options.append(selectField);
  }
}

// Helper function that makes a call to createListOfOptions function by passing in the id
// of select tag wherein the list of various options will be added to the select tag.
function createCurrencyOptions() {
  createListOfOptions("fromCurrencyOptions");
  createListOfOptions("toCurrencyOptions");
}

//! Handling conversion logic
const subButton = document.getElementById("convertButton");
subButton.addEventListener("click", () => {
  const fromOption = document.getElementById("fromCurrencyOptions").value; // Get selected value
  const toOption = document.getElementById("toCurrencyOptions").value; // Get selected value

  const amount = document.getElementById("amount").value;
  convert(fromOption, toOption, amount);
});

function convert(from, to, amount) {
  const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${from}&want=${to}&amount=${amount}`;
  //^ NEW CONCEPT LEARNED
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-Api-Key", ""); // API KEY INSIDE ""

  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      // let's display it as a p tag
      const resultPara = document.getElementById("resultPara");
      resultPara.innerText = `Converted Amount is ${data.new_amount}`;
    });
}

// Function calls
createCurrencyOptions();
