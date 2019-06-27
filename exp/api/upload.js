var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');



/* GET users listing. */
router.post('/', function(req, res, next) {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'; //表单的编码格式
    form.keepExtensions = true; // 保留扩展名
    form.uploadDir = path.join(__dirname, '../public/images/') //文件存储路径 最后要注意加 '/' 否则会被存在public下
    form.parse(req, (err,fileds, files) => {
		console.log(files,"filesfilesfilesfiles");
      if(err) return next(err);
      let imgName = files.file.name;
      let oldPath = files.file.path;
      let newPath = path.join(path.dirname(oldPath), imgName);
      console.log(newPath)
      fs.rename(oldPath, newPath, (err) => {
        if (err) return next(err);
          res.json({imgName}) // 向前端返回服务器上的图片名称
      })
    })


});

module.exports = router;

