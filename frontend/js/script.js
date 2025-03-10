let backendResponse = null;

// Seleciona todas as células clicáveis (dias e previsões por hora)
const cells = document.querySelectorAll("#current-day-cell, .day");

// Função para lidar com o clique
function handleCellClick(event) {
    // Remove a classe 'selected' de todas as células antes de aplicar em uma nova
    cells.forEach(cell => cell.classList.remove("selected"));

    // Adiciona a classe 'selected' apenas na célula clicada
    event.currentTarget.classList.add("selected");
}

// Adiciona o evento de clique para cada célula
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

async function fetchWeather() {
    const city = document.getElementById("city").value;

    let backendRequest = await fetch('http://localhost:8080/api/weather/' + city);

    if (!backendRequest.ok) {
        console.error("erro ao buscar dados da API");
        return;
    }

    backendResponse = await backendRequest.json();

    updateTodayCell(backendResponse);
    updateDaySelector(backendResponse);
    updateHourlyCells(backendResponse.filteredForecasts.day1);
    document.getElementById("current-day-cell").classList.add("selected");
}

function updateTodayCell(backendResponse) {
    // Altera a legenda que exibe a cidade e o país pesquisados
    const cityAndCountry = backendResponse.city.name + ", " + backendResponse.city.country;
    document.getElementById("city-researched").querySelector("h2").textContent = cityAndCountry;
    // Altera a célula do dia atual
    const today = timestampConversor(backendResponse.filteredForecasts.day1[0].dt);
    document.getElementById("current-day-cell").querySelectorAll("p")[0].innerText = today.toLocaleDateString(navigator.language, {month: "long", day: "numeric"});
    document.querySelector("#current-day-cell .temp").innerText = backendResponse.filteredForecasts.day1[0].main.temp.toFixed(0) + "°C";
}

function updateDaySelector(backendResponse){
    // Array que recebe os elementos da classse "day" do html
    const dayButtons = document.querySelectorAll(".day");
    // Vamos iterar cada elemento das células dos dias e alterar os textos
    dayButtons.forEach((button, index) => {
        const dayKey = `day${index + 2}`;
        const day = timestampConversor(backendResponse.filteredForecasts[dayKey][0].dt);
        const today = new Date();

        button.querySelector("h2").innerText = day.toLocaleDateString(navigator.language, {weekday: "long"}).toUpperCase();
        button.querySelector("h3").innerText = day.toLocaleDateString(navigator.language, {month: "long", day: "numeric"});
    })
}

function updateHourlyCells(daySelected){
    let hourlyCells = document.querySelectorAll(".hourly-cell");
    if(daySelected === backendResponse.filteredForecasts.day1){
        for(let i=0; i<hourlyCells.length; i++){
            if(daySelected && daySelected[i]){
                hourlyCells[i].style.visibility = "visible";
                let hour = timestampConversor(daySelected[i].dt);
                hourlyCells[i].querySelector("h2").innerText = hourFormatter(hour);
            } else{
                hourlyCells[i].style.visibility = "hidden";
            }
        }
    } else {
        const hourValidated = hourValidator(daySelected);
        for(let i=0; i<hourlyCells.length; i++){
            hourlyCells[i].style.visibility = "visible";
            const date = timestampConversor(hourValidated[i].dt);
            hourlyCells[i].querySelector("h2").innerText = hourFormatter(date);
        }
    }
}

function hourValidator(daySelected){
    let hourValidated = [];
    daySelected.forEach((obj, index) => {
        let date = timestampConversor(obj.dt);
        if ([6, 9, 12, 15, 18].includes(date.getHours())) {  
            hourValidated.push(obj);  // Adiciona apenas os horários desejados
        }
    });
    return hourValidated;
}

function timestampConversor(timestamp){
    const data = new Date(timestamp * 1000);
    return data;
}
function hourFormatter(timestamp){
    const hour = `${String(timestamp.getHours()).padStart(2, "0")}:${String(timestamp.getMinutes()).padStart(2, "0")}`;
    return hour;
}

document.getElementById("fetch-button").addEventListener("click", fetchWeather);

document.getElementById("current-day-cell").addEventListener("click", function(){
    updateHourlyCells(backendResponse.filteredForecasts.day1);
});

document.querySelectorAll("#day-selector .day")[0].addEventListener("click", function(){
    updateHourlyCells(backendResponse.filteredForecasts.day2);
});
document.querySelectorAll("#day-selector .day")[1].addEventListener("click", function(){
    updateHourlyCells(backendResponse.filteredForecasts.day3);
});
document.querySelectorAll("#day-selector .day")[2].addEventListener("click", function(){
    updateHourlyCells(backendResponse.filteredForecasts.day4);
});
document.querySelectorAll("#day-selector .day")[3].addEventListener("click", function(){
    updateHourlyCells(backendResponse.filteredForecasts.day5);
});