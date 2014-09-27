function ImmortalOscillator() {

	var oscNode = null;
	var oscNodeNeedsNulling = false;
	var context = this.context;
	var frequency = context.createGain();
	var frequencyInputSource = context.createBufferSource();
	var frequencyBuffer = context.createBuffer(1, 1, context.sampleRate);

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
			oscNode = context.createOscillator();

			// Connect it to this node which turns out to be a gain node
			// so we can hear its output
			oscNode.connect(this);

			// Also connect the frequency node to its frequency param
			oscNode.frequency.value = 0;
			frequency.connect(oscNode.frequency);
		}
		oscNodeNeedsNulling = false;
	};

	this.start = function(when) {
		this.__ensureOscNodeIsLive();
		oscNode.start(when);
	};

	this.stop = function(when) {
		if(oscNode === null) {
			return;
		}
		oscNodeNeedsNulling = true;
		oscNode.stop(when);
	};

	this.cancelScheduledEvents = function(when) {
		// TODO
		// 
	};
}

function Oscillator(audioContext) {
	
	var gain = audioContext.createGain();

	ImmortalOscillator.call(gain);

	return gain;

}

module.exports = Oscillator;
