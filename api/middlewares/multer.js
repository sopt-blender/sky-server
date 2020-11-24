const multer = require("multer");
const aws = require("aws-sdk");
const sharp = require('sharp');
const multerS3 = require('multer-s3-transform');

aws.config.loadFromPath(__dirname + "/../../config/s3info.json");

const s3 = new aws.S3();

const upload_desktop = multer({
  storage: multerS3({
    s3: s3,
    bucket: "qring",
    contentType:multerS3.AUTO_CONTENT_TYPE,
    shouldTransform:true,
    transforms:[
      {
        id:'resized',
        key: (req,file,cb) => {
          cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
        },
        transform: (req, file, cb) => {
          cb(null, sharp().resize({width:1024, height:576, position:'left top'}))
        }
      }
    ],
    acl: "public-read-write",
  }),
});

const upload_mobile = multer({
  storage: multerS3({
    s3: s3,
    bucket: "qring",
    contentType:multerS3.AUTO_CONTENT_TYPE,
    shouldTransform:true,
    transforms:[
      {
        id:'resized',
        key: (req,file,cb) => {
          cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
        },
        transform: (req, file, cb) => {
          cb(null, sharp().resize({width:360, height:640, position:'left top'}))
        }
      }
    ],
    acl: "public-read-write",
  }),
});

module.exports = {upload_desktop, upload_mobile};