import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "..";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    await interaction.reply("Pong!");
  },
} as SlashCommand;
