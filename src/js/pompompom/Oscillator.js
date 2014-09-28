'use strict';

function ImmortalOscillator(gain) {

	var oscNode;
	var frequencyInlet;
	var context = gain.context;

	setupFrequencyInlet();
	makeNode();

	function setupFrequencyInlet() {
		frequencyInlet = context.createGain();
	
		var frequencyInputSource = context.createBufferSource();
		var frequencyBuffer = context.createBuffer(2, 1, context.sampleRate);

		// Sole's invention to get some input signal into the GainNode for modulating frequency which apparently seems to be magical and works. WOW.
		frequencyBuffer.getChannelData(0)[0] = 1.0;
		frequencyBuffer.getChannelData(1)[0] = 1.0;
		frequencyInputSource.buffer = frequencyBuffer;
		frequencyInputSource.loop = true;
		frequencyInputSource.connect(frequencyInlet);
		frequencyInputSource.start(0);

		gain.frequency = frequencyInlet.gain;
		frequencyInlet.gain.value = 440.0;
	}

	
	function onNodeEnded(e) {
		var t = e.target;
		t.disconnect(gain);
		frequencyInlet.disconnect(t.frequency);
		makeNode();
	}

	function makeNode() {
		oscNode = context.createOscillator();
		// TODO copy type, props
		oscNode.onended = onNodeEnded;
		oscNode.connect(gain);

		oscNode.frequency.setValueAtTime(0, context.currentTime);
		frequencyInlet.connect(oscNode.frequency);
	}

	gain.start = function(when) {
		oscNode.start(when);
	};

	gain.stop = function(when) {
		oscNode.stop(when);
	};

}

function Oscillator(audioContext) {

	console.log('oscillator and now', this);

	var gain = audioContext.createGain();
	
	ImmortalOscillator(gain);
	
	return gain;

}

module.exports = Oscillator;
