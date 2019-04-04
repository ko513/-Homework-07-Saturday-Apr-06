
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAagwRyXpSTFb2rZ4SBCZk4Qyh8Po5G9Pw",
  authDomain: "myproject1-eac53.firebaseapp.com",
  databaseURL: "https://myproject1-eac53.firebaseio.com",
  projectId: "myproject1-eac53",
  storageBucket: "myproject1-eac53.appspot.com",
  messagingSenderId: "752486334306"
};

firebase.initializeApp(config);
var database = firebase.database();


$("#new-train").on("click", function() {
  event.preventDefault();

  var trainTableRow = $("<tr>");

  var trainName = $("#name").val();
  trainTableRow.append($("<td>").text(trainName));

  var trainDestination = $("#destination").val();
  trainTableRow.append($("<td>").text(trainDestination));

  var trainFirstArrival = $("#first-arrival").val();
  trainTableRow.append($("<td>").text(trainFirstArrival));

  var trainFrequency = $("#frequency").val();
  var trainNextArrival = moment().diff(trainFrequency, "minutes")

  trainTableRow.append($("<td>").text(trainFrequency));
  trainTableRow.append($("<td>").text(trainNextArrival))

  console.table('trainTableRow = ' + JSON.stringify(trainTableRow));

  $('.train-list').append($(trainTableRow));
  console.table('train-list = ' + $(".train-list"));

  console.log($(".train-list").html())

  database.ref().set({
    trainList: $(".train-list").html()
  })

  $("#name").val("")
  $("#dest").val("")
  $("#frequency").val("")
  $("#next-arrival").val("")
})

database.ref().on("value", function(snapshot) {
  $(".train-list").html(snapshot.val().trainList);
})


/*
$(document).on("click", ".trainTableRow", function(){
  $(this).remove();

  database.ref().set({
    trainList: $(".train-list").html()
  })
})
*/


$( document ).ready(function() {
    var currentTime = moment();
    console.log('currentTime = ' + JSON.stringify(currentTime));

    $('.train-list').remove();
});

