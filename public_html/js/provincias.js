/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
   
    $.getJSON("provincias.json",function(data){
        $.each(data.lista.provincia,function(i){
            $('#provincia').append('<option>'+data.lista.provincia[i].nombre.__cdata+'</option>');
    });
    
     
    
    });
});