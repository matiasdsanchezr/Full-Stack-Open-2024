import { useState } from "react";

const Anecdote = ({ anecdote, points }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>Has {points} votes</p>
    </>
  );
};

const Button = ({ text, clickHandler }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(null);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleClickVote = () => {
    const copy = [...points];
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
    setMostVoted(getMostVotedIndex(copy));
  };

  const getMostVotedIndex = (points) => {
    let maxIndex = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i] > points[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
      <Button text={"Vote"} clickHandler={handleClickVote} />
      <Button text={"Next anecdote"} clickHandler={handleClickNext} />
      {mostVoted != null ? (
        <>
          <h2>Anecdote with most votes</h2>
          <Anecdote
            anecdote={anecdotes[mostVoted]}
            points={points[mostVoted]}
          />
        </>
      ) : (
        <h2>No vote given</h2>
      )}
    </div>
  );
};

export default App;
