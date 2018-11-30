var shop_form = document.getElementById("shop_form");

//页面数据初始化
function getData(){
	$.ajax({
		type:"",
		url:"",
		dataType:"json",
		success:function(data){
			imgInpOnchange();
		},
		error:function(){
			console.log("出错了");
		}
	});
}


//图片input框onchange事件
function imgInpOnchange(){
	var img_inp = shop_form.image;
	var img_box = document.getElementsByClassName("img_box")[0];

	img_inp.onchange = function(){
		readFile(img_inp,img_box);
	}		
}
imgInpOnchange();
//读取图片文件函数
function readFile(inputBox,imgBox){//input文件，图片盒子
	var fileObj = inputBox.files[0];
	var fileReader = new FileReader();//读取文件对象
	fileReader.readAsDataURL(fileObj);//读取文件
	fileReader.onload = function(){//读取文件成功
		console.log("读取文件成功");
		img_src = fileReader.result;
		console.log(img_src);
		imgBox.src = fileReader.result;//返回读取结果	
	}
}
//初始化确认弹出框
function surePopUpFun(tipText){
	var html ='';
	html += '<span>'+tipText+'</span>';
	html += '<div>确定</div>';
	tips_pop.innerHTML = html;
}
//显示遮罩和弹出层
function showMask(pop_layer){//传入需显示的弹出层
	mask.classList.remove("hidden");
	mask.classList.add("show");
	pop_layer.classList.remove("hidden");
	pop_layer.classList.add("show");
}
//隐藏遮罩和弹出层
function hiddenMask(pop_layer){//传入需隐藏的弹出层
	mask.classList.remove("show");
	mask.classList.add("hidden");
	pop_layer.classList.remove("show");
	pop_layer.classList.add("hidden");
}

window.onload = function (ev) {
	console.log("更新头像");
    // 初始化店铺图片(不知道为啥id选择器在这里得到的是数组）
    $("#image")[0].src = localStorage.getItem("storeImgUrl");
}

/**
 * @chgl16
 */
$(".post_btn")[0].onclick = function() {
    // 设置要提交的店铺id
    $("input[name='id']").val(localStorage.getItem("storeId"));

    var formData = new FormData();
	formData.append("id", localStorage.getItem("storeId"));
	formData.append("name",  $("input[name='name']").val());
    formData.append("address",  $("input[name='address']").val());
    formData.append("introduction",  $("textarea[name='introduction']").val());
    // 图片的
    formData.append("image",  $("input[name='image']")[0].files[0]);

    // 发送formDate
    $.post({
	    url: "/updateStore",
		catch: false,
		data: formData,
		processData: false,
		contentType: false,
		success: function (data) {
			console.log("str: " + JSON.stringify(data));
			if (data == "success") {
				alert("修改成功");
			}
        },
		error: function (data) {
			console.log("失败");
			alert("异常-失败");
        }
    })
};