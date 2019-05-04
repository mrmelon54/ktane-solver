if (args.length !== 5) {
    ktaneSpeak("Not enough arguments");
    return;
}
if (args[1] !== "player" || args[3] !== "target") {
    ktaneSpeak("Check the arguments are in the right order");
    return;
}

var maps = [
    [
        "#############",
        "#     #     #",
        "# ### # #####",
        "#@#   #     #",
        "# # ####### #",
        "# #   #    @#",
        "# ### # ### #",
        "# #     #   #",
        "# ######### #",
        "#     #   # #",
        "# ### # ### #",
        "#   #   #   #",
        "#############"
    ],
    [
        "#############",
        "#     #     #",
        "### ### # ###",
        "#   #   #@  #",
        "# ### ##### #",
        "# #   #     #",
        "# # ### ### #",
        "#  @#   # # #",
        "# ### ### # #",
        "# # # #   # #",
        "# # # # ### #",
        "# #   #     #",
        "#############"
    ],
    [
        "#############",
        "#     # #   #",
        "# ### # # # #",
        "# # # #   # #",
        "### # ##### #",
        "#   # #   # #",
        "# # # # # # #",
        "# # # #@# #@#",
        "# # # # # # #",
        "# #   # # # #",
        "# ##### # # #",
        "#       #   #",
        "#############"
    ],
    [
        "#############",
        "#@  #       #",
        "# # ####### #",
        "# # #       #",
        "# # # ##### #",
        "# #   #   # #",
        "# ##### ### #",
        "#@#         #",
        "# ######### #",
        "#         # #",
        "# ####### # #",
        "#     #   # #",
        "#############"
    ],
    [
        "#############",
        "#           #",
        "######### # #",
        "#         # #",
        "# ##### #####",
        "#   #   #@  #",
        "# # ##### # #",
        "# #     # # #",
        "# ##### ### #",
        "# #       # #",
        "# # ####### #",
        "# #    @    #",
        "#############"
    ],
    [
        "#############",
        "# #   #  @  #",
        "# # # ### # #",
        "# # # #   # #",
        "# # # # ### #",
        "#   # # #   #",
        "# ##### # ###",
        "#   #   # # #",
        "### # # # # #",
        "#   #@# #   #",
        "# ##### ### #",
        "#       #   #",
        "#############"
    ],
    [
        "#############",
        "#  @    #   #",
        "# ##### # # #",
        "# #   #   # #",
        "# # ####### #",
        "#   #   #   #",
        "##### ### ###",
        "#   #     # #",
        "# # # ##### #",
        "# # #     # #",
        "# ####### # #",
        "#  @        #",
        "#############"
    ],
    [
        "#############",
        "# #    @#   #",
        "# # ### # # #",
        "#     #   # #",
        "# ######### #",
        "# #       # #",
        "# # ##### # #",
        "# #  @#     #",
        "# ### #######",
        "# # #       #",
        "# # #########",
        "#           #",
        "#############"
    ],
    [
        "#############",
        "# #         #",
        "# # ##### # #",
        "# # #@  # # #",
        "# # # ### # #",
        "#     #   # #",
        "# ##### ### #",
        "# # #   #   #",
        "# # # ##### #",
        "#@# # #   # #",
        "# # # # # ###",
        "#   #   #   #",
        "#############"
    ]
];
var maps = maps.map(d => d.map(a => a.split("")));
console.log(maps);

var mazesTags = [16, 25, 46, 11, 45, 35, 22, 34, 13];

var id = parseInt(args[0]);
var player = parseInt(args[2]);
var target = parseInt(args[4]);
if (isNaN(id) || isNaN(player) || isNaN(target)) {
    ktaneSpeak("The ID, player position and target position must be integers");
    return;
}
if (!mazesTags.includes(id)) {
    ktaneSpeak(`Maze with id ${id} does not exist`);
    return;
}
var playerPos = {
    x: Math.floor(player / 10),
    y: player % 10
};
var targetPos = {
    x: Math.floor(target / 10),
    y: target % 10
};
if (playerPos.x < 1 || playerPos.x > 6 || playerPos.y < 1 || playerPos.y > 6) {
    ktaneSpeak("Player position does not exist");
    return;
}
if (targetPos.x < 1 || targetPos.x > 6 || targetPos.y < 1 || targetPos.y > 6) {
    ktaneSpeak("Target position does not exist");
    return;
}

var algorithm = new EasyStar.js();
algorithm.setGrid(maps[mazesTags.indexOf(id)]);
algorithm.setAcceptableTiles([" ", "@"]);
algorithm.findPath(playerPos.x * 2 - 1, playerPos.y * 2 - 1, targetPos.x * 2 - 1, targetPos.y * 2 - 1, d => {
    var lastPos = {};
    var p = [];
    for (var i = 0; i < d.length; i++) {
        if (i % 2 == 1) {
            p.push(d[i].x < lastPos.x ? "left" : d[i].x > lastPos.x ? "right" : d[i].y < lastPos.y ? "up" : "down");
        };
        lastPos = d[i];
    }
    ktaneSpeak(`The path is: ${p.join(", ")}`);
});
algorithm.calculate();
