package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cglzwz.dao.TransactionMapper;
import xyz.cglzwz.domain.Transaction;
import xyz.cglzwz.service.TransactionService;

import java.util.List;

/**
 * 订单交易业务实现（生成订单已经在支付宝支付业务处实现）
 *
 * @author chgl16
 * @date 2018-11-29 10:45
 * @version 1.0
 */

@Service
public class TransactionServiceImpl implements TransactionService {
    private static final Logger log =  Logger.getLogger(TransactionServiceImpl.class);

    @Autowired
    private TransactionMapper transactionMapper;

    /**
     * 通过id获取一个订单
     *
     * @param transactionId
     * @return
     */
    public Transaction getTransaction(int transactionId) {
        return transactionMapper.selectTransaction(transactionId);
    }

    /**
     * 用户获取自己的所有订单
     *
     * @param customerId
     * @return
     */
    @Override
    public List<Transaction> getCustomerAllTransaction(int customerId) {
        return transactionMapper.selectCustomerAllTransaction(customerId);
    }

    @Override
    public List<Transaction> getCustomerUnfinishedTransaction(int customerId) {
        return null;
    }

    @Override
    public List<Transaction> getCustomerUnsentTransaction(int customerId) {
        return null;
    }

    /**
     * 店铺获取其所有订单
     *
     * @param storeId
     * @return
     */
    @Override
    public List<Transaction> getStoreAllTransaction(int storeId) {
        return transactionMapper.selectStoreAllTransaction(storeId);
    }

    /**
     * 返回店铺未发货的订单
     *
     * @param storeId
     * @return
     */
    @Override
    public List<Transaction> getStoreUnsentTransaction(int storeId) {
        return transactionMapper.selectStoreUnsentTransaction(storeId);
    }

    /**
     * 返回店铺已经发货的订单
     *
     * @param storeId
     * @return
     */
    @Override
    public List<Transaction> getStoreUnfinishedTransaction(int storeId) {
        return transactionMapper.selectStoreUnfinishedTransaction(storeId);
    }

    /**
     * 运营商获取所有订单
     *
     * @return
     */
    @Override
    public List<Transaction> getAllTransaction() {
        return transactionMapper.selectAllTransaction();
    }

    @Override
    public List<Transaction> getUnfinishTransaction() {
        return null;
    }

    /**
     * 更新为发货状态
     *
     * @param transactionId
     */
    public void updateStatusToSend(int transactionId) {
        transactionMapper.updateStatusToSend(transactionId);
    }
}
