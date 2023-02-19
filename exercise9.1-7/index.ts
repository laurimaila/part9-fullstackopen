import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();
const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let weight = Number(_req.query.weight);
  let height = Number(_req.query.height);
  let bmi = calculateBmi(height, weight);

  if (!isNaN(weight) && !isNaN(height)) {
    res.json(
      {
        weight: height,
        height: weight,
        bmi: bmi
      }
    )
  } else {
    res.json(
      {
        error: "malformatted parameters"
      }
    )
  };
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});