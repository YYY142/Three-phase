/**
 * Created by SYT on 2016-07-31.
 */
var Box=document.getElementById("Box");
var loginBox=document.getElementById("loginBox");
var zhuceBox=document.getElementById("zhuceBox");
function login(){
    Box.style.visibility="visible";
    loginBox.style.visibility="visible"
    console.log("456")
}
function switchLogin(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="hidden";
    loginBox.style.visibility="visible"
}
function switchZhuce(){
    Box.style.visibility="visible";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="visible"
}
function zhuce(){
    Box.style.visibility="visible";
    zhuceBox.style.visibility="visible"
}
function close1(){
    console.log("123")
    Box.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    zhuceBox.style.visibility="hidden"
}

//yq add 2020/8/25
$(function(){
    $('#loginBtn').click(function(){
    let user = $('#loginUser').val();
    let pwd = $('#loginPwd').val();
        if(user.trim().length==0){
            layer.alert('用户名不能为空');
        }else if(pwd.trim().length==0){
            layer.alert('密码不能为空');
        }else{
            //loading显示
            var index = myloading();
           
            $.ajax({
                type: "POST",
                url: "/userLogin",
                data: "user="+user+'&pwd='+pwd,
                // dataType: "dataType",
                success: function (data) {
                    layer.close(index); 
                    layer.alert(data.message);
                    if(data.code == 200){
                        close1();
                        // location.reload();//刷新页面
                        console.log(data);
                        $('#user').html(`
                        <span onclick=login()>${data.data[0].userName}</span>
                        <span>|</span>
                        <span>
                        <img src="${data.data[0].HeadImage}" alt="" class='userHead'>
                        </span>
                        `)
                    }
                }
            });
        }
    })
    $('#zhuceBtn').click(function(){
        var obj = {"Email":"邮箱","zhuceUser":"用户名","zhucePwd":"密码不能为空","resPwd":"确认密码不能为空"};
        var flag =true;
        for(var key in obj){
            if($("#"+key).val().trim().length==0){
                flag = false;
                layer.alert(obj[key]+"不能空");
                break;
            }
        }
        if(flag){
            var index = myloading();

            $.ajax({
                type:"post",
                url:"/reg",
                data:$("#fromReg").serialize(),
                success:function(data){
                    layer.close(index);
                    layer.alert(data);
                    if(data =="注册成功"){
                        switchLogin();
                    }
                }
            })
        
        }
    })
})

function myloading(){
    return layer.load(2, {
        shade: [0.5, '#000'],
        content: '莫慌莫慌',
        success: function (layero) {
            layero.find('.layui-layer-content').css({
                'paddingTop': '40px',
                'textAlign': 'center',
                'backgroundPositionX': 'center',
                'color': '#fff',
                'fontSize': '16px',
                'fontWeight': '700',
                'letterSpacing': '2px'
            });
        }
    });
}
