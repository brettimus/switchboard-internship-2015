
# Cognitive Shortcuts: Models, Visualizations, Metaphors, and Other Lies
This was an excellent talk at Cascadia Ruby Conference 2014. You can watch the whole thing if you want, but the main takeaway I got was through the Pac-Man example. So, at least watch that 6 minute clip.

[Full talk.](https://youtu.be/35wXNdmcvIs)
[Pac-Man Pursuit Problem.](https://youtu.be/35wXNdmcvIs?t=20m51s) (roughly 21:00 to 27:00).


## PAC-MAN Ghost AI
There are several ways we could program teh Ghost AI.
### Random Direction
* Choose random direction.
* Follow until you hit a wall, then choose another random direction.
**CON** No challenge for the player.

### Minimize Linear Direction
* Compute linear paths to Pac-Man.
* Follow the shortest path.
**CON** Ghost can get stuck in corners or behind walls.
**CON** No challenge for the player.

### Minimize Topological Distance
* Compute all possible paths through the maze to Pac-Man.
* Reject paths that go through another ghost.
* Follow the shortest path.
**CON** Works fine for 1 ghost, but for multiple ghosts, leads to ghost-clumping.

### Smell
Give Pac-Man a “smell”, and model diffusion of that smell through the environment.

Let the tiles of the maze be containers of smell.

* Pac-Man gives tile a smell-value.
* That tile passes off a smaller smell-value to its neighbors, which happens resursively until you hit a wall.
* Walls have smell value of zero.
* Ghost climbs hill of resulting contour map.

So, how should Gosts move?
* Sample each adjacent floor tile.
* Move to tile with strongest smell.
* Ghosts cancel smell of the tile they are on.

## A Word I learned from this talk (totally random)
_denouement_

Pronounced all French-like. (day-noo-mah)

It means the climax in a series of events, like the point at which the plot comes together in a story.