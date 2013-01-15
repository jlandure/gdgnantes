//<![CDATA[

// Array to hold each digit's starting background-position Y value
var initialPosPad3 = [0, -618, -1236, -1854, -2472, -3090, -3708, -4326, -4944, -5562];
// Amination frames
var animationFramesPad3 = 5;
// Frame shift
var frameShiftPad3 = 103;

// Starting number
var theNumberPad3 = 0;

var maxPad3 = 424;
//9444 > 39

// Increment
var incrementPad3 = Math.round(maxPad3/240);//39;//round(max/240);//273/240;
// Pace of counting in milliseconds
var pacePad3 = 350;

// Initializing variables
var digitsOldPad3 = [], digitsNewPad3 = [], subStartPad3, subEndPad3, xPad3, yPad3;

// Function that controls counting
function doCountPad3(){
	// In this example, we're pad3ding the numbers
	var x = Pad3(theNumberPad3.toString());
	if(theNumberPad3 < maxPad3) {
		theNumberPad3 += incrementPad3;
	}
	var y = Pad3(theNumberPad3.toString());
	digitCheckPad3(x,y);
}

// This checks the old count value vs. new value, to determine how many digits
// have changed and need to be animated.
function digitCheckPad3(xPad3,yPad3){
	if (yPad3.length > xPad3.length) addDigitPad3(yPad3.length);
	var digitsOldPad3 = splitToArrayPad3(xPad3),
	digitsNewPad3 = splitToArrayPad3(yPad3);
	for (var i = 0, c = digitsNewPad3.length; i < c; i++){
		if (digitsNewPad3[i] != digitsOldPad3[i]){
			animateDigitPad3(i, digitsOldPad3[i], digitsNewPad3[i]);
		}
	}
}

// Animation function
function animateDigitPad3(nPad3, oldDigitPad3, newDigitPad3){
	// I want three different animations speeds based on the digit,
	// because the pace and increment is so high. If it was counting
	// slower, just one speed would do.
	// 1: Changes so fast is just like a blur
	// 2: You can see complete animation, barely
	// 3: Nice and slow
	var speedPad3;
	switch (nPad3){
		case 0:
			speedPad3 = pacePad3/8;
			break;
		case 1:
			speedPad3 = pacePad3/4;
			break;
		default:
			speedPad3 = pacePad3/2;
			break;
	}
	// Cap on slowest animation can go
	speedPad3 = (speedPad3 > 100) ? 100 : speedPad3;
	// Get the initial Y value of background position to begin animation
	var posPad3 = initialPosPad3[oldDigitPad3];
	// Each animation is 5 frames long, and 103px down the background image.
	// We delay each frame according to the speed we determined above.
	for (var k = 0; k < animationFramesPad3; k++){
		posPad3 = posPad3 - frameShiftPad3;
		if (k == (animationFramesPad3 - 1)){
			$("#pad3" + nPad3).delay(speedPad3).animate({'background-position': '0 ' + posPad3 + 'px'}, 0, function(){
				// At end of animation, shift position to new digit.
				$("#pad3" + nPad3).css({'background-position': '0 ' + initialPosPad3[newDigitPad3] + 'px'}, 0);
			});
		}
		else{
			$("#pad3" + nPad3).delay(speedPad3).animate({'background-position': '0 ' + posPad3 + 'px'}, 0);
		}
	}
}

// Splits each value into an array of digits
function splitToArrayPad3(input){
	var digitsPad3 = new Array();
	for (var i = 0, c = input.length; i < c; i++){
		var subStartPad3 = input.length - (i + 1),
		subEndPad3 = input.length - i;
		digitsPad3[i] = input.substring(subStartPad3, subEndPad3);
	}
	return digitsPad3;
}

// Adds new digit
function addDigitPad3(lenPad3){
	var liPad3 = Number(lenPad3) - 1;
	if (liPad3 % 3 == 0) $("#countdown-pad3").prepend('<li class="seperator"></li>');
	$("#countdown-pad3").prepend('<li id="pad3' + liPad3 + '"></li>');
	$("#pad3" + liPad3).css({'background-position': '0 ' + initialPosPad3[1] + 'px'});
}

// Sets the correct digits on load
function initialDigitCheckPad3(initialPad3){
	// Creates the right number of digits
	// In this example, we're pad3ding the numbers
	var pad3dedPad3 = Pad3(initialPad3.toString());
	var countPad3 = pad3dedPad3.length;
	var bitPad3 = 1;
	for (var i = 0; i < countPad3; i++){
		$("#countdown-pad3").prepend('<li id="pad3' + i + '"></li>');
		if (bitPad3 != (countPad3) && bitPad3 % 3 == 0) 
			$("#countdown-pad3").prepend('<li class="seperator"></li>');
		bitPad3++;
	}
	// Sets them to the right number
	var digitsPad3 = splitToArrayPad3(initialPad3.toString());
	for (var i = 0, c = digitsPad3.length; i < c; i++){
		$("#pad3" + i).css({'background-position': '0 ' + initialPosPad3[digitsPad3[i]] + 'px'});
	}
}

// Generates a good random number
// http://www.electrictoolbox.com/pad3-number-zeroes-javascript/
function Pad3(str, length) {
    var size = 4; // For 72 billion
    while (str.length < size) {
        str = '0' + str;
    }
    return str;
}

// Start it up
initialDigitCheckPad3(theNumberPad3);
setInterval(doCountPad3, pacePad3);

//]]>