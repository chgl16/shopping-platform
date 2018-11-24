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
	var img_inp = shop_form.img;
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