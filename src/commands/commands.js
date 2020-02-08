import consultaReceita from "../services/consultaCNPJ"

export default async function clientRun(client, message, command, args) {
  if (command === "cnpj") {
    const dados = await consultaReceita(args[0]);
    return await message.reply(dados);
  }
}

