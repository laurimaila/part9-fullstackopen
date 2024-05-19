import { useState, useEffect } from 'react'
import axios from 'axios'
import DiaryForm from './components/DiaryForm'
import Content from './components/Content'
import diaryService from './services/diaryService'

import { DiaryEntry, NewDiaryEntry } from './types'

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])
    const [error, setError] = useState<string>()

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const diaryData = await diaryService.getAll()
                setDiaries(diaryData)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    console.error(e)
                    setError(e.message ? `Fetching diaries: ${e.message}` : 'Fetching diaries: Unknown axios error')
                } else {
                    console.error(e)
                    setError('Fetching diaries: Unknown error')
                }
            }
        }

        fetchDiaries()
    }, [])

    const submitNewDiary = async (values: NewDiaryEntry) => {
        try {
            const newDiary = await diaryService.create(values)
            setDiaries([...diaries, newDiary])
            setError("")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.error(e)
                setError(e.response?.data || 'Adding new diary: Unknown axios error')
            } else {
                console.error(e)
                setError('Adding new diary: Unknown error')
            }
        }
    }

    return (
        <div>
            {error && <h4 style={{ color: 'red' }}>{error}</h4>}
            <DiaryForm onSubmit={submitNewDiary} />
            <Content contents={diaries} />
        </div>
    )
}

export default App