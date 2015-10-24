function initMap() {
    var myLatLng = {lat: 40.420203, lng: -2.463377};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: myLatLng
    });

    $.getJSON( "json/mapa.json", function( data ) {
        var localizacion;
        $.each(data,function(i){
            localizacion = {lat: data[i].latitude, lng: data[i].longitude};
            var marker = new google.maps.Marker({
            position: localizacion,
            title: 'Hello World!',
            map: map
           
            });
            var infowindow = new google.maps.InfoWindow({
                content: "Dirección: "+data[i].direccion+" / Teléfono: "+data[i].telefono
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
            
            $("#listaAccesible").append('<li title="'+data[i].direccion+" / Teléfono: "+data[i].telefono+'">'+data[i].name+'&nbsp</li>');
            
         });
    });
    
}

