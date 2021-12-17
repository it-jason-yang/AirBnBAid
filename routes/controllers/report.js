const { LegalTestResults, Sequelize } = require('../../models');
const createError = require('http-errors');
const sanitizeHtml = require('sanitize-html');
const Op = Sequelize.Op;
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');

const reportSubmit = () => {
    try {
        try {
            fs.readdirSync('uploads');
        }catch (error) {
            console.error('uploads 폴더가 없어 새로 생성합니다.')
            fs.mkdirSync('uploads');
        }
        
        AWS.config.update({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            region: 'ap-northeast-2',
        });
        
        const upload = multer({
            storage: multerS3({
                s3: new AWS.S3(),
                bucket: 'abba-image',
                key(req, file, cb) {
                    cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
                },
                acl: 'public-read-write', 
            }),
            limits: { fileSize: 5 * 1024 * 1024 },
        });
        
        router.post('/', upload.array('photos', 4), (req, res) => {
            console.log('리포트 등록 탔나?')
            console.log(req)
            console.log(req.files);
            res.json({url: req.file.location})
        });
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    reportSubmit,
};