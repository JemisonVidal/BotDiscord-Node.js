import axios from 'axios';

const URLBase = `https://www.receitaws.com.br/v1/cnpj`;

export default async function consultaReceita(cnpj) {
  const url = `${URLBase}/${cnpj}`;
  return await axios
    .get(url)
    .then(res => {
      return JSON.stringify(res.data).toString();
    })
    .catch(() => {
      return 'I rapaz deu ruim!';
    })

}
