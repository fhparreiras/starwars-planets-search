const getPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const result = await response.json();
  return result.results;
};

export default getPlanets;
