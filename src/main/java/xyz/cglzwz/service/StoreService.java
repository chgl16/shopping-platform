package xyz.cglzwz.service;

import xyz.cglzwz.domain.Store;
import xyz.cglzwz.domain.Transaction;

import java.util.List;

/**
 * 店铺业务
 *
 * @author chgl16
 * @date 2018-11-8 23:13
 * @version 1.0
 */

public interface StoreService {
    /**
     * 用户申请开店，提交用户id，店铺名字和介绍
     *
     * @param ownerId
     * @param storeName
     * @param storeIntroduction
     */
    public void applyStore(int ownerId, String storeName, String storeIntroduction);

    /**
     * 更新店铺信息
     *
     * @param store
     */
    public void updateStore(Store store);

    /**
     * 通过店主id获取店铺信息
     *
     * @param ownerId
     * @return store
     */
    public Store getStoreInfo(int ownerId);

    /**
     * 获取店铺的所有订单
     *
     * @param storeId
     * @return List<Transaction>
     */
    public List<Transaction> getAllTransactionByStoreId(int storeId);

    /**
     * 获取所有店铺未处理的订单
     *
     * @param storeId
     * @return
     */
    public List<Transaction> getAllUntreatedTransactionByStoreId(int storeId);
}
