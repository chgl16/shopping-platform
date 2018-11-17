package xyz.cglzwz.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * 店铺店主关系表操作
 *
 * @author chgl16
 * @date 2018-11-11 16:53
 * @version 1.0
 */

@Repository
public interface StoreOwnerMapper {
    /**
     * 为新店铺添加一条关系
     *
     * @param storeId
     * @param ownerId
     */
    public void insert(@Param("storeId") int storeId, @Param("ownerId") int ownerId);
}
