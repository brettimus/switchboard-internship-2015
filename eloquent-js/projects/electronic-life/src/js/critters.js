/** @module critters */
module.exports = {
    BouncingCritter: BouncingCritter,
    WallFollower: WallFollower,
    Plant: Plant,
    PlantEater: PlantEater,
    SmarterPlantEater: SmarterPlantEater,
};

var randomElement = require("./utilities").randomElement,
    directionNames = require("./directions").names,
    dirPlus = require("./directions").dirPlus;


/**
 * A Critter takes an action on each World#turn.
 * @interface Critter
 */
function Critter() {}

/**
 * An action to take on a turn of World.
 * @abstract
 */
Critter.prototype.act = function(view) {
    throw new Error("act must be implemented by subclass");
};

/**
 * A Critter who "follows its nose" 
 * (i.e., keeps moving in the same direction) 
 * until it hits a barrier, 
 * upon which it bounces off in a random open direction.
 * @constructor
 * @implements Critter
 * @property {string} direction - The current direction...? 
 */
function BouncingCritter() {
    Critter.call(this);
    this.direction = randomElement(directionNames);
}
BouncingCritter.prototype = Object.create(Critter.prototype);

/**
 * If the BouncingCritter has no open space around it,
 * BouncingCritter.direction is assigned "s".
 * @method
 * @param {View} view
 */
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) !== " ") {
        this.direction = view.find(" ") || "s"; // prevents having direction of `null`
    }
    return {type: "move", direction: this.direction};
};


/**
 * A Critter who requires its left side be adjacent to a Wall.
 * @constructor
 * @implements Critter
 * @property {string} direction
 */
function WallFollower() {
    Critter.call(this);
    this.dir = "s";
}
WallFollower.prototype = Object.create(Critter.prototype);

/**
 * @method
 * @param {View} view
 */
WallFollower.prototype.act = function(view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) !== " ") {
        start = this.dir = dirPlus(this.dir, -2);
    }
    while (view.look(this.dir) !== " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir === start) break;
    }
    return {type: "move", direction: this.dir};
};


/** 
 * @constructor
 * @implements Critter
 * @property {number} energy
 */
function Plant() {
    Critter.call(this);
    this.energy = 3 + Math.random()*4;
}
Plant.prototype = Object.create(Critter.prototype);

/**
 * A Plant can either grow or reproduce during its turn.
 * @method
 * @param {View} context
 */
Plant.prototype.act = function(context) {
    var space;
    if (this.energy > 15) {
        space = context.find(" ");
        if (space) {
            return {type: "reproduce", direction: space};
        }
    }
    if (this.energy < 20) {
        return {type: "grow"};
    }

};


/** 
 * @constructor
 * @implements Critter
 * @property {number} energy
 */
function PlantEater() {
    Critter.call(this);
    this.energy = 20;
}
PlantEater.prototype = Object.create(Critter.prototype);

/**
 * A PlantEater can either reproduce, eat, or move during its turn.
 * @method
 * @param {View} context - The surroundings of a PlantEater?
 */
PlantEater.prototype.act = function(context) {
    var space = context.find(" "),
        plant;
    if (this.energy > 60 && space) {
        return {type: "reproduce", direction: space};
    }
    plant = context.find("*");
    if (plant) {
        return {type: "eat", direction: plant};
    }
    if (space) {
        return {type: "move", direciton: space};
    }
};


/** 
 * @constructor
 * @implements Critter
 * @property {number} energy
 */
function SmarterPlantEater() {
    Critter.call(this);
    this.energy = 20;
}
SmarterPlantEater.prototype = Object.create(Critter.prototype);

/**
 * A SmarterPlantEater can either reproduce, eat, or move during its turn. 
 * Unlike a PlantEater, its movements are not entirely random. 
 * @method
 * @param {View} context
 */
SmarterPlantEater.prototype.act = function(context) {
    var plant = context.find("*"),
        spaceNearPlant,
        space;

    if (plant) {
        return {type: "eat", direction: plant};
    }

    spaceNearPlant = context.findNearby("*");
    if (spaceNearPlant) {
        return {type: "move", direction: spaceNearPlant};
    }

    space = context.find(" ");
    if (this.energy > 60 && space) {
        return {type: "reproduce", direction: space};
    }

    if (space) {
        return {type: "move", direciton: space};
    }
};