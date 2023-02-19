export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface ExerciseParameterValues {
    exArray: Array<number>,
    target: number
}



export const calculateExercises = (exArray: Array<number>, target: number): Result => {
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
};

