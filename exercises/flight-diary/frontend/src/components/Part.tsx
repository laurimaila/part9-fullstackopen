import { DiaryEntry } from '../types'

const singleDiary = ({ content }: { content: DiaryEntry }) => {
    return (
        <div>
            <h4>{content.date}</h4>
            <p>Weather: {content.weather}</p>
            <p>Visibility: {content.visibility}</p>
            <p>Comment: {content.comment}</p>
        </div>
    )
}

export default singleDiary