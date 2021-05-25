let aviones = [];
let coordenadas = {
    lat: 23.289674,
    lng: -101.793495
};

let limites = {
    north: 50,
    south: -5,
    west: -159,
    east: -54,
};

let propiedades = {
    center: coordenadas,
    zoom: 5,
    restriction: {
        latLngBounds: limites,
        strictBounds: false,
    },
}

iniciaMapa = async () => {

    const map = new google.maps.Map(document.getElementById('map'), propiedades);
    map.setOptions({
        minZoom: 5
    });

    const centerControlDiv = document.createElement("div");
    centerControl(centerControlDiv, map);

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    const uri =
        "https://opensky-network.org/api/states/all?lamin=12.754424&lomin=-127.415227&lamax=32.720980&lomax=-86.76";
    const res = await fetch(uri);
    const data = await res.json();

    aviones = filtrarAviones(data.states);

    hideLoading();

    aviones.forEach((element, index) => {
        let latLng = new google.maps.LatLng(element[6], element[5]); //Makes a latlng

        let marker = new google.maps.Marker({
            map: map,
            position: latLng,
            title: `${index} ${element[2]}`,
            icon: {
                url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${randomColor()}`
            }
        });

        marker.addListener('click', () => {
            map.panTo(latLng); //Make map global
            map.setZoom(8);
        });
    });
}

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

function randomColor() {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

centerControl = (controlDiv, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Center Map";
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
        map.panTo(coordenadas); //Make map global
        map.setZoom(5);
    });
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

hideLoading = async () => {
    const loading = document.getElementById('loading');
    loading.style.opacity = 0;
    await delay(1000);
    loading.remove();
    document.getElementById('map').style.opacity = 1;
}