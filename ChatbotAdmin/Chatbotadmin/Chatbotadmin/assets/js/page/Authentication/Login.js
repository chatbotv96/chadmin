$(function () {
//This js use for authentication of users
    $(document).ready(function (data) {
        if (readCookie("Username") != null) {
            
            $("#username").val(readCookie("Username"));
            $("#password").val(readCookie("Password"));
        }
        $("#login").click(function () {

            var check = 0;

            var username = $("#username").val();
            var password = $("#password").val();
            if (username == "" || username == null) {
                alert("Username can not be null");
                check = 1;
            }
            if (password == "" || password == null) {
                alert("Password Can not be null");
                check = 1;
            }
            if (check == 0) {
                //check request and send To LoginCheck Controller
                $.post("/Authentication/LoginCheck", { "username": username, "password": password }, function (data) {
                    if (data == "0") {
                        alert("Username and password not match");
                    }else 
                        if (data == "1") {
                            //When web service unable to get data from then this alert comes or some error while connectning
                        alert("Server have too many request please try again..");
                    }
                    else {
                        alert("Login Succesfully");
                        if ($("#rememberme").is(':checked')) {
                            if (readCookie("Username") == null) {
                                //Create Cookies for user if user want to frequently access without login from same browser
                                createCookie("Username", username, 3);
                                createCookie("Password", password, 3);
                                //Redirect To Dashboard page
                                window.location.href = "Index";
                            }
                            else {
                                eraseCookie("Username");
                                eraseCookie("Password");
                            }

                        }
                        else {
                            window.location.href = "Index";
                        }

                    }
                });
            }
        });

    });
    function createCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }
});