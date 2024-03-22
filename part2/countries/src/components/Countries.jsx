import PropTypes from "prop-types";

const Countries = ({ countries, clickShowHandler }) => {
  if (countries.length === 0) return <p>No matches found</p>;

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return (
    <div>
      {countries.map((country) => (
        <CountryLine
          key={country.cca3}
          country={country}
          clickShowHandler={clickShowHandler}
        />
      ))}
    </div>
  );
};

const CountryLine = ({ country, clickShowHandler }) => {
  {
    return (
      <p>
        {country.name.common}{" "}
        <button onClick={() => clickShowHandler(country)}>Show</button>
      </p>
    );
  }
};

Countries.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      cca3: PropTypes.string,
      name: PropTypes.shape({ common: PropTypes.string }),
    })
  ),
};

export default Countries;
