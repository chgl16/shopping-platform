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

//获取元素
var order_body =document.getElementsByClassName("order_body")[0];
var urlId = '';
var detail_btn = '';
var order_id = [];//订单id数组
var detail_pop = document.getElementsByClassName("detail_pop")[0];
var mask = document.getElementsByClassName("mask")[0];
//数据初始化
function getData(){
	urlId = getUrlParam("id");
	$.ajax({
		type:'',
		url:'',
		dataType:'json',
		data:{},
		success:function(data){
			order_body.innerHTML = dataToHtml(data);
			detailBtnFun();//详情按钮事件

		},
		error:function(){
			console.log("出错了");
		}
	});
}

//详情按钮事件
function detailBtnFun(){
	detail_btn = document.getElementsByClassName("detail_btn");
	for(let i=0,len=detail_btn.length;i<len;i++){
		detail_btn[i].onclick = function(event){
			console.log("aa");
			event = EventUtil.getEvent(event);
			EventUtil.stopPropagation(event);
			showMask(detail_pop);
			//getDetailPopData();
		}
	}
}
detailBtnFun();




//拿到url的参数
function getUrlParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) {
		return unescape(r[2]); 
	}
	return null;
}
//将数据放进HTML
function dataToHtml(data){
	var html = '';
	$(data).each(function(i,val){
		order_id[i] = "";//存放订单id
		html += '<tr>';
		html += '<td>QW4564558778</td>';
		html += '<td class="td_book">《白夜行》,</td>';
		html += '<td>橙橙橙专卖店</td>';
		html += '<td>108.00</td>';
		html += '<td>';
		html += '<div>2018-09-09</div>';
		html += '<div>12:00</div>';
		html += '</td>';
		html += '<td>已完成</td>';
		html += '<td><span class="detail_btn">详情</span></td>';
		html += '</tr>';
	});
	return html;
}
//初始化订单弹出框
function getDetailPopData(){
	var html = '';
	$.ajax({
		type:"",
		url:"",
		dataType:"json",
		success:function(data){
			
			html += '<div class="detail_pop_left">';
			html += '<div class="detail_left_top">';
			html += '<img src="../../img/manage/1.jpg">';
			html += '<div class="shop_mess">';
			html += '<span>橙橙橙橙橙橙橙子专卖店</span>';
			html += '<span>订单号：DRTYR3414434</span>';
			html += '</div>';
			html += '</div>';
			html += '<table class="detail_table">';
			html += '<thead>';
			html += '<tr>';
			html += '<td>商品</td>';
			html += '<td>数量</td>';
			html += '<td>小计(元)</td>';
			html += '</tr>';
			html += '<tbody>';
			$(data).each(function(i,val){
				html += '<tr>';
				html += '<td>《JavaScript高级程序设计》</td>';
				html += '<td>3</td>';
				html += '<td>88.00</td>';
				html += '</tr>';
			});
			html += '</tbody>';
			html += '</table>';
			html += '<div class="detail_left_bottom">';
			html += '实际支付<span>198.00</span>';
			html += '</div>';
			html += '</div>';
			html += '<div class="detail_pop_right">';
			html += '<h3>快递信息</h3>';
			html += '<div class="text_box">';
			html += '<span>配送方式：</span>';
			html += '<span>超超超快快递</span>';
			html += '</div>';
			html += '<div class="text_box">';
			html += '<span>订单时间：</span>';
			html += '<span>2018-09-09</span>';
			html += '</div>';
			html += '<div class="text_box">';
			html += '<span>收 件 人 ：</span>';
			html += '<span>鱼鱼鱼鱼鱼鱼</span>';
			html += '</div>';
			html += '<div class="text_box">';
			html += '<span>联系电话：</span>';
			html += '<span>15252756790</span>';
			html += '</div>';
			html += '<div class="text_box">';
			html += '<span>收货地址：</span>';
			html += '<span>地址地址就不告址地址就不告址地址就不告诉你</span>';
			html += '</div>';
			html += '</div>';
			html += '';
		},
		error:function(){
			console.log("出错了");
		}
	});
	return html;
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
//点击其他位置，弹出框消失
document.body.onclick = function(){
	if(mask.classList.contains("show")){
		mask.classList.remove("show");
		mask.classList.add("hidden");
		detail_pop.classList.remove("show");
		detail_pop.classList.add("hidden");
	}
}