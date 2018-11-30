var storeId;

// 加载店铺的书
window.onload = function (ev) {
    storeId = localStorage.getItem("storeId");

    $.get({
        url: "/getStoreBook/".concat(storeId),
        dataType: "json",
        success: function (data) {
            fillPage(data);
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
        },
        error: function (data) {

        }
    });
}


/**
 * 动态<td>填充当前页
 */
function fillPage(data) {
    console.log("length:" + data.length);
    // 填充记录数
    $(".count")[0].innerHTML = data.length;

    /*
    // 根据记录数确定要生成的行数
    for (var i = 0; i != data.length; ++i) {
        // 创建一个行元素
        var row = document.createElement('tr');

        // 创建td单元格
        var idCell = document.createElement('td');
        var titleCell = document.createElement('td');
        var priceCell = document.createElement('td');
        var typeCell = document.createElement('td');
        var inventoryCell = document.createElement('td');
        var saleVolumeCell = document.createElement('td');
        var operateCell = document.createElement('td');

        // 给创建的td单元格填充数据
        idCell.innerHTML = data[i].id;
        titleCell.innerHTML = data[i].title;
        priceCell.innerHTML = data[i].price;
        inventoryCell.innerHTML = data[i].inventory;
        saleVolumeCell.innerHTML = data[i].saleVolume;
        typeCell.innerHTML = data[i].type;
        operateCell.innerHTML = "编辑宝贝";
        operateCell.className = "table_edit blue";
        operateCell.onclick = function (ev) {
            // 存储要操作的书的id
            localStorage.setItem("operateBookId", this.parentNode.childNodes[0].innerHTML);
            $("#edit_div").show();
        }

        // 将td添加到th
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(priceCell);
        row.appendChild(typeCell);
        row.appendChild(inventoryCell);
        row.appendChild(saleVolumeCell);
        row.appendChild(operateCell);

        // 获取tbody
        var tbody = $(".tableBody")[0];
        // 将这行加到tbody
        tbody.appendChild(row);
    }
    */
    // 改为字符串
    var tbHtml = "";
    for (var i = 0; i != data.length; ++i) {
        tbHtml += '<tr class="baby_box">\n' +
            '\t\t\t\t\t\t<td>\n' +
            '\t\t\t\t\t\t\t<input type="checkbox" class="check_it">\n' +
            '\t\t\t\t\t\t\t<img src="'.concat(data[i].imgUrl1).concat('" class="baby_img">\n' +
                '\t\t\t\t\t\t\t<div class="baby_mess">\n' +
                '\t\t\t\t\t\t\t\t<span class="baby_desc">'.concat(data[i].title).concat('</span>\n' +
                    '\t\t\t\t\t\t\t\t<span class="baby_id">id:'.concat(data[i].introduction).concat('</span>\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t</td>\n' +
                        '\t\t\t\t\t\t<td class="red">'.concat(data[i].price).concat('</td>\n' +
                            '\t\t\t\t\t\t<td>'.concat(data[i].saleVolume).concat('</td>\n' +
                                '\t\t\t\t\t\t<td>'.concat(data[i].inventory).concat('</td>\n' +
                                    '\t\t\t\t\t\t<td>\n' +
                                    '\t\t\t\t\t\t\t<span>'.concat(data[i].type).concat('</span>\n' +
                                        '\t\t\t\t\t\t</td>\n' +
                                        '\t\t\t\t\t\t<td class="table_edit blue" onclick="deleteBook('.concat(data[i].id).concat(')">下架宝贝</td>\n' +
                                        '\t\t\t\t\t</tr>'))))))));

    }
    $(".tableBody")[0].innerHTML = tbHtml;
}

/**
 * 下架删除图书
 */
function deleteBook(bookId) {
    $.get({
        url: "/deleteBook/".concat(storeId).concat("/").concat(bookId),
        dataType: "json",
        success: function (data) {
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
            if (data == "success") {
                alert("下架成功！");
                window.location.href = "shop_selling.html";
            }
        },
        error: function (data) {
            console.log("失败");
        }
    });
}

/**
 * 退出操作隐藏窗口
 */
$(".post_btn")[2].onclick = function () {
    $("#edit_div").hide();
};