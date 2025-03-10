package com.abelatroz.weatherapp.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	/*
	 A anotação @ExceptionHandler é utilizada para informar ao Spring que esse método deve ser invocado quando uma exceção nos parênteses for lançada.
	 public ResponseEntity<Map<String, Object>>
	 ResponseEntity: Representa a resposta HTTP, incluindo o corpo e o status HTTP. 
	 Map<String, Object>: O Spring Boot converte automaticamente um HashMap em JSON. Então, passamos no parâmetro uma String para representar a chave, e um Object para representar o valor
	*/

    @ExceptionHandler(CityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCityNotFoundException(CityNotFoundException e) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", HttpStatus.NOT_FOUND.value()); // Passa o código HTTP
        errorResponse.put("message", e.getMessage()); // Passa a mensagem definida ao capturar a exceção

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
}