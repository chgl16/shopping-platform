package xyz.cglzwz.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.CustomerTransactionRelation;
import xyz.cglzwz.domain.StoreTransactionRelation;
import xyz.cglzwz.domain.Transaction;

import java.util.List;

/**
 * 交易订单映射器接口
 *
 * @author chgl16
 * @date 2018-11-28
 * @version 1.0
 */

@Repository
public interface TransactionMapper {
    /**
     * 在订单表插入一条记录
     * @param transaction
     */
    public void insertTransaction(Transaction transaction);

    /**
     * 插入店铺订单关系表
     *
     * @Param storeTransactionRelation
     */
    public void insertStoreTransactionRelation(StoreTransactionRelation storeTransactionRelation);

    /**
     * 插入顾客订单关系表
     *
     * @param customerTransactionRelation
     */
    public void insertCustomerTransactionRelation(CustomerTransactionRelation customerTransactionRelation);


    /**
     * 通过id获取一个订单
     *
     * @param transactionId
     * @return
     */
    public Transaction selectTransaction(int transactionId);

    /**
     * 获取用户的订单信息
     *
     * @param customerId
     * @return
     */
    public List<Transaction> selectCustomerAllTransaction(int customerId);

    /**
     * 获取店铺的订单信息
     *
     * @param storeId
     * @return
     */
    public List<Transaction> selectStoreAllTransaction(int storeId);

    /**
     * 获取店铺未发货的订单
     *
     * @return
     */
    public List<Transaction> selectStoreUnsentTransaction(int storeId);

    /**
     * 获取店铺发货了的订单
     *
     * @param storeId
     * @return
     */
    public List<Transaction> selectStoreUnfinishedTransaction(int storeId);

    /**
     * 为运营商获取所有订单信息
     *
     * @return
     */
    public List<Transaction> selectAllTransaction();

    /**
     * 修改状态为发货 1
     *
     * @param transactionId
     */
    public void updateStatusToSend(int transactionId);
}
