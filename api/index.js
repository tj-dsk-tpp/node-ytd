require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const ytdl = require("ytdl-core");


const PORT = process.env.PORT | 4000;

const server = express();
server.use(morgan("common"));
server.use(cors());
server.use(express.json());

server.get("/download", async (req, res) => {
    try {
        const url = req.query.url;
        const videoID = await ytdl.getURLVideoID(url);
        const metaInfo = await ytdl.getInfo(url);

        let data = {
            url: `https://www.youtube.com/embed/${videoID}`,
            info: metaInfo.formats
        }
        res.status(200).json(data).end();
    } catch (err) {
        // console.log(err);
        res.status(500).send(err.message).end();
    }
})

server.all("*", (req, res) => {
    res.status(404).send("<h1>Man! are you sure this is the right address.</h1>").end();
});

server.listen(PORT, () => {
    console.log(`Service running on http://localhost:${PORT}`);
});