export async function fetchWeather(city) {
    try {
        const backendRequest = await fetch(`http://localhost:8080/api/weather/${city}`);
        if(!backendRequest.ok){
            const errorData = await backendRequest.json();
            throw new Error(errorData.message);
        }
        return await backendRequest.json(); 
    } catch (error) {
        if(error instanceof TypeError){
            return new Error(`Não foi possível conectar ao servidor interno.`);
        }else{
            return error;
        }
    }
}