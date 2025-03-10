package com.abelatroz.weatherapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.abelatroz.weatherapp.exception.CityNotFoundException;
import com.abelatroz.weatherapp.model.OpenWeatherResponse;

@Service // Indica que esta classe é um serviço de lógica de negócio
public class WeatherService {

    private static final String API_KEY = "365ba3b15a813aa62f189fcc4daa3d84"; // Substitua pela sua chave
    private static final String URL_TEMPLATE = "https://api.openweathermap.org/data/2.5/forecast?q=%s&appid=%s&units=metric";

    public OpenWeatherResponse getWeather(String city) {
        String url = String.format(URL_TEMPLATE, city, API_KEY); // Monta a URL da API com a cidade e a chave
        RestTemplate restTemplate = new RestTemplate(); // Objeto para fazer requisições HTTP
        try {
        	return restTemplate.getForObject(url, OpenWeatherResponse.class); // Faz a requisição e retorna o JSON como String
        }catch (HttpClientErrorException.NotFound e){ // 🔥 Capturando erro 404
        	throw new CityNotFoundException("Cidade não encontrada.");
        }
    }
}
