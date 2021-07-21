$(document).ready(function () {
    initializeElements()
    getNumberings();
    initialHidden();


    function initializeElements() {
        $('.modal').modal();
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
    }


    function getNumberings() {
        var numberings = [
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
        numberings = [];//testing purpose    
        for (var i = 0; i < 90; i++) {
            var o = {
                "ID": i + 1,
                "No Text": i + 1,
            }
            numberings[i] = o;

        }


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
                    console.log("ID : ", numberings[i]["ID"]);
                    nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "&nbsp;&nbsp;</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["No Text"] + "'>  </div></div>";
                } else {

                    nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "</span><input id='no_" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["No Text"] + "'>  </div></div>";
                }







            }
            numberingsColmns = numberingsColmns + nc;
        }
        $("#numberings").html(numberingsColmns);


    }


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






});