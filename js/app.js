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
var book = $book.val();
var chapter = $chapter.val();
var verseNum = $verse.val();
var verse = "";

//this function uses mustache.js to format the html/info




$(document).ready(function(){
	
	//click function to set variables
	$findScripture.on('click', function(){
		book = $book.val();
		chapter = $chapter.val();
		verse = $verse.val();
		search = "p=" + book + chapter + ":" + verse;
		console.log(search);

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
					book = info.book_name;
					console.log(book)
					//console.log(info.chapter_nr);
					chapter = info.chapter_nr
					console.log(chapter);
					$.each(info.chapter, function(index, info){
						console.log(info.verse_nr);
						verseNum = info.verse_nr;
						console.log(verseNum);
						//console.log(value.verse);
						verse = info.verse;
						console.log(verse);
						
						//append information to the DOM
						$reference.append("<p>" + book + " " + chapter + ":" + verseNum);
						$scripture.append("<p>" + verse + "</p>");
					});
				});		
				

			},

			error: function(){
				alert('error loading scripture');
			}	
		});
		
	});
});

	
