
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


$("#add-train").on("click", function() {
  event.preventDefault();

  var trRow = $("<tr>").addClass("trRow");

  trRow.append($("<td>").addClass("delete-icon"));

  var trName = $("#tr-name").val().trim();
  trRow.append($("<td>").text(trName));

  var trDestination = $("#tr-destination").val().trim();
  trRow.append($("<td>").text(trDestination));

  var trFirstArrival = $("#tr-first-arrival").val().trim();

  var trFrequency = $("#tr-frequency").val().trim();
  trRow.append($("<td>").text(trFrequency).append(" minutes"));


  //  ===  Calculate the train's next arrival time, and how many minutes that is from current time  ===  //
    
  //  First arrival time, pushed back 1 year to make sure it comes before current time
  trFirstArrival = moment(trFirstArrival, "HH:mm").subtract(1, "years");
    
  //  Difference between the first arrival minutes (eg 00:15) and the current time minutes (eg :0037)
  var diffTime = moment().diff(moment(trFirstArrival), "minutes");

  //  Need the difference between the first arrival minutes (eg 00:15) and the current time minutes (eg :0037)
  var trRemainder = diffTime % trFrequency;

  //  Then, using frequency, you can determine how many minutes there are between current time and the next arrival
  var trMinutesUntilArrival = trFrequency - trRemainder;
  var nextArrival = moment().add(trMinutesUntilArrival, "minutes");

  trRow.append($("<td>").text(moment(nextArrival).format("hh:mm")));
  trRow.append($("<td>").text(trMinutesUntilArrival));



  //  ===  Append completed row to the table, update Firebase, clear table entry values  ===  //

  $(".train-list").append(trRow);

  database.ref().set({ trainList: $(".train-list").html() })

  $("#tr-name").val("")
  $("#tr-destination").val("")
  $("#tr-first-arrival").val("")
  $("#tr-frequency").val("")
})


//  Listener updates table whenever any Firebase value is changed
database.ref().on("value", function(snapshot) {
  $(".train-list").html(snapshot.val().trainList);
})


//  Remove a train from the list if its delete icon is clicked; update Firebase
$(document).on("click", ".delete-icon", function() {
  $(this.parentNode).remove();

  database.ref().set({
    trainList: $(".train-list").html()
  })
})

