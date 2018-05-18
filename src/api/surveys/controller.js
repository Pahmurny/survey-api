import Survey from './model';

export const getSurveyById = ({ user, params: { surveyId } }, res) => {
  console.log('Getting by id:', surveyId);
  return Survey.findOne({ _id: surveyId })
    .then((response) => {
      console.log('getSurveyById response ', response);
      console.log('? ', typeof response.owner, ' -- ', typeof user._id);
      if (user._id.equals(response.owner)) {
        console.log('getSurveyById reqested by owner');
        return res.status(200).json(response);
      }
      if (response.published === true) {
        console.log('getSurveyById reqested published');
        return res.status(200).json(response);
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
      console.log('getMySurveys response ', response);
      return res.status(200).json(response);
    })
    .catch((error) => {
      console.error('getMySurveys error ', error);
      return res.status(400).json(error);
    });
};

export const createSurvey = ({ user, body }, res) => {
  console.log('Creating survey:', body);
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

export const deleteSurvey = ({ user, params: { surveyId } }, res) => {
  console.log('Deleting survey:', surveyId);
  return Survey.deleteOne({ _id: surveyId, owner: user._id })
    .then((response) => {
      console.log('Survey deleted', response);
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
