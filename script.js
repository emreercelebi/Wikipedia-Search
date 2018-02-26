var apiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
var apiURLend = "&format=json&callback=?";
var random = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=2&callback=?";

$(document).ready(function(){
	$.getJSON(random,function(json){
		$('#random-link').attr("href","https://en.wikipedia.org/wiki/" + json.query.random[0].title.replace(" ","_"));
	})
})

function getQuery() {
	var query = $('#search-bar').val();
	getWikiData(query);
}

function getWikiData(query){
	$.getJSON(apiURL + query + apiURLend, function(json){
		addResults(json);
	});
}


function addResults(json) {
	$('#search-results').html("")
	if (json[1]){
		for (let i = 0; i < json[1].length; i++){			
			let resultHTML = "<a href = " + json[3][i] +  " target = '_blank'><div class = 'container card' id = 'result'><h3 id = 'title'>"
			 + json[1][i] + "</h3><p id ='description'>" + json[2][i] + "</p></div></a>";
			$('#search-results').append(resultHTML);
		}		
	}
}

function setNewRandom(){
	$.getJSON(random, function(json){
		$('#random-link').attr("href", "https://en.wikipedia.org/wiki/" + json.query.random[0].title.replace(" ","_"));
	});
}

