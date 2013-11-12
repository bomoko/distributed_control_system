This code is meant to simulate one of two agents with different kinds of internal architectures for choice, but which 

The first is an agent that is controlled centrally using a utility function to determine it's best move - all options are pumped through the utility function and a plan of action is determined from there.

The second has a distributed control system - implementing a riff off the subsumption architecture.

It has several layers.
Layer 0 - simply moves the robot forward. It is enabled by default.
Layer 1 - Senses if there is a reward in front and if there is not, it inhibits layer 0
Layer 2 - represents what, on a real robot, would be a 360 degree sensor which drives the robot left until it is facing the "most red" - inhibits layers 0 and 1
Layer 3 - represents what, on a real robot, would be a 360 degree sensor which drives the robot right until it is facing the "most green" inhibits layers 0,1, and 2
Layer 4 - inhibits layer 2 iff there are any green rewards. 
