import { SlashCommandBuilder } from "discord.js";
import ping from "./utility/ping";

export type SlashCommand = {
  data: SlashCommandBuilder;
  execute(interaction: any): Promise<void>;
};

export const commands = [
    ping
]