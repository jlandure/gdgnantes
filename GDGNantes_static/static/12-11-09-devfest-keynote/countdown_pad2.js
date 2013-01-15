//<![CDATA[

// Array to hold each digit's starting background-position Y value
var initialPosPad2 = [0, -618, -1236, -1854, -2472, -3090, -3708, -4326, -4944, -5562];
// Amination frames
var animationFramesPad2 = 5;
// Frame shift
var frameShiftPad2 = 103;

// Starting number
var theNumberPad2 = 0;

var maxPad2 = 273;
//9444 > 39

// Increment
var incrementPad2 = Math.round(maxPad2/240);//39;//round(max/240);//273/240;
// Pace of counting in milliseconds
var pacePad2 = 350;

// Initializing variables
var digitsOldPad2 = [], digitsNewPad2 = [], subStartPad2, subEndPad2, xPad2, yPad2;

// Function that controls counting
function doCountPad2(){
	// In this example, we're pad2ding the numbers
	if(theNumberPad2 < maxPad2) {
		var x = Pad2(theNumberPad2.toString());
		theNumberPad2 += incrementPad2;
		var y = Pad2(theNumberPad2.toString());
		digitCheckPad2(x,y);
	}
}

// This checks the old count value vs. new value, to determine how many digits
// have changed and need to be animated.
function digitCheckPad2(xPad2,yPad2){
	if (yPad2.length > xPad2.length) addDigitPad2(yPad2.length);
	var digitsOldPad2 = splitToArrayPad2(xPad2),
	digitsNewPad2 = splitToArrayPad2(yPad2);
	for (var i = 0, c = digitsNewPad2.length; i < c; i++){
		if (digitsNewPad2[i] != digitsOldPad2[i]){
			animateDigitPad2(i, digitsOldPad2[i], digitsNewPad2[i]);
		}
	}
}

// Animation function
function animateDigitPad2(nPad2, oldDigitPad2, newDigitPad2){
	// I want three different animations speeds based on the digit,
	// because the pace and increment is so high. If it was counting
	// slower, just one speed would do.
	// 1: Changes so fast is just like a blur
	// 2: You can see complete animation, barely
	// 3: Nice and slow
	var speedPad2;
	switch (nPad2){
		case 0:
			speedPad2 = pacePad2/8;
			break;
		case 1:
			speedPad2 = pacePad2/4;
			break;
		default:
			speedPad2 = pacePad2/2;
			break;
	}
	// Cap on slowest animation can go
	speedPad2 = (speedPad2 > 100) ? 100 : speedPad2;
	// Get the initial Y value of background position to begin animation
	var posPad2 = initialPosPad2[oldDigitPad2];
	// Each animation is 5 frames long, and 103px down the background image.
	// We delay each frame according to the speed we determined above.
	for (var k = 0; k < animationFramesPad2; k++){
		posPad2 = posPad2 - frameShiftPad2;
		if (k == (animationFramesPad2 - 1)){
			$("#pad2" + nPad2).delay(speedPad2).animate({'background-position': '0 ' + posPad2 + 'px'}, 0, function(){
				// At end of animation, shift position to new digit.
				$("#pad2" + nPad2).css({'background-position': '0 ' + initialPosPad2[newDigitPad2] + 'px'}, 0);
			});
		}
		else{
			$("#pad2" + nPad2).delay(speedPad2).animate({'background-position': '0 ' + posPad2 + 'px'}, 0);
		}
	}
}

// Splits each value into an array of digits
function splitToArrayPad2(input){
	var digitsPad2 = new Array();
	for (var i = 0, c = input.length; i < c; i++){
		var subStartPad2 = input.length - (i + 1),
		subEndPad2 = input.length - i;
		digitsPad2[i] = input.substring(subStartPad2, subEndPad2);
	}
	return digitsPad2;
}

// Adds new digit
function addDigitPad2(lenPad2){
	var liPad2 = Number(lenPad2) - 1;
	if (liPad2 % 3 == 0) $("#countdown-pad2").prepend('<li class="seperator"></li>');
	$("#countdown-pad2").prepend('<li id="pad2' + liPad2 + '"></li>');
	$("#pad2" + liPad2).css({'background-position': '0 ' + initialPosPad2[1] + 'px'});
}

// Sets the correct digits on load
function initialDigitCheckPad2(initialPad2){
	// Creates the right number of digits
	// In this example, we're pad2ding the numbers
	var pad2dedPad2 = Pad2(initialPad2.toString());
	var countPad2 = pad2dedPad2.length;
	var bitPad2 = 1;
	for (var i = 0; i < countPad2; i++){
		$("#countdown-pad2").prepend('<li id="pad2' + i + '"></li>');
		if (bitPad2 != (countPad2) && bitPad2 % 3 == 0) 
			$("#countdown-pad2").prepend('<li class="seperator"></li>');
		bitPad2++;
	}
	// Sets them to the right number
	var digitsPad2 = splitToArrayPad2(initialPad2.toString());
	for (var i = 0, c = digitsPad2.length; i < c; i++){
		$("#pad2" + i).css({'background-position': '0 ' + initialPosPad2[digitsPad2[i]] + 'px'});
	}
}

// Generates a good random number
// http://www.electrictoolbox.com/pad2-number-zeroes-javascript/
function Pad2(str, length) {
    var size = 4; // For 72 billion
    while (str.length < size) {
        str = '0' + str;
    }
    return str;
}

// Start it up
initialDigitCheckPad2(theNumberPad2);
setInterval(doCountPad2, pacePad2);

//]]>