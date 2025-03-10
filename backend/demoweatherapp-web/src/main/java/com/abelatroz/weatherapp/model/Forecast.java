package com.abelatroz.weatherapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Forecast {
	private long dt;
	private Main main;
	private List<Weather> weather;
	@JsonProperty("dt_txt")
	private String dateText; // A tag no JSON tem esse nome. Não sei como adaptar isso ao padrão do java
	// Há vários outros parâmetros no JSON dentro desse objeto, mas por ora, deixemos somente esses
	
	// GETTERS
	public long getDt(){
		return dt;
	}
	public Main getMain(){
		return main;
	}
	public List<Weather> getWeather(){
		return weather;
	}
	public String getDateText(){
		return dateText;
	}
}
