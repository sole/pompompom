var Oscillator = require('./Oscillator');

function pompompom(audioContext) {

	this.createOscillator = function() {
		return Oscillator(audioContext);
	};

	return this;

}

module.exports = pompompom;
