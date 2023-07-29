// Function to handle button clicks and send button identifier to the server
function handleClick(buttonId) {
    fetch(`https://track-mate.vercel.app/handleClick?buttonId=${encodeURIComponent(buttonId)}`)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error("Error occurred:", error));
}

async function createGraph(index, data, key, buttonID) {
    var xValues = [];
    var yValues = [];
    var barColors = ["red", "green", "blue", "orange", "brown"];

    // console.log("id", key);

    // values for x-axis
    for (let i = 0; i < data.length ; i++) {
        xValues.push(data[i]["id"]);
    }

    // values for y-axis
    for (let i = 0; i < data.length ; i++) {
        yValues.push(data[i][key]);
    }

    new Chart(`myChart${index}`, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: `${key}`
            }
        }
    });
}

// Function to display data in the div
async function displayData(data, buttonID) {
    var dataContainer = document.getElementById('codechefContainer');
    if (buttonID === 1) dataContainer = document.getElementById('codechefContainer');
    else if (buttonID === 2) dataContainer = document.getElementById('leetcodeContainer');
    else if (buttonID === 3) dataContainer = document.getElementById('gfgContainer');
    dataContainer.innerHTML = ''; // Clear previous data (if any)

    const titleOfContainer = document.createElement('div');
    if (buttonID == 1) div.textContent = "CodeChef Data : "
    else if (buttonID == 2) div.textContent = "Leetcode Data : "
    else if (buttonID == 3) div.textContent = "GeeksForGeeks Data : "
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

    const keys = Object.keys(data[0]);
    for (let index = 1; index < keys.length ; index++) {
        await createGraph(index, data, keys[index], buttonID);
    }
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