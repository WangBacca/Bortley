const rugIconPath = "/Bortley/resources/RugIcons";
var manualRugNamesArray = [
    "Bellflower_Rug.png",
    "Bellflower_Runner.png",
    "Bellflower_Small_Rug.png",
    "Capital_Chic_Doormat.png",
    "Capital_Chic_Rug.png",
    "Capital_Chic_Stylish_Rug.png",
    "Dragontide_Large_Rug.png",
    "Dragontide_Round_Rug.png",
    "Dragontide_Runner.png",
    "Homestead_Large_Rug.png",
    "Homestead_Medium_Rug.png",
    "Homestead_Runner.png",
    "Homestead_Triangular_Rug.png",
    "Industrial_Rug.png",
    "Industrial_Runner.png",
    "Industrial_Small_Rug.png",
    "Kilima_Inn_Large_Rug.png",
    "Kilima_Inn_Round_Rug.png",
    "Kilima_Inn_Runner.png",
    "Log_Cabin_Haabeko_Rug.png",
    "Log_Cabin_Patterned_Rug.png",
    "Makeshift_Chapaa_Hide_Rug.png",
    "Makeshift_Rectangular_Rug.png",
    "Makeshift_Sernuk_Hide_Rug.png",
    "Makeshift_Square_Rug.png",
    "Moonstruck_Rug.png",
    "Moonstruck_Runner.png",
    "Moonstruck_Small_Rug.png",
    "Ranch_House_99-Acre_Rug.png",
    "Ranch_House_Doormat.png",
    "Ranch_House_Rug.png",
    "Ravenwood_Doormat.png",
    "Ravenwood_Runner.png"
];

var rugGallery = document.createElement("div");
rugGallery.className = "Gallery_Rugs"
rugGallery.style.display = "grid";
rugGallery.style.width = "100%";
rugGallery.style.gridTemplateColumns = "repeat(5,20%)";
rugGallery.style.justifyContent = "center";
rugGallery.style.padding = "2px";
rugGallery.style.rowGap = "2px";
rugGallery.style.columnGap = "2px";

document.body.appendChild(rugGallery);

function buildRugGallery(arrayOfFileNames) {
    for (let i = 0; i < arrayOfFileNames.length; i++) {
            let rugFileName = arrayOfFileNames[i];
            let rugNameWithUnderscores = rugFileName.slice(0, rugFileName.length - 4);
            let rugNameArray = rugNameWithUnderscores.split("_");
            let rugName = rugNameArray.join(" ");
            
            //Set up the overall gallery item element
            let galleryItem = document.createElement("div");
            galleryItem.className = rugNameWithUnderscores;
            galleryItem.style.border = "groove";
            galleryItem.style.borderColor = "lightblue"
            galleryItem.style.padding = "5px"

            //Set up the <a> element to link to the wiki page for the rug
            let wikiLinkItem = document.createElement("a");
            wikiLinkItem.href = `https://palia.wiki.gg/wiki/${rugNameWithUnderscores}`;
            wikiLinkItem.target = '_blank';

            //Set up the title element
            let titleElement = document.createElement("h2");
            titleElement.innerText = rugName;
            titleElement.style.textAlign = "center";

            //Set up the image element
            let imageElement = document.createElement("img");
            imageElement.className = `${rugNameWithUnderscores}_icon`
            imageElement.src = `${rugIconPath}/${rugFileName}`
            imageElement.style.height = "128px";
            imageElement.style.display = "block";
            imageElement.style.margin = "auto";
            imageElement.style.opacity = 1;

            //Make a checkbox element
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.onclick = function () {
                let thisImage = document.getElementsByClassName(`${rugNameWithUnderscores}_icon`)[0];
                if (this.checked) {
                    thisImage.style.opacity = 0.25;
                } else {
                    thisImage.style.opacity = 1.0;
                }
            }
            checkBox.innerHTML = "<p>Collected</p><br>";
            checkBox.style.display = "block";
            checkBox.style.margin = "auto";

            //Put the pieces together
            rugGallery.appendChild(galleryItem);
            galleryItem.appendChild(titleElement);
            galleryItem.appendChild(wikiLinkItem);
            wikiLinkItem.appendChild(imageElement);
            galleryItem.appendChild(checkBox);
        }
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", `${rugIconPath}`, true);
xmlhttp.setRequestHeader('Accept', 'application/json');
xmlhttp.send();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
        let responseJSON = JSON.parse(this.response);
        // console.log(responseJSON);
        //do stuff here
        buildRugGallery(responseJSON);
    } else if (this.readyState == 4 && this.status == 404) {
        buildRugGallery(manualRugNamesArray);
    }
}