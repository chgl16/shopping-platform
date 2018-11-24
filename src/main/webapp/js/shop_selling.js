var EventUtil = {//事件对象
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type] = null;
		}
	},
	getEvent:function(event){
		return event? event:window.event;
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
};
//日期插件
laydate.render({
  elem: '#timePlugin' //指定元素
});	
//获取元素
var tableBody = document.getElementsByClassName("tableBody")[0];
var pre_page = document.getElementsByClassName("pre_page")[0];
var next_page = document.getElementsByClassName("next_page")[0];
var page_index = 1;
var pageCount = "";//总共有多少页数据
var all_check_it = document.getElementsByClassName("all_check_it")[0];//全选框按钮
var check_it = "";//选中框数组
var baby_box = "";
var edit_btn = "";
var delete_btn = document.getElementsByClassName("delete_btn")[0];
var xiajia_btn = document.getElementsByClassName("xiajia_btn")[0];
var paging_inp = document.getElementsByClassName("paging_inp")[0];
var sure_btn = document.getElementsByClassName("sure_btn")[0];
var edit_box = document.getElementsByClassName("edit_box")[0];
var mask = document.getElementsByClassName("mask")[0];
var edit_form = document.getElementById("edit_form");//编辑的表单
var pop_up = document.getElementsByClassName("pop_up")[0];
var tips_pop = document.getElementsByClassName("tips_pop")[0];
var regs = {
	no:/^[a-zA-Z0-9_]{0,}$/,
	price:/^\d{1,}$/
}







//getData(1,6);
//页面初始化数据
function getData(num,size){
	$.ajax({
		type:"post",
		url:'json/shop_selling.json?pageNum='+num+'&pageSize='+size,
		dataType:"json",
		success:function(data){
			console.log(data);
			
			tableBody.innerHTML = dataToHtml(data);
			allCheckFun();//全选按钮事件
			editFun();//编辑按钮事件
			deleteFun();//删除按钮事件
			xiajiaFun();//下架按钮事件
		},
		error:function(){
			console.log("出错了");
		}
	});
}



//点击其他位置，弹出框消失
document.body.onclick = function(){
	if(mask.classList.contains("show")){
		mask.classList.remove("show");
		mask.classList.add("hidden");
		edit_box.classList.remove("show");
		edit_box.classList.add("hidden");
		pop_up.classList.remove("show");
		pop_up.classList.add("hidden");
	}
}
edit_form.onclick = function(event){
	event = EventUtil.getEvent(event);
	EventUtil.stopPropagation(event);
}
//全选按钮
function allCheckFun(){
	baby_box = document.querySelectorAll(".baby_box");
	check_it = document.querySelectorAll(".check_it");//选中框数组
	all_check_it.onchange = function(){
	if(all_check_it.checked){
		for(let i=0,len=check_it.length;i<len;i++){
			check_it[i].checked = true;
		}
	}else{
		for(let i=0,len=check_it.length;i<len;i++){
			check_it[i].checked = false;
		}
	}
	}
}
allCheckFun();
//删除按钮事件
function deleteFun(){
	delete_btn.onclick = function(event){
		if(checkFun()!=1){//没有选中商品	
			console.log("没有选中");
			return false;
		}
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		showMask(pop_up);
		//初始化提示弹出框
		tipsPopUpFun("确定删除选中的商品?");
		var yes_btn = document.getElementsByClassName("yes_btn")[0];
		var no_btn = document.getElementsByClassName("no_btn")[0];
		var icon_cancel = document.getElementsByClassName("icon_cancel")[0];
		yes_btn.onclick = function(){
			//待补充
			
			for(let i=0,len=check_it.length;i<len;i++){//选出选中check框
				if(check_it[i].checked){//选中
					check_it[i].checked = false;
					edit_btn[i].onclick = null;
					baby_box[i].parentNode.removeChild(baby_box[i]);
				}
			}
			hiddenMask(pop_up);
		}
		no_btn.onclick = function(){
			hiddenMask(pop_up);
		}
		icon_cancel.onclick = function(){
			hiddenMask(pop_up);
		}
	}
	
}
//下架按钮
function xiajiaFun(){
	xiajia_btn.onclick = function(event){
		if(checkFun()!=1){//没有选中商品	
			console.log("没有选中");
			return false;
		}
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		showMask(pop_up);
		//初始化提示弹出框
		tipsPopUpFun("确定下架选中的商品?");
		var yes_btn = document.getElementsByClassName("yes_btn")[0];
		var no_btn = document.getElementsByClassName("no_btn")[0];
		var icon_cancel = document.getElementsByClassName("icon_cancel")[0];
		yes_btn.onclick = function(){
			//待补充
			console.log(check_it.length);
			for(let i=0,len=check_it.length;i<len;i++){//选出选中check框
				console.log(i);
				console.log(check_it[i]);
				if(check_it[i].checked){//选中
					check_it[i].checked = false;
					edit_btn[i].onclick = null;
					baby_box[i].parentNode.removeChild(baby_box[i]);
					
				}
			}
			hiddenMask(pop_up);
		}
		no_btn.onclick = function(){
			hiddenMask(pop_up);
		}
		icon_cancel.onclick = function(){
			hiddenMask(pop_up);
		}
	}

}
xiajiaFun();
deleteFun();
//点击提示框阻止冒泡
(function popUpStop(){
	pop_up.onclick = function(event){
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
	}
})();
//编辑按钮
function editFun(){
	edit_btn = document.getElementsByClassName("table_edit");
	for(let i=0,len=edit_btn.length;i<len;i++){
		edit_btn[i].onclick = function(event){
			event = EventUtil.getEvent(event);
			EventUtil.stopPropagation(event);
			mask.classList.remove("hidden");
			mask.classList.add("show");
			edit_box.classList.remove("hidden");
			edit_box.classList.add("show");
			//formGetData();
		}
	}
}
editFun();
//图片input框onchange事件
function imgInpOnchange(){
	var img_inp = edit_form.img;
	var put_img = document.getElementsByClassName("put_img");
	
	for(let i=0,len=img_inp.length;i<len;i++){
		img_inp[i].onchange = function(){
			readFile(img_inp[i],put_img[i]);
		}		
	}	
}
imgInpOnchange();
//表单提交按钮
function post_btn(){
	var post_btn = document.getElementsByClassName("post_btn")[0];
	var form_tips = document.getElementsByClassName("form_tips");
	post_btn.onclick = function(){
		if(!judgeEmpty(form_tips)){
			return false;
		}
		if(!my_regex(form_tips)){
			return false;
		}
	}
	inp_onblue_onkeyput(form_tips);
}
post_btn();
//上一页
pre_page.onclick = function(){
	if(page_index<=1){
		return false;
	}
	page_index--;
	//getData(page_index,6);
}
//下一页
next_page.onclick = function(){
	if(page_index>=pageCount){
		return false;
	}
	page_index++;
	//getData(page_index,6);
}
//确定按钮
sure_btn.onclick = function(){
	var value  = paging_inp.value;
	if(value>pageCount||value<=0){
		return false;
	}
	if(value==page_index){
		return false
	}
	getData(value,6);
}
//各元素失焦，键盘弹起事件
function inp_onblue_onkeyput(form_tips){
	edit_form.book_no.onblur = function(){
		if(edit_form.book_no.value!=""&&edit_form.book_no.value!=null){
			if(form_tips[1].classList.contains("show")){
				form_tips[1].classList.remove("show");
				form_tips[1].classList.add("hidden");
			}
		}
	}
	edit_form.book_name.onblur = function(){
		if(edit_form.book_name.value != ""&&edit_form.book_name.value!=null){
			console.log(edit_form.book_name.value);
			if(form_tips[0].classList.contains("show")){
				form_tips[0].classList.remove("show");
				form_tips[0].classList.add("hidden");
			}
		}
	}
	edit_form.book_price.onblur = function(){
		if(edit_form.book_price.value!=""&&edit_form.book_price.value!=null){
			if(form_tips[2].classList.contains("show")){
				form_tips[2].classList.remove("show");
				form_tips[2].classList.add("hidden");
			}
		}
	}
	edit_form.book_publish.onblur = function(){
		if(edit_form.book_publish.value!=""&&edit_form.book_publish.value!=null){
			if(form_tips[3].classList.contains("show")){
				form_tips[3].classList.remove("show");
				form_tips[3].classList.add("hidden");
			}
		}
	}
	edit_form.book_time.onblur = function(){
		if(edit_form.book_time.value!=""&&edit_form.book_time.value!=null){
			if(form_tips[4].classList.contains("show")){
				form_tips[4].classList.remove("show");
				form_tips[4].classList.add("hidden");
			}
		}
	}
	edit_form.book_num.onblur = function(){
		if(edit_form.book_num.value!=""&&edit_form.book_num.value!=null){
			if(form_tips[5].classList.contains("show")){
				form_tips[5].classList.remove("show");
				form_tips[5].classList.add("hidden");
			}
		}
	}
	edit_form.book_desc.onblur = function(){
		if(edit_form.book_desc.value!=""&&edit_form.book_desc.value!=null){
			if(form_tips[6].classList.contains("show")){
				form_tips[6].classList.remove("show");
				form_tips[6].classList.add("hidden");
			}
		}
	}
}

//表单数据初始化
function formGetData(){
	$.ajax({
		type:"post",
		url:"",
		dataType:"json",
		success:function(data){
			var html = '';
			html+='';
			//post_btn();//表单提交按钮
			//inp_onblue_onkeyput();//各表单控件失焦事件
			//日期插件
			laydate.render({
			  elem: '#timePlugin' //指定元素
			});		
		},
		error:function(){

		}
	});
}

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
		imgBox.classList.remove("hidden");
		imgBox.classList.add("show");
	}
}
//字段判断是否为空事件
function judgeEmpty(form_tips){
	if(edit_form.book_name.value==""){
		form_tips[0].innerHTML = "图书名称不能为空";
		form_tips[0].classList.remove("hidden");
		form_tips[0].classList.add("show");
		return false;
	}
	if(edit_form.book_no.value==""){
		form_tips[1].innerHTML = "图书编号不能为空";
		form_tips[1].classList.remove("hidden");
		form_tips[1].classList.add("show");
		return false;
	}
	if(edit_form.book_price.value==""){
		form_tips[2].innerHTML = "图书价格不能为空";
		form_tips[2].classList.remove("hidden");
		form_tips[2].classList.add("show");
		return false;
	}
	if(edit_form.book_publish.value==""){
		form_tips[3].innerHTML = "出版社不能为空";
		form_tips[3].classList.remove("hidden");
		form_tips[3].classList.add("show");
		return false;
	}
	if(edit_form.book_time.value==""){
		form_tips[4].innerHTML = "出版时间不能为空";
		form_tips[4].classList.remove("hidden");
		form_tips[4].classList.add("show");
		return false;
	}
	if(edit_form.book_num.value==""){
		form_tips[5].innerHTML = "库存不能为空";
		form_tips[5].classList.remove("hidden");
		form_tips[5].classList.add("show");
		return false;
	}
	if(edit_form.book_desc.value==""){
		form_tips[6].innerHTML = "图书描述不能为空";
		form_tips[6].classList.remove("hidden");
		form_tips[6].classList.add("show");
		return false;
	}
	return true;
}
//判断正则事件
function my_regex(form_tips){
	console.log("进入正则判断2");
	if(!regs.no.test(edit_form.book_no.value)){
		if(form_tips[1].classList.contains("hidden")){
			form_tips[1].classList.remove("hidden");
			form_tips[1].classList.add("show");
		}
		form_tips[1].innerHTML = "图书编号不能有中文";
		return false;
	}
	if(!regs.price.test(edit_form.book_price.value)||parseInt(edit_form.book_price.value)<1||parseInt(edit_form.book_price.value)>1000){
		if(form_tips[2].classList.contains("hidden")){
			form_tips[2].classList.remove("hidden");
			form_tips[2].classList.add("show");
		}
		form_tips[2].innerHTML = "价格格式错误";
		console.log(regs.price.test(edit_form.book_price.value));
		return false;
	}
	
	if(!regs.price.test(edit_form.book_num.value)||parseInt(edit_form.book_num.value)<1||parseInt(edit_form.book_num.value)>1000){
		if(form_tips[5].classList.contains("hidden")){
			form_tips[5].classList.remove("hidden");
			form_tips[5].classList.add("show");
		}
		form_tips[5].innerHTML = "库存格式错误";
		return false;
	}
	return true;
}
//检查是否有选中商品
function checkFun(){
	for(let i=0,len=check_it.length;i<len;i++){
		var tag = 0;//没有选中的check框
		if(check_it[i].checked){
			tag = 1;//有选中的check框
			return tag;
		}
	}
}
//初始化选择提示弹出框
function tipsPopUpFun(tipText){
	var html ='';
	html += '<svg class="icon_cancel" aria-hidden="true">';
	html += '<use xlink:href="#icon-iconfontcuo"></use>';
	html += '</svg>';
	html += '<span class="tips_text">'+tipText+'</span>';
	html += '<div class="pop_up_btn">';
	html += '<span class="yes_btn">是</span>';
	html += '<span class="no_btn">否</span>';
	html += '</div>';
	pop_up.innerHTML = html;
}
//初始化确认弹出框
function surePopUpFun(tipText){
	var html ='';
	html += '<span>'+tipText+'</span>';
	html += '<div class="surePop_sure_btn">确定</div>';
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
//将数据放进HTML
function dataToHtml(data){
	var html = '';	
	$(data.list).each(function(i,val){
		html+= '<tr class="baby_box">';
		html+= '<td>';
		html+= '<input type="checkbox" class="check_it">';
		html+= '<img src="'+val.imgUrl+'" class="baby_img">';
		html+= '<div class="baby_mess">';
		html+= '<span class="baby_desc">'+val.babyText+'</span>';
		html+= '<span class="baby_id">id:'+val.babyId+'</span>';
		html+= '</div>';
		html+= '</td>';
		html+= '<td class="red">'+val.babyPrice+'</td>';
		html+= '<td>'+val.babyNum+'</td>';
		html+= '<td>'+val.babySell+'</td>';
		html+= '<td>';
		html+= '<span>'+val.babyTime+'</span>';
		html+= '<span>'+val.babySecond+'</span>';
		html+= '</td>';
		html+= '<td class="table_edit blue">编辑宝贝</td>';
		html+= '</tr>';	
	});
	return html;
}