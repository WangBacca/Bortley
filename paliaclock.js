var paliaTimeDiv = document.getElementsByClassName("PaliaTime")[0];
var paliaDayPeriodDiv = document.getElementsByClassName("PaliaDayPeriod")[0];
var currentDayPeriod = "Night";
const dayPeriodChanged = new Event("dayPeriodChanged");

function getCurrentTime() {
    //Set up Variables
    var currentDate = new Date();
    var currentMinutes = currentDate.getMinutes();
    var currentSeconds = currentDate.getSeconds();

    //Figure out Palia Time
    var paliaSeconds = (currentSeconds * 24) + (currentMinutes * 60 * 24);
    var paliaDayProgress = paliaSeconds / 86400;
    var paliaHour = (paliaSeconds / 60) / 60;
    var currentPaliaHour = Math.floor(paliaHour);
    var paliaAMPMValue = "";

    //Figure out which day period we're in
    if (paliaHour >= 3 && paliaHour < 6) {
        currentDayPeriod = "Morning";
    } else if (paliaHour >= 6 && paliaHour < 18) {
        currentDayPeriod = "Day";
    } else if (paliaHour >= 18 && paliaHour < 21) {
        currentDayPeriod = "Evening";
    } else if (paliaHour >= 21 && paliaHour < 3) {
        currentDayPeriod = "Night";
    }

    //Dispatch the day period changed at the appropriate hours
    if (paliaHour == 3 || paliaHour == 6 || paliaHour == 18 || paliaHour == 21) {
        document.dispatchEvent(dayPeriodChanged);
        console.log(`Day period changed to: ${currentDayPeriod}`);
    }

    //Keep it in 12 hour time instead of 24h (this changes currentPaliaHour, be careful of further uses of that variable)
    if (currentPaliaHour > 12) {
        currentPaliaHour = currentPaliaHour - 12
        paliaAMPMValue = "PM";
    } else if (currentPaliaHour == 0) {
        currentPaliaHour = 12;
        paliaAMPMValue = "AM";
    } else {
        paliaAMPMValue = "AM";
    }


    //Dispatch the day period changed event only at the appropriate hour


    //Calculate minutes and display them correctly
    var minuteScalar = parseFloat(paliaHour.toString().substring(paliaHour.toString().indexOf(".")));
    var currentPaliaMinute = Math.floor(minuteScalar * 60);
    if (currentPaliaMinute < 10) {
        currentPaliaMinute = `0${currentPaliaMinute}`;
    } else if (currentPaliaMinute > 59) {
        currentPaliaMinute = "00";
    }

    //Set clock hand rotation and text for the time
    var clockHand = document.getElementsByClassName("PaliaClock_hand")[0];
    var clockHandRotation = `${(paliaDayProgress * 360)}deg`;
    paliaTimeDiv.innerText = `${currentPaliaHour}:${currentPaliaMinute} ${paliaAMPMValue}`;
    paliaDayPeriodDiv.innerText = currentDayPeriod;
    clockHand.style.rotate = clockHandRotation;

    // //Debug stuff
    // if (document.getElementsByClassName("Debug_HourDisplay").length == 0) {
    //     var debugHourDisplay = document.createElement("div");
    //     debugHourDisplay.className = "Debug_HourDisplay";
    //     debugHourDisplay.innerText = paliaHour;
    //     paliaTimeDiv.appendChild(debugHourDisplay);
    // }    

    //Wait 1 sec, run this function again;
    setTimeout(function () {
        getCurrentTime();
    }, 1000);
}

getCurrentTime();

document.addEventListener(
    "dayPeriodChanged",
    (e) => {
        // console.log("day period changed received");
    },
    false
)