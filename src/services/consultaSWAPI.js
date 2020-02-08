import axios from 'axios';

const baseURL = `https://swapi.co/api/people/`

export default async function SWAPI(number) {
  return await axios
    .get(baseURL + number)
    .then(res => {
      const { name, height, mass, birth_year } = res.data;

      return `STAR WARS - CURIOCIDADES
              Você Sabia que a altura do  personagem ${name} é ${updateData(height)}, 
              seu peso é ${updateData(mass)} e 
              seu ano de nascimento é ${updateData(birth_year)}.
              `
    })
    .catch(() => {
      return "erro"
    })
}

function updateData(data) {
  return data === 'unknown' ? 'desconhecido' : data;
}