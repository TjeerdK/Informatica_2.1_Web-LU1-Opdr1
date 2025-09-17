const authService=require('../services/auth.service');

const authController={
    validate:(req,res,next)=>{
        next();
    },
    login:(req,res,next)=>{
        // console.log(req.method);
        let {email, password} = req.body;
        if (req.method === 'GET') {
            return res.render('auth/login');
        }
        else if (req.method === 'POST') {
            authService.login(email,password,(err,user)=>{
                if(err) {
                    // logger.error("Error during login: " + err.message);
                    return res.render('auth/login', {error: err.message});
                }
                req.session.user = user;

                req.session.authenticated = true;
                // console.log(req.session.authenticated);
                res.redirect('/movies')
            })
        }
    },
    logout:(req,res,next)=>{
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/auth/login');
        });
    },
    isLoggedIn:(req,res,next)=>{
        if(req.session && req.session.user){
            next();
        } else {
            // res.redirect('/auth/login');
            const error = new Error('Not logged in');
            next(error);
        }
    },
    register:(req,res,next)=>{
        if (req.method === 'GET') {
            return res.render('auth/register');
        }
        else if (req.method === 'POST') {
            if(!username || !password) {
                const error = new Error('Username and password are required');
                return next(error);
            }
            authService.login(username,password,(err,user)=>{
                // if(err) {
                //     logger.error("Error during login: " + err.message);
                //     return res.render('login', {error: err.message});
                // }
                if(error) return next(error);
                req.session.user = user;
                res.redirect('/movies')

                // if(err) {
                //     logger.error("Error during login: " + err.message);
                //     return res.render('login', {error: err.message});
                // }
            })
        }
    }

}

module.exports=authController;