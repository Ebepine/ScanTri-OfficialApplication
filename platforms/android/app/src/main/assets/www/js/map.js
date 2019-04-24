/*var map = L.map('map').fitWorld();
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 16,
    attribution: '',
    id: 'mapbox.streets'
}).addTo(map);

var markers = [];
var viewSet = false;

var onSuccess = function(position) {
    var radius = Math.round(position.coords.accuracy / 2);
    var latlng = new L.latLng(position.coords.latitude, position.coords.longitude);

    // Delete old markers between drawing new ones
    markers.forEach(function(marker){
        map.removeLayer(marker);
    });

    // Draw new markers, setting zoom
    markers.push(L.marker(latlng).addTo(map).bindPopup('Vous êtes ici').openPopup());
    markers.push(L.circle(latlng, radius).addTo(map));

    // Set view only once
    if(!viewSet) {
        map.setView(latlng, 16);
        viewSet = true;
    }

    // Relocate after xxx ms
    setTimeout(locateMe, 2000);
}

// onError Callback receives a PositionError object
function onError(error) {
    alert('Une erreur est survenue durant la localisation.\nCode #' + error.code + ' (' + error.message + ')');
}

function locateMe() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
locateMe();*/


// création d'une couche geoJson qui appelle le fichier « commune.geojson »
var commune = $.getJSON("json/commune.geojson",function(dataCommune)
{L.geoJson( dataCommune,
    {style: function(feature)
        {
        // paramétrage de la symbologie de la couche « commune »
            return { color : '#046380', weight : 1, fillColor : '#4BB5C1', fillOpacity : .5 };
        },
        onEachFeature : function( feature, layer )
        {
        // paramétrage de la popup de la couche « commune »
            layer.bindPopup( '<b><u>Description de la commune</u></b><br><b> Nom  </b>' + feature.properties.nom_commun )
        }
    }).addTo(map);
});

// création d'une couche geoJson qui appelle le fichier « points-dapport-volontaire-des-dechets.geojson »
var trash= $.getJSON("json/decheterie.geojson",function(dataTrash)
    // icone trash
    {
        var iconeTrash = L.icon({
        iconUrl : 'img/decheterie.png',
        iconSize : [25, 27]
    });
    // fonction pointToLayer qui ajoute la couche « trash » à la carte, selon la symbologie « iconeTrash », et paramètre la popup
    L.geoJson(dataTrash,{
        pointToLayer : function(feature,latlng){
            var marker = L.marker(latlng,{icon: iconeTrash});
            marker.bindPopup('<b><u>DECHETERIE : </u></b>'+ feature.properties.type +'<br>'
            );
            return marker ;
        }
    }).addTo(map);
});
