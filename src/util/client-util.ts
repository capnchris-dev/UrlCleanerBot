import { Client, Collection } from "discord.js";
import { CommandClient } from "../model/CommandClient";
import { events } from "../events";
import { commands } from "../commands";

export function registerEvents(client: Client): void {
  for (const event of events) {
    if (event.once) {
      client.once(event.name.toString(), event.execute.bind(event));
    } else {
      client.on(event.name.toString(), event.execute.bind(event));
    }
  }
}

export function registerCommands(client: CommandClient): void {
  client.commands = new Collection();

  for (const command of commands) {
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] A command is missing a required "data" or "execute" property.`
      );
    }
  }
}
