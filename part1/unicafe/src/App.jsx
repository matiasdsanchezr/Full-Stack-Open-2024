import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percentage = (good * 100) / total;

  return (
    <>
      <h2>Statistics</h2>
      {total ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="percentage" value={`${percentage}%`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text={"good"} handleClick={handleClickGood} />
      <Button text={"neutral"} handleClick={handleClickNeutral} />
      <Button text={"bad"} handleClick={handleClickBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
