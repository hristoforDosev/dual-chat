# dual-chat

## Installation

Navigate to the frontend directory and run the following commands:

```bash
cp .env.local .env
npm install
```
Then navigate to the backend directory and run the following commands:

```bash
cp .env.local .env
```
Open the .env file and set the OPENAI_SECRET_KEY variable to your OpenAI API key. The file should look like this:
```bash
OPENAI_SECRET_KEY=
```
Then run the following command:
```
npm install
```

## Running the app
At backend directory run the following commands:
```bash
# development
npm run start:dev
```

At frontend directory run the following commands:
```bash
# development
npm start
```
