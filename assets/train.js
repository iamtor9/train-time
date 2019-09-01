function myFunction() {

  //Train function form inputs  
  let trainname = document.getElementById("tname").value;
  let finalDestination = document.getElementById("dest").value;
  let frequency = document.getElementById("freq").value;
  let firstTime = document.getElementById("first").value;
  let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  
  // Current Time moment.js & future train
  let currentTime = moment();
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  let tRemainder = diffTime % frequency;
  let tMinutesTillTrain = frequency - tRemainder;
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");

  //console log all above
    console.log(trainname);
    console.log(finalDestination);
    console.log(frequency);
    console.log(moment(nextTrain).format("hh:mm"));
    console.log(tMinutesTillTrain);

let tReference = document.getElementById('traintb').getElementsByTagName('tbody')[0];

// Insert a row in the table at the last row
let newTRow   = tReference.insertRow();

// Insert cell for rows starting at index 0
let newTC1  = newTRow.insertCell(0);
let newTC2  = newTRow.insertCell(1);
let newTC3  = newTRow.insertCell(2);
let newTC4  = newTRow.insertCell(3);
let newTC5  = newTRow.insertCell(4);

// text appends to cell
let newUserText  = document.createTextNode(trainname);
newTC1.appendChild(newUserText);

let newUserText  = document.createTextNode(finalDestination);
newTC2.appendChild(newUserText);

let newUserText  = document.createTextNode(frequency);
newTC3.appendChild(newUserText);

let newUserText  = document.createTextNode(moment(nextTrain).format("hh:mm"));
newTC4.appendChild(newUserText);

let newUserText  = document.createTextNode(tMinutesTillTrain);
newTC5.appendChild(newUserText);

// local forage code
let data = {
       trainname: trainname,
       finalDestination: finalDestination,
       firstTime: firstTime,
       frequency: frequency,
   }
   console.log(data);
   localforage.getItem("saved").then(function(result){
     if(!result){
       result = [];
       result.push(data);
     }
     localforage.setItem("saved", result).then(function(){
         console.log("saved")
         console.log(result);
        })}); 
}