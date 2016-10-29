$('#dForm').on('submit',function(e){
	e.preventDefault();
	console.log('Button CLicked');
	console.log($( this ).serialize());
	var myData;
	$.ajax({
		type: 'post',
		url: 'http://webnspice.com/projs/Diwali/shake.php',
		data : $(this).serialize(),
		success: function (response) {
			$(".tabs").removeClass('active');
			$("#leaderTab").addClass('active');
			// We get the element having id of display_info and put the response inside it
			$('#reponse').html(response);
		}
	});
});

var timer;
var count = 30;
var cliks=0;

$('.selector').on('click', function(e) {
    e.preventDefault();
    var tab = $(this).attr("href");
    $(".tabs").not(tab).removeClass('active');
    $(tab).addClass('active');
	
	if ($('#countTab').hasClass('active')) {
		console.log('Starting Counter');
		timer = setTimeout(update, 1000);
	}
});

function fnCounter(type){
	cliks++;
	console.log('Click'+cliks);
	$("#myCount").text(cliks);
	$('#userValue').val(cliks);
	$('#userType').val(type);
	$('.mSingle').addClass('anim');
	setTimeout(
		function(){
			$('.mSingle').removeClass('anim');
		}
	, 500);
}
/* Make Section height 100%*/
vpw = $(window).width();
vph = $(window).height();
$('.tabs').height(vph);

$("#myCount").text(timer);

$('#countTab').on('click', function(e) {
	fnCounter('Click');
});


//update display

//this allows for 'clearTimeout' if needed

function update(){
    console.log(count);
	$("#myTimer").text(count);
	if (count > 0){
		count--;
		timer = setTimeout(update, 1000);
    }
    else{
        $('#countTab').removeClass('active');
		$('#fireTab').addClass('active');
		var earn = Math.floor(cliks / 5) * 1000;
		console.log(earn);
		$(".popUp").delay(earn).fadeIn(500);
    }
}

window.onload = function() {
    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15,
		timeout: 1000 // optional, determines the frequency of event generation
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);

    //shake event callback
    function shakeEventDidOccur () {
		//put your own code here etc.
		fnCounter('Shake');
	}
};