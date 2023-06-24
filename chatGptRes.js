import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const openAi = new OpenAIApi(
	new Configuration({
		apiKey: process.env.API_KEY,
	}),
);

const gptres = async (text) => {
	const response = await openAi.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: text }],
	});
	return response.data.choices[0].message.content;
};

export { gptres };
