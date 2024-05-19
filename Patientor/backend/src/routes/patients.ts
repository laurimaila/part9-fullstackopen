import express from "express"
import patientService from "../services/patientService"
import toNewPatientEntry from "../utils"

const router = express.Router()

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitiveEntries())
})

router.get("/:id", (req, res) => {
    try {
        const patient = patientService.getPatientById(req.params.id);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).send("Patient not found");
        }
    } catch (error) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/", (_req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(_req.body)
        const addedEntry = patientService.addPatient(newPatientEntry)
        res.json(addedEntry)
    } catch (error) {
        let errorMessage = "Something went wrong."
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message
        }
        res.status(400).send(errorMessage)
    }
})

export default router