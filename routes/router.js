const express = require('express');
const router = express.Router();
const ctrl_user = require('../controllers/ctrl_user');
const ctrl_post = require('../controllers/ctrl_post');
const passport = require('passport');

router.get('/', ctrl_user.main);//메인 화면
router.get('/login', ctrl_user.login);//로그인 화면
router.post('/login', ctrl_user.login_result);//로그인 결과
router.get('/logout', ctrl_user.logout);//로그아웃
router.get('/create_account', ctrl_user.create_account);//회원가입 화면
router.post('/create_account', ctrl_user.create_account_result); //회원가입 결과 화면
router.get('/mypage', ctrl_user.mypage);//내 정보 수정 화면
router.post('/mypage', ctrl_user.mypage_result);//내 정보 수정 결과


router.get('/my_storage', ctrl_post.my_storage);//내 저장소

router.get('/add_post', ctrl_post.add_post);//글 작성
router.post('/add_post', ctrl_post.add_post_result);//글 작성 결과


router.get('/update_post/:post_num', ctrl_post.update_post);//글 수정 화면
router.post('/update_post/:post_num', ctrl_post.update_post_result);//글 수정 결과

router.get('/post/:post_num', ctrl_post.read_post);//글 읽기
router.get('/delete/:post_num', ctrl_post.delete_post_result);//글삭
/*
router.get('/sewing', ctrl_user.sewing)//재봉
router.get('/craft', ctrl_user.craft)//세공
router.get('/cook', ctrl_user.cook)//요리
*/
module.exports = router;