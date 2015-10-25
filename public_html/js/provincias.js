/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
   
    $.getJSON("json/provincias.json",function(data){
        $.each(data.lista.provincia,function(i){
            $('#provincia').append('<option id="'+data.lista.provincia[i]._id+'" >'+data.lista.provincia[i].nombre.__cdata+'</option>');
        });
        
            $('#provincia').change(function(){

            var idProvincia = $('#provincia option:selected').attr("id");
            idProvincia = parseInt(idProvincia-1);
            $('#localidad').html("");
            
            $.each(data.lista.provincia[idProvincia].localidades.localidad,function(j){
               
                $('#localidad').append('<option>'+data.lista.provincia[idProvincia].localidades.localidad[j].__cdata+'</option>');
           });
        }); 
     });
});