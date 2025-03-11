import * as API from "./api.js";
import * as UI from "./ui.js";

// Seleciona todas as células clicáveis (dias e previsões por hora)
const cells = document.querySelectorAll("#current-day-cell, .day");
// Adiciona o evento de clique para cada célula
cells.forEach(cell => {
    cell.addEventListener("click", (event) => UI.handleCellClick(event, cells));
});


let weatherData = null;

document.getElementById("fetch-button").addEventListener("click", async () => {
    const city = document.getElementById("city").value.trim();
    if(!city ){
        document.getElementById("message-box").innerText = `ERRO!\n\nCidade não pode estar vazia.`;
        return;
    }
    weatherData = await API.fetchWeather(city);
    if (weatherData instanceof Error) {
        document.getElementById("message-box").style.display = "block";
        document.getElementById("forecasts-table").style.display = "none";

        document.getElementById("message-box").innerText = `ERRO!\n\n${weatherData.message}`;
        return;
    } else {
        document.getElementById("message-box").style.display = "none";
        document.getElementById("forecasts-table").style.display = "flex";
        UI.updateCityAndCountry(`${weatherData.city.name}, ${weatherData.city.country}`);
        UI.updateTodayCell(weatherData);
        UI.updateDaySelector(weatherData);
        UI.updateHourlyCells(weatherData.filteredForecasts.day1, "day1");
    }
});

document.getElementById("current-day-cell").addEventListener("click", function(){
    UI.updateHourlyCells(weatherData.filteredForecasts.day1, "day1");
});

document.querySelectorAll("#day-selector .day")[0].addEventListener("click", function(){
    UI.updateHourlyCells(weatherData.filteredForecasts.day2, "day2");
});
document.querySelectorAll("#day-selector .day")[1].addEventListener("click", function(){
    UI.updateHourlyCells(weatherData.filteredForecasts.day3, "day3");
});
document.querySelectorAll("#day-selector .day")[2].addEventListener("click", function(){
    UI.updateHourlyCells(weatherData.filteredForecasts.day4, "day4");
});
document.querySelectorAll("#day-selector .day")[3].addEventListener("click", function(){
    UI.updateHourlyCells(weatherData.filteredForecasts.day5, "day5");
});