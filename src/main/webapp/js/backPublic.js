//获取元素
var container = document.getElementsByClassName("container")[0];
var left_page_item = document.getElementsByClassName("left_page_item");//管理子项数组
var sanjiao_icon = document.getElementsByClassName("sanjiao_icon");
var sub_ul = document.getElementsByClassName("sub_ul");//字列表


getPageHeight();
onclickFunction();



//屏幕相关元素固定大小
function getPageHeight(){
	var pageHeight = window.innerHeight;
	//var pageWidth = document.body.offsetWidth//window.innerWidth;
	container.style.height = pageHeight+"px";
	
	//console.log(pageWidth-210);
	//container.style.width = (pageWidth-210-20)+"px";
	
}
//管理子项绑定点击事件
function onclickFunction(){
	for(let i=0,len=left_page_item.length;i<len;i++){
		left_page_item[i].onclick = function(){

			//for(let j=0;j<len;j++){//清除样式
				if(sanjiao_icon[i].classList.contains("up")){
					sanjiao_icon[i].classList.remove("up");
					sanjiao_icon[i].classList.add("down");
					sub_ul[i].classList.remove("show");
					sub_ul[i].classList.add("hidden");
					//break;
				}else{
					sanjiao_icon[i].classList.remove("down");
			sanjiao_icon[i].classList.add("up");
			sub_ul[i].classList.remove("hidden");
			sub_ul[i].classList.add("show");
				}	
			//}
			
		}
	}
}

