function createElementsFromJSON(json) {
    console.log(json);
    // For each key
    for (var key in json) {
        // Find div with id
        var div = document.getElementById(key);
        // For each element in the array
        for (var project in json[key]) {
            // Create a new div
            var newDiv = document.createElement("div");

            // Set name with h2
            var name = document.createElement("h2");
            name.innerHTML = json[key][project].name;
            newDiv.appendChild(name);

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
            newDiv.appendChild(year);

            // Set description with p
            var description = document.createElement("p");
            description.innerHTML = json[key][project].description;
            newDiv.appendChild(description);

            // Create image link
            var hasLink = false;
            if (json[key][project].link) {
                hasLink = true;
                var link = document.createElement("a");
                link.href = json[key][project].link;
                link.target = "_blank";
                newDiv.appendChild(link);
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
                    newDiv.appendChild(image);
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
                    newDiv.appendChild(caption);
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
            newDiv.appendChild(jobTitle);

            // Join jobRespons and techs to an ul
            if (json[key][project].jobRespons.length > 0 || json[key][project].techs.length > 0) {
                var jobRespons = json[key][project].jobRespons;
                var techs = json[key][project].techs;
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
                // If has techs
                if (techs) {
                    // Added "Used" and every tech by comma
                    var li = document.createElement("li");
                    li.innerHTML = "Used: " + techs.join(", ");
                    ul.appendChild(li);
                }
                // Append the ul to the div
                newDiv.appendChild(ul);
            }
            div.appendChild(newDiv);
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
