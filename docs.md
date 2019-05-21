# KTaNE Solver docs

Here is some documentation on how to create modules for KTaNE Solver. If you need any help just ask on the discord server.

### Module Info

Add a JSON line to `meta.json` to give some information about the module.<br>
Update the version number each time you make changes to the module or it won't update from within the app.

```
{"name":" <module name> ","id":" <name of the module's script without .js> ","alias":[ <array of command names> ],"help": <a description of the command> ,"version": <an integer for the version> }
```

### Arugments

Each command is sent with an array of arguments stored in a variable called `args` which can interpret anyway you like

### Bomb Info

There are various functions to access the bomb info. Here is a list of them all.

```
// Serial Number
bombinfo.serialnumber.whole // e.g. A12BT8
bombinfo.serialnumber.letters // e.g. ["A","B","T"]
bombinfo.serialnumber.numbers // e.g. [1,2,8] <-- The numbers are returned as integers
(/^[aeiou]$/i.test(bombinfo.serialnumber.whole)) // returns true if the serial number contains vowels

// Strikes
bombinfo.strikes // returns an integer

// Batteries
bombinfo.batteries.<battery name>  // an integer
bombinfo.batteries.holders // an integer
bombinfo.batteries.all // an integer
// valid battery names are "aa" and "d"

// Indicators
bombinfo.indicators.exists( <name> ); // returns boolean equivalent to is lit or unlit
bombinfo.indicators.isLit( <name> ); // returns boolean
bombinfo.indicators.isUnlit( <name> ); // returns boolean
bombinfo.indicators.getTotal(); // returns integer of total number of indicators
bombinfo.indicators.getLit(); // returns array of lit indicators
bombinfo.indicators.getUnlit(); // returns array of unlit indicators

// Ports
bombinfo.portplates // an array of portplates (see below for more info)
bombinfo.getPortsCount( <port name> ); // returns an integer of the number of ports
bombinfo.getPortsCount(); // returns an integer of the number of all the ports

// Module Counts
bombinfo.moduleCount.total // an integer of the total number of modules (including needies)
bombinfo.moduleCount.solved // an integer of solved modules
bombinfo.moduleCount.unsolved // an integer of unsolved modules (disincluding needies)
bombinfo.moduleCount.needy // an integer of the number of needies
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

**Portplates List**

This returns an array of KtanePortplate classes.

```
[
    KtanePortplate {getCount: <function>, getNames: <function>}
    KtanePortplate {getCount: <function>, getNames: <function>}
]
```

These methods can be used with the KtanePortplate class.

```
portplate.getCount( <port type> ); // get an integer of the number of this port
portplate.getCount(); // get an integer of the total number of ports
portplate.getNames(); // get the names of the ports on the plate
```

### Display

The display element is now sent in a variable helpfully called `displayElement`. HTML content can be added to it including lists and images.

```
displayElement.html( <content> );
displayElement.append( <add content to the end> );
displayElement.prepend( <add content to the start> );
```

### Other useful functions

```
ktaneNatoToLetter( <word> ); // returns the letter or null if it is an invalid word
ktaneLetterToNato( <letter> ); // returns the word or null if the input is invalid
ktaneWordToNumber( <word> ); // returns the number or null if it is an invalid word
```

### External Assets

All assets must be stored in the assets folder in a subfolder with the same name as the script file without the `.js`. The path to the modules assets is send in a variable called `assetsPath`.<br>
Some assets can be put in the global assets which will load all the time. A list of the current global assets and their description can be found below.

**Global Assets List**
* EasyStarJS - A* maze solving algorithm (https://easystarjs.com)
* Playfair - Encrypting/decrypting playfair ciphers
```
playfair.encrypt(key, data); // encrypts data using the key
playfair.decrypt(key, data); // decrypts data using the key
playfair.getMatrix(key); // gets a matrix for the playfair
```
* Caesar - Caesar ciphers
```
caesar.cipher(offset, data) // ciphers data by offset
```

### Speaking

Used to make the bot speak to the user.

```
ktaneSpeak(<text>);
```

### Global Storage

Storage data for your module for use when the next command is run.

```
globalStorage.get( <name> ); // returns data item or undefined
globalStorage.set( <name> , <data to save> ); // saves data item
```

### Testing

#### Windows

1. Make sure you have Python 3.7 installed
2. Run the `server_windows.cmd` file
3. Navigate to `http://localhost:8000/` in your browser
4. To test a single module head on over to `http://localhost:8000/single.html?testmodule=<module id>`
5. Running `server_windows.cmd` may just quickly flash up a window if so ask on the Discord server about adding Python to the environment variables

#### Linux

1. If your distribution doesn't install python 3.7 by default, install it with your preferred package manager
2. Run `./server_linux` from a terminal
3. Navigate to `http://localhost:8000/` in your browser
4. To test a single module head on over to `http://localhost:8000/single.html?testmodule=<module id>`
