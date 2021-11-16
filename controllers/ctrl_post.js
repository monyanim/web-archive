const post = require('../models/model_post');
const path = require('path');

module.exports = {
    my_storage : function(req, res){
        if(req.session.user_id){
            post.my_list(req, function(err, maxpage, current_page, list){
                res.render('my_storage', {maxpage : maxpage, list : list, req : req, page : current_page});
            });
        }else{        
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    add_post : function(req, res){
        if(req.session.user_id){
            res.render('add_post', {req : req});
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    add_post_result : function(req, res){
        if(req.session.user_id){
            post.insert_post(req, function(err, err1, err2, err3){
                if(err) res.send(`<script>alert('${err}');</script>`);
                else if(err1) res.send(`<script>alert('${err1}');</script>`);
                else if(err2) res.send(`<script>alert('${err2}');</script>`);
                else if(err3) res.send(`<script>alert('${err3}');</script>`);
                else res.send(`<script>alert('저장하였습니다.'); window.location.href = 'my_storage?page=1'; </script>`);
                
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    read_post : function(req, res){
        if(req.session.user_id){
            post.read_post(req, function(err, page, data){
                if(data.rows[0][0] != req.session.user_id){
                    res.send(`<script>alert('잘못된 접근입니다.'); window.location.href = 'login'; </script>`);
                }else{
                    res.render('read_post', {req : req, data : data, page : page});
                }
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    read_archive : function(req, res){
        if(req.session.user_id){
            console.log(path.resolve(__dirname + `/../files/${req.body.post_num}.html`));
            res.sendFile(path.resolve(__dirname + `/../files/${req.body.post_num}.html`));
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    update_post : function(req, res){
        if(req.session.user_id){
            post.read_post(req, function(err, page, data){
                if(data.rows[0][0] != req.session.user_id){
                    res.send(`<script>alert('잘못된 접근입니다.'); window.location.href = 'login'; </script>`);
                }else{
                    res.render('update_post', {req : req, data : data, page : page});
                }
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    update_post_result : function(req, res){
        if(req.session.user_id){
            post.update_post(req, function(err, page, post_num){
                if(err) res.send(`<script>alert('${err}');</script>`);
                else res.send(`<script>alert('수정하였습니다.'); window.location.href = '../post/${post_num}?page=${page}'; </script>`);
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    },
    delete_post_result : function(req, res){
        if(req.session.user_id){
            post.delete_post(req, function(err){
                if(err) res.send(`<script>alert('${err}');</script>`);
                else res.send(`<script>alert('삭제되었습니다.'); window.location.href = '../my_storage?page=1'; </script>`);
            });
        }else{
            res.send(`<script>alert('로그인 후 이용하세요.'); window.location.href = 'login'; </script>`);
        }
    }
}