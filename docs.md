# KTaNE Solver docs

Here is some documentation on how to create modules for KTaNE Solver. If you need any help just ask on the discord server.

### Module Info

A simple JSON string surrounded by `//$$` and `$$` to give some information about the module.

```
//$$ {"name":" <module name> ","alias":[ <array of command names> ],"help": <a description of the command> } $$
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
bombinfo.batteries.d  // returns an integer
bombinfo.batteries.aa  // returns an integer

// Indicators
bombinfo.indicators.exists( <name> ); // returns boolean equivalent to is lit or unlit
bombinfo.indicators.isLit( <name> ); // returns boolean
bombinfo.indicators.isUnlit( <name> ); // returns boolean

// Ports
bombinfo.portplates // returns an array of portplates
bombinfo.ports.<port name> // returns an integer of the number of ports
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
ktaneNatoToLetter( <text> ); // returns the letter or null if it is an invalid word
```

### Speaking

Used to make the bot speak to the user.

```
ktaneSpeak(<text>);
```

### Test Harness

Currently non-existent

### Rebuilding

Run the python file to rebuild the compressed version of all the modules stored in `ktaneModules.js`.<br>
This requires python and the requests library installed.<br>
Install python from [here](https://www.python.org/downloads/).<br>
Run this in a command line window in the python directory to install requests.<br>
```
python -m pip install requests
```
