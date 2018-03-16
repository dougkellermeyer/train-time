
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDbevgYYdzevZ8-62YkWxx7s6IIKwS2mGg",
  authDomain: "train-homework-f55f6.firebaseapp.com",
  databaseURL: "https://train-homework-f55f6.firebaseio.com",
  projectId: "train-homework-f55f6",
  storageBucket: "train-homework-f55f6.appspot.com",
  messagingSenderId: "538070008937"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainFirst = moment($("#first-input").val().trim(),"HH:mm").format("X");
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "ttrainorary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainFirst).format("HH:mm");

  // Calculate the difference from the first train to the next train

  var nextTrain = moment(trainFirst, "HH:mm").add(trainFreq, "minutes").format("HH:mm");
  console.log(nextTrain);


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainStartPretty + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttraint we use mets this test case
