jQuery(document).ready(function ($) {
	var slideCount = $('#slider ul li').length;	
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth + slideWidth / 5, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth + slideWidth / 10 });
	
	$('#slider ul li:last-child').prependTo('#slider ul');
	
    	function moveLeft() {
		$('#slider ul').animate({
		    left: + slideWidth
		}, 200, function () {
		    $('#slider ul li:last-child').prependTo('#slider ul');
		    $('#slider ul').css('left', '');	
		});
    	};

    	function moveRight() {
		$('#slider ul').animate({
		    left: - slideWidth
		}, 200, function () {
		    $('#slider ul li:first-child').appendTo('#slider ul');
		    $('#slider ul').css('left', '');
		});
	};

	//auto play
	var autoplay = false;	
	$('#checkbox').change(function(){
		if(!autoplay){		
			autoplay = setInterval(function () {
				moveRight();
			}, 3000);
		}else{
			clearInterval(autoplay);
			autoplay = false;
		}
	});

	//plain js since pure jquery can't handle touch events
	var touchsurface = $('#slider')[0],
				startX,
				startY,
				dist,
				threshold = 150, //required min distance traveled to be considered swipe
				allowedTime = 1000, // maximum time allowed to travel that distance
				elapsedTime,
				startTime;

	touchsurface.addEventListener('touchstart', function (e) {				
		var touchobj = e.changedTouches[0];
		dist = 0;
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime(); // record time when finger first makes contact with surface
		e.preventDefault();
	}, false);

	touchsurface.addEventListener('touchmove', function (e) {
		e.preventDefault(); // prevent scrolling when inside DIV
	}, false);

	touchsurface.addEventListener('touchend', function (e) {
		var touchobj = e.changedTouches[0];				
		elapsedTime = new Date().getTime() - startTime; // get time elapsed
		// check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
		var swiperightBol = (elapsedTime <= allowedTime && touchobj.pageX - startX >= threshold && Math.abs(touchobj.pageY - startY) <= 100);
		var swipeleftBol = (elapsedTime <= allowedTime && startX - touchobj.pageX >= threshold && Math.abs(touchobj.pageY - startY) <= 100);

		if(swiperightBol){
			moveLeft();
		}
		if(swipeleftBol){
			moveRight();
		}

		e.preventDefault();
	}, false);	
});
