//获取元素
var book_form = document.getElementById("book_form");//表单
var img_box = document.getElementsByClassName("img_box");
var file_input = book_form.image; //文件input
var put_img = document.getElementsByClassName("put_img");
var img_text = document.getElementsByClassName("img_text");
var form_btn = document.getElementsByClassName("form_btn")[0];//提交按钮
var form_tips = document.getElementsByClassName("form_tips");
var img_tip = document.getElementsByClassName("img_tip")[0];
var img_inp_1 = "";//第一张图片
var regs = {
	no:/^[a-zA-Z0-9_]{0,}$/,
	price:/^\d{1,}$/
}

//日期插件
laydate.render({
  elem: '#timePlugin' //指定元素
});

inputOnchange();

/** 不直接ajax
form_btn.onclick = function(){
	formPost();
} */
inp_onblue_onkeyput();



//图片inupt框事件
function inputOnchange(){
	for(let i=0,len=file_input.length;i<len;i++){
		file_input[i].onchange = function(){

			var fileObj = file_input[i].files[0];
			if(i==0){
				img_inp_1 = fileObj;
				if(img_tip.classList.contains("show")){
					img_tip.classList.remove("show");
					img_tip.classList.add("hidden");
				}
				
			}
			readFile(fileObj,put_img[i]);
			img_text[i].classList.add("hidden");
			if(i<len-1){
				showNext(img_box[i+1]);
			}
			
		}
	}
}
//读取图片文件函数
function readFile(fileObj,boxObj){//input文件，图片盒子
	var fileReader = new FileReader();//读取文件对象
	fileReader.readAsDataURL(fileObj);//读取文件
	fileReader.onload = function(){//读取文件成功
		console.log("读取文件成功");
		img_src = fileReader.result;
		console.log(img_src);
		boxObj.src = fileReader.result;//返回读取结果	
		boxObj.classList.remove("hidden");
		boxObj.classList.add("show");
	}
}
//显示一个图片框
function showNext(obj){
	obj.classList.remove("hidden");
	obj.classList.add("show");
}
//表单提交事件
function formPost(){
	if(!judgeEmpty()){
		return false;
	}
	if(!my_regex()){
		return false;
	}
	console.log("成功啦");
	// $.ajax({
	// 	type:"",
	// 	url:"",
	// 	dataType:"json",
	// 	data:{
	// 		book_name:book_form.book_name.value,
	// 		book_no:book_form.book_no.value,
	// 		book_price:book_form.book_price.value,
	// 		book_publish:book_form.book_publish.value,
	// 		book_time:book_form.book_time.value,
	// 		book_num:book_form.book_num.value,
	// 		book_desc:book_form.book_desc.value
	// 	}
	// });
}
//字段判断是否为空事件
function judgeEmpty(){
	if(book_form.book_name.value==""){
		form_tips[0].innerHTML = "图书名称不能为空";
		form_tips[0].classList.remove("hidden");
		form_tips[0].classList.add("show");
		return false;
	}
	if(book_form.book_no.value==""){
		form_tips[1].innerHTML = "图书编号不能为空";
		form_tips[1].classList.remove("hidden");
		form_tips[1].classList.add("show");
		return false;
	}
	if(book_form.book_price.value==""){
		form_tips[2].innerHTML = "图书价格不能为空";
		form_tips[2].classList.remove("hidden");
		form_tips[2].classList.add("show");
		return false;
	}
	if(book_form.book_publish.value==""){
		form_tips[3].innerHTML = "出版社不能为空";
		form_tips[3].classList.remove("hidden");
		form_tips[3].classList.add("show");
		return false;
	}
	if(book_form.book_time.value==""){
		form_tips[4].innerHTML = "出版时间不能为空";
		form_tips[4].classList.remove("hidden");
		form_tips[4].classList.add("show");
		return false;
	}
	if(book_form.book_num.value==""){
		form_tips[5].innerHTML = "数量不能为空";
		form_tips[5].classList.remove("hidden");
		form_tips[5].classList.add("show");
		return false;
	}
	if(book_form.book_desc.value==""){
		form_tips[6].innerHTML = "图书描述不能为空";
		form_tips[6].classList.remove("hidden");
		form_tips[6].classList.add("show");
		return false;
	}
	return true;
}
//各元素失焦，键盘弹起事件
function inp_onblue_onkeyput(){
	book_form.book_name.onblur = function(){
		if(book_form.book_name.value != ""&&book_form.book_name.value!=null){
			console.log("由内容啦");
			console.log(book_form.book_name.value);
			if(form_tips[0].classList.contains("show")){
				form_tips[0].classList.remove("show");
				form_tips[0].classList.add("hidden");
			}
		}
	}
	book_form.book_no.onblur = function(){
		if(book_form.book_no.value!=""&&book_form.book_no.value!=null){
			if(form_tips[1].classList.contains("show")){
				form_tips[1].classList.remove("show");
				form_tips[1].classList.add("hidden");
			}
		}
	}
	book_form.book_price.onblur = function(){
		if(book_form.book_price.value!=""&&book_form.book_price.value!=null){
			if(form_tips[2].classList.contains("show")){
				form_tips[2].classList.remove("show");
				form_tips[2].classList.add("hidden");
			}
		}
	}
	book_form.book_publish.onblur = function(){
		if(book_form.book_publish.value!=""&&book_form.book_publish.value!=null){
			if(form_tips[3].classList.contains("show")){
				form_tips[3].classList.remove("show");
				form_tips[3].classList.add("hidden");
			}
		}
	}
	book_form.book_time.onblur = function(){
		if(book_form.book_time.value!=""&&book_form.book_time.value!=null){
			if(form_tips[4].classList.contains("show")){
				form_tips[4].classList.remove("show");
				form_tips[4].classList.add("hidden");
			}
		}
	}
	book_form.book_num.onblur = function(){
		if(book_form.book_num.value!=""&&book_form.book_num.value!=null){
			if(form_tips[5].classList.contains("show")){
				form_tips[5].classList.remove("show");
				form_tips[5].classList.add("hidden");
			}
		}
	}
	book_form.book_desc.onblur = function(){
		if(book_form.book_desc.value!=""&&book_form.book_desc.value!=null){
			if(form_tips[6].classList.contains("show")){
				form_tips[6].classList.remove("show");
				form_tips[6].classList.add("hidden");
			}
		}
	}

}
//判断正则事件
function my_regex(){
	console.log("进入正则判断2");
	if(!regs.no.test(book_form.book_no.value)){
		if(form_tips[1].classList.contains("hidden")){
			form_tips[1].classList.remove("hidden");
			form_tips[1].classList.add("show");
		}
		form_tips[1].innerHTML = "图书编码不能有中文";
		return false;
	}
	if(!regs.price.test(book_form.book_price.value)||parseInt(book_form.book_price.value)<1||parseInt(book_form.book_price.value)>1000){
		if(form_tips[2].classList.contains("hidden")){
			form_tips[2].classList.remove("hidden");
			form_tips[2].classList.add("show");
		}
		form_tips[2].innerHTML = "价格格式错误";
		console.log(regs.price.test(book_form.book_price.value));
		return false;
	}
	if(!regs.price.test(book_form.book_num.value)||parseInt(book_form.book_num.value)<1||parseInt(book_form.book_num.value)>1000){
		if(form_tips[5].classList.contains("hidden")){
			form_tips[5].classList.remove("hidden");
			form_tips[5].classList.add("show");
		}
		form_tips[5].innerHTML = "数量格式错误";
		return false;
	}
	if(!img_inp_1){//判断第一张图片是否为空
		img_tip.classList.remove("hidden");
		img_tip.classList.add("show");
	}
	return true;
}
	
