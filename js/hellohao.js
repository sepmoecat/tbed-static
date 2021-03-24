$(function () {
    $.ajax({
        type: "POST",
        url: "/islogin",
        dataType: "json",
        success: function (data) {
            if(data.lgoinret==1){
                bodys();
            }else{

            }
        }
    });
});

function bodys() {
    var h = '';//<li class="active"><a class="menu-link" data-section="home" data-nav-title="home" data-section-pos="0" data-section-posy="0">'+username+'<i class="fa fa-fw fa-user"></i></a></li>
    var h1 = '<li><a class="menu-link" target="_blank" href="/admin/goadmin" id="usernames">控制台&nbsp;<i class="fa fa-fw fa-list"></i></a></li>';
    var h2 = '<li><a class="menu-link" style="cursor: pointer;"  onclick="exit()">退&nbsp;出&nbsp;<span class="glyphicon glyphicon-log-out"></span></a></li>';
    $("#usersrc").html(h + h1 + h2);
}


function zhuce(mail, registerusername, registerpassword) {
    if(zcverification){
        //验证成功
        $.ajax({
            type: "POST",
            url: "/user/register",
            data: {email: mail, username: registerusername, password: registerpassword,zctmp:zctmp},
            dataType: "json",
            success: function (data) {
                if (data.ret > 0) {
                    $("#zctishi").text('注册成功');
                    if (data.zctype == 1) {
                        layer.alert('注册成功，请前往邮箱激活你的账号，注意！激活邮件如果迟迟未收到，有可能在您的【垃圾箱】中。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 1
                            ,yes:function(){
                                window.location.reload();
                            }
                        });
                    } else {
                        layer.alert('注册成功，快去登录体验吧。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 1
                            ,yes:function(){
                                window.location.reload();
                            }
                        });
                    }
                } else {
                    if (data.ret == -2) {
                        layer.alert('注册失败，用户名或邮箱重复且用户名只能为字母数字，请重试。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 2
                        });
                    } else if(data.ret == -3){
                        layer.alert('本站关闭了注册功能。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 2
                        });
                    }else if(data.ret == -4){
                        layer.alert('非法注册，请刷新页面后重新尝试。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 2
                        });
                    }else {
                        layer.alert('注册失败，请重试。', {
                            skin: 'layui-layer-molv'
                            ,closeBtn: 0
                            ,anim: 1
                            ,btn: ['确定']
                            ,icon: 2
                        });
                    }
                    setTimeout(function () {
                    }, 2000);
                }
                again(2);
                $("#userzc").css('display','block');
                $("#zctishi").css('display','none');
            }
        });
    }else{
        shakeModal(6);
        $("#userzc").css('display','block');
        $("#zctishi").css('display','none');
    }
}
//登录
function loginAjax() {
    var loginemail = $("#loginemail").val();
    var loginpassword = $("#loginpassword").val();
    if(verification){
        //验证成功
        $.ajax({
            type: "POST",
            url: "/user/login",
            data: {email: loginemail, password: loginpassword,logotmp:logotmp},
            dataType: "json",
            success: function (data) {
                $('#loginModal').modal('hide');
                if (data == 1) {
                    //toastr.success("登录成功。");
                    //$.cookie('name_hellohaobycookie', loginemail, { expires: 90});
                    //$.cookie('pass_hellohaobycookie', loginpassword, { expires: 90});
                    //$.cookie('Hellohao_UniqueUserKey', loginpassword, { expires: 90});
                    $('#modal-3').removeClass("md-show");
                    $('#modal-3').removeClass("md-show");
                    layer.msg('登录成功', {icon: 1});
                    setTimeout(function () {
                        window.location.reload();
                        bodys();
                    }, 1000);
                } else {
                    if (data == -1) {
                        //$('#dlts').text('您的账号是未激活状态，无法登陆。');
                        //toastr.error('您的账号是未激活状态，无法登陆。');
                        layer.msg('此账号是未激活状态，无法登陆', {icon: 4});
                        again();
                    } else if(data==-2){
                        //$('#dlts').text('您的账号已被冻结。');
                        layer.msg('您的账号处于冻结状态', {icon: 2});
                        again(1);
                    }else if(data==-3){
                        //$('#dlts').text('非法登录，请刷新页面重新尝试。');
                        layer.msg('非法登录，请刷新页面重新尝试', {icon: 2});
                        again(1);
                    }
                    else {
                        //$('#dlts').text('登录失败，你的邮箱或密码不正确');
                        layer.msg('登录失败，邮箱或者密码不正确', {icon: 2});
                        again(1);
                    }
                    setTimeout(function () {
                        //window.location.reload();
                    }, 2000);
                }
            }
        });
    }else{
        $('#dlts').text('请滑动验证码进行验证，才可登录。');
    }
}
function imgsc() {
    var str = '输入图片URL地址：';
    if(isday>0){
        str = '输入图片URL地址：('+isday+'天后将会自动销毁)';
    }
    swal(str, {
        content: "input",
    })
        .then((value) => {
            var result =value;
            if(result!=null && result!="" ){
                urlimg(result);
            }
        });
}

function copyText() {
    var data = data = $('#urls').val();
    var copy = new ClipboardJS('.copytext', {
        text: function (trigger) {
            return  data;
        }
    });
    copy.on('success', function (e) {
        layer.msg('复制成功');
        copy.off("success");
    });
    copy.on('error', function (e) {
        layer.msg('复制失败');
        copy.off("error");
    });
}

function loadScriptString(code) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        // firefox、safari、chrome和Opera
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        // IE早期的浏览器 ,需要使用script的text属性来指定javascript代码。
        script.text = code;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
}





function urlimg(result) {
    if(result) {
        var rx=/^https?:\/\//i;
        if(rx.test(result)==true){
            var msgid = layer.msg(2, {
                icon: 16,
                shade: [0.6, '#000'],
                shadeClose: false,
                time: false,
                content: '上传中...'
            });
            //qq = GetDateStr(new Date());
            $('#loadingModal').modal({backdrop: 'static', keyboard: false,upurlk:qq});
            $.ajax({
                type: "POST",
                url: "/upurlimg",
                dataType: "json",
                data: {imgurl: result,setday:isday,upurlk:qq},
                success: function (data) {
                    layer.close(msgid);
                            if (data.code == '4006') {
                                $('#loadingModal').modal('hide');
                                swal('上传失败', '图片超出上传大小限制');
                            } else if (data.code == '5000') {
                                $('#loadingModal').modal('hide');
                                swal('上传失败', '此URL图片上传失败');
                            } else if (data.code == '4005') {
                                $('#loadingModal').modal('hide');
                                swal('上传失败', '可用空间不足');
                            } else if (data.code == '4000') {
                                $('#loadingModal').modal('hide');
                                swal('上传失败', '文件类型不符合要求');
                            } else if (data.code == '4003') {
                                $('#loadingModal').modal('hide');
                                swal('非法调用，请刷新页面后重试');
                            } else if (data.code == 911) {
                                $('#loadingModal').modal('hide');
                                swal('你目前不能上传图片,请联系管理员');
                            }else if (data.code == '1000') {
                                $('#loadingModal').modal('hide');
                                swal('上传失败，管理员已经关闭你的上传功能');
                            } else if (data.code == '0000') {
                                $('#loadingModal').modal('hide');
                                swal(data.info);
                            } else {
                                for(var i=0;i<data.data.length;i++) {
                                    $('#loadingModal').modal('hide');
                                    swal('上传成功', '该图片链接已成功上传');
                                    $("#address").css('display', 'block');
                                    arr_url += data.data[i] + '\r\n';
                                    arr_markdown += '![ ](' + data.data[i] + ')\r\n';
                                    arr_html += '<img src="' + data.data[i] + '" alt="Image" title="Image" /> \r\n';
                                    arr_ddcode += '[img]' + data.data[i] + '[/img]\r\n';
                                }
                            }
                            if (urltypes == 1) {
                                $("#urls").text(arr_url);
                            } else if (urltypes == 2) {
                                $("#urls").text(arr_markdown);
                            } else if (urltypes == 3) {
                                $("#urls").text(arr_html);
                            } else {
                                $("#urls").text(arr_ddcode);
                            }
                }
            });
        }else{layer.close(msgid);Popups('网址格式错误','网址必须以http(s)://开头。','error');}
    }
}

function Popups(str1,str2,types) {
    swal({
        title: str1,
        text: str2,
        type: types,
        showCancelButton: false,//true显示两个按钮
        confirmButtonColor: "#A5DC86",
        confirmButtonText: "知道了",
        closeOnConfirm: true,
        closeOnCancel: false
    });
}

function urltype(urltypes){
    if(urltypes==1){
        $("#urls").text(arr_url);
    }else if(urltypes==2){
        $("#urls").text(arr_markdown);
    }else if(urltypes==3){
        $("#urls").text(arr_html);
    }else{
        $("#urls").text(arr_ddcode);
    }
}
//获取当前时间
function clock(){
    now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    today = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    week = today[now.getDay()];
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (day < 10) {
        day = "0" + day;
    }
    //$("#nian").html(year);
    //$("#yue").html(month);
    $("#ri").html(day);
    $("#shi").html(hour);
    $("#fen").html(min);
    $("#miao").html(sec);
}

// function xiazai(){
//     swal({
//         title: "即将下载客户端",
//         text: "客户端目前持支Windows系统，其他系统请勿下载。",
//         icon: "success",
//         buttons: true,
//         buttons: ["取消", "下载"],
//         dangerMode: false,
//     })
//         .then((value) => {
//             if (value) {
//                 window.open("http://img.wwery.com/HellohaoApps/PC/Hellohao%E5%9B%BE%E5%BA%8A_beta.exe");
//             } else {
//             }
//         });
// }
//回车登录
function keyLogin(){
    if (event.keyCode==13)
        document.getElementById("dl").click();
}

//网站退出
function exit() {
    $.ajax({
        type: "POST",
        url: "/user/exit.do",
        dataType: "json",
        success: function (data) {
            $.cookie('name_hellohaobycookie', null);
            $.cookie('pass_hellohaobycookie', null);
            layer.msg('账号已退出', {icon: 1});
            window.location.reload();
        }
    });
}
function retrievepass() {

    $('#modal-3').removeClass("md-show");
    $('#modal-3').removeClass("md-show");

    swal("请输入您的注册邮箱进行密码重置：\n(验证后密码将重置为’123456‘)", {
        content: "input",
        html: true,
    })
        .then((value) => {
            var result =value;
            var reg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(result!=null && result!="" ){
                if(reg.test(result)){
                    var retrievetoken=$('#vu').val();
                    $.ajax({
                        type: "POST",
                        url: "/user/retrievepass",
                        dataType: "json",
                        data:{email:result,retrievetoken:retrievetoken},
                        success: function (data) {
                            swal(data[0]);
                        }
                    });
                }else{
                    swal('邮箱格式不正确');
                }
            }

        });
}