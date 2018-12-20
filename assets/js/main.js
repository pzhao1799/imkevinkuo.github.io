var inputAllowed = true;
var currentSection = 0;
var descs = [[""],
			["Academics", "University of Maryland, College Park", "Thomas Jefferson High School", "CodeSignal"],
			["Projects", "Gait Recognition", "Team AIMAR", "AI/Parallel Computing", "Elementals", "Cadence", "Web Automation", "4 Year Planner"],
			["About", "Track and Field", "Taiwan", "Music"]];
function showSection(s) {
	if (s == currentSection) {return;}
	var oldSection = $(".section").eq(currentSection);
	if (currentSection == 0) {
		oldSection.find("#intro").css({"animation":"fadeOutLeft 0.50s", "animation-fill-mode":"forwards"});
		oldSection.find("#profile").css({"animation":"fadeOutRight 0.50s", "animation-fill-mode":"forwards"});
		oldSection.find("#info > p").each(function(i) {
			$(this).css({"animation":"fadeOutUp 0.35s", "animation-delay": i*0.05+"s", "animation-fill-mode":"both"});
		});
		setTimeout(function() {
			oldSection.addClass("hidden");
			oldSection.find("#intro").css({"animation":"", "animation-fill-mode":""});
			oldSection.find("#profile").css({"animation":"", "animation-fill-mode":""});
			oldSection.find("#info > p").css({"animation":"", "animation-delay": "", "animation-fill-mode":""});
		}, 500);
	}
	else {// Animate out, then reset and hide section
		oldSection.find(".carousel").eq(0).find(".imgbox").each(function(i) {
			$(this).css({"animation":"fadeOutLeft 0.50s", "animation-delay":(i*0.05)+"s", "animation-fill-mode":"both"});
		});
		oldSection.find(".subsection").css({"animation":"fadeOutRight 0.50s", "animation-fill-mode":"both"});
		setTimeout(function() {
			oldSection.addClass("hidden");
			oldSection.find(".carousel").eq(0).find(".imgbox").css({"animation": "", "animation-delay": "", "animation-fill-mode":""});
			oldSection.find(".subsection").css({"animation": "", "animation-fill-mode":""});
		}, 500);
	}
	//
	var newSection = $(".section").eq(s);
	showContent(s, -1);
	newSection.find('h1').text(" ");
	setTimeout(function() {
		newSection.removeClass("hidden");
	}, 500);
	if (s != 0) {
		setTimeout(function() {
			newSection.find(".carousel").eq(0).find(".imgbox").each(function(i) {
				$(this).css({"animation":"fadeInDown 0.50s", "animation-delay":(i*0.05)+"s", "animation-fill-mode":"both"});
			});
		}, 500);
		setTimeout(function() {
			newSection.find(".carousel").eq(0).find(".imgbox").css({"animation":"", "animation-delay":"", "animation-fill-mode":""});
		}, 1000);
	}
	currentSection = s;
}
function showContent(sec, id) {
	$(".section").eq(sec).find('.content').each(function(i) {
		if (i == id) {
			$(this).removeClass("hidden");
		}
		else {
			$(this).addClass("hidden");
		}
	});
}
$(document).ready(function () {
	$(".imgbox").mouseleave(function(e) {
		if(e.relatedTarget) {
			var sec = $(".section").index($(this).parent().parent());
			var id = $(this).parent().children(".imgbox").index($(this));
			$(this).removeClass("active");
			$(this).css("opacity", "");
		}
	});
	
	$(".imgbox").mouseenter(function() {
		var sec = $(".section").index($(this).parent().parent());
		var id = $(this).parent().children(".imgbox").index($(this));
		$(".section").eq(sec).find('h1').text(descs[sec][id+1]);
		$(this).addClass("active");
	});
	
	$(".imgbox").mousedown(function() {
		var sec = $(".section").index($(this).parent().parent());
		var id = $(this).parent().children(".imgbox").index($(this));
		showContent(sec, id);
		$(this).css("opacity", 0.7);
	});
	
	$(".imgbox").mouseup(function() {
		$(this).css("opacity", "");
	});
	
	$(".navbutton").mousedown(function() {
		$(this).css("opacity", 0.7);
	});
	
	$(".navbutton").mouseup(function() {
		$(this).css("opacity", "");
		showSection($(".navbutton").index(this));
	});
	
	$(".navbutton").mouseleave(function(e) {
		if(e.relatedTarget) {
			$(this).css("opacity", "");
		}
	});
});