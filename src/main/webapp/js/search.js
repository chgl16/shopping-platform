var default_url = "/getBookRecommend";
var url;

window.onload = function () {
    // 如果不是从分类尽量的就显示推荐的
    var bookType = localStorage.getItem("bookType");
    if (bookType == null || bookType == "") {
        url = default_url;
    } else {
        // 获取分类的书
        url = "/getBookByType/".concat(bookType);
        goAjax(url);
    }

}

function goAjax(url) {
    // 获取推荐的书
    $.get({
        url: url,
        dataType: "json",
        success: function (data) {
            console.log("data: " + JSON.stringify(data));
            fillSearchDefaultPage(data);
        },
        error: function (data) {
            alert("异常-错误")
        }
    });
}

/**
 * 填充搜索页的默认数据
 * @param data
 */
function fillSearchDefaultPage(data) {
    // 获取父亲节点ul
    var ulElement = $("#dataList")[0];
    // 先清空
    ulElement.innerHTML = "";

    for (var i = 0; i < data.length; ++i) {
        /* 填充格式
        <li>
            <a class="list-item external">
               <img class="p-pic" src="../../img/loading.jpg">
               <div class="d">   ## div1
                   <h3 class="d-title">逸阳2018冬季新款高腰显瘦打底裤女小脚铅笔</h3>
                   <div class="d-price">¥159</div>   ## div2
                   <div class="d-main">              ## div3
                       <div class="d-freight">免运费</div>  ## div4
                       <div class="d-num">总销量6444</div>   ## div5
                       <div class="d-area">广州</div>       ## div6 暂时不写
                   </div>
               </div>
            </a>
            <span style="display: none">bookId</span>
         </li>
         */
        /* 创建元素 */
        var liElement = document.createElement("li");
        var aEliment = document.createElement("a");
        var imgElment = document.createElement("img");
        var h3Element = document.createElement("h3");
        var div1Element = document.createElement("div");
        var div2Element = document.createElement("div");
        var div3Element = document.createElement("div");
        var div4Element = document.createElement("div");
        var div5Element = document.createElement("div");
        var div6Element = document.createElement("div");
        // 创建存储bookId的隐藏元素
        var spanElement = document.createElement("span");

        /* 配置元素 */
        aEliment.className = "list-item external";
        imgElment.className = "p-pic";
        imgElment.src = data[i].imgUrl1;
        div1Element.className = "d";
        h3Element.className = "d-title";
        h3Element.innerHTML = data[i].title;
        div2Element.className = "d-price";
        div2Element.innerHTML = "￥".concat(data[i].price);
        div3Element.className = "d-main";
        div4Element.className = "d-freight";
        div4Element.innerHTML = "免运费";
        div5Element.className = "d-num";
        div5Element.innerHTML = "总销量".concat(data[i].saleVolume);
        div6Element.className = "d-area";
        spanElement.style = "display: none";
        spanElement.innerHTML = data[i].id;

        // li点击跳转到书的详情页
        liElement.onclick = function () {
            // 暂时存储书的id
            var bookId = this.childNodes[1].innerHTML;
            localStorage.setItem("bookId", bookId);
            window.location.href = "product_details.html";
        }

        /* 由内到外拼接结构 */
        div3Element.appendChild(div4Element);
        div3Element.appendChild(div5Element);
        div3Element.appendChild(div6Element);
        div1Element.appendChild(h3Element);
        div1Element.appendChild(div2Element);
        div1Element.appendChild(div3Element);
        aEliment.appendChild(imgElment);
        aEliment.appendChild(div1Element);
        liElement.appendChild(aEliment);
        liElement.appendChild(spanElement);

        /* 加入ul */
        ulElement.appendChild(liElement);
    }
}

function changeToAsc() {
    alert(this.innerHTML);
}

function goSearch() {
    // 输入框的值
    var keyword = $('input[type="search"]')[0].value;
    // 选择器元素
    var selectElement = $(".dropdown-menu")[0];
    // 选择器选择的值
    var selectValue = selectElement.options[selectElement.selectedIndex].value;
    console.log("开始搜索");
    console.log("关键词:" + keyword + ", 选择类型: " + selectValue);

    switch (selectValue) {
        case "type":
            console.log("按类型搜索: " + keyword);
            url = "/getBookByType/".concat(keyword);
            goAjax(url);
            break;
        case "title":
            console.log("按书名搜索: " + keyword);
            url = "/getBookByKeyword/".concat(keyword);
            goAjax(url);
            break;
        case "range":
            console.log("按价格范围搜索: " + keyword);
            var arr = keyword.split("-");
            url = "/getBookByPriceRange/".concat(arr[0]).concat("/").concat(arr[1]);
            goAjax(url);
            break;
            /*
        case "asc":
            // 和关键字无关
            console.log("按价格升序显示: ");
            break;
        case "desc":
            // 和关键字无关
            console.log("按价格降序显示: ");
            break;
          */
    }



}

function changeToAsc() {
    console.log("点了升序");
}