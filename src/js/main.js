var ac = new AudioContext();
var p3 = require('./pompompom/pompompom')(ac);

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
	}
	oscPlaying = !oscPlaying;
}

