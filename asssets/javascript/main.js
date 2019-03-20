$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAlGfBx2274wEpJ6J1sDEBeEoVFV0-0M-s",
        authDomain: "test-7caef.firebaseapp.com",
        databaseURL: "https://test-7caef.firebaseio.com",
        projectId: "test-7caef",
        storageBucket: "test-7caef.appspot.com",
        messagingSenderId: "5066005024"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit-button").on("click", (event) => {
        event.preventDefault();

        var trainName = $("#train-name").val();
        var destination = $("#destination").val();
        var trainTime = $("#train-time").val();
        var frequency = $("#frequency").val();
        var minutesAway = "";

        alert("Submit Clicked");

        // $("tbody").append($("<tr>").text(trainName));

        //set info to firebase
        database.ref().push({
            trainName,
            destination,
            trainTime,
            frequency,
            minutesAway
        });
    });

    database.ref().on("child_added", function (snapshot) {

        var sv = snapshot.val();
        
        console.log(sv);
        addRow(sv.trainName,sv.destination,sv.trainTime,sv.frequency,sv.minutesAway);

    });

    function addRow (tN,dest,fre,tT,mA ){
        var tableRow = $("<tr>");
        tableRow
            .append(` <td> ${tN}</td>`)
            .append(` <td> ${dest}</td>`)
            .append(` <td> ${fre}</td>`)
            .append(` <td> ${tT}</td>`)
            .append(` <td> ${mA}</td>`);

            $("tbody").append(tableRow);

    }


});