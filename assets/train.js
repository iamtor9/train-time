//click button is clicked, only run the submit form function.
//add eventlisten for click
//submit form
document.getElementById("submit-button").addEventListener("click", function(event){
  event.preventDefault();
  submitForm();
})

//table update
tableUpdate();

//set 60 sec interval for table update function.
setInterval(function(){
  tableUpdate();
},60000)

/*
  this function gets the data from all of the text boxes and save the data to an object in an array in local storage via localForage
*/
function submitForm(){

  //make a data object based on the data in the input boxes 
  const trainData = {
      trainName: document.getElementById("train-name").value,
      destination: document.getElementById("destination").value,
      trainTime: document.getElementById("first-train-time").value,
      frequency: document.getElementById("frequency").value
  }

  //run the get data function by passing in a callback function that checks if the response data is null and creates the local storage else it will add the new object to the current array and run the forage set data function  
  forageGetData(function(data){
      if(data === null){
          forageSetData([trainData]);
      } else {
          data.push(trainData);
          forageSetData(data);
      }

      //clear all of the text fields to signal that the data has been submitted 
      document.getElementById("train-name").value = "";
      document.getElementById("destination").value = "";
      document.getElementById("first-train-time").value = "";
      document.getElementById("frequency").value = "";
  })
}

//this function tries to get data from local storage via local forage, if no data is found the "data" variable that gets passed to the passed in callback function = null
function forageGetData(cb){
  localforage.getItem("dataArr").then(data => {
      cb(data);
  })
}

//this function takes the passed in array and saves it to local storage via local forage 
function forageSetData(localArr){
  localforage.setItem("dataArr", localArr).then(data => {
      return data;
  })
}

//this function updates the table 
function tableUpdate(){

  //here we are running the forage get data function with a callback function that clears the table and sets it back up 
  forageGetData(function(data){
      //if nothing in local storage then return and do nothing else
      if (data === null) return;

      //get the table element and set its innerHTML with the table headers so you know what colum is what
      const table = document.getElementById("data-table");
      table.innerHTML = `
      <tr>
          <th>Train Name</th>
          <th>Destination</th>
          <th>Frequency (min)</th>
          <th>Next Arrival</th>
          <th>Minutes Away</th>
      </tr>`;

      //loop through the array passed back via the callback function, do math on that data to display proper times, and create rows for said data 
      for(let i = 0; i<data.length; i++){

          //do the calculations to determine when the next train will arrive
          const times = calcTrain(data[i].trainTime, data[i].frequency);

          //create the new row for the table and set is children based on the data we are looping through
          const newTrain = document.createElement("tr");
          newTrain.innerHTML = `
          <th>${data[i].trainName}</th>
          <th>${data[i].destination}</th>
          <th>${data[i].frequency}</th>
          <th>${times.arriveTime}</th>
          <th>${times.timeUnTrain}</th>`;

          //append this new row to the table
          table.appendChild(newTrain);
      }
  })
}

//to math to calculate train times
function calcTrain(trainTime, frequency){

  //take the first time of the train arriving at the station and set it to exactly 1 year ago to be positive that it is in the past
  const annualTrain = moment(trainTime, "HH:mm").subtract(1, "years");

  // get the difference between now and the 1 year old time in minutes to modulus against the frequency (amount of minutes it takes the train to arrive after leaving)
  const timeDifference = moment().diff(moment(annualTrain), "minutes");

  //now we take the time difference (essentially a year in minutes give or take a couple of hours) and divide it by the argument frequency that is passed in to the function
  const TimeLeft = timeDifference % frequency;

  //now we take the TimeLeft and subtract it from the time frequency to get how long we have until the next train arrives as the TimeLeft is how long (in minutes) it has been since the train last left
  timeUnTrain = frequency - TimeLeft;


  //return a object that contains variables of times 
  return {
      timeUnTrain: timeUnTrain,
      arriveTime: moment(moment().add(timeUnTrain, "minutes")).format("hh:mm")
  }
}