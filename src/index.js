import "./styles.css";

const apiKey = "XQPALFZ9VPNPV4BGZVCY6CB54";
const submitForm = document.querySelector(".submitForm");
const cityInput = document.querySelector(".cityInput");
const startDateInput = document.querySelector(".startDateInput");
const endDateInput = document.querySelector(".endDateInput");
const wantedDataInput = document.querySelector(".wantedData");

//// page initialisation for drop down menus. IIFE
(async function () {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Sydney/?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const dropDownData = Object.keys(data.days[0]);
    // const maxLengthOfDropDownMenu = Math.max(...dropDownData.map((element) => element.length));
    // wantedDataInput.style.width = `100px`;

    dropDownData.forEach((element) => {
        const newOption = document.createElement("option");
        newOption.value = element;
        newOption.innerText = element;
        wantedDataInput.append(newOption);
    });
})();

const retrieveWeatherInfo = async (location, date1, date2, wantedData) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    data.days.forEach((element) => console.log(element[wantedData]));
};

submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const wantedData = wantedDataInput.value;
    retrieveWeatherInfo(city, startDate, endDate, wantedData);
});
