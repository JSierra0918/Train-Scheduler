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

        //get arrival and minutes away

        var timeC = timeConverter(trainTime, frequency);
        //assign values
        var trainArrival = timeC.nextTrain;
        var minutesAway = timeC.minutesAway;

        console.log("train arrival - " + trainArrival, " minutes away -" + minutesAway);


        // $("tbody").append($("<tr>").text(trainName));

        //set info to firebase
        database.ref("/Schedule").push({
            trainName,
            destination,
            frequency,
            trainArrival,
            minutesAway
        });
    });


    function timeConverter(trainTimeConv, frequencyConv) {

        var hoursMinutes = moment(trainTimeConv, "HH:mm").subtract(1, "years");
        console.log(hoursMinutes);
        var diffTime = moment().diff(moment(hoursMinutes), "minutes");
        console.log("diffTime - " + diffTime);
        var timeApart = diffTime % frequencyConv;
        var minutesAway = frequencyConv - timeApart;

        console.log("minutes away - " + minutesAway);
        var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");

        return {
            nextTrain,
            minutesAway
        }

    }


    database.ref("/Schedule").on("child_added", function (snapshot) {

        var sv = snapshot.val();

        addRow(sv.trainName, sv.destination, sv.frequency, sv.trainArrival, sv.minutesAway);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    function addRow(tN, dest, fre, nextA, mA) {

        var tableRow = $("<tr>");
        tableRow
            .append(` <td> ${tN}</td>`)
            .append(` <td> ${dest}</td>`)
            .append(` <td> ${fre}</td>`)
            .append(` <td> ${nextA}</td>`)
            .append(` <td> ${mA}</td>`);

        $("tbody").append(tableRow);

    }

    //click form group input, display label animation
    // $("input").focus(function () {

    //     if ($(this).is(":focus")) {
    //         $(this).prev("label").toggle("normal");
    //         $(this).prev("label").css("")
    //     }

    //     $(this).focusout(function (){
    //         $(this).prev("label").toggle("normal");
    //     });
       
    // });    

});

var smokeAnimation = bodymovin.loadAnimation({
    container: document.getElementById('smoke-left'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'clouds-left.json'
  });

  var smokeAnimationR = bodymovin.loadAnimation({
    container: document.getElementById('smoke-right'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'clouds-left.json'
  });