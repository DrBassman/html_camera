$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
// Grab elements, create settings, etc.
var video = document.getElementById('video');
var vf1 = document.getElementById('vf1');
var vf1_ctxt = vf1.getContext('2d');
// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
var canvas2 = document.getElementById('c2');
var c2 = canvas2.getContext('2d');
var initials_div = document.getElementById('initials_div');
var sv = document.getElementById('save');
var fileName = document.getElementById('fileName');
var vf_cell = document.getElementById('vf_cell');
var file_ext="jpg";
var file_desc="image/jpeg";
var cam_width=640;
var cam_height=480;
var save_width=(cam_height / 4) * 3;
var vf_left = (cam_width - save_width) / 2;
var vf_right = cam_width - vf_left;
//var notShown = document.getElementById('notShown');
//notShown.style.display = "none";
canvas.style.display = "none";
// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {width: cam_width, height: cam_height}}).then(function(stream) {
        video.srcObject = stream;
        video.play();
        vf1.style.height = cam_height;
        vf1.style.width = cam_width;
        vf1.height = cam_height;
        vf1.width = cam_width;
        vf1_ctxt.fillStyle = 'rgba(255, 255, 255, 0.50)';
        vf1_ctxt.fillRect(0, 0, vf_left, cam_height);
        vf1_ctxt.fillRect(vf_right, 0, vf_left, cam_height);
        video.width = cam_width;
        video.height = cam_height;
        canvas.width = cam_width;
        canvas.height = cam_height;
        canvas2.width = save_width;
        canvas2.height = cam_height;
        vf_cell.style.width = cam_width;
        vf_cell.style.height = cam_height;
        document.getElementById("snap").style.display="";
        document.getElementById("camUI").style.display="";
        document.getElementById("snap").focus();
    })
    .catch(function(err) {
        document.getElementById("errorMsg").style.display = "";
        document.getElementById("errorMsg").innerHTML = "<h2>Error!</h2> <br>Could not connect to webcam. {" + err + "}";
    });
}

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
    // Capture the image at a known resolution...
    // This routine scales the ENTIRE frame at requested resolution
    // Thus if aspect ratio is not 4:3, then image gets distorted!
    context.drawImage(video, 0, 0, cam_width, cam_height);
    // Crop the image to desired resolution from above...
    // This routine DOES NOT scale, it just crops, so no distortion!!!
    c2.drawImage(canvas, ((cam_width - save_width) / 2), 0, save_width, cam_height, 0, 0, save_width, cam_height);
    initials_div.style.visibility = "visible";
    document.getElementById('initials').focus();
});

// Download the image...
download_img = function(el) {
    var dt = new Date();
    var yr = (dt.getFullYear() * 10000) + ((dt.getMonth() + 1) * 100) + dt.getDate();
    var initials = document.getElementById('initials');
    el.download = save_as();
    var imageURI = canvas2.toDataURL(file_desc);
    el.href = imageURI;
    document.getElementById("fileSaved").style.display="";
};

// Show the Save As link...
show_save = function(el) {
    var dt = new Date();
    var yr = (dt.getFullYear() * 10000) + ((dt.getMonth() + 1) * 100) + dt.getDate();
    sv.style.display = "";
    fileName.style.display = "";
    fileName.innerHTML = "File to be saved as \"" + save_as() + "\"";
    // Disconnect the callback...
};

function save_as() {
    var dt = new Date();
    var yr = (dt.getFullYear() * 10000) + ((dt.getMonth() + 1) * 100) + dt.getDate();
    var initials = document.getElementById('initials');
    return (yr + "-patPhoto-" + initials.value + "." + file_ext);
}