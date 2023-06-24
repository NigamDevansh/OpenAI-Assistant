
# OpenAI Assistant
 
 This web application is basically google/siri voice assistant but rather being powered by google/apple it's powered by ChatGPT of OpenAi. It receives voice commands and return the voice output of your command.

**caution** : Their are two ways to call the response one is to remain silent. Another method is to first stop the listening by clicking on it and then click response.

Video:
https://github.com/NigamDevansh/GoogleMeetAtendanceTracker/assets/88497388/fc408799-c398-4444-9c87-bf68c4a243aa


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`GOOGLE_APPLICATION_CREDENTIALS`="/path/to/credentials.json"

`PORT`

How to get environment variables:
- To get api key head over to openai.com and create a account then navigate to "https://platform.openai.com/account/api-keys" to get you api key.
- To get the text to speech credentials head over to google cloud platform and search for "text to speech" api and enable it fomr their.

### Run Locally

Clone the project

```bash
  git clone https://github.com/NigamDevansh/openai_Assistant
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies and running the server:

```bash
  npm install
```
```bash
  npm run dev
```

You will see that nodemon has started and listening at the given port.



### Screenshots

![1](https://github.com/NigamDevansh/Community-api/assets/88497388/446f488c-38c5-412a-aa62-b9960efcfacf)

![2](https://github.com/NigamDevansh/Community-api/assets/88497388/8878e5d9-d31f-4b90-8cc3-24094c3a5864)


