package xyz.cglzwz.controller;

import com.alipay.api.AlipayApiException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;
import xyz.cglzwz.domain.Transaction;
import xyz.cglzwz.service.AlipayService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 基于支付宝的支付接口的控制类
 *
 * @author chgl16
 * @date 2018-11-27 14:40
 * @version 1.0
 */

@Controller
public class AlipayController {
    private static final Logger log =  Logger.getLogger(UserController.class);

    private HttpServletResponse response;

    @Autowired
    private AlipayService alipayService;

    /**
     * 网页跳转支付
     *
     * @param transaction
     */
    @RequestMapping(value = "/payTrade", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
    // @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody  //必须写
    public String pagePay(Transaction transaction, HttpServletResponse response) throws AlipayApiException, IOException {
        String result = alipayService.alipayTradePagePay(transaction);
//        log.info(result);
        return result;
    }
}

/*
<!-- <form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=YKCABH9dIsx0IV3QxtP5Eewm0LMe2HlNJyWotChGswakupJyuTmirTf4MH%2FtFmNOUs73swjJZUrVNhtBDFGeaxdUbAl9FT6iIvHV512NTmRQCiBrC1I9fNQ8v1YV11NNZKkIJtU7QWvi03CVKi%2B927Kzlc1gpleX9abzj51OL1JjXL7kcaM2GnIDZ6b3P3C2aOROewbDP2WuJUI7LOKh3u0MWF6um%2BKydKTrcdFl57S0fpVyREaxZYWmNRKo7TZEOxMEeNoF7Hf2%2Fr2dm7Sav%2Fq7YcdsG%2BNEKufJ1H4pZsAv2y7M1R4krN3egMm%2FFiPRG9SE3yXivpr2Ljv7sFMSzg%3D%3D&return_url=http%3A%2F%2F127.0.0.1%3A8080%2Falipay.trade.page.pay-JAVA-UTF-8%2Freturn_url.jsp&notify_url=http%3A%2F%2F170d491b26.iok.la%2Falipay.trade.page.pay-JAVA-UTF-8%2FPayServlet&version=1.0&app_id=2016091900549628&sign_type=RSA2&timestamp=2018-11-27+16%3A02%3A16&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">
<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;2018112716213512&quot;,&quot;total_amount&quot;:&quot;0.01&quot;,&quot;subject&quot;:&quot;测试&quot;,&quot;body&quot;:&quot;第三方&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();</script> -->
*/

