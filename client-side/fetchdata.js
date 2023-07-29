// Function to handle button clicks and send button identifier to the server
function handleClick(buttonId) {
    fetch(`https://track-mate.vercel.app/handleClick?buttonId=${encodeURIComponent(buttonId)}`)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("Error occurred:", error));
}

// Function to display data in the div
function displayData(data, buttonID) {
    var dataContainer = document.getElementById('codechefContainer');
    if(buttonID === 1) dataContainer = document.getElementById('codechefContainer');
    else if(buttonID === 2) dataContainer = document.getElementById('leetcodeContainer');
    else if(buttonID === 3) dataContainer = document.getElementById('gfgContainer');
    dataContainer.innerHTML = ''; // Clear previous data (if any)

    const titleOfContainer = document.createElement('div');
    if(buttonID == 1) div.textContent = "CodeChef Data : "
    else if(buttonID == 2) div.textContent = "Leetcode Data : "
    else if(buttonID == 3) div.textContent = "GeeksForGeeks Data : "
    dataContainer.appendChild(titleOfContainer);

    // Loop through the data array and create divs for each entry
    data.forEach((entry, index) => {
        const div = document.createElement('div');
        div.textContent = `User ${index + 1}: `;
        for (const key in entry) {
            div.textContent += `${key}: ${entry[key]}, `;
        }
        dataContainer.appendChild(div);
    });
}

// Add event listeners to the buttons
document.getElementById("codechefButton").addEventListener("click", () => {
    handleClick('codechefButton', 1);
});

document.getElementById("leetcodeButton").addEventListener("click", () => {
    handleClick('leetcodeButton', 2);
});

document.getElementById("gfgButton", 3).addEventListener("click", () => {
    handleClick('gfgButton');
});