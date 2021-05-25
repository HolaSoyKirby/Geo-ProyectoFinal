function filtrarAviones(avionesFetch) {
    let aviones = [];
    for (let element of avionesFetch) {

        let m1, m2;

        if (element[5] <= -114.719231) {
            aviones.push(element);
        } else if (element[5] > -114.719231 && element[5] <= -111.077301) {
            let lat1 = 32.720980,
                lat2 = 31.337595,
                lon1 = -114.719231,
                lon2 = -111.077301;
            m1 = (lat2 - lat1) / (lon2 - lon1);
            m2 = (lat2 - element[6]) / (lon2 - element[5]);

            if (m2 >= m1) {
                aviones.push(element);
            }
        } else if (element[5] > -111.077301 && element[5] <= -108.216421) {
            let lat = 31.337595

            if (element[6] <= lat) {
                aviones.push(element);
            }
        } else if (element[5] > -108.216421 && element[5] <= -106.186345) {
            let lat = 31.816997;

            if (element[6] <= lat) {
                aviones.push(element);
            }
        } else if (element[5] > -106.186345 && element[5] <= -103.653327) {
            let lat1 = 31.816997,
                lat2 = 29.884509,
                lon1 = -106.186345,
                lon2 = -103.653327;
            m1 = (lat2 - lat1) / (lon2 - lon1);
            m2 = (lat2 - element[6]) / (lon2 - element[5]);

            if (m2 >= m1) {
                aviones.push(element);
            }
        } else if (element[5] > -103.653327 && element[5] <= -101.079160) {
            let lat = 29.884509;

            if (element[6] <= lat) {
                aviones.push(element);
            }
        } else if (element[5] > -101.079160 && element[5] <= -97.785928) {
            let lat1 = 29.884509,
                lat2 = 26.513094,
                lon1 = -101.079160,
                lon2 = -97.785928;
            m1 = (lat2 - lat1) / (lon2 - lon1);
            m2 = (lat2 - element[6]) / (lon2 - element[5]);

            if (m2 >= m1) {
                aviones.push(element);
            }
        } else if (element[5] > -97.785928 && element[5] <= -95.065192) {
            let lat1 = 26.513094,
                lat2 = 29.659108,
                lon1 = -97.785928,
                lon2 = -95.065192;
            m1 = (lat2 - lat1) / (lon2 - lon1);
            m2 = (lat2 - element[6]) / (lon2 - element[5]);

            if (m2 >= m1) {
                aviones.push(element);
            }
        } else {
            let lat = 29.463625;

            if (element[6] <= lat) {
                aviones.push(element);
            }
        }
    }
    return aviones;
}