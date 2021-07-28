$(document).ready(function () {
    var numberings = [];
    var gameMasterData = [];
    var gameMasterColors = [];
    var gameLiveNumberStack = [];
    var chkAudio = true;
    var numberExhausted = false;
    var autoCallsSet = true;
    var isPaused = false;
    var time = 3000;
    var gameStartCalledNumbers = [];
    var promptDisableMsg = 0;
    var setIntervalVal = "";
    var userID = "123";
    var language = "en";

    var soldFrom = 0;
    var soldTo = 0;
    var bookletPrice = 0;
    var totalTicketsSold = 0;
    var totalPrice = 0;
    var totalRevenue = 0;
    var totalGain = 0;


    initializeElements()
    getNumberings();
    initialHidden();
    getMasterGameData();
    getMasterColors();
    loadInitialblankTicketDesign();
    getAllLanguages();
    fillTicketInPlayNewSetupDropdown();





    function preSetLanguageElements() {
        console.log("language > ", language);
        // $('#game-voice-language').val(language);
        // $('#game-voice-language option[value='+language+']').attr("selected",true);
        //document.getElementById("game-voice-language").value= language;
        var e = document.getElementById("game-voice-language");
        for (i = 0; i < e.options.length; i++) {
            console.log(" option > ", e.options[i]);
            console.log("Found option.value > ", e.options[i].value);
            console.log("Found option.language > ", language);
            if (e.options[i].value == language) {
                // Item is found. Set its property and exit   
                // console.log("Found option > ",e.options[i]); 
                e.options[i].selected = true;
                break;
            }
        }

    }

    function getMasterGameData() {
        $.get("/assets/media/sampleGameData.json", function (data, status) {
            gameMasterData = data;
            // console.log("gameMasterData : ", gameMasterData);
            //Once data is received populate the Master dropdown   

        });
    }
    function getMasterColors() {
        const url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/ColorList";
        $.ajax({
            type: 'POST',
            url: url,
            success: function (json) {
                gameMasterColors = json;
            },
            error: function (parsedjson, textStatus, errorThrown) {

            }
        });


    }
    function getNumberings() {
        const url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/GetNumbers";
        // const url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/GetNumbers?UID="+userID;
        var D = {
            "UID": userID
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: D,
            success: function (json) {
                numberings = json;
                setNumberingsDisplay(numberings);
                setAllNumbersDisplay(numberings);
            },
            error: function (parsedjson, textStatus, errorThrown) {
                console.log("parsedjson > ", parsedjson);
                console.log("textStatus > ", textStatus);
                console.log("errorThrown > ", errorThrown);
                var numberingsColmns = "<div class='col s12'><h6 class='center-align red-text'>Pls check later...</h6></div>";
                $("#numberings").html(numberingsColmns);
            }
        });

    }

    function loadInitialblankTicketDesign() {
        $.get("/blank-tinket-design.html", function (data, status) {
            $("#current-ticket-display-div").html(data);
            $("#verify-ticket-blank-display-div").html(data);//loading in very ticket modal
            $("#current-ticket-display-div").show();
        });
    }

    function getAllLanguages() {
        $.get("/assets/media/ISOLanguages.json", function (data, status) {
            $.each(data, function (key, value) {
                var TEXT = value.name + "(" + value.nativeName + ")";
                $('#game-voice-language')
                    .append($("<option></option>")
                        .attr("value", key)
                        .attr("role", key)
                        .text(TEXT));

            });

        });


    }

    function setNumberingsDisplay(numberings) {
        var numberingsColmns = "";

        if (numberings.length > 0) {
            for (var i = 0; i < numberings.length; i++) {
                var nc = "";

                if (i > 5) {
                    if (numberings[i]["ID"] < 10) {
                        nc = "<div id='col_" + i + "' class='col s2 no-margin'><div class='input-field inline '><span class='no-id-bold'>" + numberings[i]["ID"] + "&nbsp;&nbsp;</span><input id='no_" + numberings[i]["ID"] + "' role='" + numberings[i]["ID"] + "' type='text' class='validate numbers_text no-text-box active' value='" + numberings[i]["Numbers"] + "'></div></div>";
                    } else {
                        nc = "<div id='col_" + i + "' class='col s2 no-margin'><div class='input-field inline '><span class='no-id-bold'>" + numberings[i]["ID"] + "</span><input id='no_" + numberings[i]["ID"] + "' role='" + numberings[i]["ID"] + "' type='text' class='validate numbers_text no-text-box active' value='" + numberings[i]["Numbers"] + "'></div></div>";
                    }

                } else {

                    if (numberings[i]["ID"] < 10) {
                        nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "&nbsp;&nbsp;</span><input id='no_" + numberings[i]["ID"] + "' role='" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["Numbers"] + "'>  </div></div>";
                    } else {

                        nc = "<div id='col_" + i + "' class='col s2'><div class='input-field inline'><span class='no-id-bold'>" + numberings[i]["ID"] + "</span><input id='no_" + numberings[i]["ID"] + "' role='" + numberings[i]["ID"] + "' type='text' class='validate numbers_text  no-text-box active' value='" + numberings[i]["Numbers"] + "'>  </div></div>";
                    }

                }
                numberingsColmns = numberingsColmns + nc;
            }
        } else {
            numberingsColmns = "<div class='col s12'><h6 class='center-align red-text'>Pls check later...</h6></div>";
        }

        $("#numberings").html(numberingsColmns);
    }

    //For Game Play Display window
    function setAllNumbersDisplay(numberings) {
        var numbersHTML = "";
        var c = 1;

        $.each(numberings, function (key, value) {
            var n = "";
            n = "<div class='col'><a id='call_number_" + value.ID + "' class='btn-floating btn-small grey darken-1 round-btn-numberings all-number-initial-pointer'>" + value.ID + "</a></div>";
            numbersHTML = numbersHTML + n;
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
        $("#numbering-modal-preloader").hide();
        $("#verify-wait").hide();
        $("#reg-email-accept-icon").hide();
        $("#reg-email-reject-icon").hide();
    }

    function fillTicketInPlayNewSetupDropdown() {
        const url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/GetAllTktTypes";
        var ticketsInPlay = "";
        $.ajax({
            type: 'POST',
            url: url,
            success: function (json) {
                ticketsInPlay = json;
                $.each(ticketsInPlay, function (key, value) {
                    $('#new_game_ticket_in_play')
                        .append($("<option></option>")
                            .attr("value", value.TktType)
                            .attr("role", key)
                            .text(value.TktType));
                });
            },
            error: function (parsedjson, textStatus, errorThrown) {

            }
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
            if (color.id == value["ColorID"]) {
                o = "<option value='" + value["Colors"] + "' role='" + value["ColorID"] + "' selected>" + value["Colors"] + "</option>";
            } else {
                o = "<option value='" + value["Colors"] + "' role='" + value["ColorID"] + "'>" + value["Colors"] + "</option>";
            }
            options = options + o;
        });


        return options;
    }

    function setNumbersChangedValue(obj) {
        var index = null;
        $.each(numberings, function (key, value) {
            if (value.ID == obj.ID) {
                index = key;
            }
        });
        if (index != null) {
            numberings[index] = obj;
        }

    }


    function displayNumberOnScreen(random) {
        if (random > 9) {
            $(".number-preview-digit").html("<div style='margin-left:20px'>" + random + "</div>");

        } else {
            $(".number-preview-digit").html("<div style='margin-left:50px'>" + random + "</div>");
        }

    }

    function highlightNumberInSeriesDisplay(random) {
        $("#call_number_" + random).removeClass("grey darken-1");
        $("#call_number_" + random).addClass("red");
    }

    function updateSelectedCallsList() {
        try {
            var first = second = third = 0;
            var len = gameStartCalledNumbers.length;
            if (len > 1) {
                if (len > 0) {
                    first = gameStartCalledNumbers[len - 2];
                }
                if (len > 1) {
                    second = gameStartCalledNumbers[len - 3];
                }
                if (len > 2) {
                    third = gameStartCalledNumbers[len - 4];
                }
            } else { }

            if (first == 0) {
                $("#recent-call").text("");
            } else {
                $("#recent-call").text(first);
            }
            if (second == 0) {
                $("#second-last-call").text("");
            } else {
                $("#second-last-call").text(second);
            }
            if (third == 0) {
                $("#third-last-call").text("");
            } else {
                $("#third-last-call").text(third);
            }


        } catch (ex) { console.log("updateSelectedCallsList | e > ", e); }

    }

    function validateCalledNumbers() {
        if (gameStartCalledNumbers.length == 90) {
            toastMsg("<span class='red-text text-lighten-4'>All Numbers Exhausted!</span>");
            $("#pause-game-btn").attr("disabled", true);
            return false
        } else {


        }
    }

    function dictateNumber(number) {
        $.each(numberings, function (key, value) {
            if (value.ID == number) {
                try {
                    var no_text = value["Numbers"];
                    let sayMyNumber = new SpeechSynthesisUtterance();
                    sayMyNumber.lang = "en-US";
                    sayMyNumber.text = no_text;
                    sayMyNumber.volume = 500;
                    sayMyNumber.rate = 1;
                    sayMyNumber.pitch = 1;
                    window.speechSynthesis.speak(sayMyNumber);
                } catch (ex) {
                    console.log("Exception ex > ", ex);
                }

            }
        });
    }


    function setVerifiedTicket(json, location) {
        console.log("setVerifiedTicket > json > ", json);
        console.log("setVerifiedTicket > location > ", location);
        var html = "";
        if (location == "outside") {
            var tr1 = "<tr>" +
                "<td class='td-width F1' ></td>" +
                "<td class='td-width F2'></td>" +
                "<td class='td-width F3'></td> " +
                "<td class='td-width F4'></td>" +
                "<td class='td-width F5'></td>" +
                "<td class='td-width F6'></td> " +
                "<td class='td-width F7'></td>" +
                "<td class='td-width F8'></td>" +
                "<td class='td-width F9'></td> " +
                "</tr>";
            var tr2 = "<tr>" +
                "<td class='td-width F10'></td>" +
                "<td class='td-width F11'></td>" +
                "<td class='td-width F12'></td> " +
                "<td class='td-width F13'></td>" +
                "<td class='td-width F14'></td>" +
                "<td class='td-width F15'></td> " +
                "<td class='td-width F16'></td>" +
                "<td class='td-width F17'></td>" +
                "<td class='td-width F18'></td> " +
                "</tr>";
            var tr3 = "<tr>" +
                "<td class='td-width F19'></td>" +
                "<td class='td-width F20'></td>" +
                "<td class='td-width F21'></td> " +
                "<td class='td-width F22'></td>" +
                "<td class='td-width F23'></td>" +
                "<td class='td-width F24'></td> " +
                "<td class='td-width F25'></td>" +
                "<td class='td-width F26'></td>" +
                "<td class='td-width F27'></td> " +
                "</tr>";

            html = "<table class='white centered'>" + tr1 + tr2 + tr3 + "</table>";
            var showDiv = false;
            $("#verify-ticket-blank-display-div").html(html);
            showDiv = setTicketValues(json);
            if (showDiv == true) {
                $("#verify-wait").hide();
            }
        }
        if (location == "inSideGame") {
            console.log("inside");
            var tr1 = "<tr>" +
                "<td class='td-width F1' ></td>" +
                "<td class='td-width F2'></td>" +
                "<td class='td-width F3'></td> " +
                "<td class='td-width F4'></td>" +
                "<td class='td-width F5'></td>" +
                "<td class='td-width F6'></td> " +
                "<td class='td-width F7'></td>" +
                "<td class='td-width F8'></td>" +
                "<td class='td-width F9'></td> " +
                "</tr>";
            var tr2 = "<tr>" +
                "<td class='td-width F10'></td>" +
                "<td class='td-width F11'></td>" +
                "<td class='td-width F12'></td> " +
                "<td class='td-width F13'></td>" +
                "<td class='td-width F14'></td>" +
                "<td class='td-width F15'></td> " +
                "<td class='td-width F16'></td>" +
                "<td class='td-width F17'></td>" +
                "<td class='td-width F18'></td> " +
                "</tr>";
            var tr3 = "<tr>" +
                "<td class='td-width F19'></td>" +
                "<td class='td-width F20'></td>" +
                "<td class='td-width F21'></td> " +
                "<td class='td-width F22'></td>" +
                "<td class='td-width F23'></td>" +
                "<td class='td-width F24'></td> " +
                "<td class='td-width F25'></td>" +
                "<td class='td-width F26'></td>" +
                "<td class='td-width F27'></td> " +
                "</tr>";

            html = "<table id='current-called-ticket' class='white centered'>" + tr1 + tr2 + tr3 + "</table>";
            var showDiv = false;

            $("#current-ticket-display-div").html(html);

            showDiv = setTicketValuesInsideGame(json);
            if (showDiv == true) {
                $("#loading-div").hide();
                $("#current-ticket-display-div").show();
                validateRowStrike();
            }
        }


    }

    function validateRowStrike() {
        var rows = $("#current-called-ticket").find('> tbody > tr');
        $.each(rows, function (key, value) {
            // console.log("key > ", key);
            console.log("value > ", value);
            var tds = $(value).find('td');
            console.log("tds > ", tds);
            var count = 0;
            $.each(tds, function (k, v) {
                console.log("tds > v > ", v);
                console.log("tds > v.role > ", $(v).attr("role"));
                console.log("tds > v.text > ", v.innerText);
                if ($(v).attr("role") == "numberCalled" || v.innerText.trim() == "") {
                    count++;
                }
            });
            console.log("count > ", count);
            if (count == 9) {
                $.each(tds, function (k, v) {
                    $(this).addClass("cyan accent-2");
                });
            }

        });
    }

    function setTicketValues(json) {
        $.each(json, function (key, value) {
            $("." + value.Place).text(value['Number']);//setting the parameters 
        });
        return true;
    }

    function setTicketValuesInsideGame(json) {
        $.each(json, function (key, value) {
            var tdHtml = "";
            if (gameStartCalledNumbers.includes(value['Number'])) {
                //$("."+value.Place).addClass("numberCalled");
                $("." + value.Place).attr("role", "numberCalled");
                tdHtml = "<span class='red-text'>" + value['Number'] + "</span>";
            } else {
                tdHtml = "<span class='black-text'>" + value['Number'] + "</span>";
            }
            $("." + value.Place).html(tdHtml);//setting the parameters 
        });
        return true;
    }

    function calculateOthers() {
        totalTicketsSold = parseInt(soldTo) - parseInt(soldFrom) + 1;
        totalPrice = bookletPrice * totalTicketsSold;
        $("#total-tickets-sold").val(totalTicketsSold);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function chkConfPassword(password, confPassword) {
        var chk = false;
        if (password == confPassword) {
            chk = true;
        } else {
            chk = false;
        }
        return chk;
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    //-------------------------------------------EVENTS--------------------------------

    $("#game-modal-verify-btn").click(function () {
        document.getElementById("ticket_number").value = "";
    });

    $("#numbering-modal-open").click(function () {
        preSetLanguageElements();
    });

    $(document).on('keyup', '.no-text-box', function (e) {
        var ID = $(this).attr("role");
        var no_text = $(this).val();
        var obj = {
            "ID": ID,
            "Numbers": no_text
        };
        setNumbersChangedValue(obj);
    });

    //saving the number's text entered by user
    $("#numberings-save-btn").click(function () {
        $("#numbering-modal-preloader").show();
        setNumberingsDisplay(numberings);
        setAllNumbersDisplay(numberings);
        var lang = "";
        //game-voice-language
        lang = $("#game-voice-language").children("option:selected").val();
        console.log("language > ", lang);
        language = lang;

        // $("#numbering-modal-preloader").hide();

    });

    $("#new_game_ticket_in_play").on("change", function (e) {
        $("#new_save_btn").fadeIn();
        var val = $(this).children("option:selected").val();
        var id = $(this).children("option:selected").attr("role");

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

    $("#bingo-ticket-verify").click(function () {
        document.getElementById("verify_ticket_number").value = "";
        $.get("/blank-tinket-design.html", function (data, status) {
            $("#verify-ticket-blank-display-div").html(data);//loading blank in very ticket modal 
            $("#verify-wait").hide();
        });
    });

    $("#verify-ticket-btn").click(function () {
        $("#verify-wait").fadeIn();
        var ticket_val = $("#verify_ticket_number").val();
        if (ticket_val == "") {
            toastMsg("<span class='red-text text-lighten-4'>Enter Ticket Number!</span>");
            $.get("/blank-tinket-design.html", function (data, status) {
                $("#verify-ticket-blank-display-div").html(data);//loading blank in very ticket modal 
                $("#verify-wait").hide();
            });
        } else {
            var url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/GetTicketData";
            var D = {
                "ID": ticket_val
            }
            $.ajax({
                type: 'POST',
                url: url,
                data: D,
                success: function (json) {
                    setVerifiedTicket(json, "outside");

                },
                error: function (parsedjson, textStatus, errorThrown) {

                }
            });

        }

    });


    $("#verify-ticket-button").click(function () {
        $("#loading-div").show();
        var ticket_val = $("#ticket_number").val();
        if (ticket_val == "") {
            toastMsg("<span class='red-text text-lighten-4'>Enter Ticket Number!</span>");
            $.get("/blank-tinket-design.html", function (data, status) {
                $("#current-ticket-display-div").html(data);//loading blank in very ticket modal 
                $("#loading-div").hide();
                $("#current-ticket-display-div").show();
            });
        } else {
            $('.modal#modal4').modal('close');
            // $.get("/current-ticket.html?ticket_no=" + ticket_val, function (data, status) {
            //     $("#current-ticket-display-div").html(data);
            //     $("#loading-div").hide();
            //     $("#current-ticket-display-div").show();
            // });
            var url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/GetTicketData";
            var D = {
                "ID": ticket_val
            }
            $.ajax({
                type: 'POST',
                url: url,
                data: D,
                success: function (json) {
                    setVerifiedTicket(json, "inSideGame");

                },
                error: function (parsedjson, textStatus, errorThrown) {

                }
            });
        }
    });

    $("#audio-btn").on('change', function (e) {
        console.log("Audion btn e : ", e);
        console.log("Audion btn e : ", e.target);
        var chk = $(this).prop('checked');
        console.log("Audion btn chk : ", chk);
        if (chk == true) {
            $(this).prop('checked', true);
            chkAudio = true;
            toastMsg("Audio Enabled!");
        } if (chk == false) {
            $(this).prop('checked', false);
            chkAudio = false;
            toastMsg("<span class='red-text text-lighten-4'>Audio Disabled!</span>");
        }
    });


    $("#sold-from").on("keyup", function () {
        soldFrom = $(this).val();
        calculateOthers();
    });
    $("#sold-to").on("keyup", function () {
        soldTo = $(this).val();
        calculateOthers();
    });
    $("#per-booklet-price").on("keyup", function () {
        bookletPrice = $(this).val();
        calculateOthers();
    });

    $("#login-btn").click(function () {
        var userID = $("#user_id").val();
        var password = $("#password").val();
        if (userID == "" || password == "") {
            toastMsg("<span class='red-text text-lighten-4'>Enter your credentials properly!</span>");
        } else {
            var json = {
                "userID": userID,
                "loggedInDate": "28-07-2021",
                "loggedInTime": "10:52",
                "loginToken": "JBx100pqr"
            };

            setCookie("JBuserID", json.userID, 1);
            setCookie("JBloggedInDate", json.loggedInDate, 1);
            setCookie("JBloggedInTime", json.loggedInTime, 1);
            setCookie("JBloginToken", json.loginToken, 1);

            /*
             var D={
                 "userID":userID,
                 "password":password
             };
             var url="";
             $.ajax({
                type: 'POST',
                url: url,
                data: D,
                success: function (json) {
                   

                },
                error: function (parsedjson, textStatus, errorThrown) {

                }
            });
            */
        }
    });


    $("#reg_email_id").on("keyup", function () {
        var EmailID = $(this).val();
        var validEmail = validateEmail(EmailID);
        if (validEmail) {
            const url = "http://203.122.12.38/WebserviceDemo/WebService.asmx/IsEmailIDExist";
            var D = {
                "EmailID": EmailID
            }
            $.ajax({
                type: 'POST',
                url: url,
                data: D,
                success: function (json) {
                    console.log("Checking email > json : ", json);
                    if (json.IsExist == true) {
                        $("#reg-email-blank").hide();
                        $("#reg-email-accept-icon").fadeOut();
                        $("#reg-email-reject-icon").fadeIn();
                    } else {
                        $("#reg-email-blank").hide();
                        $("#reg-email-accept-icon").fadeIn();
                        $("#reg-email-reject-icon").hide();
                    }
                },
                error: function (parsedjson, textStatus, errorThrown) {

                }
            });
        } else {
            if (EmailID == "") {
                $("#reg-email-blank").show();
                $("#reg-email-accept-icon").hide();
                $("#reg-email-reject-icon").hide();
            } else {
                $("#reg-email-reject-icon").fadeIn();
                $("#reg-email-accept-icon").hide();
            }
        }
    });

    $("#conf-password").on("keyup", function () {
        var password = $("#reg-password").val();
        var conf_password = $(this).val();
        if (conf_password == "") {
            $("#conf-chk-msg").html("&nbsp;");
        } else {
            var chk = chkConfPassword(password, conf_password);
            if (chk) {
                $("#conf-chk-msg").html("<i id='reg-email-accept-icon' class='material-icons green-text text-darken-4' style='font-size: 1.5rem;'><b>check</b></i>");
            } else {
                $("#conf-chk-msg").html("<i class='material-icons red-text' style='font-size: 1.5rem;'><b>clear</b></i>");
            }
        }
    });

    $(".input-chk").on("keyup", function () {
        var regClubName = $("#reg-club-name").val();
        var addressLine1 = $("#address_line_1").val();
        var postCode = $("#post_code").val();
        var city = $("#city").val();
        var country = $("#country").val();
        var contactPerson = $("#contact_person").val();
        var regEmailID = $("#reg_email_id").val();
        var regPassword = $("#reg-password").val();
        var confPassword = $("#conf-password").val();

        if (regClubName == "" || addressLine1 == "" || postCode == "" || city == "" || country == "" ||
            contactPerson == "" || regEmailID == "" || regPassword == "" || confPassword == "") {
            $("#register-btn").attr("disabled", true);
        } else {
            var chk = chkConfPassword(regPassword, confPassword);
            if (chk) {
                var ve = validateEmail(regEmailID);
                console.log("--> IN chkConfPassword > chk ve  > ", ve);
                if (ve) {
                    $("#register-btn").attr("disabled", false);
                } else {
                    $("#register-btn").attr("disabled", true);
                }
            } else {
                $("#register-btn").attr("disabled", true);
            }
        }
    });




    //-------------------------------------------------

    var bingo = {
        selectedNumbers: [],
        generateRandom: function () {
            var min = 1;
            var max = 90;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            return random;
        },
        generateNextRandom: function () {
            if (bingo.selectedNumbers.length > 89) {
                // alert("All numbers Exhausted");
                numberExhausted = true;
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

    //initializing all the parameters and exiting the modal
    $("#exit-game-btn").click(function () {
        location.reload(true);
    });

    $("#pause-game-btn").click(function () {
        clearInterval(setIntervalVal);
        $(this).attr("disabled", true);
        toastMsg("<span class='red-text text-lighten-4'>Game Paused!</span>");
        isPaused = true;
        $("#start-game-btn").attr("disabled", false);
    });

    $("#start-game-btn").click(function () {
        M.Toast.dismissAll();
        $("#pause-game-btn").attr("disabled", false);
        isPaused = false;
        $(this).attr("disabled", true);
        if (autoCallsSet == true) {
            setIntervalVal = setInterval(function () {
                if (isPaused == false) {
                    var random = bingo.generateNextRandom().toString();
                    if (numberExhausted == false) {
                        gameStartCalledNumbers.push(random);
                        if (chkAudio == true) {
                            dictateNumber(random);
                        }
                        displayNumberOnScreen(random);
                        highlightNumberInSeriesDisplay(random);
                        updateSelectedCallsList();
                        validateCalledNumbers();
                    }
                } else {
                    // if(promptDisableMsg==1){
                    //     toastMsg("<span class='red-text text-lighten-4'>Game Paused!</span>");
                    // }                        
                    // promptDisableMsg++;
                }
            }, time);


        } else { }
    });







    //---------------------------------------------

    function toastMsg(msg) {
        M.Toast.dismissAll();
        M.toast({ html: msg, classes: 'rounded' });
    }

    function blinker() {
        $('.blink').fadeOut(200);
        $('.blink').fadeIn(200);
    }
    setInterval(blinker, 300);



});