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
        var contentsDiv    = document.getElementById('fileContentsDiv'),
            getContentsBtn = document.getElementById('getFileContents'),
            setContentsBtn = document.getElementById('setFileContents');
        
        //Set file contents
        setContentsBtn.addEventListener('click', function() {
            
            // Create a Date string. It will look something like: "2013-08-13T22:04:58.811Z"
            var dateStr = new Date().toJSON();
            
            // Ask cordova to execute a method on our FileWriter class
            cordova.exec(
                // Register the callback handler
                function callback(data) {
                    contentsDiv.innerHTML = 'File contents set.';
                    console.log('Wrote date ' + dateStr);
                },
                // Register the errorHandler
                function errorHandler(err) {
                    alert('Error');
                },
                // Define what class to route messages to
                'FileWriter',
                // Execute this method on the above class
                'cordovaSetFileContents',
                // An array containing one String (our newly created Date String).
                [ dateStr ]
            );

        });
        
        //Get file contents
        getContentsBtn.addEventListener('click', function() {
                   
            cordova.exec(
                function callback(data) {
                    // data comes from the NSDictionary instance (jsonObj) from our Objective C code.
                    // Take a look at the cordovaGetFileContents method from FileWriter.m and you'll see
                    // where we add dateStr as a property to that Dictionary object.
                    var msg = 'Current file contents: <br />' + data.dateStr;
                    contentsDiv.innerHTML = msg;
                },
                function errorHandler(err) {
                    alert('Error');
                },
                'FileWriter',
                'cordovaGetFileContents',
                [  ] // No arguments, just an empty array
            );
        });

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
