$( document ).ready(function() {
        var jsonData = "bd/data.json";
	var tipoProd = urlParam('type');
	var idProd = urlParam('id');
        var contenedor = $('#contenedorProductos');


	// Petición para recuperar todos los productos de un tipo
	if (idProd == null) {
	    $.getJSON( jsonData, function( data ) {
	    	var items = [];
	    	$.each( data, function( key, val ) {
			    items = val;
			});
                        
	    	if (tipoProd != null) {
		    	var tipoDatos = $.grep(items, function (element, index) {
                            return element.type == tipoProd;
			});
                        
                        
                        $.each(tipoDatos[0].datos, function(index, value) {
                            $('#name').html(tipoDatos[0].name);
                            // Agregamos los productos de un determinado tipo
                            contenedor.append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='bd/"+ tipoProd +"/"+tipoDatos[0].datos[index].imagen+"' alt=''><div class='caption'>\n\
                                    <p>"+tipoDatos[0].datos[index].titulo+"</p><p><a href='productos.html?type="+tipoProd+"&id="+tipoDatos[0].datos[index].id+"' class='btn btn-primary' role='button'>Ver</a></p></div></div></div>");
                            
                        });
				
			}

			
	    }).fail(function() {
	    	console.log("ERROR");
	    });
	}
	else if (tipoProd != null && idProd != null) {
		// Petición para recuperar un producto específico de un tipo
		$.getJSON(jsonData, function(data) {
			var items = [];
	    	$.each( data, function( key, val ) {
			    items = val;
			});

	    	var tipoDatos = $.grep(items, function (element, index) {
		    	return element.type == tipoProd;
			});

	    	
	    	$.each(tipoDatos[0].datos, function(index, value) {
	    		if (value.id == idProd) {
                           $('.titulodescripcion').html(value.titulo);
                           $('#imagen').attr('src', 'bd/'+tipoProd+'/'+value.imagen);
                           $('#precio').html('PRECIO: '+value.precio);
                           $('#cont').html(value.caracteristicas);
                           if (value.oferta == 1)
                               $('#oferta').attr('style', 'display: block');
	    		}
	    	});
	    	

		}).fail(function() {
			console.log("ERROR");
		});
	}

});

