package com.abelatroz.weatherapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

//Classe que representa todo o retorno da API. 
//Cada atributo do Json de retorno deve ser um atributo dessa classe
//No caso dos arrays ou objetos com parâmetros próprios no json devem ser representados por classes distintas aqui no java
public class OpenWeatherResponse {
	// Segue os atributos mapeados. Caso não precisemos de todos, basta não vincular o atributo aqui
	private String cod;
	private int message;
	private int cnt;
	
	// As previsões são retornadas nessa lista. No json, os objetos dessa lista não tem nome, mas aqui vamos dar o nome de "Forecast"
	@JsonProperty("list")
	private List<Forecast> forecasts;
	
	private City city;
	
	// Getters
	// Nesses casos, como não alteramos os valores retornados pela API, não é necessário criar setters
	public String getCod(){
		return cod;
	}
	public int getMessage(){
		return message;
	}
	public int getCnt(){
		return cnt;
	}
	public List<Forecast> getForecasts(){
		return forecasts;
	}
	public City getCity(){
		return city;
	}
}