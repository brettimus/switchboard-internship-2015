var World = require("./world"),
    LifelikeWorld = require("./lifelike-world"),
    Wall = require("./wall"),
    BouncingCritter = require("./critters").BouncingCritter,
    Plant = require("./critters").Plant,
    PlantEater = require("./critters").PlantEater;

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

var world = new World(plan,
                        {"#": Wall,
                         "o": BouncingCritter});


// console.log(world);
// var numTurns = 5;
// while (numTurns--) {
//     world.turn();
//     console.log(world.toString());
// }


var valley = new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

numTurns = 500;
while (numTurns--) {
    valley.turn();
    if ((numTurns+1) % 50 === 0) console.log(valley.toString());
}