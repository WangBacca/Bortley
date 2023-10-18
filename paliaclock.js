var paliaTimeDiv = document.getElementsByClassName("PaliaTime")[0];

function getCurrentTime() {
    //Set up Variables
    var currentDate = new Date();
    var currentMinutes = currentDate.getMinutes();
    var currentSeconds = currentDate.getSeconds();

    //Figure out Palia Time
    var paliaSeconds = (currentSeconds * 24) + (currentMinutes * 60 * 24);
    var paliaDayProgress = paliaSeconds / 86400;
    var paliaHour = (paliaSeconds / 60) / 60;
    var paliaAMPMValue = "";

    var currentPaliaHour = Math.floor(paliaHour);
    if (currentPaliaHour > 12) {
        currentPaliaHour = currentPaliaHour - 12
        paliaAMPMValue = "PM";
    } else if (currentPaliaHour == 0) {
        currentPaliaHour = 12;
        paliaAMPMValue = "AM";
    } else {
        paliaAMPMValue = "AM";
    }

    var minuteScalar = parseFloat(paliaHour.toString().substring(paliaHour.toString().indexOf(".")));
    var currentPaliaMinute = Math.floor(minuteScalar * 60);
    if (currentPaliaMinute < 10) {
        currentPaliaMinute = `0${currentPaliaMinute}`;
    } else if (currentPaliaMinute > 59) {
        currentPaliaMinute = "00";
    }

    var clockHand = document.getElementsByClassName("PaliaClock_hand")[0];
    var clockHandRotation = `${(paliaDayProgress * 360)}deg`;
    paliaTimeDiv.innerText = `${currentPaliaHour}:${currentPaliaMinute} ${paliaAMPMValue}`;
    clockHand.style.rotate = clockHandRotation;

    //Wait 1 sec, run this function again;
    setTimeout(function () {
        getCurrentTime();
    }, 1000);
}

getCurrentTime();