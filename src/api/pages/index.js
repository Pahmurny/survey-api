import { Router } from 'express';
import { token } from '../../services/passport';
// import { middleware as body } from 'bodymen';
import { createSurveyPage, deleteSurveyPage, updateSurveyPage } from './controller';

const router = new Router();

/**
 TODO: add apidocs
 */
router.post('/', token({ required: true }), createSurveyPage);

/**
 TODO: add apidocs
 */
router.put('/:pageId', token({ required: true }), updateSurveyPage);

/**
 TODO: add apidocs
 */
router.delete('/:pageId', token({ required: true }), deleteSurveyPage);

export default router;
