import Discord from "discord.js";
import clientRun from "./commands/commands";
import config from "./config/config.json";

const config = config;
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot Iniciado!`);

  const activityArray = [
    'Assistindo Youtube',
    'Jogando FortNite',
    'Lendo um livro',
    'Day of',
    'Minerando Dados'
  ]

  function getAndSetActivity() {
    const activity = activityArray[Math.floor(Math.random() * activityArray.length - 1)];
    client.user.setActivity(activity);
  }

  getAndSetActivity();
  setInterval(() => getAndSetActivity(), 18000);
});


client.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    clientRun(client, message, command, args);
  } catch (error) {
    return message.reply('Foi mal, não consegui executar seu comando.')
  }
});
client.login(config.token);