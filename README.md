# ktane-solver

A robot to help you solve bombs in Keep Talking and Nobody Explodes by being and expert, and it is available in your browser so you can have it open on your phone.
<br>
[Go here for the actual app](https://mrmelon54.github.io/ktane-solver/app.html)
<br>
[Go here for the developer documentation](https://mrmelon54.github.io/ktane-solver/docs.html)
<br>
[Discord server](https://discord.gg/usbmdrJ)

### Edgework Commands
```
serial number <combination of numbers and letters of length 6>
battery/batteries <aa/d> <number>
on/lit indicator <nato letters or the letters for the indicators name>
off/unlit indicator <nato letters or the letters for the indicators name>
remove indicator
serial number <nato letters or numbers>
port/portplate <port names see below>
remove port/portplate
total modules <number> // this includes needy modules
solved modules <number>
needy modules <number>
```

The port command adds a whole portplate with those ports on it (see example below).<br>
The remove port command removes a whole portplate.

This adds 2 portplates one with a Serial, Stereo RCA and PS/2 the other with just a Parallel.
```
port serial stereo ps2
port parallel
```

**Port Types**
* parallel
* dvid
* stereorca
* serial
* rj45
* ps2
* ac
* componentvideo
* hdmi
* compositevideo
* vga
* usb
* pcmcia

### Help Command
```
help <module alias>
```

### Stop Command

Instantly stop the bot from speaking.<br>
Disclaimer: ~~this works best with headphones~~

```
stop
```
