const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"

exports.connect = ()=>{
   // 连接数据库
   mongoose.connect(db)

   // 增加数据库监听事件
   // 数据库连接失败
   mongoose.connection.on('disconnected',()=>{
      mongoose.connect(db)
   })
   // 数据库错误
   mongoose.connection.on('error',()=>{
      mongoose.connect(db)
   })
   // 数据库连接打开时
   mongoose.connection.once('open',()=>{
      console.log("------------------")
   })

}