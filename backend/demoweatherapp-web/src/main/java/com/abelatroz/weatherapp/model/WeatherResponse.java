package com.abelatroz.weatherapp.model;

import java.util.List;
import java.util.Map;

public class WeatherResponse {
	private Map <String ,List<Forecast>> filteredForecasts;
	private City city;
	
	public WeatherResponse(Map <String, List<Forecast>> filteredForecasts, City city) {
		this.filteredForecasts = filteredForecasts;
		this.city = city;
	}

	public Map<String, List<Forecast>> getFilteredForecasts() {
		return filteredForecasts;
	}

	public City getCity() {
		return city;
	}
}
