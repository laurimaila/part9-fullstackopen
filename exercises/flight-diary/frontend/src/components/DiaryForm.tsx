import React, { useState, SyntheticEvent } from "react"
import { NewDiaryEntry, Weather, Visibility } from "../types"

interface Props {
    onSubmit: (values: NewDiaryEntry) => void;
}

const DiaryForm: React.FC<Props> = ({ onSubmit }) => {

    const [date, setDate] = useState("")
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
    const [comment, setComment] = useState("")

    

    const addDiary = (event: SyntheticEvent) => {
        event.preventDefault()
        onSubmit({
            date,
            weather,
            visibility,
            comment,
        })

        setDate('')
        setWeather(Weather.Sunny)
        setVisibility(Visibility.Good)
        setComment('')
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={addDiary}>
                <div>
                    <label>Date </label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Weather</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value={Weather.Sunny}
                                checked={weather === Weather.Sunny}
                                onChange={(e) => setWeather(e.target.value as Weather)}
                            />
                            Sunny
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value={Weather.Rainy}
                                checked={weather === Weather.Rainy}
                                onChange={(e) => setWeather(e.target.value as Weather)}
                            />
                            Rainy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value={Weather.Windy}
                                checked={weather === Weather.Windy}
                                onChange={(e) => setWeather(e.target.value as Weather)}
                            />
                            Windy
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="weather"
                                value={Weather.Cloudy}
                                checked={weather === Weather.Cloudy}
                                onChange={(e) => setWeather(e.target.value as Weather)}
                            />
                            Cloudy
                        </label>
                    </div>
                </div>
                <div>
                    <label>Visibility</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value={Visibility.Good}
                                checked={visibility === Visibility.Good}
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                            />
                            Good
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value={Visibility.Ok}
                                checked={visibility === Visibility.Ok}
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                            />
                            Normal
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="visibility"
                                value={Visibility.Poor}
                                checked={visibility === Visibility.Poor}
                                onChange={(e) => setVisibility(e.target.value as Visibility)}
                            />
                            Poor
                        </label>
                    </div>
                </div>
                <div>
                    <label>Comment </label>
                    <input
                        type="string"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default DiaryForm