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
bombinfo.batteries.<battery name>  // returns an integer
bombinfo.batteries.holders // returns an integer
bombinfo.batteries.all // returns an integer
// valid battery names are "aa" and "d"

// Indicators
bombinfo.indicators.exists( <name> ); // returns boolean equivalent to is lit or unlit
bombinfo.indicators.isLit( <name> ); // returns boolean
bombinfo.indicators.isUnlit( <name> ); // returns boolean

// Ports
bombinfo.portplates // returns an array of portplates (see below for more info)
bombinfo.ports.<port name> // returns an integer of the number of ports
bombinfo.ports.all // returns an integer
// valid port names are "parallel", "dvid", "stereorca", "ps2", "rj45" and "serial"
```

__**Portplates List**__

This returns an array (see below for example).<br>
This has 2 portplates one with a Serial, Stereo RCA and PS/2 the other with just a Parallel

```
[
    {serial:true,stereorca:true,ps2:true,parallel:false,dvid:false,rj45:false},
    {serial:false,stereorca:false,ps2:false,parallel:true,dvid:false,rj45:false}
]
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

All assets must be stored in the assets folder in a subfolder with the same name as the script file without the `.js`. The path to the modules assets is send in a variable called `assetsPath`.

### Speaking

Used to make the bot speak to the user.

```
ktaneSpeak(<text>);
```

### Testing

#### Windows

1. Make sure you have Python 3.7 installed
2. Run the `server_windows.cmd` file
3. Navigate to `http://localhost:8000/` in your browser
4. To test a single module head on over to `http://localhost:8000`

#### Linux

1. If your distribution doesn't install python 3.7 by default, install it with your preferred package manager
2. Run `./server_linux` from a terminal
3. Navigate to `http://localhost:8000/` in your browser
4. To test a single module head on over to `http://localhost:8000`
