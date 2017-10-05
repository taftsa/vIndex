//Startup
var vIndex;
var sourceSets;

//localStorage.clear();

if (localStorage.getItem('sourceSets') != null) {
	sourceSets = JSON.parse(localStorage.getItem('sourceSets'));
} else {
	var sourceSets = [];
};

function loadSet(sheetKey) {
	Tabletop.init({ key: sheetKey,
		callback: function (data, tabletop) {
			vIndex = data;
			
			for (var i = 0; i < vIndex.length; i++) {
				$('#cards').append('<div class="card" id="' + i + '"></div>');				
				$('#' + i).append('<div class="authorYear ">' + vIndex[i]['Author'] + ', ' + vIndex[i]['Year'] + '</div>');
				$('#' + i).append('<div class="source">' + vIndex[i]['Journal'] + ', ' + vIndex[i]['Volume/Issue'] + ', ' + vIndex[i]['Pages'] + '</div>');
				$('#' + i).append('<div class="title">' + vIndex[i]['Title'] + '</div>');
				$('#' + i).append('<ul class="notes"></ul>');
				
				var notes = vIndex[i]['Notes'].split(';; ');
				
				for (var g = 0; g < notes.length; g++) {
					$('#' + i + ' .notes').append('<li> ' + notes[g] + '</li>');
				};

				$('#' + i).append('<div class="link"><a href="' + vIndex[i]['Link'] + '" target="_blank">&#9964;</a></div>');
				$('#' + i).append('<div class="duplicate">&#9901;</div>');
				$('#' + i).append('<div class="close">&#9938;</div>');
				$('#' + i).append('<div class="colorBox"><div class="tomato box"></div><div class="orange box"></div><div class="dodgerblue box"></div><div class="mediumseagreen box"></div><div class="gray box"></div><div class="slateblue box"></div><div class="violet box"></div><div class="lightgray box"></div><div class="white box"></div></div>');
			
				$('#' + i).css('top', i * 8);
				$('#' + i).css('left', i * 2);
			};
			
			$('.card').draggable();
		},
		simpleSheet: true
	});
};

$(document).ready(function() {
	for (var i = 0; i < sourceSets.length; i++) {
		$('#savedProjects').append('<option value="' + sourceSets[i][1] + '">' + sourceSets[i][1] + '</option>');
	};
});

$(document).on('click', '#import', function() {
	var sheetKey = $('#sheetKey').val();
	loadSet(sheetKey);
});

$(document).on('click', '#save', function() {
	var sheetKey = $('#sheetKey').val();
	var sheetName = $('#sheetName').val();
	
	sourceSets.push([sheetKey, sheetName]);
	
	localStorage.setItem('sourceSets', JSON.stringify(sourceSets));
	
	$('#savedProjects').append('<option value="' + sheetName + '">' + sheetName + '</option>');
});

$(document).on('click', '#load', function() {
	$('#cards').empty();
	var project = $('#savedProjects').val();
	
	for (var i = 0; i < sourceSets.length; i++) {
		if (sourceSets[i][1] == project) {
			loadSet(sourceSets[i][0]);
		};
	};
});

$(document).on('click', '.duplicate', function() {
	var newCard = $(this).parent().html();
	
	$('body').append('<div class="card">' + newCard + '<div>');
	$('.card').draggable();
});

$(document).on('click', '.close', function() {
	$(this).parent().remove();
});

$(document).on('click', '.box', function() {
	var color = $(this).attr('class').split(' ')[0];
	$(this).parent().parent().css('background-color', color);
});

$(document).on('click drag', '.card', function() {
	$('.front').removeClass('front');
	$(this).addClass('front');
});