module.exports=(sequelize, Sequelize)=>{
    return sequelize.define("user", {
        userName: {
            type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        nickName: {
            type: Sequelize.STRING
        },
        sign: {
            type: Sequelize.STRING
        },
        avaUrl: {
            type: Sequelize.STRING
        }
    })
}
