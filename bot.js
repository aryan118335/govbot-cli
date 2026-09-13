import Groq from "groq-sdk";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import chalk from "chalk";
import { config } from "./config.js";

const groq = new Groq({
  apiKey: config.groqApiKey
});

const knowledge = readFileSync("./knowledge.txt", "utf-8");

const systemMessage = {
  role: "system",
  content: `You are GovAssist, an AI assistant for Indian government employees.

Use the following HR knowledge to answer questions:

${knowledge}

Rules:
- Answer based on the provided knowledge.
- Do not invent rules or information.
- If the knowledge does not contain enough information, say so clearly.
- Give simple and professional answers.
- Remind the user to verify important matters with the applicable official government rules.`
};

const conversationHistory = [systemMessage];

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(chalk.cyan(`
========================================
              GOVASSIST
       Government HR Assistant
========================================
`));

console.log("Ask questions about:");
console.log("Leave Rules, Transfers, MACP, GPF, LTC");
console.log("Type /help to see available commands.\n");

function askQuestion() {
  readline.question(chalk.yellow("You: "), async (input) => {
    const question = input.trim();

    if (question === "") {
      console.log(chalk.red("\nPlease enter a question.\n"));
      askQuestion();
      return;
    }

    if (question.toLowerCase() === "/quit") {
      readline.close();
      return;
    }

    if (question.toLowerCase() === "/clear") {
      conversationHistory.length = 0;
      conversationHistory.push(systemMessage);

      console.log(chalk.green("\nConversation cleared.\n"));
      askQuestion();
      return;
    }

    if (question.toLowerCase() === "/help") {
      console.log(`
Available commands:

/help   - Show available commands
/clear  - Clear conversation history
/quit   - Exit GovAssist
`);

      askQuestion();
      return;
    }

    conversationHistory.push({
      role: "user",
      content: question
    });

    try {
      console.log(chalk.cyan("\nGovAssist is thinking...\n"));

      const response = await groq.chat.completions.create({
        model: config.model,
        messages: conversationHistory
      });

      const answer = response.choices[0].message.content;

      console.log(chalk.green(`GovAssist: ${answer}\n`));

      conversationHistory.push({
        role: "assistant",
        content: answer
      });

    } catch (error) {
      if (error.status === 401) {
        console.log(
          chalk.red("\nError: Invalid Groq API key. Please check your .env file.\n")
        );
      } else if (error.status === 429) {
        console.log(
          chalk.red("\nError: Rate limit exceeded. Please wait a moment and try again.\n")
        );
      } else if (
        error.code === "ENOTFOUND" ||
        error.code === "ECONNREFUSED" ||
        error.code === "ETIMEDOUT"
      ) {
        console.log(
          chalk.red("\nError: Network connection failed. Please check your internet connection.\n")
        );
      } else {
        console.log(
          chalk.red("\nError: Unable to get a response from the AI service.\n")
        );
      }
    }

    askQuestion();
  });
}

askQuestion();