const fs = require('fs')
const express = require('express')

const router = express.Router()

const App = require('./App')




const se = "Server error"

router
    .get('/App', function(req,res){
        App.get_list((err,data)=>{
            if(err){
                return res.status(500).send( se )
            }
            res.status(200).json(data)
            })
    })
    .delete('/App/:id', function(req, res){
        const { id } = req.params
        if(!id) {
            res.status(404).json({'error':'请输入有效id'})
        }else{
          App.delete(id, (err,data)=>{
              if(err){
                  return res.sendStatus(500).json({"error":"删除失败"})
              } else{
                  return res.status(200).send('ok')
              }
              
          })  
        }
    })
    // 添加
    .post('/App',function(req,res){
        const { body } = req
        if(!body.name){
            res.status(400).send({"error":"请输入name"})
        }else if(!body.value){
            res.status(400).send({"error":"请输入value"})
        }else{
            App.add(body, (err,data)=>{
                if(err){
                    res.status(400).send({"error":"添加失败"})
                }else{
                    res.status(200).send('ok')
                }
            })
        }
    })

    // 修改
    .post('/App/:id', function(req,res){
        const { params: { id }, body } = req
        if(!id){
            return res.status(400).send('id is error')
        }
        App.update( parseInt(id), body ,(err,data)=>{
            if(err){
                if(!err.flag){
                    return res.status(400).send( { "error":"没有当前项目" } )
                }else{
                    return res.status(400).send( { "error":"没有更新项目" } )
                }
            }
            return res.status(200).send("ok")
        })
    })

module.exports = router;