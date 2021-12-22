const { Reports, Sequelize } = require('../../models');
const createError = require('http-errors');
const sanitizeHtml = require('sanitize-html');
const Op = Sequelize.Op;

const reportSubmit = async (req, res, next) => {
    try {
        let originalUrl = ''
        if (req.file) {
            originalUrl = req.file.location
        }
        const {category} = req.body
        const {content} = req.body
        
        const reports = await Reports.create({
            category: category,
            content: content,
            img: originalUrl,
          });
          
        res.status(200).render('index', { title: 'AirBnB Aid' }).send({msg :'정상적으로 접수되었습니다.'});

    } catch (error) {
        console.log(error);
        return next(createError(422, 'Unprocessable T_T...'));
    }

}

module.exports = {
    reportSubmit,
};