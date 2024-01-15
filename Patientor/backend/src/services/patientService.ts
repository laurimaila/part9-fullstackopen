import { v4 as uuidv4 } from "uuid"
import patientData from "../../data/patients"
import { Patient, NoSsnPatient, NewPatientEntry } from "../types"

const patients: Patient[] = patientData as Patient[]

const getNoSsnEntries = (): NoSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient
    }

    patientData.push(newPatient)
    return newPatient
}

export default {
    getNoSsnEntries,
    addPatient
}