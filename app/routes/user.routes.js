const multer = require('multer')
const user = require("../controllers/user.controller");
const upload = multer({ dest: 'upload/' })

module.exports = app => {
    const user = require('../controllers/user.controller.js')
    const router = require('express').Router();

    router.put("/", user.create);

    router.post("/updateNickName",user.updateNickName)
    router.post("/updateSign", user.updateSign)

    router.post("/upload", upload.single('avatar'),user.editUserImg)

    router.get("/find", user.find);

    app.use('/api/user', router);


}
