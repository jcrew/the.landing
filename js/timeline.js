/**
 *  TITLE   : HTML5 video timeline
 *  FILE    : timeline.js
 *  AUTHOR  : JAEYOON LEE (lee@jaeyoon.org)
 *  DATE    : 30th March 2012
 *  VERSION : 0.2
 *  DESC    : Simple video scene timeline contoller
 **/

function timeline() {
    this.context = null;
    this.canvasWidth = null;
    this.canvasHeight = null;
    this.status = null;
    this.fps = null;  
    this.video = null;  
    this.videoWidth = null;
    this.videoHeight = null;
    this.videoDuration = null;
    this.canvas = null;
    this.timelineHeightRatio = null;
    this.fps = null; 
    this.color = null;
    this.scene = null;
    this.src = null;
    this.type = null;
    this.counter = null;
    this.playButton = null;
    this.pauseButton = null;
    this.keyCode = null;
    this.startPosition = null;
    this.timelineLength = null;
}

timeline.prototype.init = function(src, type, scene, color) {
    this.videoWidth = window.innerWidth;
    this.videoHeight = 0;
    this.status = "INIT";
    this.timelineHeightRatio = 0.2;  
    this.fps = 300; 
    this.color = color;
    this.scene = scene;
    this.src = src;
    this.type = type;
    this.counter = 0;
    
    // init function calls
    this.initVideo();
}

timeline.prototype.start = function() {
    var that = this;
    
    // After video is loaded, get/set video height,
    // and create canvas based on video w/h
    this.video.addEventListener('loadeddata', function() {
        that.setVideoProps();
        that.initCanvas();
        var interval = setInterval(function() {that.loop();}, that.fps);
    }, false);
}

timeline.prototype.initVideo = function(src) {
    // create video element
    var video = document.createElement('video');
    video.setAttribute('width', this.videoWidth);
    video.setAttribute('id', 'bg_video');
    document.getElementById('main').appendChild(video);

    // Video source control
    video.src = this.src;
    video.type = this.type;
    video.control = "";
    
    // Grab video context
    this.video = video;
}

timeline.prototype.initCanvas = function() {
    var canvas;
        
    canvas = document.createElement('canvas');        
    canvas.setAttribute('width', this.videoWidth);
    canvas.setAttribute('height', this.videoHeight);
    canvas.setAttribute('id', 'canvas');
    document.querySelector('body').appendChild(canvas);
        
    this.canvas = canvas;
    
    // Grab the 2d canvas context
    this.context = this.canvas.getContext("2d");
}

timeline.prototype.setVideoProps = function() {
    this.videoHeight = this.videoWidth * this.video.videoHeight / this.video.videoWidth;
    this.videDuration = this.video.duration;
    
    this.startPosition = this.videoWidth * 0.1;
    this.timelineLength = this.videoWidth - (this.videoWidth * 0.2);
        
    for (var i=0; i<this.scene.length; i++) {
        
        this.scene[i].dotX = this.startPosition + (this.timelineLength * this.scene[i].start / this.video.duration);
        this.scene[i].dotY = this.videoHeight * 0.95;
    }
}

timeline.prototype.play = function() {
    this.video.play();
    this.setStatus("PLAYING");
}
    
timeline.prototype.pause = function() {
    this.video.pause();
    this.setStatus("PAUSE");
}
    
timeline.prototype.setStatus = function(status) {
    this.status = status;
}
    
timeline.prototype.checkStatus = function(status) {
    if (this.status == status)
        return true;
    else
        return false;
}

timeline.prototype.scenePause = function() {
    if (this.video.currentTime >= this.video.duration) {
        this.pause();
    }
    else {
        if (this.scene.length > this.counter) {
            if (this.video.currentTime > this.scene[this.counter+1].start) {
                this.pause();
            }
        }    
    }
}

timeline.prototype.loop = function() {
    this.draw(this.context);
    
    switch (this.status) {
        case "INIT":
            // start video
            this.play();
            break;
            
        case "PLAYING":
            // pause per each scene
            this.scenePause();
            break;
            
        case "PAUSE":
            this.setButton();
            break; 
        default:
    }
}

timeline.prototype.setButton = function() {
    var that = this;
    // video play button event listener
    this.playButton = document.getElementById('play');
    this.playButton.addEventListener('click', function() {
        if(that.checkStatus("PAUSE")) {
            that.counter++;
            that.play();
        }
    }, false);
}

timeline.prototype.draw = function(context) {
    context.save();
    context.clearRect(0, 0, this.videoWidth, this.videoHeight);
    context.restore();
    
    // Some nasty drawings for demo
    this.drawBox(context);
    this.drawTime(context);
    this.drawBar(context);
    this.drawDot(context);
}

timeline.prototype.drawBox = function(context) {
    context.fillStyle = this.color.box;
    context.fillRect(0, this.videoHeight * 0.9, this.videoWidth, this.videoHeight * 0.1);
}

timeline.prototype.drawBar = function(context) {
    var marginX = this.videoWidth * 0.1;
    var posX = marginX;
    var posY = this.videoHeight * 0.95;
    var w = this.videoWidth - (marginX* 2);
    var h = 2;
    context.fillStyle = this.color.bar;
    context.fillRect(marginX, posY, w, h);
    context.fillStyle = this.color.timeBar;
    context.fillRect(marginX, posY, w * this.video.currentTime / this.video.duration, h);
}

// TODO: Convert sec to hh:mm:ss format
//       Need to adjust font size based on videoWidth
timeline.prototype.drawTime = function(context) {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = this.color.font;
    context.font = "18px normal sans-serif";
    var videoTime = this.video.currentTime.toString().substr(0, 6);
    context.fillText(videoTime, this.videoWidth * 0.95, this.videoHeight * 0.95);
}

timeline.prototype.drawDot = function(context) {
    for (var i=0; i<this.scene.length; i++) {
        context.beginPath();
        if (this.video.currentTime > this.scene[i].start) {
            context.fillStyle = this.color.timeBar;
        }
        else {
            context.fillStyle = this.color.dot;
        }
        // centerX, centerY, radius, startingAngle, endingAngle, antiClockwise
        context.arc(this.scene[i].dotX, this.scene[i].dotY + 1, this.scene[i].dotSize, 0, 2*Math.PI, false);
        context.fill();  
        context.closePath();
    }
    context.restore();
}
