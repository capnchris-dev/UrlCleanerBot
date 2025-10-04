import { REST, Routes } from "discord.js";
import { clientId, token } from "../config.json";
import { commands } from "./commands";

const parsedCommands = [];
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const command of commands) {
  if ("data" in command && "execute" in command) {
    parsedCommands.push(command.data.toJSON());
  } else {
    console.log(
      `[WARNING] A command is missing a required "data" or "execute" property.`
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your parsedCommands!
(async () => {
  try {
    console.log(
      `Started refreshing ${parsedCommands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(Routes.applicationCommands(clientId), {
      body: parsedCommands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
