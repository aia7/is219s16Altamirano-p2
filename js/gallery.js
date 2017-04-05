// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
var currentTime = new Date().getTime();
if (mLastFrameTime === 0) {
mLastFrameTime = currentTime;
}

if ((currentTime - mLastFrameTime) > mWaitTime) {
swapPhoto();
mLastFrameTime = currentTime;
}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/
function getQueryParams(qs) {//this is for the get section file.js
 qs = qs.split("+").join(" ");
 var params = {},
 tokens,
 re = /[?&]?([^=]+)=([^&]*)/g;
 while (tokens = re.exec(qs)) {
 params[decodeURIComponent(tokens[1])]
 = decodeURIComponent(tokens[2]);
 }
 return params;
}
var $_GET = getQueryParams(document.location.search);
console.log($_GET["json"]);




// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "images.json";
// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
// Holds the retrived JSON information
var mJson;
mRequest.onreadystatechange = function() {
// Do something interesting if file is opened successfully
if (mRequest.readyState == 4 && mRequest.status == 200) {
try {
// Let’s try and see if we can parse JSON
mJson = JSON.parse(mRequest.responseText);
console.log(mJson);
// Let’s print out the JSON; It will likely show as “obj”
//console.log(mJson);
} catch(err) {
console.log(err.message)
}
  }
  //2-3
for (var i =0;i< mJson.images.length;i++){
var newph= mJson.images[i];
mImages.push(new GalleryImage(newph.imglocation,newph.imgdescription,newph.date,newph.imgPath));
};
mRequest.open("GET",mUrl, true);
mRequest.send();



function swapPhoto() {


//Add code here to access the #slideShow element.
//Access the img element and replace its source
//with a new image from your images array which is loaded 
//from the JSON string
// try to use if and else statements
console.log('swap photo');
$('#photo').attr("src",mImages[0].imgPath);// this part you need to find a way to get the next photo
}

// Counter for the mImages array
var mCurrentIndex = 0;

// Array holding GalleryImage objects (see below).
var mImages = [];



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
return function(e) {
galleryImage.img = e.target;
mImages.push(galleryImage);
}
}

$(document).ready( function() {
// This initially hides the photos' metadata information
$('.details').eq(0).hide();

$('.moreIndicator').click(function(){
$('.details').eq(0).show();

$(this).removeClass("rot90");
$(this).addClass("rot270");
//$('.details').eq(0).show(); this shows the metadata under the image


})
});

window.addEventListener('load', function() {
console.log('window loaded');

}, false);

function GalleryImage(location,description,date,img) {
//implement me as an object to hold the following data about an image:
//1. location where photo was taken
//2. description of photo
//3. the date when the photo was taken
//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
    this.location=location;
this.description=description;
this.date=date;
this.img=img;
}