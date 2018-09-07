$(function () {

    //Manage sender where user authentication this sender is genuine 
    $(document).ready(function () {

        $.post("/Common/NSenderDropdownBind", {}, function (data) {
            $("#SenderBody").html("");
            for (var i = 0; i < data.length; i++) {
                var SenderEmail = data[i].SenderEmail;
                $("#SenderBody").append("<tr><td>" + "Name" + "</td><td>" + data[i].SenderEmail + "</td><td>" + "Active but not verfiy" + "</td><td><input type='button' value='Activate' id='" + SenderEmail + "' onclick=ClickEvent('" + SenderEmail + "') /></td></tr>");

            }

        });

    });
    function ClickEvent(EmailID) {
        $.post("SendEmail", { "EmailID": EmailID }, function (data) {

        });
        document.getElementById(SenderEmail).disabled = true;
    }

});