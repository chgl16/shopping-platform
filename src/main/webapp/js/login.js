var phoneInput = document.getElementById('phone');//电话号码input框
var passwordInput = document.getElementById('password');//密码input框
var icode = document.getElementById('icode');//验证码输入框
var loginBtn = document.getElementById('login-btn');//登录按钮


//正则对象
var regs = {
    phone: /^1[34578]\d{9}$/,//电话号码
    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/ //6-16位数字和字母的组合
}


//点击登录向后台发送数据
loginBtn.onclick = function(){
    checkAll();
}

//ajax数据交互
function loginAjax(){
    console.log('开始数据交互');

    phone = $("#phone").val();
    password = $("#password").val();


    console.log("phone: " + phone + ", password: " + password);
    $.post({
        url: "/login",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        data: {"phone": phone, "password": password},
        success: function(data) {
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
            if (str == "false") {
                console.info("登录失败");
                alert("登录失败，密码错误或者未注册 ...");
                // 还是以html的位置为基准，不是js
                window.location.href = "login.html";
            } else {
                console.info("登录成功");
                // 保存数据
                localStorage.setItem('userId', data.id);
                localStorage.setItem('phone', data.phone);
                localStorage.setItem('username', data.username);
                localStorage.setItem('roleType', data.roleType);
                localStorage.setItem('userImgUrl', data.imgUrl);
                localStorage.setItem('userContactPhone', data.contactPhone);
                localStorage.setItem('userContactAddress', data.contactAddress);
                window.location.href = "index.html";
            }
        },
        error: function(data) {
            console.error("失败");
            console.error(JSON.stringify(data));
        }
    });
}






window.onload=function(){
    changeImg();
}
//鼠标移出各种验证函数执行
icode.onmouseout= function(){
    check();
}
icode.onmousedown = function(){
    changeImg();
}
passwordInput.onmouseout = function(){
    checkPassword();
}

phoneInput.onmouseout = function(){
    checkPhone();
}

//验证电话号码
function checkPhone(){
    var phone = document.getElementById('phone').value;
    var checkPhoneTip = document.getElementById('check-phone');
    if(!regs.phone.test(phone)){
        checkPhoneTip.innerHTML='电话号码格式错误,请重新输入';
        loginBtn.disabled = true;
        return false;
    }else{
        checkPhoneTip.innerHTML='';
        loginBtn.disabled = false;
        return true;
    }

}
//验证密码
function checkPassword(){
    var password = document.getElementById('password').value;
    var checkPasswordTip = document.getElementById('check-password');//校验密码框提示
    if(!regs.password.test(password)){
        checkPasswordTip.innerHTML='密码格式,请输入6-16位数字和字母的组合';
        loginBtn.disabled = true;
        return false;
    }else{
        checkPasswordTip.innerHTML='';
        loginBtn.disabled = false;
        return true;
    }
}

//验证码
function changeImg(){
    var arr = new Array(
        '1','2','3','4','5','6','7','8','9','0',  
        'a','b','c','d','e','f','g','h','i','j',  
        'k','l','m','n','o','p','q','r','s','t',  
        'u','v','w','x','y','z',  
        'A','B','C','D','E','F','G','H','I','J',  
        'K','L','M','N','O','P','Q','R','S','T',  
        'U','V','W','X','Y','Z'               
    );  
    code='';
    //随机获得四个字符作为验证码
    for(var i = 0;i < 4;++ i){
        var random = parseInt(Math.random()*arr.length);
        code += arr[random];
    }
    document.getElementById('code').innerHTML = code;
}


//检验验证码
function check(){
    var input = document.getElementById('icode').value;
    var checkCodeTip = document.getElementById('check-code');
    if(input.toLowerCase() == code.toLowerCase()){
        checkCodeTip.innerHTML='';
        loginBtn.disabled = false;
        return true;
    }else{
        checkCodeTip.innerHTML='验证码输入不正确,请重输';
        loginBtn.disabled = true;
        return false;
    }
       
}

function checkAll(){
    if(checkPhone()&&checkPassword()&&check()){
        loginAjax();
    }
    else{
        swal("", "请输入正确信息", "error");
    }
}