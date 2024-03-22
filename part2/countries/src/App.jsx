import { useEffect, useState } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weathers";
import CountryInfo from "./components/CountryInfo";
import Countries from "./components/Countries";
import Weather from "./components/Weather";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [matches, setMatches] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((result) => {
      setCountries(result.data);
    });
  }, []);

  const changeFilterHandler = (event) => {
    const filteredCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setMatches(filteredCountries);

    if (filteredCountries.length === 1) {
      setCountry(() => filteredCountries[0]);
      // Fetch weather information only if the country changes.
      if (
        country === null ||
        country.name.common !== filteredCountries[0].name.common
      ) {
        weatherService
          .get(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1])
          .then((response) => {
            setWeather(response.data);
          });
      }
    } else {
      setCountry(null);
      setWeather(null);
    }
  };

  const clickShowHandler = (country) => {
    setCountry(country);
    weatherService
      .get(country.latlng[0], country.latlng[1])
      .then((response) => {
        setWeather(response.data);
      });
  };

  if (countries === null) return <h1>Loading...</h1>;

  return (
    <div>
      <p>Find countries</p>
      <Filter changeFilterHandler={changeFilterHandler} />
      <Countries countries={matches} clickShowHandler={clickShowHandler} />
      {country && <CountryInfo country={country} />}
      {weather && (
        <Weather countryName={country.name.common} weather={weather} />
      )}
    </div>
  );
};

export default App;
