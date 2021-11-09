const user = require('../models/model_user');

module.exports = {
    main : function(req, res){
        res.render('main', {req : req});
    },
    login : function(req, res){
        if(req.session.user_id){
            res.redirect('/');
        }else{        
        res.render('login', {req : req});
        }
    },
    login_result : function(req, res){
        user.login_process(req, function(err, result){
            if(result == true){
                res.redirect('/');
                //res.render('main', {req : req});
            }else{
                res.send(`<script>alert('${err}'); window.location.href = 'login'; </script>`);
            }
        })
    },
    logout : function(req, res){
        req.session.destroy(function(err){
            res.redirect('/');
        });
    },
    create_account : function(req, res){
        res.render('create_account', {id : undefined, nickname : undefined, req : req});
    },
    create_account_result : function(req, res){
        user.create_account_process(req, function(err, message_id, message_nickname){
            console.log(err);
            if(err === 'succeed') res.send(`<script>alert('회원가입이 완료되었습니다.'); window.location.href = 'login'; </script>`);
            else res.render('create_account', {id : message_id, nickname : message_nickname, req : req});
        });
    },
    mypage : function(req, res){
        if(req.session.user_id){
            user.mypage(req, function(err, data){
                if(err) res.send(`<script>alert('${err}');</script>`);
                else res.render('mypage', {message : undefined, data : data, req : req});
            })
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    mypage_result : function(req, res){
        if(req.session.user_id){
            user.mypage_process(req, function(err, err1, result, message, body){
                console.log(result);
                if(err) res.send(`<script>alert('${err}');</script>`);
                if(err1) res.send(`<script>alert('${err1}');</script>`);
                if(result === 'succeed') res.send(`<script>alert('개인정보 수정이 완료되었습니다. 로그아웃됩니다.'); window.location.href = '../logout'; </script>`);
                else res.render('mypage', {message : message, data : undefined, req : req, input : body});
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    }
    /*
    main : function(req, res){
        model.select(req.conn, function(err, result){
            res.render('layout', {data : result});
        })
    },
    
    metal_armor : function(req, res, next){
        //res.render('home');
    },
    metal_weapon : function(req, res, next){

    },
    sewing : function(req, res, next){

    },
    craft : function(req, res, next){

    },
    cook : function(req, res, next){

    },
    */
}