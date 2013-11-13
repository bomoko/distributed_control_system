/**
* @file subsumption.js
* @author Blaize Kaye
* This will set up a subsumption architecture like agent that will interact with its environment, specifically, making a choice between two options
*/

var subsumption_agent = function() {

    var that = this;
    this.episilon = 2; //how many degrees do we need to get in to between 
    
    this.run = function() {
            //this.layer_5_run();
            this.layer_4_run();
            this.layer_3_run();
            this.layer_2_run();
            this.layer_1_run();
            this.layer_0_run();
    };
    
    //layer 0
    this.layer_0_override = false; //if this is true - layer 0 will not run (used to connect other layers)
    this.layer_0_run = function() {
            if(this.layer_0_override == false) { //we can run
                console.log('layer 0 running');
            }
        };
    //layer 1
    this.layer_1_override = false; //if this is true - layer 0 will not run (used to connect other layers)
    this.layer_1_run = function() {
            if(this.layer_1_override == false) { //we can run
                console.log('layer 1 running');
            }
        };
    //layer 2
    this.layer_2_override = false; //if this is true - layer 0 will not run (used to connect other layers)
    this.layer_2_run = function() {
            if(this.layer_2_override == false) { //we can run
                console.log('layer 2 running');
            }
        };
    //layer 3
    this.layer_3_override = false; //if this is true - layer 0 will not run (used to connect other layers)
    this.layer_3_run = function() {
            if(this.layer_3_override == false) { //we look for the most red apples :)
            console.log('layer 3 running');
            //find the angle between us and the most red apples - false if there isn't any
            var angle = false;
            var max_green = 0;
            var angle_between = 0;
            //I would DRY this code out ordinarily, but these are supposed to be separate sensors - so I'm making every layer do it's own thing
            var choices = that.environment.get_choices();    
            choices.forEach(function(item, index,choice_array){
                console.log(item);
                if(item.green > max_green){
                    max_green = item.green;
                    var angle = processingInstance.atan2(item.y - sprite_lib.agent_y, item.x - sprite_lib.agent_x );
                    var angle = angle * (180/processingInstance.PI);
                    console.log("angle between =" + angle);
                    angle_between = sprite_lib.get_agent_direction() - angle;
                } 
            });
            console.log("MAX GREEN : " + max_green);
            console.log("real angle between = " + angle_between);
            //here we disable other layers if there are red apples
            if(max_green > 0) {
                that.layer_2_override = true;
                
                //here we connect up to the action - we get our 
                if(angle_between > that.epsilon || angle_between < -1*that.episilon) {
                    sprite_lib.agent_move_clockwise();
                } else { //we can enable any other layers that we might have switched off
                
                }
                
            }else { //switch 'em back on
                that.layer_2_override = false;
            }
               
                
            }
        };
    //layer 4
    this.layer_4_override = false, 
    this.layer_4_run = function() {
        if(this.layer_4_override == false) { //we look for the most red apples :)
            console.log('layer 4 running');
            //find the angle between us and the most red apples - false if there isn't any
            var angle = false;
            var max_red = 0;
            var angle_between = 0;
            //I would DRY this code out ordinarily, but these are supposed to be separate sensors - so I'm making every layer do it's own thing
            var choices = that.environment.get_choices();    
            choices.forEach(function(item, index,choice_array){
                console.log(item);
                if(item.red > max_red){
                    max_red = item.red;
                    var angle = processingInstance.atan2(item.y - sprite_lib.agent_y, item.x - sprite_lib.agent_x );
                    var angle = angle * (180/processingInstance.PI);
                    console.log("angle between =" + angle);
                    angle_between = sprite_lib.get_agent_direction() - angle;
                    console.log("real angle between = " + angle_between);
                }
                
                //here we disable other layers if there are red apples
                if(max_red > 0) {
                    that.layer_3_override = true;
                    
                    //here we connect up to the action - we get our 
                    if(angle_between > that.epsilon || angle_between < -1*that.episilon) {
                        sprite_lib.agent_move_clockwise();
                    } else { //we can enable any other layers that we might have switched off
                    
                    }
                    
                }else { //switch 'em back on
                    that.layer_3_override = false;
                }
                
               
                
            });
                
            }
    };
    return this;

};