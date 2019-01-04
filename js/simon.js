

var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION)
	}

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	}

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	}

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;

		this.onClick(this.key)
		this.play()
	}.bind(this)

	boxEl.addEventListener('mousedown', this.clickHandler);
}



function easyTaskEcho(){
		var currentTimeout = setTimeout(null,0);
		var playbackNotes = [];
		const timeOut = 2500; // 2500 in milliseconds, 2.5 seconds
		var notes = {};

	KEYS.forEach(function (key) {
		notes[key] = new NoteBox(key);
		setEventListener(key);
	});

	//Sets an listener for each box element that we have clicked on
	function setEventListener(key) {
		var box = document.getElementById(key);
		box.addEventListener('mousedown', function(){addToPlaybackBuffer(box.id)});
	}

	// clear the currentTimeout, append to playbackNotes buffer, and reset timer
  function addToPlaybackBuffer(key){
    clearTimeout(currentTimeout);
		// add to the playBackNotes buffer
    playbackNotes.push(notes[key]);
		// reset the timer
    currentTimeout = setTimeout(function(){playBuffer()}, timeOut);
  };

	// is called when timeOut is concluded
  function playBuffer(){
    playbackNotes.forEach(function(note, i){
      setTimeout(note.play.bind(null, note), i * NOTE_DURATION);
    });
		// reset the playbackNotes buffer by clearing.
		playbackNotes = [];
  };
}

easyTaskEcho();
