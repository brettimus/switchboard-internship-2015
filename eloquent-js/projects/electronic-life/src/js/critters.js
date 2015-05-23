/** @module critters */
module.exports = {
    BouncingCritter: BouncingCritter,
    WallFollower: WallFollower,
    Plant: Plant,
    PlantEater: PlantEater,
};

var randomElement = require("./utilities").randomElement,
    directionNames = require("./directions").names,
    dirPlus = require("./directions").dirPlus;


/**
 * @constructor
 * @property {string} direction - The current direction...? 
 */
function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

/**
 * @method act
 * @this BouncingCritter
 * @param {View} view
 */
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) !== " ") {
        this.direction = view.find(" ") || "s"; // goes south if no space found?
    }
    return {type: "move", direction: this.direction};
};


/** 
 * @constructor
 *
 */
function WallFollower() {
    this.dir = "s";
}

/**
 * @method act
 * @this WallFollower
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
 * @property {number} energy
 */
function Plant() {
    this.energy = 3 + Math.random()*4;
}

/**
 * @method act
 * @this Plant
 * @param {object} context
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
 * @property {number} energy
 */
function PlantEater() {
    this.energy = 20;
}

/**
 * @method act
 * @this PlantEater
 * @param {object} context
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

