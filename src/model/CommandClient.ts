import { Client, ClientOptions, Collection } from "discord.js";

export class CommandClient extends Client {
  commands!: Collection<string, any>;

  constructor(options: ClientOptions) {
    super(options);
  }
}
