# Distributed control system

This code is meant to simulate an agent with a particular internal architecture for choice.

This code sucks, but I'm keeping it around because it's one of the earliest artefacts in the work that lead to my paper (with David Spurrett) on Robot control systems, [Robots in Casinos](http://www.tandfonline.com/doi/abs/10.1080/02580136.2016.1209931).

The choice architecture is a distributed control system - implementing a riff off the subsumption architecture.

It has several layers.

Layer 0 - simply moves the robot forward. It is enabled by default.

Layer 1 - Senses if there is a reward in front and if there is not, it inhibits layer 0, 

Layer 2 - represents what, on a real robot, would be a 360 degree sensor which drives the robot left until it is facing the "most green" - inhibits layers 0 and 1

Layer 3 - represents what, on a real robot, would be a 360 degree sensor which drives the robot right until it is facing the "most red" inhibits layers 0,1, and 2

Layer 4 - inhibits layer 2 iff there are any green rewards. 
