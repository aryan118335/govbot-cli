import "dotenv/config";
import Groq from "groq-sdk";
import { createInterface } from "readline";
import { readFileSync } from "fs";
import { config } from "./config.js";



const groq = new Groq({
  apiKey: config.groqApiKey
});

const knowledge = readFileSync("./knowledge.txt", "utf-8");

const conversationHistory = [
  {
    role: "system",
    content: `You are GovAssist, an AI assistant for Indian government employees.

Use the following HR knowledge to answer questions:

${knowledge}

Rules:
- Answer based on the provided knowledge.
- Do not invent rules or information.
- If the knowledge does not contain enough information, say so clearly.
- Give simple and professional answers.
- Remind the user to verify important matters with official government rules.`
  }
];

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("GovAssist started.");
console.log("Type 'exit' to quit.\n");

function askQuestion() {
  readline.question("You: ", async (question) => {
    if (question.toLowerCase() === "exit") {
      readline.close();
      return;
    }

    conversationHistory.push({
      role: "user",
      content: question
    });

    try {
      const response = await groq.chat.completions.create({
        model: config.model,
        messages: conversationHistory
      });

      const answer = response.choices[0].message.content;
      console.log(`\nGovAssist: ${answer}\n`);

      conversationHistory.push({
        role: "assistant",
        content: answer
      });
    } catch (error) {
  console.log("\nError:", error.message, "\n");
}

    askQuestion();
  });
}

askQuestion();