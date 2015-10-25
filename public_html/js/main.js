$( document ).ready(function() {
        var jsonData = "bd/data.json";
	var tipoProd = urlParam('type');
	var idProd = urlParam('id');
        var contenedor = $('#contenedorProductos');

        
	
        if (tipoProd == null) {
            $.getJSON(jsonData, function(data) {
		var items = [];
	    	$.each( data, function( key, val ) {
			    items = val;
			});
                        
                var contenedor = $('#ofertas');
	    	var tipoDatos = $.grep(items, function (element, index) {
		    	$.each(element.datos, function(i, value) {
                           if (value.oferta == 1) {
                               contenedor.append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='bd/"+ element.type +"/"+value.imagen+"' alt=''><span class='badge badge-notify'>"+value.precio+"</span><div class='caption product-info'>\n\
                                    <p>"+value.titulo+"</p><p><a href='producto_info.html?type="+element.type+"&id="+value.id+"' class='btn btn-primary' role='button'>Ver</a></p></div></div></div>");
                            
                           }
                               
                        });
		});

		}).fail(function() {
			console.log("ERROR");
		});
        }
        // Petición para recuperar todos los productos de un tipo
	else if (idProd == null) {
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
                            contenedor.append("<div class='col-sm-6 col-md-4'><div class='thumbnail'><img src='bd/"+ tipoProd +"/"+tipoDatos[0].datos[index].imagen+"' alt=''><span class='badge badge-notify'>"+tipoDatos[0].datos[index].precio+"</span><div class='caption product-info'>\n\
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
           
           // Funcion para relizar dinamicamente la pagina comprar
            
            var contenedor2 = $('#productos');
            var preciototal=0;
            var x = sessionStorage.carrito== null;
            if (x){
                $('#productos').html("");
            }else{
               var Carro = JSON.parse(sessionStorage.getItem("carrito"));
               //console.log(Carro[0].id);}
               $.each(Carro, function(i, value) {
                    var idcarro = Carro[i].id;
                    var cantidad = Carro[i].cantidad;
                    //console.log(cantidad);
                    
                   $.getJSON(jsonData, function(data) {
                        var items = [];
                        $.each( data, function( key, val ) {
                            items = val;
                        });
                    
                    
                    var tipoDatos = $.grep(items, function (element, index) {
                        $.each(element.datos, function(i, value) {
                            if(value.id==idcarro){
                                //console.log(value.titulo);
                                contenedor2.append( "<div class='col-md-7'>"+ value.titulo + "</div><div class='col-md-3'>" + cantidad + " unidades</div><div class='col-md-2'>" + value.precio + " </div><br><hr><br>");
                                //Funcion para realizar calculo de Precio Final
                                var cuenta = parseInt(cantidad)*parseInt(value.precio);
                                preciototal = preciototal + cuenta;
                                $('#precio1').html(preciototal);
                             }
                         }
                         );
                    });
                    });
            }
            );}

            

            // Funcion para cambiar el boton activo
            $( "#ficha li" ).click(function(e) {
               $("#ficha li").removeClass("active");
               $(this).addClass('active');
               
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


