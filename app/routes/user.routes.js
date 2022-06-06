const multer = require('multer')
const upload = multer({ dest: 'upload/' })

module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const router = require('express').Router();

    router.post("/", user.create);
    router.post("/updateNickName",user.updateNickName)
    router.get("/find", user.find);

    router.post("/upload", upload.single('avatar'),user.editUserImg)


    app.use('/api/user', router);


}
