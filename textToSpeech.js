import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import { v4 as uuid } from "uuid";
import { readdir, unlink } from "fs/promises";
import path from "path";
import { config } from "dotenv";
config();

const client = new textToSpeech.TextToSpeechClient();

export async function hasMP3Files(folderPath) {
	try {
		const files = await readdir(folderPath);

		// Check if any file has the .mp3 extension
		for (const file of files) {
			if (path.extname(file).toLowerCase() === ".mp3") {
				return true; // Found an .mp3 file
			}
		}

		return false; // No .mp3 files found
	} catch (err) {
		console.error("Error checking file existence:", err);
		return false; // Handle the error and return false
	}
}

async function deleteMP3Files(folderPath) {
	try {
		const files = await readdir(folderPath);

		// Filter files with .mp3 extension
		const mp3Files = files.filter(
			(file) => path.extname(file).toLowerCase() === ".mp3",
		);

		// Delete each file
		for (const file of mp3Files) {
			const filePath = path.join(folderPath, file);
			await unlink(filePath);
			console.log("File deleted:", filePath);
		}
	} catch (err) {
		console.error("Error deleting files:", err);
	}
}

async function textToSpeechFile(text) {
	// define a voice
	const voice = {
		languageCode: "en-US",
		ssmlGender: "MALE",
		name: "en-US-Wavenet-B",
	};

	//Define an audioConfig
	//This should generate audio output on the device speakers
	//But that is not working
	const audioConfig = {
		effectsProfileId: [
			"headphone-class-device",
			"large-automotive-class-device",
			"telephony-class-application",
		],
		pitch: -5.0,
		speakingRate: 1.0,
		audioEncoding: "MP3",
	};

	const input = {
		text: text,
	};

	//Define a request
	const request = {
		input: input,
		voice: voice,
		audioConfig: audioConfig,
	};

	async function getAudio(request, outputFile) {
		const [response] = await client.synthesizeSpeech(request);
		const writeFile = util.promisify(fs.writeFile);
		await writeFile(outputFile, response.audioContent, "binary");
		console.log(`Audio content written to file: ${outputFile}`);
	}

	const id = uuid();

	const outputFile = `./public/${id}.mp3`;

	await getAudio(request, outputFile);

	console.log("Text-to-speech done running");
	return id;
}

// Usage example
export async function textToSpeechfunc(text) {
	const folderPath = "./public"; // Replace with the actual folder path

	// Check if .mp3 file exists in the folder
	const mp3FileExists = await hasMP3Files(folderPath);

	if (mp3FileExists) {
		// Delete .mp3 files first
		await deleteMP3Files(folderPath);
	}

	// Run text-to-speech function
	const id = await textToSpeechFile(text);
	return id;
}
