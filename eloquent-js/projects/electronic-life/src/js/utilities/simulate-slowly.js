var Promise = require("es6-promise").Promise;

module.exports = simulateSlowly;

function simulateSlowly(world, options) {

    var config = {
            /**
             * @property {number} simulations - The number of times we should call World#turn 
             * @property {number} wait - The amount of time (in ms) to wait between printing World.toString();
             */
          simulations: 100,
          wait: 2000,
        },
        simulationPromise;
    extend2(config, options);

    simulationPromise = new Promise(simulation);
    simulationPromise.then(success, failure);

    function simulation(resolve, reject) {
        var count = 1;
        setInterval(function() {
            simulate(count, resolve, reject);
            count++;
        }, config.wait);
    }

    function simulate(count, resolve, reject) {
        var message,
            simError;
        if (count > config.simulations) {
              resolve(">>> Simulation complete!");
        }
        else {
            try {
                console.log(world.toString());
                world.turn();
            } catch (err) {
                message = "Simulation failed on turn number " + count + ".";
                simError = new SimulationError(err, message);
                reject();
            }
        }
    }
}


function success(message) {
    console.log(message);
}

function failure(err) {
    console.log("Simulation failure. Here's the error: ", err);
}

function extend2(destination, source) {
    // Use Object.assign if our environment allows it.
    if (Object.assign) {
        return Object.assign(destination, source);
    }
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}

/**
 * @constructor
 * @extends Error
 * @param {Error} err - Original error
 * @param {String} message - New message
 */
function SimulationError(err, message) {
    this.message = message + "\n Original Error message: " + err.message + "\n";
    this.stack = err.stack;
}
SimulationError.prototype = Object.create(Error.prototype);
SimulationError.prototype.name = "SimulationError";