import Discord from "discord.js";
import SWAPI from "./services/consultaSWAPI";
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

  try {
    setInterval(async () => {
      const peopleNumber = Math.floor(Math.random() * 88);
      const curiosidadeSW = await SWAPI(peopleNumber === 0 ? peopleNumber + 1 : peopleNumber);
      if (curiosidadeSW !== 'erro') {
        const channelNotificacoes = client.channels.get(config.channelNotificacoes);
        channelNotificacoes.send(curiosidadeSW);
      }
    }, 6000)
  } catch (error) {
    console.log('Não consegui consultar a SWAPI, não conta pra ninguem dev!')
  }

});

client.on("guildMemberAdd", member => {
  const phrasesWelcome = [
    'chegou para passar mais uma issue!',
    'entrou com dois pés no peito!',
    'chegou agora e quer sentar na janelinha!',
    'vai dar trabalho pra vocês!',
    'olha quem chegou ai... vo falar nada!'
  ]
  member.guild.channels.get(config.channelWelcome).send(member.user.username + ' ' + phrasesWelcome[Math.floor(Math.random() * phrasesWelcome.length - 1)]);
})

client.on("guildMemberRemove", member => {
  member.guild.channels.get(config.channelWelcome).send(member.user.username + ' saiu e nem falou xau :/');
})

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