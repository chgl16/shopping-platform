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
	getTarget:function(event){
		return event.target||event.srcElement;
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


//获取元素
var order_list = document.getElementsByClassName("order_list")[0];
var all_check_it = document.getElementsByClassName("all_check_it")[0];
var all_send_btn = document.getElementsByClassName("all_send_btn")[0];
var order_li = "";//订单数组
var check_it = "";//check框数组
var send_btn = "";//发货按钮数组
var mask = document.getElementsByClassName("mask")[0];
var pop_up = document.getElementsByClassName("pop_up")[0];
var tips_pop = document.getElementsByClassName("tips_pop")[0];
//页面数据初始化
function getData(){
	$.ajax({
		type:"post",
		url:'json/shop_selling.json?pageNum='+num+'&pageSize='+size,
		dataType:"json",
		success:function(data){
			console.log(data);
			tableBody.innerHTML = dataToHtml(data);

			allCheckFun();
		},
		error:function(){
			console.log("出错了");
		}
	});
}



//全选按钮
function allCheckFun(){
	order_li = document.querySelectorAll(".order_li");
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
//发货按钮
function sendBtnFun(){
	send_btn = document.querySelectorAll(".send_btn");

	for(let i=0,len=send_btn.length;i<len;i++){
		send_btn[i].onclick = function(event){
			event = EventUtil.getEvent(event);
			EventUtil.stopPropagation(event);
			
			showMask(pop_up);
			tipsPopUpFun("确定发货？");
			var yes_btn = document.getElementsByClassName("yes_btn")[0];
			var no_btn = document.getElementsByClassName("no_btn")[0];
			var cancel_btn = document.getElementsByClassName("icon_cancel")[0];
			no_btn.onclick = function(){
				hiddenMask(pop_up);		
			}
			cancel_btn.onclick = function(){
				hiddenMask(pop_up);
			}
			yes_btn.onclick = function(){
				//待补充
				console.log(i);
				console.log(order_li[i]);
				hiddenMask(pop_up);
				send_btn[i].onclick = null;
				
				order_li[i].parentNode.removeChild(order_li[i]);
			}
		}
	}
}
sendBtnFun();
//批量发货按钮
function allSendBtnFun(){
	all_send_btn.onclick = function(event){
		if(checkFun()!=1){
			console.log("没有选中");
			return false;
		}
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		showMask(pop_up);
		//初始化提示弹出框
		tipsPopUpFun("确定批量发货?");
		var yes_btn = document.getElementsByClassName("yes_btn")[0];
		var no_btn = document.getElementsByClassName("no_btn")[0];
		var icon_cancel = document.getElementsByClassName("icon_cancel")[0];
		no_btn.onclick = function(){
			hiddenMask(pop_up);
		}
		icon_cancel.onclick = function(){
			hiddenMask(pop_up);
		}
		yes_btn.onclick = function(){
			//待补充
			for(let i=0,len=check_it.length;i<len;i++){//选出选中check框
				
				if(check_it[i].checked){//选中
					check_it[i].checked=false;
					console.log(i);
					console.log(check_it[i]);
					send_btn[i].onclick = null;
					order_li[i].parentNode.removeChild(order_li[i]);
				}
			}
			hiddenMask(pop_up);
		}
	}	
}
allSendBtnFun();
//将数据放进HTML
function dataToHtml(data){
	var html= '';
	$(data.list).each(function(i,val){
		html += '<li class="order_li">';
		html += '<div class="order_li_top">';
		html += '<input type="checkbox" class="check_it">';
		html += '<span>订单编号：11111111111111111</span>';
		html += '<span>创建时间：2018-09-09 12:09</span>';
		html += '<div class="send_btn">发货</div>';
		html += '</div>';
		html += '<div class="order_li_con">';
		html += '<div class="order_li_con_left">';
		html += '<img src="../../img/manage/1.jpg">';
		html += '<div class="li_con_detail">';
		html += '<p>南通T恤2018春秋新款韩版纯棉儿童打的上衣潮到不行</p>';
		html += '<span>图书编码：0909090909090</span>';
		html += '<span>图书名称：白夜行</span>';
		html += '<em>128.00*1</em>';
		html += '</div>';
		html += '</div>';
		html += '<div class="order_li_con_right">';
		html += '<div>';
		html += '<span>收货地址：</span>';
		html += '<p class="adress">地址地址信息址</p>';
		html += '</div>';
		html += '<div>';
		html += '<span>收 件 人：</span>';
		html += '<p>小鱼儿橙橙橙橙子</p>';
		html += '</div>';
		html += '<div>';
		html += '<span>联系电话：</span>';
		html += '<p>1555555566</p>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		html += '</li>';
	});
	return html;	
}
//点击其他位置，弹出框消失
document.body.onclick = function(){
	if(mask.classList.contains("show")){
		mask.classList.remove("show");
		mask.classList.add("hidden");
		pop_up.classList.remove("show");
		pop_up.classList.add("hidden");
	}
}
//点击提示框阻止冒泡
;(function popUpStop(){
	pop_up.onclick = function(event){
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
	}
})();
//初始化提示弹出框
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




