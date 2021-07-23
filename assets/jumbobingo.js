$(document).ready(function () {
    initializeElements()
    getNumberings();
    initialHidden();
    getMasterGameData();
    getMasterColors();
    loadInitialblankTicketDesign();

    var numberings = [];
    var gameMasterData = [];
    var gameMasterColors = [];
    var gameLiveNumberStack=[];
    var chkAudio=true;
    var numberExhausted=false;
    var autoCallsSet=true;
    var time=2000;
    var gameStartCalledNumbers=[];



    function getMasterGameData() {
        $.get("/assets/media/sampleGameData.json", function (data, status) {
            gameMasterData = data;
            // console.log("gameMasterData : ", gameMasterData);
            //Once data is received populate the Master dropdown   
            fillTicketInPlayNewSetupDropdown();
        });
    }
    function getMasterColors() {
        $.get("/assets/media/colors.json", function (data, status) {
            gameMasterColors = data;
            //  console.log("gameMasterColors : ", gameMasterColors);
        });
    }
    function getNumberings() {
       
        $.get("/assets/media/numbers.json", function (data, status) {
            numberings = data;
            //console.log("numberings : ",numberings);
            var numberingsColmns = "";
            for (var i = 0; i < numberings.length; i++) {
                var nc = "";
                if (i > 5) {
                    if (numberings[i]["ID"] < 10) {
                        nc = "<div id='col_" + i + "' class='col s2 no-margin'><div class='input-field inline '><span class='no-id-bold'>" + numberings[i]["ID"] + "&nbsp;&nbsp;</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text no-text-box active' value='" + numberings[i]["No Text"] + "'></div></div>";
                    } else {
                        nc = "<div id='col_" + i + "' class='col s2 no-margin'><div class='input-field inline '><span class='no-id-bold'>" + numberings[i]["ID"] + "</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text no-text-box active' value='" + numberings[i]["No Text"] + "'></div></div>";
                    }

                } else {

                    if (numberings[i]["ID"] < 10) {
                        nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "&nbsp;&nbsp;</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["No Text"] + "'>  </div></div>";
                    } else {

                        nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["No Text"] + "'>  </div></div>";
                    }

                }
                numberingsColmns = numberingsColmns + nc;
            }
            $("#numberings").html(numberingsColmns);

            setAllNumbersDisplay(numberings)
        });
    }

    function loadInitialblankTicketDesign(){
        $.get("/blank-tinket-design.html", function (data, status) {
            $("#current-ticket-display-div").html(data);            
            $("#current-ticket-display-div").show();
       });
    }

    //For Game Play Display window
    function setAllNumbersDisplay(numberings){
        var numbersHTML="";
        var c=1;
        $.each(numberings, function (key, value) {
            //console.log("value : ",value.ID);
            var n="";
            n="<div class='col'><a id='call_number_"+value.ID+"' class='btn-floating btn-small grey darken-1 round-btn-numberings all-number-initial-pointer'>"+value.ID+"</a></div>";
                
            //  if(gameLiveNumberStack.includes(value.ID)){
            //      n="<div class='col'><a id='call_number_"+value.ID+"' class='btn-floating btn-small red round-btn-numberings all-number-initial-pointer'>"+value.ID+"</a></div>";
            //         }else{
            //     n="<div class='col'><a id='call_number_"+value.ID+"' class='btn-floating btn-small grey darken-1 round-btn-numberings all-number-initial-pointer'>"+value.ID+"</a></div>";
            //      }
             
                 numbersHTML=numbersHTML+n;
        });
        $(".all-numbers-display").html(numbersHTML);
    }

    function initializeElements() {
        $('.modal').modal({
            dismissible: false,
            opacity: 0.9
        });
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        $('.datepicker').datepicker({
            format: "dd-mm-yyyy",
            setDefaultDate: true,
            defaultDate: new Date(),
        });
    }
    function initialHidden() {
        $(".setup_type").hide();
        $("#new_save_btn").hide();
         $("#loading-div").hide();
    }

    function fillTicketInPlayNewSetupDropdown() {
        // console.log("gameMasterData : ", gameMasterData);
        $.each(gameMasterData, function (key, value) {
            console.log("key :", key);
            console.log("value :", value);
            $('#new_game_ticket_in_play')
                .append($("<option></option>")
                    .attr("value", value["tiket_in_play"].ticket)
                    .attr("role", value["tiket_in_play"].id)
                    .text(value["tiket_in_play"].ticket));
        });

    }

    function populateTableListAsPerSelectedTicket(ticket_in_play_selected) {
        var index = 0;
        var ticketGameList = {};
        $.each(gameMasterData, function (key, value) {
            if (value["tiket_in_play"].id === ticket_in_play_selected.id) {
                index = key;
                ticketGameList = value;
                return false;
            }
        });
        // console.log("ticketGameList : ", ticketGameList);
        var games = ticketGameList.game;
        var color = ticketGameList.color;

        console.log("games : ", games);

        for (let i = 0; i < games.length; i++) {
            var ID = games[i].id;
            var GAME_NAME = games[i].name;

            var options = getOptions(color[i]);
            var tr = "<tr>" +
                "<td> " + GAME_NAME + " </td>" +
                "<td>" +
                "<div class='input-field  col s12'><select id='game_color_" + ID + "' class='browser-default game_color' role='" + ID + "' > " +
                options
                + " </select></div>"
                + "</td>" +
                "<td>" +
                "<label><input id='game_chk_" + ID + "' type='checkbox' class='filled-in game_selection_chk' role='" + ID + "' name='oneLine'/><span>&nbsp;</span></label><input id='oneLine_game_price_" + ID + "' type='text' class='browser-default  game_price_input' value='0.00' style='width:50%' name='oneLine_" + ID + "' disabled> "
                + "</td>" +
                "<td>" +
                "<label><input id='game_chk_" + ID + "' type='checkbox' class='filled-in game_selection_chk' role='" + ID + "' name='twoLine'/><span>&nbsp;</span></label><input id='twoLine_game_price_" + ID + "' type='text' class='browser-default  game_price_input' value='0.00' style='width:50%' name='twoLine_" + ID + "' disabled>"
                + "</td>" +
                "<td>" +
                "<label><input id='game_chk_" + ID + "' type='checkbox' class='filled-in game_selection_chk' role='" + ID + "' name='fullHouse'/><span>&nbsp;</span></label><input id='fullHouse_game_price_" + ID + "' type='text' class='browser-default  game_price_input' value='0.00' style='width:50%' name='fullHouse_" + ID + "' disabled>   "
                + "</td>" +
                "<td>" +
                "<label><input id='game_chk_" + ID + "' type='checkbox' class='filled-in game_selection_chk' role='" + ID + "' name='corner'/><span>&nbsp;</span></label><input id='corner_game_price_" + ID + "' type='text' class='browser-default  game_price_input' value='0.00' style='width:50%' name='corner_" + ID + "' disabled>   "
                + "</td>" +
                +"</tr>";
            $("#new_setup_table tbody").append(tr);
        }
    }

    function getOptions(color) {
        var options = "";
        $.each(gameMasterColors, function (key, value) {
            var o = "";
            if (color.id == value.id) {
                o = "<option value='" + value.name + "' role='" + value.id + "' selected>" + value.name + "</option>";
            } else {
                o = "<option value='" + value.name + "' role='" + value.id + "'>" + value.name + "</option>";
            }

            options = options + o;
        });

        return options;
    }

    $("#new_game_ticket_in_play").on("change", function (e) {
        $("#new_save_btn").fadeIn();
        var val = $(this).children("option:selected").val();
        var id = $(this).children("option:selected").attr("role");
        console.log("val : ", val);
        console.log("id : ", id);
        var ticket_in_play_selected = {
            "id": parseInt(id),
            "ticket": val
        };
        populateTableListAsPerSelectedTicket(ticket_in_play_selected);
    });

    $(".select_setup_type").click(function () {
        if ($(this).attr('id') == "new_game_radio") {
            $(".setup_type").hide();
            $("#New_Setup").fadeIn();
        }
        if ($(this).attr('id') == "edit_game_radio") {
            $(".setup_type").hide();
            $("#Edit_Setup").fadeIn();
        }
    });
   
    $(document).on('click', '.game_selection_chk', function (e) {
        console.log("checkbox clicked : ", e.target);
        console.log("checkbox val : ", e.target.checked);
        if (e.target.checked == true) {
            //enable the input box next to it
            var role = $(this).attr("role");
            var name = $(this).attr("name");

            $("#" + name + "_game_price_" + role).removeAttr("disabled");
        }
        if (e.target.checked == false) {
            //disable the input box next to it
            var role = $(this).attr("role");
            var name = $(this).attr("name");
            console.log("checkbox role : ", role);
            $("#" + name + "_game_price_" + role).val("0.00");
            $("#" + name + "_game_price_" + role).attr("disabled", "disabled");
        }
    });

    $("#verify-ticket-button").click(function(){
        $('.modal#modal4').modal('close');
        $("#loading-div").show();
        var ticket_val=$("#ticket_number").val();
        $.get("/current-ticket.html?ticket_no="+ticket_val, function (data, status) {
             $("#current-ticket-display-div").html(data);
             $("#loading-div").hide();
             $("#current-ticket-display-div").show();
        });       
    });
   
    $("#audio-btn").on('change',function(e){
        console.log("Audion btn e : ",e);
        console.log("Audion btn e : ",e.target);
        var chk=$(this).prop('checked');
        console.log("Audion btn chk : ",chk);
        if(chk==true){
            $(this).prop('checked', true); 
            chkAudio=true;
            toastMsg("Audio Enabled!");
        }if(chk==false){
            $(this).prop('checked', false); 
            chkAudio=false;
            toastMsg("<span class='red-text text-lighten-4'>Audio Disabled!</span>");
        }
        
    });


//-------------------------------------------------

var bingo = {
    selectedNumbers: [],
    generateRandom: function() {
        var min = 1;
        var max = 90;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    },
    generateNextRandom: function() {
        if (bingo.selectedNumbers.length > 89) {
           // alert("All numbers Exhausted");
            numberExhausted=true;
            return 0;
        }
        var random = bingo.generateRandom();
        while ($.inArray(random, bingo.selectedNumbers) > -1) {
            random = bingo.generateRandom();
        }
        bingo.selectedNumbers.push(random);
        return random;
    }
};

$("#start-game-btn").click(function(){

    if(autoCallsSet==true){
        setInterval(function() { 
            var random = bingo.generateNextRandom().toString();        
            if(numberExhausted==false){      
                gameStartCalledNumbers.push(random);        
                displayNumberOnScreen(random);
                highlightNumberInSeriesDisplay(random);
                updateSelectedCallsList();
                validateCalledNumbers();
            } 
        }, time);
    }else{}

   

    
   
});

function displayNumberOnScreen(random){
    $(".number-preview-digit").text(random);
}

function highlightNumberInSeriesDisplay(random){
     $("#call_number_"+random).removeClass("grey darken-1");
     $("#call_number_"+random).addClass("red");
}

function updateSelectedCallsList(){
    try{
        var first = second =third =0;
        var len=gameStartCalledNumbers.length;
        if(len>1){
            if(len>0){
               first=gameStartCalledNumbers[len-2];
            }
            if(len>1){
               second=gameStartCalledNumbers[len-3];
            }
            if(len>2){
               third=gameStartCalledNumbers[len-4];
            }
        }else{}

        if(first==0){
             $("#recent-call").text("");
            }else{ 
                $("#recent-call").text(first);
            }
        if(second==0){
            $("#second-last-call").text("");
        }else{
            $("#second-last-call").text(second);
        }
        if(third==0){
            $("#third-last-call").text("");
        }else{
            $("#third-last-call").text(third);
        }
   
        
    }catch(ex){console.log("updateSelectedCallsList | e > ",e);}
    
}

function validateCalledNumbers(){ 
    if(gameStartCalledNumbers.length==90){
        toastMsg("<span class='red-text text-lighten-4'>All Numbers Exhausted!</span>");
        return false
    }
}


    //---------------------------------------------

    function toastMsg(msg){
        M.Toast.dismissAll();
        M.toast({html: msg, classes: 'rounded'});
    }

    function blinker() {
        $('.blink').fadeOut(200);
        $('.blink').fadeIn(200);
    }
    setInterval(blinker, 300);



});