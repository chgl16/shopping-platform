package xyz.cglzwz.service;

import com.alipay.api.AlipayApiException;
import xyz.cglzwz.domain.Transaction;

/**
 * 支付宝沙箱支付业务
 *
 * @author chgl16
 * @date 2018-11-26 23:39
 * @version 1.0
 */
public interface AlipayService {
    /**
     * 支付宝页面支付
     *
     * @param transaction
     * @return result
     * @throws AlipayApiException
     */
    public String alipayTradePagePay(Transaction transaction) throws AlipayApiException;
}
