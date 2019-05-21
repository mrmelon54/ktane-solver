caesar = {};
caesar.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

caesar.cipher = function(key, data) {
    key = key % 26;
    var result = "";
    data.split("").forEach((letter) => {
        var ind = caesar.alphabet.indexOf(letter.toLowerCase());
        ind += key;
        ind = ind % 26;

        if (ind < 0) ind = 26 + ind;

        result += caesar.alphabet[ind];
    });
    return result;
}