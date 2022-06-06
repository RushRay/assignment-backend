const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require("multer");

const app = new express()
const corsOptions = {
    origin: 'http://localhost:8080'
};
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./upload/')); // 设置静态图片访问的路径

const db = require("./app/models/index")
db.sequelize.sync()
require("./app/routes/user.routes")(app)

app.listen(3000, () => {
    console.log('运行成功，端口3000')
})
