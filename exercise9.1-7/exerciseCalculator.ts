interface Result {
    periodLength: number,
    trainingDays: number,
    success: Boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number
}

interface ExerciseParameterValues {
    exArray: Array<number>,
    target: number
}

const parseExerciseArguments = (args: string[]): ExerciseParameterValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (process.argv.slice(2).every(e => !isNaN(Number(e)))) {
        return {
            exArray: process.argv.slice(3).map(e => Number(e)),
            target: Number(args[2])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (exArray: Array<number>, target: number): Result => {
    const avg = exArray.reduce((a, b) => a + b, 0) / exArray.length;
    let rating = 1;
    let ratingDesc = "There's room for improvement";
    if (avg > 0.8 * target) { rating = 2; }
    if (avg > 1.4 * target) { rating = 3; }

    if (rating == 2) { ratingDesc = "Not too bad but could be better"; }
    if (rating == 3) { ratingDesc = "Great work!"; }

    return ({
        periodLength: exArray.length,
        trainingDays: exArray.filter(e => e !== 0).length,
        success: avg >= target,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: avg
    }
    );
}

try {
    const { exArray, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exArray, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
