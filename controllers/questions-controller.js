const Question = require('../models/questionSchema.js');
const mongoose = require('mongoose');

class QuestionsCtrl {
    // //////////////////////////////////////////////////////
    static async getQuestionsController(req, res) {
        const questions = await Question.find();

        return res.send({
            data: questions,
        });
    }
    // //////////////////////////////////////////////////////
    static async getQuestionController(req, res) {
        const { id } = req.params;

        const question = await Question.findOne({ _id: id });

        return res.send(question);
    }
    // //////////////////////////////////////////////////////

    static async postQuestionsController(req, res) {
        const questionBody = req.body;

        try {
            const saveData = await Question.create(questionBody);

            return res
                .status(201)
                .send({
                    data: saveData,
                });
        } catch (error) {
            res
                .status(400)
                .send({ message: 'Invalid data' });
        }
    }
    // //////////////////////////////////////////////////////
    static async putQuestionsController(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        const id = req.body._id;

        const newQues = req.body;
        const ques = await Question.findOneAndUpdate({ _id: id }, newQues, { new: true });

        return res
            .status(201)
            .send({ data: ques });
    }
    // //////////////////////////////////////////////////////

    static async deleteQuestionsController(req, res) {
        const { id } = req.body;

        try {
            mongoose.Types.ObjectId(id);
        } catch (error) {
            return res
                .status(404)
                .send({ message: 'ID is invalid' });
        }

        const result = await Question.deleteOne({
            _id: mongoose.Types.ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return res
                .status(404)
                .send({ message: 'question not found' });
        }

        return res
            .status(204)
            .send();
    }
}

module.exports = {
    QuestionsCtrl,
};
