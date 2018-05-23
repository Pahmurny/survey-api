import SurveyPage from './model';

export const getSurveyPages = ({ user, params: { survey } }, res) => {
  const sort = '+order';
  return SurveyPage.find({ owner: user._id, survey: survey._id })
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

export const createSurveyPage = ({ user, body }, res) => {
  console.log('Creating survey page:', body);
  // Security issue! We can pass other survey id
  const newSurvey = {
    title: body.surveyPage.title,
    order: body.surveyPage.order,
    survey: body.survey._id,
    owner: user._id,
  };
  return SurveyPage.create(newSurvey)
    .then(() => {
      return getSurveyPages({ user: user, params: { survey: body.survey } }, res);
    })
    .catch((error) => {
      console.error('createSurvey error ', error);
      return res.status(400).json(error);
    });
};

export const updateSurveyPage = ({ user, body }, res) => {
  console.log('Updating survey page:', body);
  return SurveyPage.update({ _id: body.page._id, owner: user._id }, { $set: body.page })
    .then((response) => {
      console.error('updateSurveyPage result ', response);
      return getSurveyPages({ user: user, params: { survey: { _id: body.page.survey } } }, res);
      // return res.status(200).json(response);
    })
    .catch((error) => {
      console.error('updateSurveyPage error ', error);
      return res.status(400).json(error);
    });
};


export const deleteSurveyPage = ({ user, params: { pageId } }, res) => {
  console.log('Deleting survey page:', pageId);
  let surveyId;
  return SurveyPage.findOne({ _id: pageId, owner: user._id })
    .then((response) => {
      console.log('Survey page to delete', response);
      surveyId = response.survey;
      return SurveyPage.deleteOne({ _id: pageId, owner: user._id });
    })
    .then((response) => {
      console.log('Survey page deleted', response);
      return getSurveyPages({ user: user, params: { survey: { _id: surveyId } } }, res);
    })
    .catch((error) => {
      console.error('deleteSurveyPage error ', error);
      return res.status(400).json(error);
    });
};

export default {
  getSurveyPages,
  createSurveyPage,
  updateSurveyPage,
  deleteSurveyPage,
};
