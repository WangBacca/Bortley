var paliaTimeDiv = document.getElementsByClassName("PaliaTime")[0];

function getCurrentTime() {
    //Set up Variables
    var currentDate = new Date();
    var currentMinutes = currentDate.getMinutes();
    var currentSeconds = currentDate.getSeconds();

    //Figure out Palia Time
    var paliaSeconds = (currentSeconds * 24) + (currentMinutes * 60 * 24);
    var paliaHour = (paliaSeconds / 60) / 60;
    var paliaAMPMValue = "";

    var currentPaliaHour = Math.floor(paliaHour);
    if (currentPaliaHour > 12) {
        currentPaliaHour = currentPaliaHour - 12
        paliaAMPMValue = "PM";
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

    paliaTimeDiv.innerText = `${currentPaliaHour}:${currentPaliaMinute} ${paliaAMPMValue}`;


    // var minutesToDay = currentMinutes / 60;
    // var secondsToMinutes = (currentSeconds / 60) / 100;
    // var paliaTimeScale = minutesToDay + secondsToMinutes;
    // var paliaDayScale = paliaTimeScale * 24;
    // var paliaDayScaleDecimalIndex = paliaDayScale.toString().indexOf(".");
    // var paliaHour = Math.floor(paliaDayScale);
    // var paliaMinutesRaw = paliaDayScale.toString().substring(paliaDayScaleDecimalIndex + 1);
    // var paliaMinutes = 0;

    // if (paliaMinutesRaw.length == 1) {
    //     paliaMinutes = `${paliaMinutesRaw}0`
    // } else if (paliaMinutesRaw.length == 2) {
    //     paliaMinutes = paliaMinutesRaw
    // } else if (paliaMinutesRaw.length > 2) {
    //     paliaMinutes = paliaMinutesRaw.slice (0,2)
    // }
    
    // paliaTimeDiv.innerHTML = `<p>Time in Palia: ${paliaHour}:${paliaMinutes}</p>
    // <p>Day scale value: ${paliaDayScale}</p>
    // <p>Time Scale value: ${paliaTimeScale}</p>`;

    //Wait 1 sec, run this function again;
    setTimeout(function () {
        getCurrentTime();
    }, 1000);
}

getCurrentTime();