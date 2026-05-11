import Visit from '../models/Visit.js';
import httpStatus from 'http-status';

export const getVisitCount = async (req, res) => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit({ count: 0 });
            await visit.save();
        }
        res.status(httpStatus.OK).json({ count: visit.count });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${err}` });
    }
};

export const incrementVisitCount = async (req, res) => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit({ count: 1 });
        } else {
            visit.count += 1;
        }
        await visit.save();
        res.status(httpStatus.OK).json({ count: visit.count });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong: ${err}` });
    }
};