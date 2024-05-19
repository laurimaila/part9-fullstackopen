import axios from "axios";
import { Patient, PatientFormValues, Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};



const getPatient = async (id: string): Promise<Patient | undefined> => {
  try {
    const response = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
    return response.data[0]; // Assuming the API returns a list of patients, return the first patient
  } catch (error) {
    // Handle errors here
    console.error('Error fetching patient:', error);
    return undefined;
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, getPatient, create, getDiagnoses
};

