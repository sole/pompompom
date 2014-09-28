var Oscillator = require('./Oscillator');

function pompompom(audioContext) {

	this.createOscillator = function() {
		return Oscillator(audioContext);
	};

}

module.exports = pompompom;
