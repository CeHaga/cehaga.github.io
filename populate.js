function createElementsFromJSON(json) {
    console.log(json);
    // For each key
    for (var key in json) {
        // Find div with id
        var div = document.getElementById(key);
        // For each element in the array
        for (var project in json[key]) {
            // Create a new div
            var divRow = document.createElement("div");
            divRow.classList.add("row");

            var divCol1 = document.createElement("div");
            divCol1.classList.add("column");
            divRow.appendChild(divCol1);

            var divCol2 = document.createElement("div");
            divCol2.classList.add("column");
            divRow.appendChild(divCol2);

            // Set name with h2
            var name = document.createElement("h2");
            name.classList.add("project_name");
            name.innerHTML = json[key][project].name;
            divCol1.appendChild(name);

            // Set year with h3
            var year = document.createElement("h3");
            var startYear = json[key][project].startYear;
            var isGameCurrent = false;
            // Check if end year is present
            if (json[key][project].endYear) {
                // Check if start year is the same as end year
                if (startYear == json[key][project].endYear) {
                    year.innerHTML = `(${startYear})`;
                } else {
                    year.innerHTML = `(${startYear} - ${json[key][project].endYear})`;
                }
            } else {
                year.innerHTML = `(${startYear} - Present)`;
                isGameCurrent = true;
            }
            divCol1.appendChild(year);

            // Set tags
            var tags = document.createElement("div");
            tags.classList.add("project_tags");

            if (json[key][project].jobTags) {
                // For each jobTags
                for (var i = 0; i < json[key][project].jobTags.length; i++) {
                    // Create a new div
                    var tagsDiv = document.createElement("div");
                    // Set the text
                    tagsDiv.innerHTML = json[key][project].jobTags[i];
                    // Set w3 tag class
                    tagsDiv.classList.add("w3-tag");
                    tagsDiv.classList.add("w3-round");
                    tagsDiv.classList.add("w3-blue");
                    // Append the div to the div
                    tags.appendChild(tagsDiv);
                }
            }

            if (json[key][project].techs) {
                // For each techs
                for (var i = 0; i < json[key][project].techs.length; i++) {
                    // Create a new div
                    var tagsDiv = document.createElement("div");
                    // Set the text
                    tagsDiv.innerHTML = json[key][project].techs[i];
                    // Set w3 tag class
                    tagsDiv.classList.add("w3-tag");
                    tagsDiv.classList.add("w3-round");
                    tagsDiv.classList.add("w3-purple");
                    // Append the div to the div
                    tags.appendChild(tagsDiv);
                }
            }

            if (json[key][project].platforms) {
                // For each platforms
                for (var i = 0; i < json[key][project].platforms.length; i++) {
                    // Create a new div
                    var tagsDiv = document.createElement("div");
                    // Set the text
                    tagsDiv.innerHTML = json[key][project].platforms[i];
                    // Set w3 tag class
                    tagsDiv.classList.add("w3-tag");
                    tagsDiv.classList.add("w3-round");
                    tagsDiv.classList.add("w3-red");
                    // Append the div to the div
                    tags.appendChild(tagsDiv);
                }
            }

            divCol1.appendChild(tags);

            // Set description with p
            var description = document.createElement("p");
            description.innerHTML = json[key][project].description;
            divCol1.appendChild(description);

            // Create image link
            var hasLink = false;
            if (json[key][project].link) {
                hasLink = true;
                var link = document.createElement("a");
                link.href = json[key][project].link;
                link.target = "_blank";
                link.classList.add("project_link");
                divCol2.appendChild(link);
            }

            // Set image with link
            if (json[key][project].image) {
                var image = document.createElement("img");
                image.src = json[key][project].image;
                if (json[key][project].imageCaption) {
                    image.classList.add("project_image_with_caption");
                } else {
                    image.classList.add("project_image_without_caption");
                }
                if (hasLink) {
                    link.appendChild(image);
                } else {
                    divCol2.appendChild(image);
                }
            }

            // Set caption centered below image
            if (json[key][project].imageCaption) {
                var caption = document.createElement("p");
                caption.innerHTML = json[key][project].imageCaption;
                caption.classList.add("project_image_caption");
                if (hasLink) {
                    link.appendChild(caption);
                } else {
                    divCol2.appendChild(caption);
                }
            }

            // Set job title with p
            var jobTitle = document.createElement("p");
            if (isGameCurrent) {
                jobTitle.innerHTML = "Working as: " + json[key][project].jobTitle;
            } else {
                jobTitle.innerHTML = "Worked as: " + json[key][project].jobTitle;
            }
            jobTitle.classList.add("project_job_title");
            divCol1.appendChild(jobTitle);

            // Join jobRespons to an ul
            if (json[key][project].jobRespons) {
                var jobRespons = json[key][project].jobRespons;
                var ul = document.createElement("ul");
                // For each job responsibility
                for (var i = 0; i < jobRespons.length; i++) {
                    // Create a new li
                    var li = document.createElement("li");
                    // Set the text
                    li.innerHTML = jobRespons[i];
                    // Append the li to the ul
                    ul.appendChild(li);
                }
                // Append the ul to the div
                divCol1.appendChild(ul);
            }

            div.appendChild(divRow);
            div.appendChild(document.createElement("hr"));
        }
        div.removeChild(div.lastChild);
    }
}

// Run the function when the page is loaded
window.onload = function () {
    var json = fetch('projects.json')
        .then(response => response.json())
        .then(data => createElementsFromJSON(data));
}
