import express from "express";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
config();
import { gptres } from "./chatGptRes.js";
import { textToSpeechfunc } from "./textToSpeech.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(
	express.static(path.join(__dirname, "public"), {
		setHeaders: (res) => {
			res.setHeader("Cache-Control", "no-cache");
		},
	}),
);
app.use(express.text());
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.post("/demo", (req, res) => {
	console.log("request reached server..!");
	res.send("hello...");
});
app.post("/gpttext", async (req, res) => {
	const text = req.body;
	console.log(text);
	const gptTextResponse = await gptres(text);
	const id = await textToSpeechfunc(gptTextResponse);
	console.log(id);
	res.status(200).send(id);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
