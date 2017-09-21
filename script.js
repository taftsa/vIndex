//Startup
var vIndex;

$(document).ready(function(){
	Tabletop.init({ key: '1B5M5walv2VgrSek7m_5jWkyYAC4GEmvMxN1Z6vwODCs',
		callback: function (data, tabletop) {
			vIndex = data;
			
			for (var i = 0; i < vIndex.length; i++) {
				$('body').append('<div class="card" id="' + i + '"></div>');				
				$('#' + i).append('<div class="authorYear ">' + vIndex[i]['Author'] + ', ' + vIndex[i]['Year'] + '</div>');
				$('#' + i).append('<div class="source">' + vIndex[i]['Journal'] + ', ' + vIndex[i]['Volume/Issue'] + ', ' + vIndex[i]['Pages'] + '</div>');
				$('#' + i).append('<div class="title">' + vIndex[i]['Title'] + '</div>');
				$('#' + i).append('<div class="notes">' + vIndex[i]['Notes'] + '</div>');
				$('#' + i).append('<div class="link"><a href="' + vIndex[i]['Link'] + '" target="_blank">&#9964;</a></div>');
				$('#' + i).append('<div class="duplicate">&#9901;</div>');
				$('#' + i).append('<div class="close">&#9938;</div>');
			};
			
			$('.card').draggable();
		},
		simpleSheet: true
	});
});

$(document).on('click', '.duplicate', function() {
	var newCard = $(this).parent().html();
	
	$('body').append('<div class="card">' + newCard + '<div>');
	$('.card').draggable();
});

$(document).on('click', '.close', function() {
	$(this).parent().remove();
});