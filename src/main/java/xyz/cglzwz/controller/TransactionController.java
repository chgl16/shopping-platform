package xyz.cglzwz.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.cglzwz.domain.Transaction;
import xyz.cglzwz.service.TransactionService;

import java.util.List;

/**
 * 交易订单控制器
 *
 * @author chgl16
 * @date 2018-11-29 10:54
 * @version 1.0
 */

@Controller
public class TransactionController {
    private static final Logger log =  Logger.getLogger(TransactionController.class);

    @Autowired
    private TransactionService transactionService;

    @RequestMapping("/getTransaction/{transactionId}")
    @ResponseBody
    public Transaction getTransaction(@PathVariable("transactionId") int transactionId) {
        Transaction transaction = transactionService.getTransaction(transactionId);
        log.info("获取到id=" + transactionId + "的订单信息:" + transaction);
        return transaction;
    }

    /**
     * 获取用户的所有订单
     *
     * @param customerId
     * @return
     */
    @RequestMapping("/getCustomerAllTransaction/{customerId}")
    @ResponseBody
    public List<Transaction> getCustomerAllTransaction(@PathVariable("customerId") int customerId) {
        log.info("获取id=" + customerId + "的用户的所有订单");
        return transactionService.getCustomerAllTransaction(customerId);
    }

    /**
     * 获取店铺的所有订单
     *
     * @param storeId
     * @return
     */
    @RequestMapping("/getStoreAllTransaction/{storeId}")
    @ResponseBody
    public List<Transaction> getStoreAllTransaction(@PathVariable("storeId") int storeId) {
        log.info("获取id=" + storeId + "的店铺的所有订单");
        return transactionService.getStoreAllTransaction(storeId);
    }

    /**
     * 获取店铺的未发货订单
     *
     * @param storeId
     * @return
     */
    @RequestMapping("/getStoreUnsentTransaction/{storeId}")
    @ResponseBody
    public List<Transaction> getStoreUnsentTransaction(@PathVariable("storeId") int storeId) {
        log.info("获取id=" + storeId + "的店铺的所有未发货订单");
        return transactionService.getStoreUnsentTransaction(storeId);
    }

    /**
     * 获取店铺的已发货未完成订单
     *
     * @param storeId
     * @return
     */
    @RequestMapping("/getStoreUnfinishedTransaction/{storeId}")
    @ResponseBody
    public List<Transaction> getStoreUnfinishedTransaction(@PathVariable("storeId") int storeId) {
        log.info("获取id=" + storeId + "的店铺的已发货未完成订单");
        return transactionService.getStoreUnfinishedTransaction(storeId);
    }

    /**
     * 更新书为发货状态
     *
     * @param transactionId
     * @return
     */
    @RequestMapping("/updateStatusToSend/{transactionId}")
    @ResponseBody
    public String updateStatusToSend(@PathVariable("transactionId") int transactionId) {
        log.info("修改的id=" + transactionId + "的订单为发货状态");
        transactionService.updateStatusToSend(transactionId);
        return "success";
    }



    /**
     * 为运营商获取所有订单
     *
     * @return
     */
    @RequestMapping("/getAllTransaction")
    @ResponseBody
    public List<Transaction> getAllTransaction() {
        log.info("为运营商获取所有订单");
        return transactionService.getAllTransaction();
    }
}
