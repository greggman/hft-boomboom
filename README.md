BoomBoom
========

This is a sample game for the [HappyFunTimes party games system](http://greggman.github.io/HappyFunTimes).

<img src="screenshot.png" />

It's an arena bombing game. One thing it shows over other games is round based control. Players
joining the game have to wait for the current round to finish before they are added.

Cloning
-------

Prerequisites

*   node.js http://nodejs.org
*   bower http://bower.io
*   happyfuntimes http://greggman.github.io/HappyFunTimes
*   hft-cli http://github.com/greggman/hft-cli

If you clone this you'll need follow the following steps

1.  install happyfuntimes http://greggman.github.io/HappyFunTimes
2.  install hft-cli by typing `sudo npm install -g hft-cli`
3.  clone this repo
4.  After cloning cd to the folder you just cloned into and type `bower install`
5.  edit `package.json` and change the `gameId` to some other id.
6.  type `hft add` which will add this to happyFunTimes.

Non-Demo
--------

Since the whole point is to play with 10-30 people on phones this isn't really a demo
but you can see it with 1 player here. Use the arrow keys to steer and 'z' to drop a bomb.
When you're dead you'll control a player outside the arena. When dead press 'z' to throw a bomb, hold
'z' to keep it bouncing.

[For non-demo click here](http://greggman.github.io/hft-boomboom/local.html?settings=%7BhaveServer:false,numLocalPlayers:400,ai:true,waitForPlayersDuration:2,waitForStartDuration:2,bombStartSize:10,showFPS:true,showGithub:true%7D)


