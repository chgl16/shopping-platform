package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.cglzwz.dao.StoreMapper;
import xyz.cglzwz.dao.StoreOwnerMapper;
import xyz.cglzwz.domain.ApplyStore;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.service.ProviderService;
import xyz.cglzwz.dao.ApplyStoreMapper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 运营商业务实现类
 *
 * @author chgl16
 * @date 2018-11-11 16:23
 * @version 1.0
 */

@Service
public class ProviderServiceImpl implements ProviderService {
    private static final Logger log =  Logger.getLogger(UserServiceImpl.class);

    @Autowired
    private ApplyStoreMapper applyStoreMapper;

    @Autowired
    private StoreMapper storeMapper;

    @Autowired
    private StoreOwnerMapper storeOwnerMapper;

    @Autowired
    private Store store;

    /**
     * 获取所以店铺申请
     *
     * @return List<ApplyStore>
     */
    @Override
    public List<ApplyStore> getAllApplication() {
        return applyStoreMapper.selectAll();
    }

    /**
     * 获取所以未处理的店铺申请（即status = -1）
     * @return List<ApplyStore>
     */
    @Override
    public List<ApplyStore> getAllUntreatedApplication() {
        return applyStoreMapper.selectAllUntreated();
    }

    /**
     * 通过这个店铺申请
     *
     * @param pkId
     */
    @Override
    @Transactional
    public void acceptApplication(int pkId) {
        applyStoreMapper.updateStatusToAccept(pkId);
        // 获取改申请信息以便新建店铺和关系
        ApplyStore applyStore = applyStoreMapper.selectOneByPkId(pkId);
        store.setName(applyStore.getStoreName());
        store.setIntroduction(applyStore.getStoreIntroduction());
        store.setFoundingTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        // 插入一个新店铺
        storeMapper.insertStore(store);
        // 通过店名获取店铺id
        Integer storeId = storeMapper.selectPkIdByuKName(store.getName());
        // 插入店铺店主关系
        storeOwnerMapper.insert(storeId, applyStore.getOwnerId());

        log.info("通过了pkId=" + pkId + "的网店申请");
    }

    /**
     * 拒绝这个店铺申请
     *
     * @param pkId
     */
    @Override
    public void refuseApplication(int pkId) {
        applyStoreMapper.updateStatusToRefuse(pkId);
        log.info("拒绝了pkId=" + pkId + "的网店申请");
    }
}
