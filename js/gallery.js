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
    //swapPhoto();
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
$_GET["json"];







// Holds the retrived JSON information
var mJson;

var mURL = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
// Do something interesting if file is opened successfully
  if (mRequest.readyState == 4 && mRequest.status == 200) {
    try {
  // Let’s try and see if we can parse JSON
        mJson = JSON.parse(mRequest.responseText);
  // Let’s print out the JSON; It will likely show as “obj”
        // console.log(mJson);


      for(i=0;i<mJson.images.length;i++){
          mImages.push(new GalleryImage(mJson.images[i].imgLocation,mJson.images[i].description,mJson.images[i].date,mJson.images[i].imgPath));
      }
      // console.log(mImages);
      

    } 
    catch(err) {
      console.log(err.message)
    }
  }
};
mRequest.open("GET",mURL, true);
mRequest.send();


function swapPhoto() {

$('.details').eq(0).hide();
  if(mCurrentIndex==mImages.length){

  mCurrentIndex=0;

  } else if(mCurrentIndex==0){
    $('#photo').attr("src",mImages[mCurrentIndex].img);
    console.log("hello");
    console.log(mCurrentIndex);

    $('.details').eq(0).hide();
    $('.moreIndicator').click(function(){

    if($(this).hasClass('rot90')){
      $('.details').show();
      $(this).removeClass('rot90');
      $(this).addClass('rot270');
      $('span').remove();
     }
     else if ($(this).hasClass('rot270')){
        
        $('.details').hide();
        $(this).removeClass('rot270');
        // document.getElementsByClassName("details")[0].style.display="none";
        $(this).addClass('rot90');
        $('span').remove();
        console.log("turn");
        
     }
var loc = $('<span></span>').text(mImages[mCurrentIndex].location);
$('.location').append(loc);
var des = $('<span></span>').text(mImages[mCurrentIndex].description);
$('.description').append(des);
var dat = $('<span></span>').text(mImages[mCurrentIndex].date);
$('.date').append(dat);


   })



    mCurrentIndex++;
    }
  else {

  $('#photo').attr("src",mImages[mCurrentIndex].img);
  

$('.moreIndicator').click(function(){

    if($(this).hasClass('rot90')){
      $('.details').show();
      $(this).removeClass('rot90');
      $(this).addClass('rot270');
      $('span').remove();
    }
     else if ($(this).hasClass('rot270')){
        
        $('.details').hide();
        $(this).removeClass('rot270');
        // document.getElementsByClassName("details")[0].style.display="none";
        $(this).addClass('rot90');
        $('span').remove();
        console.log("turn");
        
      }
var loc = $('<span></span>').text(mImages[mCurrentIndex].location);
$('.location').append(loc);
var des = $('<span></span>').text(mImages[mCurrentIndex].description);
$('.description').append(des);
var dat = $('<span></span>').text(mImages[mCurrentIndex].date);
$('.date').append(dat);


})
  mCurrentIndex++;
   }

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

//$(document).ready( function() {
// This initially hides the photos' metadata information

// $('.details').eq(0).hide();

// $('.moreIndicator').click(function(){

//     if($(this).hasClass('rot90')){
//       $('.details').show();
//       $(this).removeClass('rot90');
//       $(this).addClass('rot270');
//       $('span').remove();
//      }
//      else if ($(this).hasClass('rot270')){
        
//         $('.details').hide();
//         $(this).removeClass('rot270');
//         // document.getElementsByClassName("details")[0].style.display="none";
//         $(this).addClass('rot90');
//         $('span').remove();
//         console.log("turn");
        
//      }
//      // else {

//      //   $(this).removeClass('rot270');
//      //   $(this).addClass('rot90');
//      //   $('.details').hide();
//      //   $('span').remove();
//      // }

       
  


// var loc = $('<span></span>').text(mImages[mCurrentIndex].location);
// $('.location').append(loc);
// var des = $('<span></span>').text(mImages[mCurrentIndex].description);
// $('.description').append(des);
// var dat = $('<span></span>').text(mImages[mCurrentIndex].date);
// $('.date').append(dat);
// //mCurrentIndex++;

//    })

//});



window.addEventListener('load', function() {
  console.log('window loaded');
$('#nextPhoto').click( function() {
swapPhoto();
$('.details').hide();
$('span').remove();

});

$('#prevPhoto').click( function() {
swapPhoto1();
$('.details').hide();
$('span').remove();
});

}, false);
 
 function swapPhoto1() {
  if(mCurrentIndex==0){

  mCurrentIndex=13;
  console.log(mCurrentIndex);

  } 
  else {
      if(mCurrentIndex>0){
        mCurrentIndex--;
        $('#photo').attr("src",mImages[mCurrentIndex].img);

      }


   }

  }




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