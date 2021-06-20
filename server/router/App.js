const fs = require('fs')

const path = __dirname + '/../db.json'

console.log()
const App = {

    // 获取信息列表
    get_list: function (callback) {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                return callback(err)
            }
            let { list } = JSON.parse(data)
            // console.log(list)

            let ans = []
            list.forEach(e=>{
                if(e.isDelete === false ){
                    ans.push(e)
                }
            })
            callback(null, ans )
        })

    },

    // 根据id软删除
    delete: function (id, callback) {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                return callback(err)
            }
            let { list } = JSON.parse(data)
            list.forEach(item => {
                if (item.id === parseInt(id)) {
                    item.isDelete = true
                }
            })
            let res = JSON.stringify({ list })
            fs.writeFile(path, res, err => {
                if (err) {
                    return callback(err)
                } else {
                    callback(null)
                }
            })
        })
    },

    // 添加
    add: function (item, callback) {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                return callback(err)
            }
            let { list } = JSON.parse(data)
            let { name, value } = item
            item.id = list.length + 1
            item.isDelete = false
            item.name = name
            item.value = value
            list.push(item)
            let res = JSON.stringify({ list })
            fs.writeFile(path, res, err => {
                if (err) {
                    return callback(err)
                } else {
                    callback(null)
                }
            })
        })
    },


    // 更新数据
    update : function (id, item, callback) {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                return callback(err)
            }

            let { list } = JSON.parse(data)
            console.log('update==', id , item)
            const index = list.findIndex(v=>v.id===id)
            list[index].name = item.name || list[index].name
            list[index].value = item.value || list[index].value
            if( index===-1 ) {
                return callback({"flag":false})
            }
            let res = JSON.stringify({ list })
            fs.writeFile(path, res, err => {
                if (err) {
                    return callback(err)
                } else {
                    callback(null)
                }
            })
        })
    },
}


module.exports = App