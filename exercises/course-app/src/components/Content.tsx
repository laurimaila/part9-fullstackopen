import { CoursePart } from '../types'
import Part from './Part'


const Content = ({ contents }: { contents: CoursePart[] }) => {
    return (
        <>
            {contents.map((content) => (
                <Part key={content.name} content={content} ></Part>
            ))}
        </>
    )
}

export default Content