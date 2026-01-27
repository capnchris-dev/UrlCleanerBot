import { REST, Routes } from "discord.js";
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

// Early return if env var is not set
if(!process.env.URLCLEANER_TOKEN){
  throw new Error("Env var 'URLCLEANER_TOKEN' not defined");
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.URLCLEANER_TOKEN);

// and deploy your parsedCommands!
(async () => {
  try {
    // Early return if env var is not set
    if(!process.env.URLCLEANER_CLIENT_ID){
       throw new Error("Env var 'URLCLEANER_CLIENT_ID' not defined");
    }
    
    console.log(
      `Started refreshing ${parsedCommands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: any = await rest.put(Routes.applicationCommands(process.env.URLCLEANER_CLIENT_ID), {
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
