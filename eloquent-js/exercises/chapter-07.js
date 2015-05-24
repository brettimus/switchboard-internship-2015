// Eloquent JavaScript
// Chapter 7 Exercises
// boots

// Artificial Stupidity (open-ended)

// I created a plant-eating critter with better sight (SmarterPlantEater). 
// A SmarterPlantEater can "look" within a two cell radius for plants (instead of 1), 
// and if a nearby plant is found, it will move in the direction of a cell that's closer to plants.
//
// First, I modified the View prototype to include a `findNearPlant` method.
/**
 * Looks for empty squares adjacent to a particular kind of square.
 * @method
 * @param {string} ch - The type of square we're looking for.
 * @return {string} direction - The direction of an empty space adjacent to square with value `ch`.
 */
View.prototype.findNearby = function(ch) {
    var found;
    // Find all spaces into which we could move
    found = this.findAll(" ").filter(function(dir) {
        // Calculate the position of the open space
        // Create a new view based off of said position
        var foundPosition = this.vector.plus(directions[dir]),
            foundView = new View(this.world, foundPosition);

        // If the new position is adjacent to a `ch`, return true
        return !isNully(foundView.find(ch));
    }.bind(this));
    
    if (found.length === 0) return null;
    return randomElement(found);
};

// Then, I created a SmarterPlantEater
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

// Note that there is a lot of repeated work here, especially when it comes to finding empty space.
// Could we consider caching searches and then clearing them after act is done?

// There is a possible issue with my new View method.
// To that end, ask youreslf:
// * What knowledge has been added to the View prototype that wasn't there before?
// * Where could this knowledge be otherwise stored?


// Predators
