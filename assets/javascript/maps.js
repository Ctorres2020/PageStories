import styles from './maps/style';

function iniMap(){

    const coords = {
        lat:-25.282352,
        lng:-57.635086
    }

    let map = new google.maps.Map(document.getElementById('mapa'),{
        center: coords,
        zoom:17,
        styles: styles
    });
    let marker = new google.maps.Marker({
        position: coords,
        map,
        title: 'Space Store'
    })
}

iniMap();