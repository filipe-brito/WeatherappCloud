package com.abelatroz.weatherapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abelatroz.weatherapp.model.Forecast;
import com.abelatroz.weatherapp.model.OpenWeatherResponse;
import com.abelatroz.weatherapp.model.WeatherResponse;
import com.abelatroz.weatherapp.service.WeatherService;
import com.abelatroz.weatherapp.service.WeatherServiceUtilities;

@RestController // Define que esta classe é um Controller REST (responde com JSON)
@RequestMapping("/backend") // Define a URL base para as requisições
@CrossOrigin(origins = "*") // Permite que o frontend acesse a API
public class Controller {

    private WeatherService weatherService; // Serviço que faz a requisição para a OpenWeather
	private WeatherServiceUtilities weatherServiceUtilities;

    // Construtor para injetar a dependência do serviço
    public Controller(WeatherService weatherService, WeatherServiceUtilities weatherServiceUtilities) {
        this.weatherService = weatherService;
		this.weatherServiceUtilities = weatherServiceUtilities;
    }

    // Endpoint que recebe o nome da cidade e retorna a previsão do tempo
    @GetMapping("/{city}")
    public WeatherResponse getWeather(@PathVariable String city) {
    	System.out.println("\n\n" + city + "\n\n");
		OpenWeatherResponse openWeatherResponse = weatherService.getWeather(city); // Chama o serviço para buscar a previsão do tempo e armazena 
		//List<Forecast> allForecasts = openWeatherResponse.getForecasts();
		Map <String, List<Forecast>>filteredForecasts = weatherServiceUtilities.daysOrganizer(openWeatherResponse);
		System.out.println(filteredForecasts);
		WeatherResponse weatherResponse = new WeatherResponse(filteredForecasts, openWeatherResponse.getCity());
		
        return weatherResponse;
    }
}
