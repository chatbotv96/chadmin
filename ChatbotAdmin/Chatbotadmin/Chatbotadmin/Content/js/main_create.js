function main_create(xtrain,xres,xctx,xoctx,xevent,xpar/*,xparp*/)
{
	//Start JSON
	var jsonst = '{';
	
	//Input Contexts
	var jctx = '"contexts": [';
	var jctx1 = '';
	for (i = 0; i <= xctx - 1; i++) 
	{
		rctx = document.forms['create']['ctx' + i].value;
		if(rctx != '')
		{
			jctx1 = jctx1 + '"' + rctx + '"';
			if (i != (xctx - 1)) {
				jctx1 = jctx1 + ' ,';
			}
		}
	}
	var jctxend = ']';
	
	//Events
	var evnt;
	var jevent = ',"events": [';
	var jevent1 ='';
	for (i = 0; i <= xevent - 1; i++) 
	{
		evnt = document.forms['create']['et' + i].value;
		if(evnt != '')
		{
			jevent1 = jevent1 + '{\
			"name":"' + evnt + '"}';
			if (i != (xevent - 1)) {
				jevent1 = jevent1 + ',';
			}
		}
	}
	var jeventend = ']';
	
	//Intent(name)
	var name = document.forms['create']['intent'].value;
	var jintent = ',"name": "' + name + '"';
	
	//Responses start
	var jresponsest = ',"responses" : [{';
	
	//Action
	var action = document.forms['create']['action'].value;
	if(action === undefined){
		action = "";
	}
	var jaction = '"action" : "' + action + '"';

	//Output contexts
	var joctx = ' ,"affectedContexts": [ '
	var joctx1 = ''
	for (i = 0; i <= xoctx - 1; i++) 
	{
		roctx = document.forms['create']['octx' + i].value;
		roctxls = document.forms['create']['octxls' + i].value;
		if(roctx != '')
		{
			if(roctxls == '')
			{
				roctxls = 5;
			}
			joctx1 = joctx1 + '{"lifespan":"' + roctxls + '","name":"' + roctx + '"}';
			if (i != (xoctx - 1)) {
				joctx1 = joctx1 + ' ,';
			}
		}
	}
	var joctxend = ']';
	
	//Messages (Responses from bot)
	var response;
	var rctx;
	var jresponse = ',"messages": [ {\
	  "speech":[';
	var jresponse1 = '';
	for (i = 0; i <= xres - 1; i++) 
	{
		response = document.forms['create']['res' + i].value;
		if(response != '')
		{
			jresponse1 = jresponse1 + ' "' + response + '"';
			if (i != (xres - 1)) 
			{
				jresponse1 = jresponse1 + ' ,';
			}
		}
	}
	var jresponse2 ='],\
	"type" : 0\
	}]';
	
	//Parameters
	
	var rparp = '';
	var jpar = ', "parameters" : [';
	var jpar1 ='';
	for(i = 0; i <= xpar; i++)
	{
		var rparnm = document.forms['create']['parnm'+i].value;
		if(rparnm != '')
		{
			var rparr = false;
			jpar1 = jpar1 + '{\
			  "dataType": "@sys.any",\
			  "isList": false,\
			  "name": "' + rparnm + '",\
			  "prompts": [' ;
			var pcheck = $('.add_field_buttonparp:eq('+i+')').prop('disabled');
			if(pcheck == true)
			{
				var rparp = document.forms['create']['parp'+i].value;
				jpar1 = jpar1 + '"' + rparp + '"';
			}
			/* for(j = 0; j <= xparp-1; j++)
			{
				if(xparp != 0)
				{
					rparr = true; 
					for(i = 0; i < xparp; i++)
					{
						rparp = document.forms['create']['parp0_0'].value;
						jpar1 = jpar1 + '"' + rparp + '"';
						if (i != (xparp - 1)) 
						{
							jpar1 = jpar1 + ' ,';
						}
					}
					console.log("jpar1 2=" + jpar1);
				}
			} */
			jpar1 = jpar1 + '], "required" : ' + pcheck + ',\
				  "value": "$' + rparnm + '"\
				}';
			if(i != (xpar)){
				jpar1 = jpar1 + ","
			}
		}
	}
	var jparend = ']';
	
	//Responses end
	var jresponseend ='}]';
	
	//Training phrases
	var train;
	var jtrain = ',"userSays" : [';
	var jtrain1 = ''; 
	for (i = 0; i <= xtrain - 1; i++) 
	{
		train = document.forms['create']['tp' + i].value;
		if (train != '')
		{
			jtrain1 = jtrain1 + ' {\
			 "count": 0,\
			 "data": [{\
				"text": "' + train + '"\
					}]  }'
			if (i != (xtrain - 1)) 
			{
				jtrain1 = jtrain1 + ' ,';
			}
		}
	}
	var jtrainend = ']';
	
	//End
	var jend = '}'
	
	//----------------------------------------------------------------------------------------------------------------
	
	json = jsonst + jctx + jctx1 + jctxend + jevent + jevent1 + jeventend + jintent + jresponsest + jaction + joctx + joctx1 + joctxend + jresponse + jresponse1 + jresponse2 + jpar + jpar1 + jparend +jresponseend + jtrain + jtrain1 + jtrainend + jend; 	
	console.log(json);
	json = JSON.parse(json)
	$.ajax({
		type: "POST",
		url: "https://api.dialogflow.com/v1/intents?v=20150910",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		headers: {
			"Authorization": "Bearer 895df75eadda4a9296ae55506b38409b"
		},
		data: JSON.stringify(json),
		success: function() {
			console.log('success');
		},
		error: function() {
			console.log('error');
		}
	});
}