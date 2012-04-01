/**
 *  TITLE   : HTML5 video timeline
 *  FILE    : main.js
 *  AUTHOR  : JAEYOON LEE (lee@jaeyoon.org)
 *  DATE    : 30th March 2012
 *  VERSION : 0.1
 *  DESC    : Main() that calls timeline object
 **/

document.addEventListener('DOMContentLoaded', function(){
    var landing = new timeline();
        
    var scene = [
        { id: "intro", start : 0.0, dotSize : 3 },
        { id: "one", start : 35.0, dotSize : 3 },
        { id: "two", start : 63.0, dotSize : 3 },
        { id: "three", start : 91.0, dotSize : 3 },
        { id: "four", start : 119.0, dotSize : 3 },
        { id: "five", start : 145.0, dotSize : 3 }
    ];
    
    var color = {
        box : "rgba(255, 255, 255, 0.3)",
        bar : "rgba(255, 255, 255, 0.70)",
        timeline : "red"
    };

    landing.init("./res/Green_together.mp4", "video/mp4", scene, color);
    landing.start();    
}, false);