const recordBtn = document.querySelector(".record"),
	result = document.querySelector(".result"),
	downloadBtn = document.querySelector(".download"),
	inputLanguage = document.querySelector("#language"),
	clearBtn = document.querySelector(".clear");

let SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition,
	recognition,
	recording = false;

// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// let audioSource;

function speechToText() {
	try {
		recognition = new SpeechRecognition();
		recognition.lang = "english";
		recognition.interimResults = true;
		recordBtn.classList.add("recording");
		recordBtn.querySelector("p").innerHTML = "Listening...";
		recognition.start();
		recognition.onresult = (event) => {
			const speechResult = event.results[0][0].transcript;
			//detect when intrim results
			if (event.results[0].isFinal) {
				result.innerHTML += " " + speechResult;
				result.querySelector("p").remove();
			} else {
				//creative p with class interim if not already there
				if (!document.querySelector(".interim")) {
					const interim = document.createElement("p");
					interim.classList.add("interim");
					result.appendChild(interim);
				}
				//update the interim p with the speech result
				document.querySelector(".interim").innerHTML =
					" " + speechResult;
			}
			downloadBtn.disabled = false;
		};
		recognition.onspeechend = () => {
			speechToText();
		};
		recognition.onerror = (event) => {
			stopRecording();
			if (event.error === "no-speech") {
				alert("No speech was detected. Stopping...");
				download();
			} else if (event.error === "audio-capture") {
				alert(
					"No microphone was found. Ensure that a microphone is installed.",
				);
			} else if (event.error === "not-allowed") {
				alert("Permission to use microphone is blocked.");
			} else if (event.error === "aborted") {
				alert("Listening Stopped.");
			} else {
				alert("Error occurred in recognition: " + event.error);
			}
		};
	} catch (error) {
		recording = false;

		console.log(error);
	}
}

recordBtn.addEventListener("click", () => {
	if (!recording) {
		speechToText();
		recording = true;
	} else {
		stopRecording();
	}
});

function stopRecording() {
	recognition.stop();
	recordBtn.querySelector("p").innerHTML = "Start Listening";
	recordBtn.classList.remove("recording");
	recording = false;
}

async function download() {
	const text = result.innerText;
	const url = "/gpttext";
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "text/plain", // Set the content type to plain text
		},
		body: text, // Assign the variable value to the body
	};
	try {
		const response = await fetch(url, options);
		console.log(response.status);
		if (response.ok) {
			console.log("The request was successful.");

			const id = await response.text();
			console.log("id from server:", id);

			let beat = new Audio(`${id}.mp3`);
			beat.play();
			setTimeout(function () {
				// The audio has finished playing
				beat.addEventListener("ended", function () {
					stopRecording();
					result.innerHTML = "";
					downloadBtn.disabled = true;
				});
			}, 1000);
		} else {
			console.log("The request failed. Status:", response.status);
		}
	} catch (error) {
		console.log("An error occurred during the fetch request:", error);
	}
}

downloadBtn.addEventListener("click", async () => {
	try {
		await download();
	} catch (error) {
		// Handle any errors that occurred during the download
		console.log("An error occurred during the download:", error);
	}
});

clearBtn.addEventListener("click", () => {
	result.innerHTML = "";
	downloadBtn.disabled = true;
});
