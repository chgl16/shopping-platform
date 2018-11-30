package xyz.cglzwz.dao;

import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.Store;

/**
 * 店铺表的基本数据库操作
 *
 * @author chgl16
 * @date 2018-11-11 16:44
 * @version 1.0
 */

@Repository
public interface StoreMapper {
    /**
     * 通过店主获取店铺信息
     *
     * @param ownerId
     * @return
     */
    public Store selectStore(int ownerId);

    /**
     * 修改店铺信息
     *
     * @param store
     */
    public void updateStore(Store store);

    /**
     * 插入一条店铺记录，供运营商批准业务调用
     *
     * @Param store
     */
    public void insertStore(Store store);

    /**
     * 通过店铺名字获取店铺id
     *
     * @param name
     * @return
     */
    public Integer selectPkIdByuKName(String name);

    /**
     * 通过店铺id获取店铺
     *
     * @param storeId
     * @return
     */
    public Store selectStoreById(int storeId);
}
