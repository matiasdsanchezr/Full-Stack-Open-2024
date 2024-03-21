const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, part) => (accumulator += part.exercises),
    0
  );
  return <b>total of {total} exercises</b>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Course = ({ course }) => {
  const parts = course.parts;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
