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
                            $('head title').html(tipoDatos[0].name);
                            // Agregamos los productos de un determinado tipo
                            contenedor.append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='bd/"+ tipoProd +"/"+tipoDatos[0].datos[index].imagen+"' alt=''><span class='badge badge-notify'>"+tipoDatos[0].datos[index].precio+"</span><div class='caption'>\n\
                                    <p>"+tipoDatos[0].datos[index].titulo+"</p><p><a href='producto_info.html?type="+tipoProd+"&id="+tipoDatos[0].datos[index].id+"' class='btn btn-primary' role='button'>Ver</a></p></div></div></div>");
                            
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
                           $('head title').html(value.titulo);
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
        
        // Evento para agregar productos al carrito
        var cantidad = $('input[name="cantidad"]');
           $('#comprar').click(function(e) {
                e.preventDefault();
                // Solo procesamos si al menos se ha agregado un producto
                if (cantidad.val() !== "") {
                    agregarProducto(urlParam('id'), cantidad.val());
                    cantidad.val("");
                    $('#compraCorrecta').modal('show');
                }
           });

});

function agregarProducto(id, cantidad) {
    var productosCarro = JSON.parse(sessionStorage.getItem("carrito"));
    if (productosCarro == null)
        productosCarro = new Array();
    
    var prod = {
        id: id,
        cantidad: cantidad
    };
    
    // Buscamos si existe en el carro el mismo producto para incrementar su cantidad
    encontrado = false;
    $.each(productosCarro, function(i, value) {
        if (productosCarro[i].id == prod.id) { // Si se encuentra, se incrementa
            cant = parseInt(productosCarro[i].cantidad);
            productosCarro[i].cantidad = cant + parseInt(prod.cantidad);
            encontrado = true;
        }
    });
        
    // Si no encontramos el producto en el carro, lo agregamos al final
    if (!encontrado)
        productosCarro.push(prod);
    
    sessionStorage.setItem("carrito", JSON.stringify(productosCarro));
}

