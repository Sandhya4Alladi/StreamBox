function display(data, images) {
    const n = data.length;
    if (n === 0) {
        document.getElementById("videos").innerHTML = "No Videos";
    } else {
        for (let i = 0; i < n; i++) {
            const card = document.createElement("div");
            card.classList.add("card");

            const overlay = document.createElement("div");
            overlay.classList.add("overlay");

            const key = data[i].videoKey;

            const a = document.createElement("a");
            a.href = `/videos/playvideo?data=${key}&id=${data[i]._id}`;

            card.appendChild(overlay);

            // Create a container for title and options
            const titleContainer = document.createElement("div");
            titleContainer.classList.add("title-container");

            // Create title button
            const title = document.createElement("button");
            title.innerText = data[i].title;
            title.className = "btn btn-primary";
            title.style.width = "90%"; // Adjust width for title button

            // Set href attribute for title button
            title.href = a.href;

            // Create ellipsis button
            const ellipsisButton = document.createElement("button");
            ellipsisButton.innerText = "...";
            ellipsisButton.className = "btn btn-secondary";
            ellipsisButton.style.width = "10%"; // Adjust width for ellipsis button

            // Create dropdown menu
            const dropdownMenu = document.createElement("div");
            dropdownMenu.className = "dropdown-menu";
            dropdownMenu.style.display = "none";
            dropdownMenu.style.position = "absolute";
            dropdownMenu.style.backgroundColor = "#fff";
            dropdownMenu.style.border = "1px solid #ccc";
            dropdownMenu.style.padding = "5px";
            dropdownMenu.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)";
            dropdownMenu.style.zIndex = "1";

            // Create Delete option in dropdown
            const deleteOption = document.createElement("button");
            deleteOption.innerText = "Delete";
            deleteOption.className = "dropdown-item";
            deleteOption.style.width = "100%";
            deleteOption.style.backgroundColor = "red";
            deleteOption.addEventListener("click", function(event) {
                event.preventDefault();
                // Call confirmDelete function with the video ID
                confirmDelete(data[i]._id);
            });

            // Append delete option to dropdown menu
            dropdownMenu.appendChild(deleteOption);

            // Toggle dropdown menu visibility when ellipsis button is clicked
            ellipsisButton.addEventListener("click", function(event) {
                event.preventDefault();
                if (dropdownMenu.style.display === "none") {
                    dropdownMenu.style.display = "block";
                } else {
                    dropdownMenu.style.display = "none";
                }
            });

            // Append elements to title container
            titleContainer.appendChild(title);
            titleContainer.appendChild(ellipsisButton);

            // Append title container to anchor element
            a.appendChild(titleContainer);

            a.addEventListener("click", function () {
                fetch("/videos/view/" + data[i]._id, {
                    method: "PUT",
                });
            });

            const imgElement = document.createElement("img");
            imgElement.src = `data:image/png;base64,` + images[i];
            card.appendChild(imgElement);
            card.appendChild(a);

            // Create container for delete button
            const deleteContainer = document.createElement("div");
            deleteContainer.classList.add("delete-container");
            deleteContainer.style.position = "absolute";
            deleteContainer.style.bottom = "0px";
            deleteContainer.style.right = "150px"; // Adjust position as needed

            // Append dropdown menu to delete container
            deleteContainer.appendChild(dropdownMenu);

            // Append delete container to card
            card.appendChild(deleteContainer);

            document.getElementById("videos").appendChild(card);

        }
    }
}
 
function confirmDelete(videoId) {
    $('#deleteConfirmationModal').modal('show');
    document.getElementById('confirmDeleteButton').addEventListener('click', function() {
        console.log('Confirmed action');
        deleteVideo(videoId);
        $('#confirmationModal').modal('hide');
    });  
}

async function deleteVideo(videoId) {
    try {
        const response = await fetch(`/videos/${videoId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log("Video deleted successfully");
            location.reload();
        } else {
            console.error("Error deleting video:", response.status);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

