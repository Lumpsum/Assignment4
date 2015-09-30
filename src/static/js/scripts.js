$('#link1').on('click', function(e){
	
	var query = $('#query1').text();
	var endpoint = 'http://localhost:5820/Rick/query';
	var format = 'JSON';
	var reason = 'true';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];

					var myRegexp = /food#(.*)/;
					var match = myRegexp.exec(v_value);
					li.append(match[1]);
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget1').html(ul);
		} catch(err) {
			$('#linktarget1').html('Something went wrong!');
		}
		

		
	});
	
});

$('#link2').on('click', function(e){
	
	var query = $('#query1').text();
	var endpoint = 'http://localhost:5820/Rick/query';
	var format = 'JSON';
	var reason = 'false';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget2').html(ul);
		} catch(err) {
			$('#linktarget2').html('Something went wrong!');
		}
		

		
	});
	
});

function formLoad(){
	var query = $('#query3').text();
	var endpoint = 'http://localhost:5820/Rick/query';
	var format = 'JSON';
	var reason = 'true';

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);

	try {
			var vars = json.head.vars;

	var select = $('<select name = "ingredient"></select>');
	select.addClass('form-control');

	$.each(json.results.bindings, function(index,value){
	var option = $('<option></option>');
	$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];

					var myRegexp = /food#(.*)/;
					var match = myRegexp.exec(v_value);
					option.append(match[1]);
					option.append('<br/>');
					
				});
	select.append(option);
});

	$('#linktarget3').html(select);
	} catch(err) {
			$('#linktarget3').html('Something went wrong!');
		}

});
var query = $('#query5').text();

$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);

	try {
			var vars = json.head.vars;

	var select = $('<select name = "dish"></select>');
	select.addClass('form-control');

	$.each(json.results.bindings, function(index,value){
	var option = $('<option></option>');
	$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];

					var myRegexp = /food#(.*)/;
					var match = myRegexp.exec(v_value);
					option.append(match[1]);
					option.append('<br/>');
					
				});
	select.append(option);
});

	$('#linktarget5').html(select);
	} catch(err) {
			$('#linktarget5').html('Something went wrong!');
		}

});

};

function pickIngredient(form) {
	var ingredient = form.ingredient.value;
	var query = 'PREFIX food:<http://www.semanticweb.org/rick/food#> \n \nSELECT DISTINCT ?y ?x \nWHERE { \n ?x food:hasIngredient food:' + ingredient + ' .\nOPTIONAL {?x food:isIllegal ?y}\n}';
	var endpoint = 'http://localhost:5820/Rick/query';
	var format = 'JSON';
	var reason = 'true';

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];

					if (v_value == 'false' || v_value == 'true') {
					if (v_value == 'true') {
						li.append("<strong>Illegal Dish:</strong> ")
					}
				}
				else {

					var myRegexp = /food#(.*)/;
					var match = myRegexp.exec(v_value);
					li.append(match[1]);
				}	
				});
				ul.append(li);
			
			});

			$('#linktarget4').html(ul);
		} catch(err) {
			$('#linktarget4').html('Something went wrong!');
		}
})
};

function pickDish(form) {
	var dish = form.dish.value;
	var query = 'PREFIX food:<http://www.semanticweb.org/rick/food#> \n\nSELECT DISTINCT ?x \nWHERE { \n food:'+dish+' food:hasIngredient ?x \n}';
	var endpoint = 'http://localhost:5820/Rick/query';
	var format = 'JSON';
	var reason = 'true';

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reason': reason}, function(json){
		console.log(json);
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_value = value[v]['value'];

					if (v_value == 'http://www.semanticweb.org/rick/food#Cooked' || v_value == 'http://www.semanticweb.org/rick/food#Raw') {
						li.append("<strong>Illegal Dish:</strong> ")
				}
				else {
					var myRegexp = /food#(.*)/;
					var match = myRegexp.exec(v_value);
					li.append(match[1]);
				}	
				});
				ul.append(li);
			
			});

			$('#linktarget6').html(ul);
		} catch(err) {
			$('#linktarget6').html('Something went wrong!');
		}
})
};
