package xyz.cglzwz.service.impl;

import com.alipay.api.*;
import com.alipay.api.request.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.cglzwz.controller.UserController;
import xyz.cglzwz.dao.StoreBookMapper;
import xyz.cglzwz.dao.TransactionMapper;
import xyz.cglzwz.domain.CustomerTransactionRelation;
import xyz.cglzwz.domain.StoreTransactionRelation;
import xyz.cglzwz.domain.Transaction;
import xyz.cglzwz.service.AlipayService;
import xyz.cglzwz.config.AlipayConfig;
import xyz.cglzwz.service.StoreBookService;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 支付宝支付业务实现类
 *
 * @author chgl16
 * @date 2018-11-27 15:20
 * @version 1.0
 */

@Service
public class AlipayServiceImpl implements AlipayService {
    private static final Logger log =  Logger.getLogger(UserController.class);

    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private StoreTransactionRelation storeTransactionRelation;

    @Autowired
    private CustomerTransactionRelation customerTransactionRelation;

    @Autowired
    private StoreBookMapper storeBookMapper;

    /**
     * 网页支付
     *
     * @param transaction
     * @return result
     */
    @Transactional
    @Override
    public String alipayTradePagePay(Transaction transaction) throws AlipayApiException {
        // 获得初始化的AlipayClient
        AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);

        // 设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);

        Date date = new Date();
        transaction.setOrderId(new SimpleDateFormat("yyyyMMddHHmmssSS").format(date));
        transaction.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
        log.info(transaction);

        // 在数据库创建订单
        transactionMapper.insertTransaction(transaction);
        storeTransactionRelation.setStoreId(transaction.getStoreId());
        transactionMapper.insertStoreTransactionRelation(storeTransactionRelation);
        customerTransactionRelation.setCustomerId(transaction.getCustomerId());
        transactionMapper.insertCustomerTransactionRelation(customerTransactionRelation);
        // 更新库存和销量
        storeBookMapper.updateBookVolume(transaction.getBookId());
        log.info("成功插入订单");

        alipayRequest.setBizContent(
                "{\"out_trade_no\":\"" + transaction.getOrderId() + "\","    // 订单编号
                + "\"total_amount\":\"" + transaction.getPrice() + "\","     // 订单金额
                + "\"subject\":\"" + transaction.getBookName() + "\","       // 订单标题
                + "\"body\":\"" + transaction.getRemark() + "\","            // 订单描述（可空）
                + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");           // 销售产品码（目前固定这个）

        // 请求
        String result = alipayClient.pageExecute(alipayRequest).getBody();
        return result;
    }
}
