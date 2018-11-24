window.onload = function (ev) {
    // 加载申请店铺数据
    $.get({
        url: "/getAllApplication",
        dataType: "json",
        // contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(data) {
            fillPage(data);
            var str = JSON.stringify(data);
            console.info("dataStr: " + str);
        },
        error: function(data) {
            console.error("失败");
            console.error(JSON.stringify(data));
        }
    });
}

/**
 * 动态<td>填充当前页
 */
function fillPage(dataArray) {
    console.log("length:" + dataArray.length)
    // 根据记录数确定要生成的行数
    for (var i = 0; i != dataArray.length; ++i) {
        // 创建一个行元素
        var row = document.createElement('tr');

        // 创建td单元格
        var selectCell = document.createElement('td');
        var idCell = document.createElement('td');
        var ownerIdCell = document.createElement('td');
        var storeNameCell = document.createElement('td');
        var storeIntroductionCell = document.createElement('td');
        var applyTimeCell = document.createElement('td');
        var statusCell = document.createElement('td');
        var acceptCell = document.createElement('td');
        var refuseCell = document.createElement('td');

        // 给创建的td单元格填充数据
        var input = document.createElement("input");
        input.type = "checkbox";
        input.className = "check_it";
        selectCell.appendChild(input);

        idCell.innerHTML = dataArray[i].id;
        ownerIdCell.innerHTML = dataArray[i].ownerId;
        storeNameCell.innerHTML = dataArray[i].storeName;
        storeIntroductionCell.innerHTML = dataArray[i].storeIntroduction;
        applyTimeCell.innerHTML = dataArray[i].applyTime;
        // status填充设置
        if (dataArray[i].status == -1) {
            statusCell.innerHTML = "未处理";
            statusCell.style.color = "orange";
        } else if (dataArray[i].status == 0) {
            statusCell.innerHTML = "已拒绝";
            statusCell.style.color = "red";
        } else {
            statusCell.innerHTML = "已通过";
            statusCell.style.color = "green";
        }

        // 未处理的才能处理
        if (statusCell.innerHTML == "未处理") {
            acceptCell.innerHTML = "通过";
            acceptCell.style.color = "green";
            acceptCell.onclick = function () {
                var flag = confirm("确定通过这个申请吗？");
                if (flag == true) {
                    // 获取当前这条记录的id
                    var id = this.parentNode.childNodes[1].innerHTML;
                    acceptApplication(id);
                    // 修改状态为已通过
                    this.parentNode.childNodes[6].innerHTML = "已通过";
                    this.parentNode.childNodes[6].style.color = "green";
                    // 修改当前（通过）操作为已处理
                    this.innerHTML = "已处理";
                    this.style.color = "gray";
                    // 修改拒绝操作为已处理
                    this.parentNode.childNodes[8].innerHTML = "已处理";
                    this.parentNode.childNodes[8].style.color = "gray";
                }
            }
            refuseCell.innerHTML = "拒绝";
            refuseCell.style.color = "red";
            refuseCell.onclick = function () {
                var flag = confirm("确定拒绝这个申请吗？");
                if (flag == true) {
                    // 获取当前这条记录的id
                    var id = this.parentNode.childNodes[1].innerHTML;
                    refuseApplication(id);
                    // 修改状态为已拒绝
                    this.parentNode.childNodes[6].innerHTML = "已拒绝";
                    this.parentNode.childNodes[6].style.color = "red";
                    // 修改当前操作为已处理
                    this.innerHTML = "已处理";
                    this.style.color = "gray";
                    // 修改通过操作为已处理
                    this.parentNode.childNodes[7].innerHTML = "已处理";
                    this.parentNode.childNodes[7].style.color = "gray";
                }
            }
        } else {
            acceptCell.innerHTML = "已处理";
            refuseCell.innerHTML = "已处理";
            acceptCell.style.color = "gray";
            refuseCell.style.color = "gray";
        }



        // 添加点击函数[address,time, log,today,yesterday]
        idCell.onclick = function() {
            alert(this.innerHTML);
        }
        ownerIdCell.onclick = function() {
            alert(this.innerHTML);
        }
        applyTimeCell.onclick = function() {
            alert(this.innerHTML);
        }
        storeNameCell.onclick = function() {
            alert(this.innerHTML);
        }
        storeIntroductionCell.onclick = function() {
            alert(this.innerHTML);
        }

        // 将新建的td加入新建的tr行
        row.appendChild(selectCell);
        row.appendChild(idCell);
        row.appendChild(ownerIdCell);
        row.appendChild(storeNameCell);
        row.appendChild(storeIntroductionCell);
        row.appendChild(applyTimeCell);
        row.appendChild(statusCell);
        row.appendChild(acceptCell);
        row.appendChild(refuseCell);

        // 获取tbody
        var tbody = $(".shop_apply_boby")[0];
        // 将这行加到tbody
        tbody.appendChild(row);
    }
}

/**
 * 通过申请的交互
 * @param id
 */
function acceptApplication(id) {
    $.get({
        url: "/acceptApplication/".concat(id),
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(data) {
            console.info("成功通过");
        },
        error: function(data) {
            console.error("失败");
        }
    });
}

/**
 * 拒绝申请的交互
 * @param id
 */
function refuseApplication(id) {
    $.get({
        url: "/refuseApplication/".concat(id),
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(data) {
            console.info("成功拒绝");
        },
        error: function(data) {
            console.error("失败");
        }
    });
}