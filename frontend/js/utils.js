export function timestampConversor(timestamp) {
    return new Date(timestamp * 1000);
}

export function hourFormatter(timestamp) {
    return `${String(timestamp.getHours()).padStart(2, "0")}:${String(timestamp.getMinutes()).padStart(2, "0")}`;
}

export function hourValidator(daySelected){
    let hourValidated = [];
    daySelected.forEach((obj, index) => {
        let date = timestampConversor(obj.dt);
        if ([6, 9, 12, 15, 18].includes(date.getHours())) {  
            hourValidated.push(obj);  // Adiciona apenas os horários desejados
        }
    });
    return hourValidated;
}