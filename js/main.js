/**
 *  TITLE   : HTML5 video timeline example
 *  FILE    : main.js
 *  AUTHOR  : JAEYOON LEE (lee@jaeyoon.org)
 *  DATE    : 30th March 2012
 *  VERSION : 0.2
 *  DESC    : Main() that calls timeline object
 **/

document.addEventListener('DOMContentLoaded', function(){
    var landing = new timeline();
        
    var scene = [
        { start : 0.0, dotSize : 3, dotX : 0, dotY : 0 },
        { start : 35.0, dotSize : 4, dotX : 0, dotY : 0 },
        { start : 63.0, dotSize : 3, dotX : 0, dotY : 0 },
        { start : 91.0, dotSize : 5, dotX : 0, dotY : 0 },
        { start : 119.0, dotSize : 3, dotX : 0, dotY : 0 },
        { start : 145.0, dotSize : 4, dotX : 0, dotY : 0 },
        { start : 192.0, dotSize : 3, dotX : 0, dotY : 0 }
    ];
    
    var color = {
        box     : "rgba(255, 255, 255, 0.2)",
        bar     : "rgb(255, 255, 255)",
        timeBar : "rgb(20, 20, 20)",
        font    : "rgb(255, 255, 255)", 
        dot     : "rgb(255, 255, 255)"
    };

    landing.init("./res/Green_together.mp4", "video/mp4", scene, color);
    landing.start();    
}, false);