const userService=require('../services/user.service');

const userController={
    get:(req,res,next)=>{
        let userId=req.params.userId;
        userService.get(userId,(err,users)=>{
            if(err) next(err);

            if(users){
                res.render('users', { users });
            }   
        });
    },
    delete:(req,res,next)=>{
        let userId=req.params.userId;
        userService.delete(userId,(err,result)=>{
            if(err) next(err);
            if(result){
                res.status(204).send();
            }
        });
    }
}

module.exports=userController;