# pompompom

> yet another twist at the same idea. hopefully this time I'll get it right.

## getting it

### clone it

`git clone https://github.com/sole/pompompom.git`

### or download

[the zip](https://github.com/sole/pompompom/archive/master.zip)

## initialising

Install node.js if not installed yet, then cd to the directory and run `npm init`.

To build the files into the `build` folder just do `npm start`. This will start a gulp script and it will watch for changes in the src folder and rebuild. Open `build/index.html` to see your thing in action, or better yet serve it with a local server.

## things to do or explore

- cancelScheduledEvents in nodes

oscillator
- exposing values as audioparams
- how to schedule them all in the future? even if the node gets destroyed (perhaps with the thing below)
- note as AudioParam?
- all as AudioParam (therefore accurate scheduling!)
