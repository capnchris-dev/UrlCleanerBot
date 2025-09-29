import { GatewayIntentBits } from "discord.js";
import { token } from "../config.json";
import { CommandClient } from "./model/CommandClient";
import { registerCommands, registerEvents } from "./util/client-util";

const client = new CommandClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerEvents(client);
registerCommands(client);

client.login(token);
