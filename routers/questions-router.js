/* eslint-disable eol-last */
const express = require('express');
const questionsRt = express.Router();
const { QuestionsCtrl } = require('../controllers/questions-controller');

questionsRt.get('/questions', QuestionsCtrl.getQuestionsController);
questionsRt.get('/questions/:id', QuestionsCtrl.getQuestionController);

questionsRt.post('/questions', QuestionsCtrl.postQuestionsController);
questionsRt.put('/questions', QuestionsCtrl.putQuestionsController);
questionsRt.delete('/questions', QuestionsCtrl.deleteQuestionsController);

module.exports = questionsRt;
