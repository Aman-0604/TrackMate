// WebScrapper Project
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
var cors = require("cors");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

var responseArr = [];
async function leetcode_webscrapper() {
    const users = ["techbugaman", "abhishek--", "tirelessclock", "Abhinav_Chaitanya01", "__Aditya__gupta"]
    let dataArr = []

    for (let index = 0; index < users.length; index++) {
        const current_user = users[index];
        const url = `https://leetcode.com/${current_user}/`;
        let detailsFetched = [];

        await axios(url).then((response) => {
            const page = response.data;
            const $ = cheerio.load(page);

            $('.items-end', page).each(function () {
                const title = $(this).text();
                detailsFetched.push(title);
            })

            const userObj = {
                lc_id: current_user,
                total: 0,
                rank: detailsFetched[1].slice(4),
                easy: detailsFetched[2].split("/")[0].slice(4),
                medium: detailsFetched[3].split("/")[0].slice(6),
                hard: detailsFetched[4].split("/")[0].slice(4)
            }
            userObj["total"] = parseInt(userObj["easy"]) + parseInt(userObj["medium"]) + parseInt(userObj["hard"]);

            dataArr.push(userObj)
            // console.log(userObj);
        }).catch((err) => { console.log(err) })
    }
    return dataArr;
}

async function codechef_webscrapper() {
    let users = ["aman_dtu_0604", "aditya11511", "goyal_abhi2003", "tirelessclock"]
    let dataArr = [];
    for (let index = 0; index < users.length; index++) {
        const current_user = users[index]
        const url = `https://www.codechef.com/users/${current_user}`;
        await axios(url).then((response) => {
            const page = response.data;
            const $ = cheerio.load(page);

            let userObj = {
                cc_id: current_user,
                rank: 0,
                contest: 0
            }

            $('.rating-number', page).each(function () { userObj["rank"] = $(this).text(); })
            $('.contest-participated-count', page).each(function () {
                userObj["contest"] = $(this).text().split(":")[1]
                userObj["contest"] = userObj["contest"].slice(1, userObj["contest"].indexOf("\n"))
            })

            // console.log(userObj)
            dataArr.push(userObj)
        }).catch((err) => { console.log(err) })
    }
    return dataArr;
}

async function gfg_webscrapper() {
    const users = ["techbugaman", "abhishekgoyal11aug2003", "ghpsaditya123", "tirelessclock"];
    let dataArr = [];

    for (let index = 0; index < users.length; index++) {
        const current_user = users[index];
        const detailsFetched = [];

        const url = `https://auth.geeksforgeeks.org/user/${current_user}`;
        await axios(url).then((response) => {
            const page = response.data;
            const $ = cheerio.load(page);

            const scoreCard = {
                codingScore: 0,
                problemsSolved: 0,
                monthlyScore: 0,
                articlesPublished: 0
            }
            const userObj = {
                gfg_id: current_user,
                rank: 0,
                scoreCard: scoreCard
            }

            $('.rankNum', page).each(function () { userObj["rank"] = $(this).text(); })
            $('.score_card_value', page).each(function () {
                const title = $(this).text();
                detailsFetched.push(title);
            })

            scoreCard['codingScore'] = detailsFetched[0];
            scoreCard['problemsSolved'] = detailsFetched[1];
            scoreCard['monthlyScore'] = detailsFetched[2];
            scoreCard['articlesPublished'] = detailsFetched[3];

            dataArr.push(userObj);
            // console.log(userObj);
        }).catch((err) => { console.log(err) })
    }
    return dataArr;
}

// Function to handle button clicks based on the button identifier
async function handleButton(buttonId) {
    responseArr = [];
    // Implement your desired functionality for each button here
    switch (buttonId) {
        case 'codechefButton':
            console.log("Button 1 was clicked!");
            responseArr = await codechef_webscrapper();
            // console.log(responseArr);
            break;
        case 'leetcodeButton':
            console.log("Button 2 was clicked!");
            responseArr = (await leetcode_webscrapper())
            break;
        case 'gfgButton':
            console.log("Button 3 was clicked!");
            responseArr = (await gfg_webscrapper())
            break;
        default:
            console.log("Unknown button clicked!");
    }
}

// Route handler for handling button clicks
app.get('/handleClick', async (req, res) => {
    const { buttonId } = req.query;
    await handleButton(buttonId);
    res.json(responseArr);
});

app.listen(port, () => {
    console.log(`Port chalu ho chuka hai on port ${port}`);
});