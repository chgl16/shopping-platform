package xyz.cglzwz.service;

import xyz.cglzwz.domain.Transaction;

import java.util.List;

/**
 * 交易订单业务
 *
 * @author chgl16
 * @date 2018-11-12 18:49
 * @version 1.0
 */

public interface TransactionService {
    /**
     * 通过id获取一个订单
     *
     * @param transactionId
     * @return
     */
    public Transaction getTransaction(int transactionId);

    /**
     * 用户获取自己的所有订单
     *
     * @param customerId
     * @return
     */
    public List<Transaction> getCustomerAllTransaction(int customerId);

    /**
     * 用户获取自己所以的未完成（待收货）订单
     * 即status != 2
     *
     * @param customerId
     * @return
     */
    public List<Transaction> getCustomerUnfinishedTransaction(int customerId);

    /**
     * 用户获取自己未发货的订单
     * 即status = -1
     *
     * @param customerId
     * @return
     */
    public List<Transaction> getCustomerUnsentTransaction(int customerId);

    /**
     * 店铺获取其所有订单
     *
     * @param storeId
     * @return
     */
    public List<Transaction> getStoreAllTransaction(int storeId);

    /**
     * 获取店铺未发货的订单
     * 即status = -1
     *
     * @param storeId
     * @return
     */
    public List<Transaction> getStoreUnsentTransaction(int storeId);

    /**
     * 店铺获取未处理完的订单
     *
     * @param storeId
     * @return
     */
    public List<Transaction> getStoreUnfinishedTransaction(int storeId);

    /**
     * 运营商获取所有订单
     *
     * @return
     */
    public List<Transaction> getAllTransaction();

    /**
     *
     * @return
     */
    public List<Transaction> getUnfinishTransaction();

    /**
     * 更新为发货状态
     *
     * @param transactionId
     */
    public void updateStatusToSend(int transactionId);
}
