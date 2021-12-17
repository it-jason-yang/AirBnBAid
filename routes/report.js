const express = require('express');
const router = express.Router();

//ctrl 로 옮겨야함


let reportCtrl = require('./controllers/report');
let reportSubmit = reportCtrl.reportSubmit

const { Reports, Sequelize } = require('../models');

const createError = require('http-errors');
const sanitizeHtml = require('sanitize-html');
const Op = Sequelize.Op;
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path');
const env = require('dotenv').config();
const randomstring = require("randomstring");

/* GET users listing. */
// router.get('/legal', function(req, res, next) {
//   res.send('respond with a resource');
// });

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'abba-image',
        acl: 'public-read-write',
        key(req, file, cb) {
            cb(null, `report-image/${Date.now()}${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// const upload = multer({
//     storage: multer.diskStorage({
//       destination(req, file, cb) {
//         cb(null, '${__dirname}/../uploads'); //해당 경로 파일 저장
//       },
//       filename(req, file, cb) {
//         const fileName = randomstring.generate(20); //파일이름 랜덤스트링으로 생성
//         const ext = path.extname(file.originalname);
//         cb(null, fileName + Date.now() + ext); //랜덤파일명 + 일자 + 확장자
//       },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024}, //5mb제한 (바이트 단위므로 1024를 곱해서 표현)
//   });

router.get('/', function(req, res, next) {
    res.render('report', { title: 'AirBnB Aid - Report' });
  });


  try {
    fs.readdirSync('uploads');
}catch (error) {
    console.error('uploads 폴더가 없어 새로 생성합니다.')
    fs.mkdirSync('uploads');
}

router.post('/', upload.single('image-upload'), async (req, res) => {
    try {
        const originalUrl = req.file.location
        const {category} = req.body
        const {content} = req.body
        
        const reports = await Reports.create({
            category: category,
            content: content,
            img: originalUrl,
          });

        res.send({ result: true })
    } catch (error) {
        console.log(error)
    }

});



module.exports = router;
