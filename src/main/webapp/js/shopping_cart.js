


window.onload = function(){
    onclick="a('+');"
    var product ={
        'id': "id",        //属性名用引号括起来，属性间由逗号隔开
        'name': 'hhh',
        'num':11,
        'price':199.9
    };
    cart.addproduct(product);//商品加入到购物车
    var productlist=cart.getproductlist();//取出购物车商品
    console.log('', '商品:'+productlist[0].id+' '+productlist[0].name+' '+productlist[0].num+' '+productlist[0].price, '确定');
}

// 封装工具对象
utils = {
    //存储localStorage
    setParam:function(name,value){
        myStorage.setItem(name,value)
    },
    //取出localStorage值
    getParam:function(name){
        myStorage.getItem(name)
    }
};

//产品对象
product = {
    id:0,       //产品id
    name:"",    //产品名
    num:0,      //产品数量
    price:0.00  //产品价格
};

// 订单对象
orderDetail = {
    username:"",        //用户名
    phone:"",           //用户电话
    address:"",         //用户地址
    zipcode:"",
    totalNumber:0,      //订单数
    totalAmount:0.00    //订单价格
}

//购物车增加修改删除
cart = {
    //向购物车中添加商品
    addproduct:function(product){
        var ShoppingCart = utils.getParam("ShoppingCart");
        if(ShoppingCart==null||ShoppingCart==""){
            // 第一次加入商品
            var jsonstr = {
                "productlist":[{
                    "id":product.id,
                    "name":product.name,
                    "num":product.num,
                    "price":product.price
                }],
                "totalNumber":product.num,
                "totalAmount":(product.price*product.num)
            };
            utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
        }else{
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
            var productlist = jsonstr.productlist;
            var result = false;
            // 查找购物车是否有该商品
            for(var i in productlist){
                if(productlist[i].id == product.id){
                    // 如果已有该商品，则在该订单数量➕
                    productlist[i].num =parseInt(productlist[i].num)+parseInt(product.num);
                    result = true;
                }
            }
            if(!result){
                // 没有该商品就直接加进去
                productlist.push({
                    "id":product.id,
                    "name":product.name,
                    "num":product.num,
                    "price":product.price
                })
            }
            // 重新计算总价
            jsonstr.totalNumber = parseInt(jsonstr.totalNumber)+parseInt(product.num);
            jsonstr.totalAmount = parseFloat(jsonstr.totalAmount)+(parseInt(product.num)*parseFloat(product.price));
            orderDetail.totalNumber = jsonstr.totalNumber;
            orderDetail.totalAmount = jsonstr.totalAmount;
            // 保存购物车
            utils.setItem("ShoppingCart","'"+JSON.stringify(jsonstr));
        }
    },

    // 修改购买商品的数量
    updateProductnum:function(id,num){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;

        for(var i in productlist){
            if(productlist[i].id==id){
                jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+(parseInt(num)-parseInt(productlist[i].num));
                jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+((parseInt(num)*parseFloat(productlist[i].price))-parseInt(productlist[i].num)*parseFloat(productlist[i].price));
                productlist[i].num=parseInt(num);
                
                orderdetail.totalNumber = jsonstr.totalNumber;
                orderdetail.totalAmount = jsonstr.totalAmount;
                utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
                return;
            }
        }
    },

    // 获取购物车中的所有商品
    getproductlist:function(){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        orderDetail.totalNumber = jsonstr.totalNumber;
        orderDetail.totalAmount = jsonstr.totalAmount;
        return productlist;
    },

    // 判断购物车是否存在商品
    existproduct:function(id){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        var result=false;
        for(var i in productlist){
            if(productlist[i].id==product.id){
                result = true;
            }
        }
        return result;
    },

    // 删除购物车的商品
    deleteproduct:function(id){
        var ShoppingCart = utils.getParam("ShoppingCart");
        var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));
        var productlist = jsonstr.productlist;
        var list=[];
        for(var i in productlist){
            if(productlist[i].id==id){
                jsonstr.totalNumber = parseInt(jsonstr.totalNumber)-parseInt(productlist[i].num);
                jsonstr.totalAmount = parseFloat(jsonstr.totalAmount)-parseInt(productlist[i].num)*parseFloat(productlist[i].price);
                
            }else{
                list.push(productlist[i]);
            }
        }
        jsonstr.productlist = list;
        orderDetail.totalNumber = jsonstr.totalNumber;
        orderDetail.totalAmount = jsonstr.totalAmount;
        utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));
    }
};


//计算赋值方法
/**
 * 浏览器或客户端不兼容localStorage时自动切换到Cookies存储。
 * 写好一个操作cookie的类和函数，将四个函数的名字和参数还有功能和localStorage保持一致。
 */

 //《JavaScript权威指南》一书中有实现基于cookie的存储API，我把代码敲下来
// 另外，书中的代码有错，以下为无BUG版并修改成1000天相当长的存储时间
window.cookieStorage = (new (function(){
    var maxage = 60*60*24*1000;
    var path = '/';
  
    var cookie = getCookie();
  
    function getCookie(){
        var cookie = {};
        var all = document.cookie;
        if(all === "")
            return cookie;
        var list = all.split("; ");
        for(var i=0; i < list.length; i++){
            var cookies = list[i];
            var p = cookies.indexOf("=");
            var name = cookies.substring(0,p);
            var value = cookies.substring(p+1);
            value = decodeURIComponent(value);
            cookie[name] = value;
        }
        return cookie;
    }
  
    var keys = [];
    for(var key in cookie)
        keys.push(key);
  
    this.length = keys.length;
  
    this.key = function(n){
        if(n<0 || n >= keys.length)
            return null;
        return keys[n];
    };
  
    this.setItem = function(key, value){
        if(! (key in cookie)){
            keys.push(key);
            this.length++;
        }
  
        cookie[key] = value;
        var cookies = key + "=" +encodeURIComponent(value);
        if(maxage)
            cookies += "; max-age=" + maxage;
        if(path)
            cookies += "; path=" + path;
  
        document.cookie = cookies;
    };
  
    this.getItem = function(name){
        return cookie[name] || null;
    };
  
    this.removeItem = function(key){
        if(!(key in cookie))
            return;
  
        delete cookie[key];
  
        for(var i=0; i<keys.length; i++){
            if(keys[i] === key){
                keys.splice(i, 1);
                break;
            }
        }
        this.length--;
  
        document.cookie = key + "=; max-age=0";
    };
  
    this.clear = function(){
        for(var i=0; i<keys.length; i++)
            document.cookie = keys[i] + "; max-age=0";
        cookie = {};
        keys = [];
        this.length = 0;
    };
  })());
  
//本地存储，localStorage类没有存储空间的限制，而cookieStorage有存储大小限制
//在不支持localStorage的情况下会自动切换为cookieStorage
window.myStorage = (new (function(){
 
    var storage;    //声明一个变量，用于确定使用哪个本地存储函数
 
    if(window.localStorage){
        storage = localStorage;     //当localStorage存在，使用H5方式
    }
    else{
        storage = cookieStorage;    //当localStorage不存在，使用兼容方式
    }
 
    this.setItem = function(key, value){
        storage.setItem(key, value);
    };
 
    this.getItem = function(name){
        return storage.getItem(name);
    };
 
    this.removeItem = function(key){
        storage.removeItem(key);
    };
 
    this.clear = function(){
        storage.clear();
    };
})());


