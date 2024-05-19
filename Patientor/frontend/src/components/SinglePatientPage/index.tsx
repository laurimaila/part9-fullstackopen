import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnosis } from '../../types';
import EntryItem from "../EntryItem";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import OtherIcon from '@mui/icons-material/QuestionMark';


const SinglePatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id ? id : "");
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const res = await patientService.getDiagnoses();
      setDiagnoses(res);
    };

    void fetchDiagnoses();
  }, []);

  const getText = (code: string): string => {
    return diagnoses?.find(diagnosis => diagnosis.code === code)?.name || "";
  };

  const getGenderIcon = (gender?: Gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <OtherIcon />;
    }

  };
  return (
    <div>
      <h2>
        {patient?.name}
        {getGenderIcon(patient?.gender)}
      </h2>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.ssn}</p>
      <p>{patient?.occupation}</p>
      <h3>{patient?.entries && patient.entries.length > 0 && "Entries"}</h3>
      {patient?.entries && patient.entries.map((entry) => (
        <EntryItem key={entry.id} getText={getText} entry={entry} />
      ))}
    </div>
  );
};

export default SinglePatientPage;