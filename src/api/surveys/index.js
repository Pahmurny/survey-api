import { Router } from 'express';
import { token } from '../../services/passport';
// import { middleware as body } from 'bodymen';
import { getMySurveys, createSurvey, deleteSurvey, getSurveyById, updateSurvey } from './controller';

const router = new Router();

/**
 TODO: add apidocs
 */
router.get('/:surveyId', token({ required: false }), getSurveyById);

/**
 TODO: add apidocs
 */
router.get('/', token({ required: true }), getMySurveys);

/**
 TODO: add apidocs
 */
router.post('/', token({ required: true }), createSurvey);

/**
 TODO: add apidocs
 */
router.put('/', token({ required: true }), updateSurvey);

/**
 TODO: add apidocs
 */
router.delete('/:surveyId', token({ required: true }), deleteSurvey);

export default router;
