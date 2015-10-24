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
        
        //
            var cantidad = $('input[name="cantidad"]');
            //Comprobamos si la session tenia compras para poner el nº en el carro
            if(sessionStorage.getItem("cesta1") != null){
                $(".cesta").html(sessionStorage.getItem("cesta1"));
            }
           
            $('#comprar').click(function(e) {
                e.preventDefault();
                if (cantidad.val() > 0) {
                    /*Cuando hemos pulsado en el boton comprar entramos en esta funcion que a
                      a continuacion si tenemos una bifurcacion dependiendo si la session 
                      tiene datos porque si no tiene debemos meter en el elemento cesta un
                      0 porque el valor null no podra ser sumado
                     */  
                    if(sessionStorage.getItem("cesta1") == null){
                        $(".cesta").html("0");
                        var x = $(".cesta").html();
                        x = parseInt(x) + parseInt(cantidad.val());
                        sessionStorage.setItem("cesta1", x);
                        $(".cesta").html(x);
                    }else{
                        $('.cesta').html(sessionStorage.getItem("cesta1"));
                        var x = $(".cesta").html();
                        x = parseInt(x) + parseInt(cantidad.val());
                        sessionStorage.setItem("cesta1", x);
                        $(".cesta").html(x);
                    }
                    
                }
            });
                       
                  
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

