/*
//alert('hello world');

$(document).ready(function(){

	//alert("hello world");
});
*/

var $reference = $('#reference');
var $scripture = $('#scripture');
var $book = $('#book');
var $chapter = $('#chapter');
var $verse = $('#verse');
var $findScripture = $('#find-scripture');

var verse = "";

//this function uses mustache.js to format the html/info




$(document).ready(function(){
	
	//click function to set variables
	$findScripture.on('click', function(){
		book = $book.val();
		chapter = $chapter.val();
		verseNum = $verse.val();
		search = "p=" + book + chapter + ":" + verseNum;
		console.log(search);
		console.log(verseNum);
	//AJAX GET Function - calling the Bible API
		$.ajax({
			type: 'GET',
			url: 'http://getbible.net/json',
			dataType: 'jsonp',
			data: search,
			jsonp: 'getbible',
			success: function(json) {	
				$.each(json.book, function(index, info){
					//console.log(info.book_name);
					$.each(info.chapter, function(index, info){
						
						verse = info.verse;
						verseNumber = info.verse_nr;
						$scripture.append("<p>" + "<sup>" + verseNumber + "</sup>" + verse + "</p>");
					
					});	
						//append information to the DOM

					$reference.append("<p>" + book + " " + chapter + ":" + verseNum);
						
				});		
				

			},

			error: function(){
				alert('error loading scripture');
			}	
		});
		
	});
});

	
