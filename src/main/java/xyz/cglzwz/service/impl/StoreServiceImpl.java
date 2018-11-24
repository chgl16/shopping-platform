package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cglzwz.dao.ApplyStoreMapper;
import xyz.cglzwz.dao.StoreMapper;
import xyz.cglzwz.domain.ApplyStore;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.domain.Transaction;
import xyz.cglzwz.service.StoreService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 店铺业务实现类
 *
 * @author chgl16
 * @date 2018-11-9  12:05
 * @version 1.0
 */

@Service
public class StoreServiceImpl implements StoreService {
    private static final Logger log =  Logger.getLogger(StoreServiceImpl.class);

    @Autowired
    private ApplyStore applyStore;

    @Autowired
    private ApplyStoreMapper applyStoreMapper;

    @Autowired
    private StoreMapper storeMapper;

    /**
     * 申请店铺
     *
     * @param ownerId
     * @param storeName
     * @param storeIntroduction
     */
    @Override
    public void applyStore(int ownerId, String storeName, String storeIntroduction) {
        applyStore.setOwnerId(ownerId);
        applyStore.setStoreName(storeName);
        applyStore.setStoreIntroduction(storeIntroduction);
        applyStore.setApplyTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        applyStoreMapper.insertNewApply(applyStore);
    }

    /**
     * 通过店主id获取店铺信息
     *
     * @param ownerId
     * @return
     */
    @Override
    public Store getStoreInfo(int ownerId) {
        log.info("获取店主id = " + ownerId + "的店铺信息");
        return storeMapper.selectStore(ownerId);
    }

    /**
     * 修改店铺的信息，根据店铺的id
     *
     * @param store
     */
    @Override
    public void updateStore(Store store) {
        storeMapper.updateStore(store);
        log.info("成功修改了店铺信息");
    }

    @Override
    public List<Transaction> getAllTransactionByStoreId(int storeId) {
        return null;
    }

    @Override
    public List<Transaction> getAllUntreatedTransactionByStoreId(int storeId) {
        return null;
    }
}
