const Weather = ({ countryName, weather }) => {
  return (
    <div>
      <h2>Weather in {countryName}</h2>
      <p>Temperature: {weather.main.temp}° Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>Wind: {weather.wind.deg} m/s</p>
    </div>
  );
};
export default Weather;
