$(document).ready(function(){
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();

    getNumberings();


    function getNumberings(){
       var numberings=[
           {
            "ID": "1",
            "No Text": "One", 
           },
           {
            "ID": "2",
            "No Text": "Two", 
           },
           {
            "ID": "3",
            "No Text": "Three", 
           },
           {
            "ID": "4",
            "No Text": "Four", 
           },
           {
            "ID": "5",
            "No Text": "Five", 
           },
           {
            "ID": "6",
            "No Text": "Six", 
           }
           ,
           {
            "ID": "7",
            "No Text": "Seven", 
           },
           {
            "ID": "8",
            "No Text": "Eight", 
           },
           {
            "ID": "9",
            "No Text": "Nine", 
           },
           {
            "ID": "10",
            "No Text": "Ten", 
           } 
           
       ];

       var numberingsColmns="";

       for (var i = 0; i < numberings.length; i++) {
           var nc="";
        if(i>5){
             nc="<div id='col_"+i+"' class='col s2 no-margin'><div class='input-field inline'><span class='no-id-bold'>"+numberings[i]["ID"]+" &nbsp;</span><input id='no_"+numberings[i]["ID"]+"' type='text' class='validate browser-default no-text-box' value='"+numberings[i]["No Text"]+"'></div></div>";
        
        }else{
            if(i>8){
                nc="<div id='col_"+i+"' class='col s2'><div class='input-field inline'><div class='margin-dd'><span class='no-id-bold'>"+numberings[i]["ID"]+" &nbsp;</span></div><input id='no_"+numberings[i]["ID"]+"' type='text' class='validate browser-default ' value='"+numberings[i]["No Text"]+"'></div></div>";
        
            }else{
                nc="<div id='col_"+i+"' class='col s2'><div class='input-field inline'><span class='no-id-bold'>"+numberings[i]["ID"]+" &nbsp;</span><input id='no_"+numberings[i]["ID"]+"' type='text' class='validate browser-default no-text-box' value='"+numberings[i]["No Text"]+"'></div></div>";
        }
            
        }
        numberingsColmns=numberingsColmns+nc;
       }

       $("#numberings").html(numberingsColmns);

       
    }




});