var simulateSlowly = require("./utilities").simulateSlowly;

var World = require("./world"),
    LifelikeWorld = require("./lifelike-world"),
    Wall = require("./wall"),
    BouncingCritter = require("./critters").BouncingCritter,
    Plant = require("./critters").Plant,
    PlantEater = require("./critters").PlantEater,
    SmarterPlantEater = require("./critters").SmarterPlantEater,
    Predator = require("./critters").Predator;

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

// numTurns = 500;
// while (numTurns--) {
//     valley.turn();
//     if ((numTurns+1) % 50 === 0) console.log(valley.toString());
// }


var sadValley = new LifelikeWorld(
  ["############################",
   "#####     X           ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**  X  #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "X": Predator,
   "O": SmarterPlantEater,
   "*": Plant}
);

// numTurns = 500;
// while (numTurns--) {
//     sadValley.turn();
//     if ((numTurns+1) % 50 === 0) console.log(sadValley.toString());
// }

simulateSlowly(sadValley);

