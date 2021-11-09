module.exports = {
    /*
    insert : function(conn, callback){
        conn.execute = `insert into postlist values ('id_test', 'url_test', 'path_pdf_test', 
        to_date('10-18-2021 11:11:11','MM-DD-YYYY HH24:MI:SS'), 'tag1_test', 'tag2_test', 
        'tag3_test', 'tag4_test', 'tag5_test', 'tag6_test', 'tag7_test', 'tag8_test', 
        'tag9_test', 'tag10_test')`;
    },
    */
    create_account_process : function(req, callback){
        let result = 'denied';
        let message_id = '';
        let message_nickname = '';
        //console.log(req.body);
        req.conn.execute(`select id from user_table where id = '${req.body.id}'`, [], [], function(err, list_id){
            if(list_id.rows[0][0]) message_id = 'id 중복';
            //console.log(result, message_id);
            req.conn.execute(`select nickname from user_table where nickname = '${req.body.nickname}'`, [], [], function(err1, list_nickname){
                if(list_nickname.rows[0][0]) message_nickname = '닉네임 중복';
                if((message_id=='')&&(message_nickname=='')){
                    req.conn.execute(`insert into user_table values('${req.body.id}', '${req.body.pw}', '${req.body.nickname}', '${req.body.email}')`, [], [], function(err2, data){
                        result = 'succeed';
                        callback(result, message_id, message_nickname);
                    });
                }else{
                    callback(result, message_id, message_nickname);
                }
            })
        })

        /*
        conn.execute(`insert into user_table values('${req.body.id}', '${req.body.pw})', '${req.body.nickname}',
        '${req.body.email}')`, [], [], );
        */
    },
    login_process : function(req, callback){
        let result = false;
        let err = '';
        req.conn.execute(`select * from user_table where id = '${req.body.id}'`, [], [], function(err, id_data){
            if(id_data.rows[0]){
                if(req.body.pw == id_data.rows[0][1]){
                    req.session.user_id = req.body.id;
                    req.session.nn = id_data.rows[0][2];
                    req.session.email = id_data.rows[0][3];
                    result = true;
                }else{
                    err = '비밀번호가 다릅니다.';
                }
            }else{
                err = '아이디가 없습니다.';
            }
            callback(err, result);
        });
    },
    mypage : function(req, callback){
        req.conn.execute(`select * from user_table where id = '${req.session.user_id}'`, [], [], function(err, data){
            callback(err, data);
        });
    },
    mypage_process : function(req, callback){
        let result = 'denied';
        let message_nickname = '';
        req.conn.execute(`select * from user_table where nickname = '${req.body.nickname}'`, [], [], function(err, data){
            if(data.rows[0]!=undefined){
                if(data.rows[0][0]!=req.session.user_id) message_nickname = '닉네임 중복';
            }
            if(message_nickname==''){
                req.conn.execute(`update user_table set password = '${req.body.pw}', nickname = '${req.body.nickname}', email = '${req.body.email}' where id = '${req.session.user_id}'`, [], [], function(err1, data1){
                    result = 'succeed';
                    callback(err, err1, result, message_nickname, req.body);
                });
            }else{
                callback(err, undefined, result, message_nickname, req.body);
            }
        });
    }
}
