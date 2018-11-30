package xyz.cglzwz.config;



/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016091900549628";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLEV9+/YoB5M8YFtfdxCjf/jDliife2jtyPtRRXCVlZ+OFp8x9lZiWXue39L/hAw3t+BKnJxq8Hfd4wt2Nort780n2vvnqZENtcZ4J5qycT6TUxWJEiLv4xZYBMbqF0//vPKEAJ6MYhqX0q1pGy76pXhs4wc3pHKMqnkEgj7etBBWlc7zwSmoXC1Dk/LtAoAI3VWfpP9j6Pdw1+9AfYVIXMiI08lgYl+yG1XoT4RF3hDUP8xtHNGvEGSFiCnRDHB7mM/sEb9KEtzzJsy9rP1BXkmEeN6eHh0xgWzigYChdLGFes3aAwtMX0QTo6DDkCB/VxO3NZWoYyzzRhSvucwvjAgMBAAECggEAJnMWqtvk2rDxSXVh0DrJJohhx8SeAgM+SEZ/OxyAdC/0k6UPAiRmLOqxY1JzVm6Wn51eIsoztLTT28jB3ISYjUKmmZLVjT0Iy1s8+lD0E/C8nBD3p1Rgix0WZwl8cMSQbEMFlRrsNcOg/q/HOypu4nDQJLIFhAMJHhOy7zBnLdoGs7m1EUK+ZMxiY/YVnQ6/owf8RxLncSKGxFvrhl8TFEFKF0xvL/cqOrfGJ5q66KsMMaEhPpzxLRlf6GqiVByuGkNxWiRgJtb4X7S9W/3WEk3q6ZeVWUJwt+FVgVLjrncvKQ2MSjdcWH4EA76/2Km+/BwTf5PQk+vXfeXpb3BLCQKBgQDuzb+4iNbb7BWfQF7idMeZ1WBMJuwk11o5Qlq6qKUiAfJKExNc/jSS3z0y7e/0jGXn1Zco9IAEpEdNGmB7UlhNCdF9FYSXoMbqi6tzkzn31Dvi+boBqqWn5YjLv/HJH8FvttnpzDcifF8EkZ+rYvmO28PmtYnzhwIDBhC8PxdZ3QKBgQDZsNkdU3byIWmcbZYJay95M2clT0THAxlG7Dq9aHzn3txRLZlINeF/8lvK96Ejx7J9vHeSr9NU8sB/7WqUw/oCxrY3l8hWnOgQlUXe29qj1LljryLVxPRqmwEFXIjCB9LDRiwAXOp0D4YgPXrTiiSA41SGsrN1QSzcbYmy+TMAvwKBgQDee649PLAA4Skb35sHHInB1rwK9tBXWpPieOGSugBveKTFQpRttSBCHd4kju1aR1vB7IsSSwjiSjNrsEFnY8aEr7sO8HdB1Ta92jZ4TRhavs60nrkfSF9h10XlngSjvwQ3EoJfgjVz2a+k0A+UW3fqEvGnBkdqLcRAEOySla0puQKBgQCRSD9+HOfzLG1pYpGRc6FZR/78nWyPTPgfpySEqClELi3nV4FG+f6m/z5XtPAsCuiKla9PjFyEAwaJ2g8ZfblrBOczLu8bLtiJyLW6yAug7yVS691ZwXpFc3E4/Mqgg8wbWsee7mPiVUH0XlOMvlMiWZVd2AGAraCc89XERh/NzQKBgQCxbZ6iTXoqLufkbOu/LLiC4/epJBOPq7xTFWLUQPbebFMXs+MePqEPcqLIx+yKH00++j1VNdlK5N+u5LGBlOGA5r7eXyLJvq+ypbkbG6qSJg5urboBrD6Qmp+WdRJ7kBBUgmbDtIMxuUuNw2fanHjaZTP03UObWN8gVToVxB+SHw==";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs+4KSb0BwSDNSCwJgu4F5sgIS3FyihayErTg1YGbQlt0r58KZCSt7KS5dMGE5+htYMYwFEYF5kuoQXgl44RpZ/0Wczgvsd9nymjuUeYLRom/CYhRVTDVMwScsaDNSn5U0mm6Na8/6Tjka9iyDisXtQM8OApqqSLkRFVSothT1okF3sWtJmatFDv2lv0Bm2LrEN4kikUV9L/hO5RSlAp9i/kSJ6DM/DxZCSTL8x4AL/pWH8Yq37BVQjGQHCQlD1yb5c0GF6n5dVKMWLIgiZtPdXZP7J7RR7ax9mnM/Pqp+UPZxC9pF1lPOic7cmt4Ya78cm+ePxH31fbro10QyEnsJQIDAQAB";
	
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "";//http://170d491b26.iok.la/alipay.trade.page.pay-JAVA-UTF-8/PayServlet";
//			"http://localhost:8080/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";
			

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://www.cglzwz.top/html/view/index.html";//
    // "http://localhost:8080/html/view/index.html";//http://127.0.0.1:8080/alipay.trade.page.pay-JAVA-UTF-8/return_url.jsp";
//			"http://localhost:8080/alipay.trade.page.pay-JAVA-UTF-8/return_url.jsp";


	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式dev
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
}

