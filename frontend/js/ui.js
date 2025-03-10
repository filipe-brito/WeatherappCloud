import * as UTILS from "./utils.js";

// Função para lidar com o clique
export function handleCellClick(event, cells) {
    // Remove a classe 'selected' de todas as células antes de aplicar em uma nova
    cells.forEach(cell => cell.classList.remove("selected"));

    // Adiciona a classe 'selected' apenas na célula clicada
    event.currentTarget.classList.add("selected");
}

export function updateCityAndCountry(cityAndCountry) {
    document.getElementById("city-researched").querySelector("h2").textContent = cityAndCountry;
}

export function updateTodayCell(weatherData) {
    try {
        const today = UTILS.timestampConversor(weatherData.filteredForecasts.day1[0].dt);
        const cell = document.getElementById("current-day-cell");
        cell.querySelector("p").innerText = 
        today.toLocaleDateString(navigator.language, { month: "long", day: "numeric" });
        let icon = weatherData.filteredForecasts.day1[0].weather[0].icon;
        cell.style.backgroundImage = `url('assets/images/icons/${icon}.png')`;
        cell.style.backgroundSize = "contain";      // Faz a imagem preencher todo o espaço
        cell.style.backgroundPosition = "center"; // Centraliza a imagem
        cell.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita

        document.querySelector("#current-day-cell .temp").innerText = `${weatherData.filteredForecasts.day1[0].main.temp.toFixed(0)}°C`;
    } catch (error) {
        console.log("Sem previsões para hoje!");
    }
}

export function updateDaySelector(weatherData){
    // Array que recebe os elementos da classse "day" do html
    const dayButtons = document.querySelectorAll(".day");
    // Vamos iterar cada elemento das células dos dias e alterar os textos
    dayButtons.forEach((button, index) => {
        const dayKey = `day${index + 2}`;
        const day = UTILS.timestampConversor(weatherData.filteredForecasts[dayKey][0].dt);

        button.querySelector("h2").innerText = day.toLocaleDateString(navigator.language, {weekday: "long"}).toUpperCase();
        button.querySelector("h3").innerText = day.toLocaleDateString(navigator.language, {month: "long", day: "numeric"});
    })
}

export function updateHourlyCells(daySelected, dayKey){
    console.log(daySelected);
    let hourlyCells = document.querySelectorAll(".hourly-cell");
    if(dayKey === "day1"){
        for(let i=0; i<hourlyCells.length; i++){
            if(daySelected && daySelected[i]){
                hourlyCells[i].style.visibility = "visible";
                let hour = UTILS.timestampConversor(daySelected[i].dt);
                hourlyCells[i].querySelector("h2").innerText = UTILS.hourFormatter(hour);
                hourlyCells[i].querySelector(".temp").innerText = `${daySelected[i].main.temp.toFixed(0)}°C`;

                let icon = daySelected[i].weather[0].icon;
                hourlyCells[i].style.backgroundImage = `url('assets/images/icons/${icon}.png')`;
                hourlyCells[i].style.backgroundSize = "contain";      // Faz a imagem preencher todo o espaço
                hourlyCells[i].style.backgroundPosition = "center"; // Centraliza a imagem
                hourlyCells[i].style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
            } else{
                hourlyCells[i].style.visibility = "hidden";
            }
        }
    } else {
        const hourValidated = UTILS.hourValidator(daySelected);
        for(let i=0; i<hourlyCells.length; i++){
            hourlyCells[i].style.visibility = "visible";
            const date = UTILS.timestampConversor(hourValidated[i].dt);
            hourlyCells[i].querySelector("h2").innerText = UTILS.hourFormatter(date);
            hourlyCells[i].querySelector(".temp").innerText = `${hourValidated[i].main.temp.toFixed(0)}°C`;
        
            let icon = hourValidated[i].weather[0].icon;
            hourlyCells[i].style.backgroundImage = `url('assets/images/icons/${icon}.png')`;
            hourlyCells[i].style.backgroundSize = "contain";      // Faz a imagem preencher todo o espaço
            hourlyCells[i].style.backgroundPosition = "center"; // Centraliza a imagem
            hourlyCells[i].style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
        }
    }
}