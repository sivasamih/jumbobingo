$(document).ready(function () {
    initializeElements()
    getNumberings();
    initialHidden();
    getMasterGameData();
    getMasterColors();

    var gameMasterData = [];
    var gameMasterColors = [];

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
        var numberings = [];
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


        });







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
        $("#new_setup_btn_grp").hide();

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
        $("#new_setup_btn_grp").fadeIn();
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






});