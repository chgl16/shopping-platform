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
var customer_boby = document.getElementsByClassName("customer_boby")[0];
var customer_item = "";
var all_check_it = document.getElementsByClassName("all_check_it")[0];//全选按钮
var all_lahei_btn = document.getElementsByClassName("all_lahei_btn")[0];
var check_it = "";
var mask = document.getElementsByClassName("mask")[0];
var pop_up = document.getElementsByClassName("pop_up")[0];
var tips_pop = document.getElementsByClassName("tips_pop")[0];
var lahei_btn = "";
var look_btn = "";
//页面初始化
function getData(){
	$.ajax({
		type:"",
		url:"",
		dataType:"json",
		success:function(data){
			console.log(data);
			customer_boby.innerHTML=dataToHtml(data);

			allCheckFun();//全选按钮事件
			laHeiFun();//拉黑按钮事件
		},
		error:function(){
			console.log("出错了");
		}
	});
}


//全选按钮
function allCheckFun(){
	customer_item = document.querySelectorAll(".customer_item");
	console.log(customer_item);
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
//拉黑按钮
function laHeiFun(){
	lahei_btn = document.querySelectorAll(".lahei_btn");
	look_btn = document.querySelectorAll(".look_btn");
	for(let i=0,len=lahei_btn.length;i<len;i++){
		lahei_btn[i].onclick = function(event){
			showMask(pop_up);
			tipsPopUpFun("拉黑该用户?");
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
				hiddenMask(pop_up);
				lahei_btn[i].onclick = null;
				customer_item[i].parentNode.removeChild(customer_item[i]);
			}
		}
	}
}
laHeiFun();
//批量拉黑按钮
function allLaheiFun(){
	all_lahei_btn.onclick = function(event){
		if(checkFun()!=1){
			console.log("没有选中");
			showMask(tips_pop);
			surePopUpFun("没有选择顾客");
			var surePop_sure_btn = document.getElementsByClassName("surePop_sure_btn")[0];
			surePop_sure_btn.onclick = function(){
				hiddenMask(tips_pop);
				return false;
			}
			return false;
		}
		event = EventUtil.getEvent(event);
		EventUtil.stopPropagation(event);
		showMask(pop_up);
		//初始化提示弹出框
		tipsPopUpFun("确定批量移除出黑名单?");
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
					lahei_btn[i].onclick = null;
					look_btn[i].onclick = null;
					customer_item[i].parentNode.removeChild(customer_item[i]);
				}
			}
			hiddenMask(pop_up);
		}
	}	
}
allLaheiFun();





//将数据放进HTML
function dataToHtml(data){
	var html = '';
	$(data.list).each(function(i,val){
		html += '<tr class="customer_item">';
		html += '<td><input type="checkbox" class="check_it"></td>';
		html += '<td><img src="'+val.imgUrl+'"></td>';
		html += '<td>'+val.Id+'</td>';
		html += '<td>'+val.name+'</td>';
		html += '<td><a href="consumeRecord.html'+val.Id+'" class="look_btn">查看</a></td>';
		html += '<td><span class="lahei_btn">移出</span></td>';
		html += '</tr>';
	});
	return html;
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
	return tag;
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