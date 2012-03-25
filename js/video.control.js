/**
 *  TITLE   : Video Screen Test
 *  FILE    : video.control.js
 *  AUTHOR  : JAEYOON LEE (lee@jaeyoon.org)
 *  DATE    : 25th March 2012
 *  DESC    : Simple video scene contoller
 **/

// initial val
var STATUS = "INIT";
var VIDEO_WIDTH = 500; //window.innerWidth;
var VIDEO_HEIGHT;
var FPS = 1000;

// scene timeline val(sec)
var scene = [
    { id: "intro", start : 0.0, dotSize : 3 },
    { id: "one", start : 35.0, dotSize : 3 },
    { id: "two", start : 63.0, dotSize : 3 },
    { id: "three", start : 91.0, dotSize : 3 },
    { id: "four", start : 119.0, dotSize : 3 },
    { id: "five", start : 145.0, dotSize : 3 }
];

document.addEventListener('DOMContentLoaded', function() {
    // create video element
    var bg_video = document.createElement('video');
    bg_video.setAttribute('width', VIDEO_WIDTH);
    bg_video.setAttribute('id', 'bg_video');
    document.getElementById('main').appendChild(bg_video);

    // Video source control
    bg_video.src = "./res/Green_together.mp4"; 
    bg_video.type = "video/mp4";
    bg_video.control = "";
    
    var counter = 0;

    // To prevent race conditition for setting based on video tag val
    // adding an event listener to wait until video data is loaded    
    bg_video.addEventListener('loadeddata', function() {
        VIDEO_HEIGHT = VIDEO_WIDTH * bg_video.videoHeight / bg_video.videoWidth;
        
        // create canvas element
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', VIDEO_WIDTH);
        canvas.setAttribute('height', VIDEO_HEIGHT);
        canvas.setAttribute('id', 'canvas');
        document.getElementById('main').appendChild(canvas);
    
        // Grab the 2d canvas context
        context = canvas.getContext("2d");

        // main Loop
        var interval = setInterval(function() {loop(context);}, FPS);
    }, false);


    // video play button event listener
    var playButton = document.getElementById('play');
    playButton.addEventListener('click', function() {
        if(checkStatus("PAUSED")) {
            counter++;
            play();
        }
    }, false);
    
    var play = function() {
        bg_video.play();
        setStatus("PLAYING");
    }
    
    var pause = function() {
        bg_video.pause();
        setStatus("PAUSED");
    }
    
    var setStatus = function(status) {
        STATUS = status;
    }
    
    var checkStatus = function(status) {
        if (STATUS == status)
            return true;
        else
            return false;
    }

    var scenePause = function() {
        if (bg_video.currentTime > scene[counter+1].start) {
            pause();
        }
    }

    var drawTimeline = function(context) {  
        /*      
        context.save();
        context.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
        context.strokeStyle = "#ffffff";
        context.lineWidth = 1;
        context.arc(10,10,10,0,2*Math.PI,false);
        context.stroke();
        context.restore();
        */
        
        var x = bg_video.currentTime / bg_video.duration;

        context.save();
        context.fillStyle = "green";
        context.fillRect(0, 5, VIDEO_WIDTH, 3);
        context.fill();
        context.restore();

        context.save();
        context.fillStyle = "blue";
        context.fillRect(0, 0, x*VIDEO_WIDTH, 5);
        context.fill();
        context.restore();
    }
    
    var debug = function() {
        document.getElementsByTagName('p')[0].innerHTML = bg_video.currentTime;
        if (bg_video.currentTime > scene[counter].start && bg_video.currentTime < scene[counter+1].start) {
            document.getElementById(scene[counter].id).style.color = "green";  
        }
    }

    var loop = function(context) {
        switch (STATUS) {
            case "INIT":
                // start video
                play();
                break;
                
            case "PLAYING":
                // pause per each scene
                scenePause();
                break;
                
            case "PAUSE":
                break;
                
            default:
        }
        
        drawTimeline(context);
        debug();
    }
}, false);
