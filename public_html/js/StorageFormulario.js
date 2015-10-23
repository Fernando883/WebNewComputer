/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    $(document).ready(function(){

           if(localStorage.getItem("name")!=null){
                   $('#nombre').val(localStorage.getItem("name"));
                }
           $('#nombre').focusout(function(){
               
                var name = $('#nombre').val();
                localStorage.setItem("name",name);  
                 $('#nombre').val(localStorage.getItem("name"));
                
           });
           
           if(localStorage.getItem("apellidos")!=null){
                   $('#apellidos').val(localStorage.getItem("apellidos"));
                }
           $('#apellidos').focusout(function(){
               
                var apellidos = $('#apellidos').val();
                localStorage.setItem("apellidos",apellidos);  
                 $('#apellidos').val(localStorage.getItem("apellidos"));
                
           });
           
           if(localStorage.getItem("nif")!=null){
                   $('#nif').val(localStorage.getItem("nif"));
                }
           $('#nif').focusout(function(){
               
                var nif = $('#nif').val();
                localStorage.setItem("nif",nif);  
                 $('#nif').val(localStorage.getItem("nif"));
                
           });
           
           if(localStorage.getItem("fecha_nacimiento")!=null){
                   $('#fecha_nacimiento').val(localStorage.getItem("fecha_nacimiento"));
                }
           $('#fecha_nacimiento').focusout(function(){
               
                var fecha_nacimiento = $('#fecha_nacimiento').val();
                localStorage.setItem("fecha_nacimiento",fecha_nacimiento);  
                 $('#fecha_nacimiento').val(localStorage.getItem("fecha_nacimiento"));
                
           });
           
           if(localStorage.getItem("direccion")!=null){
                   $('#direccion').val(localStorage.getItem("direccion"));
                }
           $('#direccion').focusout(function(){
               
                var direccion = $('#direccion').val();
                localStorage.setItem("direccion",direccion);  
                 $('#direccion').val(localStorage.getItem("direccion"));
                
           });
           
           if(localStorage.getItem("cod_postal")!=null){
                   $('#cod_postal').val(localStorage.getItem("cod_postal"));
                }
           $('#cod_postal').focusout(function(){
               
                var cod_postal = $('#cod_postal').val();
                localStorage.setItem("cod_postal",cod_postal);  
                 $('#cod_postal').val(localStorage.getItem("cod_postal"));
                
           });
           
           if(localStorage.getItem("localidad")!=null){
                   $('#localidad').val(localStorage.getItem("localidad"));
                }
           $('#localidad').focusout(function(){
               
                var localidad = $('#localidad').val();
                localStorage.setItem("localidad",localidad);  
                 $('#localidad').val(localStorage.getItem("localidad"));
                
           });
           
           if(localStorage.getItem("provincia")!="Seleccione una provincia..."){
                   $('#provincia').val(localStorage.getItem("provincia"));
                }
           $('#provincia').focusout(function(){
               
                var provincia = $('#provincia').val();
                localStorage.setItem("provincia",provincia);  
                 $('#provincia').val(localStorage.getItem("provincia"));
                
           });
           
           if(localStorage.getItem("telefono")!=null){
                   $('#telefono').val(localStorage.getItem("telefono"));
                }
           $('#telefono').focusout(function(){
               
                var telefono = $('#telefono').val();
                localStorage.setItem("telefono",telefono);  
                 $('#telefono').val(localStorage.getItem("telefono"));
                
           });
           
           if(localStorage.getItem("email")!=null){
                   $('#email').val(localStorage.getItem("email"));
                }
           $('#email').focusout(function(){
               
                var email = $('#email').val();
                localStorage.setItem("email",email);  
                 $('#email').val(localStorage.getItem("email"));
                
           });
           
           $('#boton').click(function(){
               localStorage.clear();
           });
            
    });  