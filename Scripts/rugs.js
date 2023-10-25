const rugIconPath = "/Bortley/resources/RugChecklist/RugIcons";
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

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", `${rugIconPath}`, true);
xmlhttp.setRequestHeader('Accept', 'application/json');
xmlhttp.send();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
        let responseJSON = JSON.parse(this.response);
        // console.log(responseJSON);
        //do stuff here

        for (let i = 0; i < responseJSON.length; i++) {
            let rugFileName = responseJSON[i];
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
}