import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import HealthCheckIcon from '@mui/icons-material/MedicalServices';
import HospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HeartIcon from '@mui/icons-material/Favorite';
import { green, yellow, orange, red } from '@mui/material/colors';



type EntryComponentProps<T extends Entry> = {
  getText: (code: string) => string;
  entry: T;
};

const EntryItem = ({ getText, entry }: EntryComponentProps<Entry>) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <HospitalItem entry={entry as HospitalEntry} getText={getText} />
      );
    case "HealthCheck":
      return (
        <HealthCheckItem entry={entry as HealthCheckEntry} getText={getText} />
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareItem entry={entry as OccupationalHealthcareEntry} getText={getText} />
      );
    default:
      return null;
  }
};

const HospitalItem = ({ getText, entry }: EntryComponentProps<HospitalEntry>) => {
  return (
    <Paper elevation={4} sx={{ p: 1, m: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '0.5em' }}>{entry?.date}</h3>
        <HospitalIcon />
      </div>
      <p>{entry?.description}</p>
      <ul>
        {entry?.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
          <li key={index}>
            {code} {getText(code)}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

const HealthCheckItem = ({ getText, entry }: EntryComponentProps<HealthCheckEntry>) => {
  const getHeartColor = (rating?: number) => {
    switch (rating) {
      case 0:
        return green[500];
      case 1:
        return yellow[700];
      case 2:
        return orange[700];
      case 3:
        return red[700];
      case 4:
        return red[900];
      default:
        return "inherit";
    }
  };
  return (
    <Paper elevation={4} sx={{ p: 1, m: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '0.5em' }}>{entry?.date}</h3>
        <HealthCheckIcon />
      </div>
      <p>{entry?.description}</p>
      <HeartIcon style={{ color: getHeartColor(entry?.healthCheckRating) }} />
      <ul>
        {entry?.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
          <li key={index}>
            {code} {getText(code)}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

const OccupationalHealthcareItem = ({ getText, entry }: EntryComponentProps<OccupationalHealthcareEntry>) => {
  return (
    <Paper elevation={4} sx={{ p: 1, m: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '0.5em' }}>{entry?.date}</h3>
        <WorkIcon />
        <h3 style={{ marginLeft: '0.5em' }}>{entry?.employerName}</h3>
      </div>
      <p>{entry?.description}</p>
      {entry?.sickLeave && (
        <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
      )}
      <ul>
        {entry?.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
          <li key={index}>
            {code} {getText(code)}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default EntryItem;