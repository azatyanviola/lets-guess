/* eslint-disable eol-last */
const express = require('express');
const questionRt = express.Router();
const { QuestionCtrl } = require('../controllers/adminController');

questionRt.get('/', QuestionCtrl.getQuestionsController);
questionRt.get('/:id', QuestionCtrl.getQuestionController);

questionRt.post('/', QuestionCtrl.postQuestionsController);
questionRt.put('/', QuestionCtrl.putQuestionsController);
questionRt.delete('/', QuestionCtrl.deleteQuestionsController);

module.exports = questionRt;