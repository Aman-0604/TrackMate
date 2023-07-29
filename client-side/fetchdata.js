// Function to handle button clicks and send button identifier to the server
function handleClick(buttonId) {
    fetch(`https://track-mate.vercel.app/handleClick?buttonId=${encodeURIComponent(buttonId)}`)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("Error occurred:", error));
}

// Function to display data in the div
function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Clear previous data (if any)

    // Loop through the data array and create divs for each entry
    data.forEach((entry, index) => {
        const div = document.createElement('div');
        div.textContent = `Entry ${index + 1}: `;
        for (const key in entry) {
            div.textContent += `${key}: ${entry[key]}, `;
        }
        dataContainer.appendChild(div);
    });
}

// Add event listeners to the buttons
document.getElementById("codechefButton").addEventListener("click", () => {
    handleClick('codechefButton');
});

document.getElementById("leetcodeButton").addEventListener("click", () => {
    handleClick('leetcodeButton');
});

document.getElementById("gfgButton").addEventListener("click", () => {
    handleClick('gfgButton');
});