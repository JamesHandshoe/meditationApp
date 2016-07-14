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
var $version = $('#bibleVersions');
var $findScripture = $('#find-scripture');

var verse = "";
var versePresent = false;
//this function uses mustache.js to format the html/info




$(document).ready(function(){
	
	//click function to set variables
	$findScripture.on('click', function(){
		//grab values from inputs
		book = $book.val();
		chapter = $chapter.val();
		verseNum = $verse.val();
		version = $version.val();
		
		if(versePresent) {
			$("#text, #text2").remove();
		}

		//set the API search call
		if (verseNum.length==0) {
			search = "p=" + book + chapter + "&v=" + version;
		} else {
			search = "p=" + book + chapter + ":" + verseNum + "&v=" + version;
		};

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
				if (json.type == 'verse') {
					$reference.append("<p id = 'text'><strong>" + book + " " + chapter + ":" + verseNum + "</strong></p>");
					$.each(json.book, function(index, info){
					console.log(search);
					console.log(info.book_name);
						$.each(info.chapter, function(index, info){
							verse = info.verse;
							verseNumber = info.verse_nr;
							$scripture.append("<p id ='text2'>" + "<sup>" + verseNumber + "</sup>" + verse + "</p>");
					
						});	
						//append information to the DOM
					});		
	
				} else if (json.type == 'chapter') {
					$reference.append("<p id='text'><strong>"+ book + " " + chapter);
					$.each(json.chapter, function(index, info){
						verse = info.verse;
						verseNumber = info.verse_nr;
						$scripture.append("<p id='text2'>" + "<sup>" + verseNumber + "</sup>" + verse + "</p>");
					});
				} else if (json.type == 'book') {
					$reference.append("<p id='text'><strong>" + book + "</p></stron>");
					$.each(json.book, function(index, info){
						console.log(search);
						console.log(info.book_name);
						$.each(info.chapter, function(index, info){
							verse = info.verse;
							verseNumber = info.verse_nr;
							$scripture.append("<p id='text2'>" + "<sup>" + verseNumber + "</sup>" + verse + "</p>");
					
						});	
					});	
				}
				versePresent = true;	
			},
			error: function(){
				alert('error loading scripture');
			}	
		});
		
	});
});

	
