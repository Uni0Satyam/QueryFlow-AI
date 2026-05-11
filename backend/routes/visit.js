import express from 'express';
import { getVisitCount, incrementVisitCount } from '../controllers/visitController.js';

const router = express.Router();

router.get("/count", getVisitCount);

router.post("/increment", incrementVisitCount);

export default router;