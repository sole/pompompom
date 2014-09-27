function ImmortalOscillator() {

	var node = null;
	var nodeNeedsNulling = false;
	var context = this.context;

	this.__ensureNodeIsLive = function() {
		if(nodeNeedsNulling || node === null) {
			node = context.createOscillator();
			node.connect(this);
		}
		nodeNeedsNulling = false;
	};

	this.start = function(when) {
		this.__ensureNodeIsLive();
		node.start(when);
	};

	this.stop = function(when) {
		if(node === null) {
			return;
		}
		nodeNeedsNulling = true;
		node.stop(when);
	};

}

function Oscillator(audioContext) {
	
	var gain = audioContext.createGain();

	ImmortalOscillator.call(gain);

	return gain;

}

module.exports = Oscillator;
