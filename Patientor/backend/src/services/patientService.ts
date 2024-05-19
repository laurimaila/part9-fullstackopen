import { v4 as uuidv4 } from "uuid"
import patientData from "../../data/patients"
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types"

const patients: Patient[] = patientData as Patient[]

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

const getPatientById = (id: string): Patient[] => {
    const patient = patients.find(p => p.id === id);
    return patient ? [patient] : [];
}

const addPatient = (patient: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient,
        entries: []
    }

    patientData.push(newPatient)
    return newPatient
}

export default {
    getNonSensitiveEntries,
    addPatient,
    getPatientById,
}