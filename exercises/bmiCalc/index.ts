import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);
  const bmi = calculateBmi(height, weight);

  if (!isNaN(weight) && !isNaN(height)) {
    res.json(
      {
        weight: height,
        height: weight,
        bmi: bmi
      }
    );
  } else {
    res.json(
      {
        error: "malformatted parameters"
      }
    );
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const exArray: number[] = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access 
  const target: number = req.body.target;

  if (!target || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  if ((exArray.every((e: number) => isNaN(Number(e)))) || (exArray.every((e: number) => !e))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(exArray, target);
  return res.send({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});