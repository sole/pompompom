// components
require('openmusic-oscilloscope').register('openmusic-oscilloscope');

//
var ac = new AudioContext();
var pompompom = require('./pompompom/pompompom');
var p3 = new pompompom(ac);
var MIDIUtils = require('midiutils');

var osc = p3.createOscillator();
var oscPlaying = false;

var analyser = ac.createAnalyser();
var oscilloscope = document.querySelector('openmusic-oscilloscope');
oscilloscope.attachTo(analyser);

osc.connect(analyser);
analyser.connect(ac.destination);

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

setInterval(function() {

	osc.frequency.setValueAtTime(220 + 880 * Math.random(), ac.currentTime);

}, 100);

// ------- scheduling notes

var notesOsc = p3.createOscillator();
var analyserNotes = ac.createAnalyser();
notesOsc.connect(analyserNotes);
analyserNotes.connect(ac.destination);
var btnSchedule = document.getElementById('schedulenotes');
var notesTxt = document.querySelector('textarea');

btnSchedule.addEventListener('click', scheduleNotes);

function scheduleNotes() {
	var txt = notesTxt.value;
	var noteNames = txt.split(',');
	var offset = 0;
	var noteLength = 0.2; // in seconds
	var now = ac.currentTime;

	notesOsc.stop(now);
	notesOsc.cancelScheduledEvents(now);

	noteNames.forEach(function(name) {
		var noteNumber = MIDIUtils.noteNameToNoteNumber(name);
		var freq = MIDIUtils.noteNumberToFrequency(noteNumber);
		notesOsc.frequency.setValueAtTime(freq, now + offset);
		offset += noteLength;
	});

	notesOsc.start(now);
}

