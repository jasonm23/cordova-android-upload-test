/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

var uploadPhotoSuccess = function(r){
  console.log("Uploaded photo");
  alert("Photo uploaded Ok");
  console.log(JSON.stringify(r));
  document.getElementById('response_box').value = r.response;
}

var uploadPhotoFail = function(e){
  console.log("Failed to upload photo");
  alert("Failed to upload photo");
  console.log(JSON.stringify(e));
  document.getElementById('response_box').value = "Failed\ncode: " + e.code + "\nhttp_status: "+ e.http_status +"\nbody: " + e.body;
}

var uploadPhoto = function(){

  console.log("Begin upload test");
  alert("Begin upload test (see log)");

  var upload_url = document.getElementById('upload_url').value;
  var parameter_name = document.getElementById('parameter_name').value;
  var upload_method = document.getElementById('upload_method').value;
  var imageURI = document.getElementById('photo_preview').getAttribute('src');

  console.log("Uploading image: " + imageURI);
  console.log("Uploading to: " + upload_url);
  console.log("Parameter/key name: " + parameter_name);
  console.log("Method: " + upload_method);

  var options = new FileUploadOptions();
  options.fileKey = parameter_name;
  options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.mimeType = "image/jpeg";
  options.httpMethod = upload_method;

  var ft = new FileTransfer();

  ft.upload(imageURI, encodeURI(upload_url),
            uploadPhotoSuccess,
            uploadPhotoFail,
            options);

}

var onPhotoURISuccess = function(imageURI){
  console.log("imageURI: " + imageURI);
  var photo_preview = document.getElementById('photo_preview');
  photo_preview.setAttribute('src', imageURI);
}

var onPhotoFail = function(error){
  console.log("Photo capture failed: " + error);
}

var takePhoto = function (e){
  console.log("Take a photo for upload test");
  navigator.camera.getPicture(
    onPhotoURISuccess,
    onPhotoFail,
    {
      quality: 100,
      targetWidth: 240,
      targetHeight: 160,
      correctOrientation: true,
      destinationType: Camera.DestinationType.FILE_URI
    });
}
