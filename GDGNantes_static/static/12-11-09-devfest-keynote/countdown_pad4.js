//<![CDATA[

// Array to hold each digit's starting background-position Y value
var initialPosPad4 = [0, -618, -1236, -1854, -2472, -3090, -3708, -4326, -4944, -5562];
// Amination frames
var animationFramesPad4 = 5;
// Frame shift
var frameShiftPad4 = 103;

// Starting number
var theNumberPad4 = 0;

var maxPad4 = 256;
//9444 > 39

// Increment
var incrementPad4 = Math.round(maxPad4/240);//39;//round(max/240);//273/240;
// Pace of counting in milliseconds
var pacePad4 = 350;

// Initializing variables
var digitsOldPad4 = [], digitsNewPad4 = [], subStartPad4, subEndPad4, xPad4, yPad4;

// Function that controls counting
function doCountPad4(){
	// In this example, we're pad4ding the numbers
	
	if(theNumberPad4 < maxPad4) {
		var x = Pad4(theNumberPad4.toString());
		theNumberPad4 += incrementPad4;
		var y = Pad4(theNumberPad4.toString());
		digitCheckPad4(x,y);
	}

}

// This checks the old count value vs. new value, to determine how many digits
// have changed and need to be animated.
function digitCheckPad4(xPad4,yPad4){
	if (yPad4.length > xPad4.length) addDigitPad4(yPad4.length);
	var digitsOldPad4 = splitToArrayPad4(xPad4),
	digitsNewPad4 = splitToArrayPad4(yPad4);
	for (var i = 0, c = digitsNewPad4.length; i < c; i++){
		if (digitsNewPad4[i] != digitsOldPad4[i]){
			animateDigitPad4(i, digitsOldPad4[i], digitsNewPad4[i]);
		}
	}
}

// Animation function
function animateDigitPad4(nPad4, oldDigitPad4, newDigitPad4){
	// I want three different animations speeds based on the digit,
	// because the pace and increment is so high. If it was counting
	// slower, just one speed would do.
	// 1: Changes so fast is just like a blur
	// 2: You can see complete animation, barely
	// 3: Nice and slow
	var speedPad4;
	switch (nPad4){
		case 0:
			speedPad4 = pacePad4/8;
			break;
		case 1:
			speedPad4 = pacePad4/4;
			break;
		default:
			speedPad4 = pacePad4/2;
			break;
	}
	// Cap on slowest animation can go
	speedPad4 = (speedPad4 > 100) ? 100 : speedPad4;
	// Get the initial Y value of background position to begin animation
	var posPad4 = initialPosPad4[oldDigitPad4];
	// Each animation is 5 frames long, and 103px down the background image.
	// We delay each frame according to the speed we determined above.
	for (var k = 0; k < animationFramesPad4; k++){
		posPad4 = posPad4 - frameShiftPad4;
		if (k == (animationFramesPad4 - 1)){
			$("#pad4" + nPad4).delay(speedPad4).animate({'background-position': '0 ' + posPad4 + 'px'}, 0, function(){
				// At end of animation, shift position to new digit.
				$("#pad4" + nPad4).css({'background-position': '0 ' + initialPosPad4[newDigitPad4] + 'px'}, 0);
			});
		}
		else{
			$("#pad4" + nPad4).delay(speedPad4).animate({'background-position': '0 ' + posPad4 + 'px'}, 0);
		}
	}
}

// Splits each value into an array of digits
function splitToArrayPad4(input){
	var digitsPad4 = new Array();
	for (var i = 0, c = input.length; i < c; i++){
		var subStartPad4 = input.length - (i + 1),
		subEndPad4 = input.length - i;
		digitsPad4[i] = input.substring(subStartPad4, subEndPad4);
	}
	return digitsPad4;
}

// Adds new digit
function addDigitPad4(lenPad4){
	var liPad4 = Number(lenPad4) - 1;
	if (liPad4 % 3 == 0) $("#countdown-pad4").prepend('<li class="seperator"></li>');
	$("#countdown-pad4").prepend('<li id="pad4' + liPad4 + '"></li>');
	$("#pad4" + liPad4).css({'background-position': '0 ' + initialPosPad4[1] + 'px'});
}

// Sets the correct digits on load
function initialDigitCheckPad4(initialPad4){
	// Creates the right number of digits
	// In this example, we're pad4ding the numbers
	var pad4dedPad4 = Pad4(initialPad4.toString());
	var countPad4 = pad4dedPad4.length;
	var bitPad4 = 1;
	for (var i = 0; i < countPad4; i++){
		$("#countdown-pad4").prepend('<li id="pad4' + i + '"></li>');
		if (bitPad4 != (countPad4) && bitPad4 % 3 == 0) 
			$("#countdown-pad4").prepend('<li class="seperator"></li>');
		bitPad4++;
	}
	// Sets them to the right number
	var digitsPad4 = splitToArrayPad4(initialPad4.toString());
	for (var i = 0, c = digitsPad4.length; i < c; i++){
		$("#pad4" + i).css({'background-position': '0 ' + initialPosPad4[digitsPad4[i]] + 'px'});
	}
}

// Generates a good random number
// http://www.electrictoolbox.com/pad4-number-zeroes-javascript/
function Pad4(str, length) {
    var size = 4; // For 72 billion
    while (str.length < size) {
        str = '0' + str;
    }
    return str;
}

// Start it up
initialDigitCheckPad4(theNumberPad4);
setInterval(doCountPad4, pacePad4);

//]]>