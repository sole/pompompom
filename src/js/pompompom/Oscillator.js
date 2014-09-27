function ImmortalOscillator() {

	var oscNode = null;
	var oscNodeNeedsNulling = false;
	var context = this.context;

	this.__ensureOscNodeIsLive = function() {
		if(oscNodeNeedsNulling || oscNode === null) {
			oscNode = context.createOscillator();
			oscNode.connect(this);
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
