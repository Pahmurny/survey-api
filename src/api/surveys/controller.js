import Survey from './model';
import SurveyPage from '../pages/model';

export const getSurveyById = ({ user, params: { surveyId } }, res) => {
  const surveyWithData = {};
  return Survey.findOne({ _id: surveyId })
    .then((surveyResponse) => {
      surveyWithData.survey = surveyResponse;
      return SurveyPage.find({ owner: user._id, survey: surveyResponse._id })
        .sort('+order');
    })
    .then((pagesResponse) => {
      surveyWithData.pages = pagesResponse;
      if (user._id.equals(surveyWithData.survey.owner)) {
        return res.status(200).json(surveyWithData);
      }
      if (surveyWithData.survey.published === true) {
        return res.status(200).json(surveyWithData);
      }
      console.log('getSurveyById reqested unpublished');
      return res.status(200).json({});
    })
    .catch((error) => {
      console.error('getSurveyById error ', error);
      res.status(400).json(error);
    });
};

export const getMySurveys = ({ user, params: { sortdir } }, res) => {
  const sort = `${sortdir === 'asc' ? '+' : '-'}updatedAt`;
  return Survey.find({ owner: user._id })
    .sort(sort)
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error('getMySurveys error ', error);
      return res.status(400).json(error);
    });
};

export const createSurvey = ({ user, body }, res) => {
  /* TODO: move validation to middleware! */
  if (!body.survey) {
    return res.status(400).json({ error: { message: 'No survey data!' } });
  }
  if (!body.survey.title || typeof body.survey.title !== 'string' || body.survey.title.length < 1) {
    return res.status(400).json({ error: { message: 'Survey title is to short!' } });
  }
  return Survey.create({ title: body.survey.title, owner: user._id })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error('createSurvey error ', error);
      return res.status(400).json(error);
    });
};

export const updateSurvey = ({ user, body }, res) => {
  return Survey.update({ _id: body.survey._id, owner: user._id }, { $set: body.survey })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error('updateSurvey error ', error);
      return res.status(400).json(error);
    });
};


export const deleteSurvey = ({ user, params: { surveyId } }, res) => {
  return Survey.deleteOne({ _id: surveyId, owner: user._id })
    .then((response) => {
      return getMySurveys({ user: user, params: {} }, res);
    })
    .catch((error) => {
      console.error('deleteSurvey error ', error);
      return res.status(400).json(error);
    });
};

export default {
  getSurveyById,
  getMySurveys,
  createSurvey,
  deleteSurvey,
};
