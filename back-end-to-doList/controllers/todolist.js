const express=require('express')
const router=express.Router()
const ToDo=require('../models/Todolist')






//gets all To Do lists
///index
router.get('/',(req,res)=>{
    ToDo.find({},(err,foundToDo)=>{
        if(!err){
            res.status(200).json(foundToDo)
        }res.status(200).json(err)
    })
})


///Create Route
router.post('/',(req,res)=>{
    const {body}=req
    ToDo.create(body,(err,createdToDo)=>{
        if(!err){
            res.status(200).json(createdToDo)
        }else{
            res.status(400).json(err)
        }
    })
}

)







////DELETE Route



router.delete('/',(req,res)=>{
    ToDo.findByIdAndDelete(req.params.id,(err)=>{
        if(!err){
            res.status(200).json({message: "It has been deleted"})
        }else{
            res.status(400).json({message: "Something is broke, find it and fix it"})
        }
    })
})


///UPDATE Route

  router.put('/:id',(req,res)=>{
      const {body}=req
      ToDo.findByIdAndUpdate(req.params.id,body,{new:true},(err, updatedToDo)=>{
          if(!err){
              res.status(200).json(updatedToDo)
          }else{
              res.status(400).json(err)
          }
      })
  })

  


  router.get('/list',(req,res)=>{
      ToDo.find({},(err,foundToDo)=>{
          if(!err){
              const formattedData=foundToDo.reduce((acc,item)=>{
                  acc[item.status]=acc[item.status]? [...acc[item.status],item]:[item]
                  return acc
              },{})
              res.status(200).json(formattedData)

          }else{
              res.status(400).json(err)
          }
      })
  })





  router.put('/',(req,res)=>{
    const {body}=req
    ToDo.findByIdAndUpdate(req.params.id,body,{new:true},(err,updatedToDo)=>{
        if(!err){
            res.status(200).json(updatedToDo)
        }else{
            res.status(400).json({message:"something is broken, find it and fix it Orlando"})
        }
    })
  })
  ////SHOW Page

router.get('/:id', (req,res)=>{
    ToDo.findById(req.params.id,(err,foundToDo)=>{
        if(!err){
            res.status(200).json(foundToDo)
        }else{
            res.status(400).json({message:" something is broken again"})
        }
    })
})

module.exports=router