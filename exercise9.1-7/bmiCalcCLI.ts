import { calculateBmi, BmiParameterValues } from './bmiCalculator';

const parseBmiArguments = (args: string[]): BmiParameterValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { height, weight } = parseBmiArguments(process.argv);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
