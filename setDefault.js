
const currentDateTime = new Date();

let currentFullDate = (currentDateTime.getFullYear()).toString()+'-';

let month = currentDateTime.getMonth() + 1;

if(month <= 9){
    currentFullDate+='0';
}

currentFullDate += (month).toString()+'-'+(currentDateTime.getDate()).toString();

document.getElementById('date').value = currentFullDate;
document.getElementById("date").setAttribute("min", currentFullDate);



let hour = (currentDateTime.getHours());
let minutes = (currentDateTime.getMinutes());

let currentTime = "";

if(hour<=9){
    currentTime += '0';
}
currentTime += hour.toString()+':';

if(minutes <= 9){
    currentTime += '0';
}
currentTime += minutes.toString();
document.getElementById('appt').value = currentTime;

setSlot(minutes,hour);

function setSlot(min,hr){
    min+=30;
if(min>=60){
    min = (min) - 60;
    hr+=1;
}
let toTime = "";
if(hr<=9){
    toTime += '0';
}
toTime += hr.toString()+':';
if(min <= 9){
    toTime += '0';
}
toTime += min.toString();
document.getElementById('to').value = toTime;

}

