var alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");

playfair = {};

playfair.directions = {
    row: "row",
    column: "column",
    none: "none"
};

playfair.getDirection = function(matrix, ltr1, ltr2) {
    var pos1 = playfair.findInMatrix(matrix, ltr1);
    var pos2 = playfair.findInMatrix(matrix, ltr2);

    if (!pos1 || !pos2) {
        return null;
    }

    if (pos1.x == pos2.x) {
        return playfair.directions.column;
    }

    if (pos1.y == pos2.y) {
        return playfair.directions.row;
    }

    return playfair.directions.none;
};

playfair.findInMatrix = function(matrix, letter) {
    var found = false;
    var result = null;

    matrix.forEach((val, ind, arr) => {
        val.forEach((ltr, index, array) => {
            if (ltr == letter) {
                found = true;
                result = {
                    x: index,
                    y: ind
                };
                return;
            }
        });

        if (found) {
            return;
        }
    });

    return result;
};

playfair.encrypt = function(key, data) {
    var result = "";

    var matrix = playfair.getMatrix(key);
    data = data.replace(/[^a-z]/gi, "").replace(/j/gi, "I");

    var dataSplit = data.match(/.{1,2}/g);
    dataSplit.forEach((value, index, array) => {
        if (value[0] == value[1]) { // duplicate
            value = value[0] + "X";
        } else if (value.length < 2) { // single
            value = value[0] + "X";
        }

        var direction = playfair.getDirection(matrix, value[0], value[1]);
        var pos1 = playfair.findInMatrix(matrix, value[0]);
        var pos2 = playfair.findInMatrix(matrix, value[1]);
        switch(direction) {
            case playfair.directions.row:
                var x1 = pos1.x + 1;
                var x2 = pos2.x + 1;

                if (x1 > 4) {
                    x1 = 0;
                }
                if (x2 > 4) {
                    x2 = 0;
                }

                result = result + matrix[pos1.y][x1] + matrix[pos2.y][x2];
                break;

            case playfair.directions.column:
                var y1 = pos1.y + 1;
                var y2 = pos2.y + 1;

                if (y1 > 4) {
                    y1 = 0;
                }
                if (y2 > 4) {
                    y2 = 0;
                }

                result = result + matrix[y1][pos1.x] + matrix[y2][pos2.x];
                break;

            case playfair.directions.none:
                result = result + matrix[pos1.y][pos2.x] + matrix[pos2.y][pos1.x]
                break;
        }
    });

    return result;
};

playfair.decrypt = function(key, data) {
    var result = "";

    var matrix = playfair.getMatrix(key);
    data = data.replace(/[^a-z]/gi, "").replace(/j/gi, "I");

    var dataSplit = data.match(/.{1,2}/g);
    dataSplit.forEach((value, index, array) => {
        if (value[0] == value[1]) { // duplicate
            value = value[0] + "X";
        } else if (value.length < 2) { // single
            value = value[0] + "X";
        }

        var direction = playfair.getDirection(matrix, value[0], value[1]);
        var pos1 = playfair.findInMatrix(matrix, value[0]);
        var pos2 = playfair.findInMatrix(matrix, value[1]);
        switch(direction) {
            case playfair.directions.row:
                var x1 = pos1.x - 1;
                var x2 = pos2.x - 1;

                if (x1 > 4) {
                    x1 = 0;
                }
                if (x2 > 4) {
                    x2 = 0;
                }

                if (x1 < 0) {
                    x1 = 4;
                }
                if (x2 < 0) {
                    x2 = 4;
                }

                var foundData = matrix[pos1.y][x1] + matrix[pos2.y][x2];
                if (foundData[1] === "X")
                    foundData = foundData[0];
                result = result + foundData;
                break;

            case playfair.directions.column:
                var y1 = pos1.y - 1;
                var y2 = pos2.y - 1;

                if (y1 > 4) {
                    y1 = 0;
                }
                if (y2 > 4) {
                    y2 = 0;
                }

                if (y1 < 0) {
                    y1 = 4;
                }
                if (y2 < 0) {
                    y2 = 4;
                }

                var foundData = matrix[y1][pos1.x] + matrix[y2][pos2.x];
                if (foundData[1] === "X")
                    foundData = foundData[0];
                result = result + foundData;
                break;

            case playfair.directions.none:
                var foundData = matrix[pos1.y][pos2.x] + matrix[pos2.y][pos1.x]
                if (foundData[1] === "X")
                    foundData = foundData[0];
                result = result + foundData;
                break;
        }
    });

    return result;
}

playfair.getMatrix = function(key) {
    key = key.toUpperCase();
    key = key.replace(/[^a-z]/gi, "").replace(/[j]/gi, "I");
    var globalMatrix = [];
    var matrix = [[]];
    var currentIndex = 0;

    key.split("").forEach((letter) => {
        if (!globalMatrix.includes(letter)) {
            matrix[currentIndex].push(letter);
            globalMatrix.push(letter);
            if (matrix[currentIndex].length == 5) {
                currentIndex++;
                matrix.push([]);
            }
        }
    });

    alphabet.forEach((letter) => {
        if (!globalMatrix.includes(letter)) {
            matrix[currentIndex].push(letter);
            globalMatrix.push(letter);
            if (matrix[currentIndex].length == 5) {
                currentIndex++;
                matrix.push([]);
            }
        }
    });

    matrix.pop(); // remove empty array on end

    return matrix;
};
