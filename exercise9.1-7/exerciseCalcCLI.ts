import { ExerciseParameterValues, calculateExercises } from './exerciseCalculator';

const parseExerciseArguments = (args: string[]): ExerciseParameterValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (process.argv.slice(2).every(e => !isNaN(Number(e)))) {
        return {
            exArray: process.argv.slice(3).map(e => Number(e)),
            target: Number(args[2])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { exArray, target } = parseExerciseArguments(process.argv);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    console.log(calculateExercises(exArray, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
