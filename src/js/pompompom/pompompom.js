var Oscillator = require('./Oscillator');

function pompompom(audioContext) {

	this.createOscillator = function() {
		return (new Oscillator(audioContext)).getNode();
	};

}

module.exports = pompompom;
