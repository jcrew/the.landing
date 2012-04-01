/**
 *  TITLE   : HTML5 video timeline
 *  FILE    : timeline.js
 *  AUTHOR  : JAEYOON LEE (lee@jaeyoon.org)
 *  DATE    : 30th March 2012
 *  VERSION : 0.1
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
}

timeline.prototype.init = function(src, type, scene, color) {
    this.videoWidth = 500; //window.innerWidth;
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
    this.setPlayButton();
}

timeline.prototype.start = function() {
    var that = this;
    
    // After video is loaded, get/set video height,
    // and create canvas based on video w/h
    this.video.addEventListener('loadeddata', function() {
        that.setVideoHeight();
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

timeline.prototype.setVideoHeight = function() {
     this.videoHeight = this.videoWidth * this.video.videoHeight / this.video.videoWidth;
     console.log(this.videoHeight);
}

timeline.prototype.play = function() {
    this.video.play();
    this.setStatus("PLAYING");
}
    
timeline.prototype.pause = function() {
    this.video.pause();
    this.setStatus("STOPPED");
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
    if (this.video.currentTime > this.scene[this.counter+1].start) {
        this.pause();
    }
}

timeline.prototype.setPlayButton = function() {
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
    this.debug(context);
}

timeline.prototype.loop = function() {
    this.draw(this.context);
    this.test();
    
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
            this.setPlayButton();
            break; 
        default:
    }
}

timeline.prototype.debug = function(context) {
    context.fillStyle = "#74DFF1";
    context.font = "24px normal sans-serif";
    var videoTime = this.video.currentTime.toString().substr(0, 6);
    //videoTime.toString();
    //videoTime = videoTime.substr(0,5);
    context.fillText(videoTime, 20, 20);
}

timeline.prototype.test = function() {
    if (this.video.currentTime > this.scene[this.counter].start && this.video.currentTime < this.scene[this.counter+1].start) {
        document.getElementById(this.scene[this.counter].id).style.color = "green";
    }
}
