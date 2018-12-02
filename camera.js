window.addEventListener("load", function() {
  var videoObj    = { "video": true },
      errBack        = function(error){
          alert("Video capture error: ", error.code);
      };

  // Ask the browser for permission to use the Webcam
  if(navigator.getUserMedia){                    // Standard
      navigator.getUserMedia(videoObj, startWebcam, errBack);
  }else if(navigator.webkitGetUserMedia){        // WebKit
      navigator.webkitGetUserMedia(videoObj, startWebcam, errBack);
  }else if(navigator.mozGetUserMedia){        // Firefox
      navigator.mozGetUserMedia(videoObj, startWebcam, errBack);
  };

  function startWebcam(stream){

      var myOnlineCamera   = document.getElementById('myOnlineCamera');
      var video            = myOnlineCamera.querySelector('video');
      var canvas           = myOnlineCamera.querySelector('canvas');

      video.width = video.offsetWidth;

      if(navigator.getUserMedia){                    // Standard
          video.src = window.URL.createObjectURL(stream);
          video.play();
      }else if(navigator.webkitGetUserMedia){        // WebKit
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
      }else if(navigator.mozGetUserMedia){        // Firefox
          video.src = window.URL.createObjectURL(stream);
          video.play();
      };

      myOnlineCamera.querySelector('#photoButton').addEventListener("click", function(){
          // Copying the image in a temporary canvas
          var temp = document.createElement('canvas');

          temp.width  = video.offsetWidth;
          temp.height = video.offsetHeight;

          var tempcontext = temp.getContext("2d"),
              tempScale = (temp.height/temp.width);

          temp.getContext("2d").drawImage(
              video,
              0, 0,
              video.offsetWidth, video.offsetHeight
          );

          // Resize it to the size of our canvas
          canvas.style.height = parseInt( canvas.offsetWidth * tempScale );
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          var context = canvas.getContext("2d");
          var scale = canvas.width/temp.width;
          context.scale(scale, scale);
          context.drawImage(temp, 0, 0);
      });
  };
});