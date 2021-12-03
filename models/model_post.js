const fs = require('fs');
const request = require('request');

let postlist = function(select_list, page_num, callback){ //게시글 목록 로드(확인 필요)
    const onepage = 20; //한 페이지 최대 게시글 수
    let maxpage = Math.ceil(select_list.rows.length/onepage); //최대 몇 페이지까지 있는지
    let page_list_min = (page_num-1)*onepage; //각 페이지의 첫번째 글
    let page_list_max = page_num*onepage; //각 페이지의 마지막 글
    let result = []; //해당 페이지의 게시글 배열

    if(page_num == maxpage){
        page_list_max = select_list.rows.length;
    }
    if(select_list.rows.length > 0){
        for(let i=page_list_min; i<page_list_max; i++){
            result.push(select_list.rows[i]);
        }
    }
    callback(maxpage, result);
}

module.exports = {
    my_list : function(req, callback){
        req.conn.execute(`select * from postlist where id = '${req.session.user_id}' order by savedate desc`, [], [], function(err, list_post){
            postlist(list_post, req.query.page, function(maxpage, list_page){
                //console.log(list_post, req.query.page, list_page);
                callback(err, maxpage, req.query.page, list_page);
            })
        });
    },
    insert_post : function(req, callback){
        req.conn.execute(`insert into postlist values ('${req.session.user_id}', '${req.body.url}', 'path_pdf', sysdate, '${req.body.tag1}', 
        '${req.body.tag2}', '${req.body.tag3}', '${req.body.tag4}', '${req.body.tag5}', '${req.body.tag6}', '${req.body.tag7}', '${req.body.tag8}', 
        '${req.body.tag9}', '${req.body.tag10}', '${req.body.title}', post_num.nextval, '${req.body.text}')`, [], [], function(err, insert){
            req.conn.execute(`select * from postlist where Rowid='${insert.lastRowid}'`, [], [], function(err1, result){
                request(result.rows[0][1], function(err2, response, html){
                    if(err2) console.log(err2);
                    console.log("html은 !!! " + html);
                    fs.writeFile(`files/${result.rows[0][15]}.html`, html, 'utf-8', function(err3){
                        if(err3) console.log(err3);
                        callback(err, err1, err2, err3);
                    });
                });
            });
        });
    },
    read_post : function(req, callback){
        req.conn.execute(`select * from postlist where post_num = ${req.params.post_num}`, [], [], function(err, post){
            callback(err, req.query.page, post);
        });
    },
    update_post : function(req, callback){        
        req.conn.execute(`update postlist set title='${req.body.title}', url='${req.body.url}', text='${req.body.text}', tag1='${req.body.tag1}', 
        tag2='${req.body.tag2}', tag3='${req.body.tag3}', tag4='${req.body.tag4}', tag5='${req.body.tag5}', tag6='${req.body.tag6}', 
        tag7='${req.body.tag7}', tag8='${req.body.tag8}', tag9='${req.body.tag9}', tag10='${req.body.tag10}', savedate = sysdate 
        where post_num = ${req.body.post_num}`, [], [], function(err, update){
            callback(err, req.body.page, req.body.post_num);
        });
    },
    delete_post : function(req, callback){
        req.conn.execute(`delete from postlist where post_num = ${req.params.post_num}`, [], [], function(err, result){
            callback(err);
        })
    }
}