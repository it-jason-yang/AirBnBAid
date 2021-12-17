const { Reports, Sequelize } = require('../../models');
const createError = require('http-errors');
const sanitizeHtml = require('sanitize-html');
const Op = Sequelize.Op;

const reportSubmit = async (req, res, next) => {
    try {
        const originalUrl = req.file.location
        const {category} = req.body
        const {content} = req.body
        
        const reports = await Reports.create({
            category: category,
            content: content,
            img: originalUrl,
          });
          
        res.status(200).send(reports);

    } catch (error) {
        console.log(error);
        return next(createError(422, 'Unprocessable T_T...'));
    }

}

module.exports = {
    reportSubmit,
};