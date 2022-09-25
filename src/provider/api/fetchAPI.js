async function fetchAPI() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  // ordenar por ordem alfabetica
  const planets = data.results.sort((a, b) => {
    const aux = -1;
    if (a.name < b.name) {
      return aux;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  console.log(planets);
  return planets;
}

export default fetchAPI;
