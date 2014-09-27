'use strict';

function ImmortalOscillator2() {
	
	var oscNode = null;
	var oscNodeNeedsNulling = false;
	var context = this.context;
	var frequency = context.createGain();
	var frequencyInputSource = context.createBufferSource();
	var frequencyBuffer = context.createBuffer(1, 1, context.sampleRate);

	// Sole's invention to get some input signal into the GainNode for modulating frequency
	frequencyBuffer.getChannelData(0)[0] = 1.0;
	frequencyInputSource.buffer = frequencyBuffer;
	frequencyInputSource.loop = true;
	frequencyInputSource.connect(frequency);
	frequencyInputSource.start(0);

	// Expose some 'fake' things as if they were the actual AudioParams of the oscillator
	this.frequency = frequency.gain;
	frequency.gain.value = 440;

	this.__ensureOscNodeIsLive = function() {

		// If the oscillator node is dead, let's create it again
		if(oscNodeNeedsNulling || oscNode === null) {

			/*if(oscNode !== null) {
				frequency.disconnect(oscNode.frequency);
				oscNode.disconnect(this);
				//oscNode.stop(context.currentTime);
			}*/

			oscNode = context.createOscillator();
			oscNode.onended = function() {
				console.log('Im done');
				oscNodeNeedsNulling = true;
				frequency.disconnect(oscNode.frequency);
				oscNode.disconnect(this);
			};

			// Connect it to this node which turns out to be a gain node
			// so we can hear its output
			oscNode.connect(this);

			// Also connect the frequency node to its frequency param
			oscNode.frequency.setValueAtTime(0, context.currentTime);
			frequency.connect(oscNode.frequency);
		}
		oscNodeNeedsNulling = false;
	};

	this.start = function(when) {
		this.__ensureOscNodeIsLive();
		oscNode.start(when);
	};

	this.stop = function(when) {
		console.log('stop', oscNode);
		if(oscNode === null) {
			console.error('but it was null already!');
			return;
		}
		// oscNodeNeedsNulling = true;
		oscNode.stop(when);
	};

	this.cancelScheduledEvents = function(when) {
		// TODO
		// 
	};
}

function ImmortalOscillator(gain) {

	var oscNode;
	var context = gain.context;

	makeNode();

	function onNodeEnded(e) {
		var t = e.target;
		t.disconnect(gain);
		makeNode();
	}

	function makeNode() {
		oscNode = context.createOscillator();
		// TODO copy type, props
		oscNode.onended = onNodeEnded;
		oscNode.connect(gain);
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

	//ImmortalOscillator.call(gain);
	
	ImmortalOscillator(gain);

	this.getNode = function() {
		return gain;
	};
	
	//return gain;

}

module.exports = Oscillator;
