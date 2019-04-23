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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
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
var startDate = new Date(2015,2,15,18,30,0,0,0); // beware: month 0 = january, 11 = december
var endDate = new Date(2015,2,15,19,30,0,0,0);
var title = "My nice event";
var eventLocation = "Home";
var notes = "Some notes about this event.";
var success = function(message) { alert("Success: " + JSON.stringify(message)); };
var error = function(message) { alert("Error: " + message); };

// create a calendar (iOS only for now)
//window.plugins.calendar.createCalendar(calendarName,success,error);

/*$scope.addToCalendar = function() {
    if (window.plugins && window.plugins.calendar) {
        var hour = $scope.session.time.substring(0,$scope.session.time.indexOf(':'));
        if ($scope.session.time.indexOf("pm")>-1)
            hour = parseInt(hour)+12;
        var today = new Date();
        console.log("Date year" + today.getFullYear() + " mo " + today.getMonth()+ " day " + today.getDate());
        var startDate = new Date(today.getFullYear(),today.getMonth(),today.getDate(),hour,00,00);
        var endDate = new Date();
        endDate.setTime(startDate.getTime() + 3600000);//one hour

        window.plugins.calendar.createEvent($scope.session.title, $scope.session.room, $scope.session.description, startDate, endDate,
            function () {
                alert($scope.session.title + " has been added to your calendar.");
            },
            function (error) {
                console.log("Calendar fail " + error);
            });
    }
    else console.log("Calendar plugin not available.");
}*/


app.initialize();