/**
* @file dcs_driver.js
* @author Blaize Kaye
*/
window.onload = function() { 

sprite_lib = (function() {
    this.agent_direction = 90; //in degrees
    this.agent_x = 320;
    this.agent_y = 240;
    var that = this;
    
    //will move the agent forward by one step in the direction it's pointing in
    this.agent_move_forward = function() {
        that.agent_x = that.agent_x - 1;
    };
    
    this.get_agent_direction = function() {
        return that.agent_direction;
    };
    
    this.agent_move_clockwise = function() {
        that.agent_direction = that.agent_direction + 1;
        if(that.agent_direction < 0) { that.agent_direction = that.agent_direction + 360}
        if(that.agent_direction > 360) { that.agent_direction = that.agent_direction - 360}
    };

    this.agent_move_counterclockwise = function() {
        that.agent_direction = that.agent_direction - 1;
        if(that.agent_direction < 0) { that.agent_direction = that.agent_direction + 360}
        if(that.agent_direction > 360) { that.agent_direction = that.agent_direction - 360}
    };

    
    return this;
}());



//we're using processing.js to render our scene - so here we set it up



function sketchProc(processing) {
    //overriding the setup function - get things the right size etc.
    processing.setup = function() {
        processing.size(640,480);
    
    };

    //override the draw function
    processing.draw = function() {
        
        //draw out the agent, in the direction it's facing.
        function draw_triangle(x,y,direction_degs) {
            processing.pushMatrix();
            processing.translate(x,y);
            processing.rotate(processing.radians(direction_degs + 180)); //we add the 180 because rotation is clockwise
            processing.triangle(-30, 30, 30, 0, -30, -30);
            processing.popMatrix();
        };

        //renders a choice
        function draw_choice(x,y) {
            //ellipseMode(CENTER);
            processing.pushMatrix();
            processing.translate(x,y);        
            processing.ellipse(0, 0, 55, 55);
            processing.popMatrix();
        }
        
        // erase background
        processing.background(224);
        
        draw_triangle(sprite_lib.agent_x,sprite_lib.agent_y,sprite_lib.agent_direction);
        environment.get_choices().forEach(function(element,index,array) {
            draw_choice(element.x,element.y);
        });
    
    
    };
};



environment = (function() {
    this.canvas_element = document.getElementById('dcs_display');
    this.canvas_context = this.canvas_element.getContext("2d");
    
    //these functions and variables are used with will set up two choices for the agents
    var choice_1 = null;
    var choice_2 = null;
    
    this.clear_choices = function() {
        choice_1 = null;
        choice_2 = null;
    };
    
    this.get_choice_1 = function() { return choice_1;};
    this.get_choice_2 = function() { return choice_2;};
    
    this.set_choice_1 = function(choice_obj) { choice_1 = choice_obj;};
    this.set_choice_2 = function(choice_obj) { choice_2 = choice_obj;};
    
    this.create_choice = function(x, y, no_green_apples, no_red_apples) {
        return {'x':x,'y':y,'green':no_green_apples,'red':no_red_apples};
    };
    
    //returns all choices in array
    this.get_choices = function() { return [choice_1,choice_2]; };
    
    //These functions are used to render and control the agent on screen
    
    return this;
}());

processingInstance = new Processing(document.getElementById('dcs_display'), sketchProc);

//set up basic choices
environment.set_choice_1(environment.create_choice(160,240,7,0));
environment.set_choice_2(environment.create_choice(480,240,9,0));
subagent = subsumption_agent();
};