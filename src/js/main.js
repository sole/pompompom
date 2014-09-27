var ac = new AudioContext();
var pompompom = require('./pompompom/pompompom');
var p3 = new pompompom(ac);

var osc = p3.createOscillator();
var oscPlaying = false;
osc.connect(ac.destination);
var oscBtn = document.getElementById('oscillate');
oscBtn.addEventListener('click', toggleOscillator);

function toggleOscillator() {
	var now = ac.currentTime;

	if(oscPlaying) {
		osc.stop(now);
	} else {
		osc.start(now);
		//console.log(osc.frequency.value, now);

		//osc.frequency.setValueAtTime(220 + 220 * Math.random(), now);
	}
	oscPlaying = !oscPlaying;
}


//window.osc = osc; // TMP XXX KILLTHIS
