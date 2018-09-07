$(function () {   


    $(document).ready(function () {
        $('form').submit(function (evt) {
            //Prevent default refresh
            evt.preventDefault();
            var x = document.getElementsByClassName("container");
            var i;
            var j;
            var check = false;

            //Unique parameter values detection
            if (xpar > 0) {
                for (i = 0; i <= xpar - 1; i++) {
                    for (j = i + 1; j <= xpar; j++) {
                        par1 = document.forms['create']['parnm' + i].value;
                        par2 = document.forms['create']['parnm' + j].value;
                        if (par1 == par2) {
                            check = true;
                            alert("please enter different parameter names");
                            break;
                        }
                    }
                    if (check) {
                        break;
                    }
                }
            }
            //-----------------------------------------------------------------------------------------------------
            //MAJOR ELSE
            if (!check) {
                main_create(xtrain, xres, xctx, xoctx, xevent, xpar/*,xparp*/);
            }
        })

        //Add and remove training phrases
        var wrappertrain = $(".input_fields_wraptrain"); //Fields wrapper
        var add_buttontrain = $(".add_field_buttontrain"); //Add button ID
        var xtrain = 1; //initlal text box count
        $(add_buttontrain).click(function (e) { //on add input button click
            e.preventDefault();
            $(wrappertrain).append('<div><input  style="width:80%;display:inline;"class="form-control"name="tp' + xtrain + '" id="tp' + xtrain + '" placeholder="Enter training phrases" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldtrain btn btn-default">Remove  Field</button></div>'); //add input box
            xtrain++;
        });
        $(wrappertrain).on("click", ".remove_fieldtrain", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            xtrain--;
        })

        //Add and remove responses
        var wrapperres = $(".input_fields_wrapres"); //Fields wrapper
        var add_buttonres = $(".add_field_buttonres"); //Add button ID
        var xres = 1; //initlal text box count
        $(add_buttonres).click(function (e) { //on add input button click
            e.preventDefault();
            $(wrapperres).append('<div><input  style="width:80%;display:inline;"class="form-control"name="res' + xres + '" id="res' + xres + '" placeholder="Enter response phrases" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldres btn btn-default">Remove  Field</button></div>'); //add input box
            xres++;
        });
        $(wrapperres).on("click", ".remove_fieldres", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            xres--;
        })

        //Add and remove input contexts
        var wrapperctx = $(".input_fields_wrapctx"); //Fields wrapper
        var add_buttonctx = $(".add_field_buttonctx"); //Add button ID
        var xctx = 1; //initlal text box count
        $(add_buttonctx).click(function (e) { //on add input button click
            e.preventDefault();
            $(wrapperctx).append('<div><input  style="width:80%;display:inline;"class="form-control"name="ctx' + xctx + '" id="ctx' + xctx + '" placeholder="Enter context" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldctx btn btn-default">Remove  Field</button></div>'); //add input box
            xctx++;
        });
        $(wrapperctx).on("click", ".remove_fieldctx", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            xctx--;
        })

        //Add and remove output contexts
        var wrapperoctx = $(".input_fields_wrapoctx"); //Fields wrapper
        var add_buttonoctx = $(".add_field_buttonoctx"); //Add button ID
        var xoctx = 1; //initlal text box count
        $(add_buttonoctx).click(function (e) { //on add input button click
            e.preventDefault();
            $(wrapperoctx).append('</p></p><div><input  style="display:inline;"class="form-control"name="octx' + xoctx + '" id="octx' + xoctx + '" placeholder="Enter context" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><input  style="width:80%;display:inline;"class="form-control octxls" name="octxls' + xoctx + '" id="octxls' + xoctx + '" placeholder="Enter lifespan (Default = 5)" type="number" min="0" max="100" title="Only numbers allowed"><button style="float:right;display:inline;" class="remove_fieldoctx btn btn-default">Remove Field</button></div>'); //add input box
            xoctx++;
        });
        $(wrapperoctx).on("click", ".remove_fieldoctx", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            xoctx--;
        })

        //Add and remove events
        var wrapperevent = $(".input_fields_wrapevent"); //Fields wrapper
        var add_buttonevent = $(".add_field_buttonevent"); //Add button ID
        var xevent = 1; //initlal text box count 
        $(add_buttonevent).click(function (e) { //on add input button click
            e.preventDefault();
            $(wrapperevent).append('<div><input  style="width:80%;display:inline;"class="form-control"name="et' + xevent + '" id="et' + xevent + '" placeholder="Enter event" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldevent btn btn-default">Remove  Field</button></div>'); //add input box
            xevent++;
        });
        $(wrapperevent).on("click", ".remove_fieldevent", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            xevent--;
        });

        //Add and remove parameters
        var wrapperparamter = $(".input_fields_wrappar"); //Fields wrapper
        var add_buttonparameter = $(".add_field_buttonpar"); //Add button ID
        var xpar = 0; //initlal text box count 
        $(add_buttonparameter).click(function (e) { //on add input button click
            e.preventDefault();
            var parcheck1 = false;
            var parcheck2 = false;
            for (var i = 0; i <= xpar; i++) {
                var nm = $(".parnm:eq(" + i + ")").val();
                if (nm === '') {
                    parcheck1 = true;
                    break;
                }
                if (/^[a-zA-Z0-9]*$/.test(nm) == false) {
                    parcheck2 = true;
                    break;
                }
            }
            if (parcheck1 == true) {
                alert("Fill previous parameter");
            }
            if (parcheck2 == true) {
                alert("Parameter name should not contain special characters and spaces");
            }
            if ((parcheck1 == false) && (parcheck2 == false)) {
                xpar++;
                $(wrapperparamter).append('<div class="form-group input_fields_wrapparp" id="input_fields_wrapparp' + xpar + '"> Parameter ' + (xpar + 1) + ' : <br/><input style="width:75%;display:inline;" class="form-control parnm" name="parnm' + xpar + '" id="parnm' + xpar + '" placeholder="Enter parameter name" pattern="^[a-zA-Z][\sa-zA-Z]*" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldparameter btn btn-default">Remove  parameter</button><br/> <button class="btn btn-default add_field_buttonparp" id="add_field_buttonparp' + xpar + '" onclick = "add(' + xpar + ')">Add Prompts</button></div>'); //add input box
                if (xpar >= 2) {
                    $(".remove_fieldparameter:eq(" + (xpar - 2) + ")").prop('disabled', true);
                }
            }
            console.log("xpar =" + xpar)
        });
        $(wrapperparamter).on("click", ".remove_fieldparameter", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            if (xpar >= 2) {
                $(".remove_fieldparameter:eq(" + (xpar - 2) + ")").prop('disabled', false);
            }
            xpar--;
            console.log("xpar =" + xpar);
        });
    });

    //Add and remove prompts in parameters
    function add(xpar) {
        var xparp = true;
        console.log("add and xpar = " + xpar + " xparp = " + xparp);
        $(".input_fields_wrapparp:eq(" + xpar + ")").append('<div class="input_fields_wrapparpp" id = "input_fields_wrapparpp' + xpar + '"> <input style="width:80%;display:inline;" class="form-control parp' + xpar + '" name="parp' + xpar + '" id="parp' + xpar + '" placeholder="Enter prompt" pattern="^[a-zA-Z0-9_ ]*$" title="All characters allowed, but do not begin with a space" required><button style="float:right;display:inline;" class="remove_fieldparameter_prompt btn btn-default" id="remove_fieldparameter_prompt' + xpar + '" onclick="removeprompt(this.id,' + xpar + ')">Remove  prompt</button> </div>'); //add input box
        $(".add_field_buttonparp:eq(" + xpar + ")").prop('disabled', xparp);
        console.log(xparp);
    };

    function removeprompt(ppid, xpar) {
        var xparp = false;
        console.log("remove and xpar = " + xpar + " xparp = " + xparp);
        $('#' + ppid).parent('div').remove();
        $(".add_field_buttonparp:eq(" + xpar + ")").prop('disabled', xparp);
        console.log(xparp);
    }
});
//$(".input_fields_wrapparpp:eq(0)").remove();