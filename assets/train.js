

//  Button for adding trains
//document.getElementsByIdName("button").onclick

document.getElementById("submitbtn").on("click", function()){

}


	// Get user input

	// Creates local "temporary" object for holding train data
let newTrain = {
		name:  trainName,
		destination: destination,
        frequency: frequency,
        arrival: nextArrival
        minAway: minutesAway,
	}

	// Uploads train data to the database
	trainData.ref().push(newTrain);

	// Log "newtrain array" to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.frequency);
    console.log(newTrain.nextArrival);
    console.log(newTrain.minutesAway);

// Assumptions
let tFrequency = 3;
// Time is 3pm
let firstTime = "03:00";
// First Time (pushed back 1 year to make sure it comes before current time)
let firstTimeConverted = moment(firstTime, "03:00mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
let currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
let tRemainder = diffTime % tFrequency;
console.log(tRemainder);
// Minute Until Train
let tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
let nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//to do: add moment.js info

// code notes below, was brainstorming

//let trainName = $("#trainNameInput").val().trim();
//let destination = $("#destinationInput").val().trim();
//let firstTrainUnix = moment(document.getElementById("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
//let frequency = document.getElementById("#frequencyInput").val().trim();

//create basic array for form inputs

//let array = ["0", "1", "2", "3", "4"]

//let array = document.getElementsByClassName("form-control");

//for (let i = 0; i < array.length; i++) {
    //const element = array i];
    
//}
//function submitB () {
    
//}

//let tdDiv = document.createElementByTagName("td");
//let node = document.createTextNode("");
//tdDiv.appendChild(node);

//let formDiv = document.getElementById("submitbtn");
//formDiv.appendChild(tdDiv);


//create javascript elements and then attach them to the html "like" elements

//create a click listener for submit button
//grab values from basic array 
//attach each value into it's own td element

// function that gets form data input
//<input type="text" class="form-control" id="formgroupinput" placeholder="">

//array.push(item1, item2, ..., itemX)


//document.createElement("tr");

//for (let i = 0; i < array.length; i++) {
    //const element = array[i];
    
///}
//create new element called tr
//append tr to document.getelementbyid(tbody)
 








//<button type="button" onclick="myFunction()">Try it</button>

//<p id="demo"></p>

//<script>
//function myFunction() {
  //let x = document.getElementById("myTextarea").form.id;
  //document.getElementById("demo").innerHTML = x;
//}

//have function return form data to train times container