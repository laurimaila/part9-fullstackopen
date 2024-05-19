import { DiaryEntry } from '../types'
import Part from './Part'


const Content = ({ contents }: { contents: DiaryEntry[] }) => {
    return (
        <>
            <h2>Diary Entries</h2>
            {contents.map((content) => (
                <Part key={content.id} content={content} ></Part>
            ))}
        </>
    )
}

export default Content