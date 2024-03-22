const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}km²</p>
      <p>Languages:</p>
      <ul>
        {Object.values(country.languages).map((language) => (
          <LanguageLine key={language} language={language} />
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

const LanguageLine = ({ language }) => <li>{language}</li>;

export default CountryInfo;
