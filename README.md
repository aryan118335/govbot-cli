# GovAssist

GovAssist is a simple command-line AI chatbot designed to help Indian government employees with common Human Resources (HR) related questions.

It uses the Groq API to generate answers based on a local knowledge file containing information about topics such as:

* Leave Rules
* Transfers
* MACP
* GPF
* LTC
* Pay and Increments
* Retirement
* Service Records

The project is designed to be simple and easy to understand. It uses an in-memory conversation history, so the chatbot can remember previous questions during the current session.

## Features

* AI-powered HR assistant for government employees
* Command-line interface
* Uses Groq API
* Local HR knowledge base
* Maintains conversation history during the session
* Clears conversation history with a command
* Handles empty or accidental space-only input
* Handles invalid API keys
* Handles rate-limit errors
* Handles common network failures
* Simple and beginner-friendly Node.js project

## Project Structure

```text
govassist/
├── bot.js
├── config.js
├── knowledge.txt
├── package.json
├── .env
├── .gitignore
└── README.md
```

### Main Files

**bot.js**

Contains the main chatbot logic, command-line interface, conversation history, API requests, and error handling.

**config.js**

Loads the Groq API key from the `.env` file and contains the model configuration.

**knowledge.txt**

Contains the HR information that GovAssist uses as its knowledge source.

## Requirements

Before installing GovAssist, make sure you have:

* Node.js installed
* A Groq API key
* Internet connection

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd govassist
```

### 2. Install dependencies

Run:

```bash
npm install
```

The project uses:

* `groq-sdk` — to communicate with the Groq API
* `chalk` — for colored terminal output
* `dotenv` — to load the API key from `.env`

If the dependencies are not already listed in `package.json`, install them using:

```bash
npm install groq-sdk chalk dotenv
```

## Adding the Groq API Key

GovAssist needs a Groq API key to communicate with the AI model.

### 1. Create a `.env` file

Create a file named:

```text
.env
```

in the root of the project.

Your project should look like:

```text
govassist/
├── bot.js
├── config.js
├── knowledge.txt
├── package.json
├── .env
└── ...
```

### 2. Add your API key

Inside `.env`, add:

```text
GROQ_API_KEY=your_groq_api_key_here
```

Replace `your_groq_api_key_here` with your actual Groq API key.

Example:

```text
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
```

### Important

Never upload or push your API key to GitHub.

Make sure `.env` is included in `.gitignore`:

```text
.env
```

## Running GovAssist

Start the chatbot using:

```bash
npm start
```

You can also run it directly with:

```bash
node bot.js
```

When the application starts, you will see the GovAssist welcome screen.

You can then type your question and press Enter.

Example:

```text
You: What is MACP?

GovAssist is thinking...

GovAssist: MACP stands for Modified Assured Career Progression...
```

## Available Commands

GovAssist provides the following commands:

| Command  | Description                             |
| -------- | --------------------------------------- |
| `/help`  | Shows all available commands            |
| `/clear` | Clears the current conversation history |
| `/quit`  | Exits GovAssist                         |

### `/help`

Displays the available commands.

```text
/help
```

### `/clear`

Removes the previous conversation from memory and starts a fresh conversation.

```text
/clear
```

### `/quit`

Closes GovAssist and exits the program.

```text
/quit
```

## How GovAssist Works

The basic flow of the application is:

```text
User
  ↓
Command-line input
  ↓
Input validation
  ↓
Conversation history
  ↓
Groq API
  ↓
AI-generated response
  ↓
Terminal
```

The HR information stored in `knowledge.txt` is provided to the AI as part of the system instructions.

The conversation history is stored only in memory while the program is running.

## Important Note

GovAssist provides general information and should not be treated as an official government authority.

Government rules can vary depending on the department, service, cadre, state, and applicable government orders.

Important decisions should always be verified using the latest applicable official government rules or by contacting the appropriate department or authority.
