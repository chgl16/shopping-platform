package xyz.cglzwz.service;

import xyz.cglzwz.domain.ApplyStore;

import java.util.List;

/**
 * 服务商业务
 *
 * @author chgl16
 * @date 2018-11-11 16:15
 * @version 1.0
 */

public interface ProviderService {
    /**
     * 获取所有店铺申请
     *
     * @return List<ApplyStore>
     */
    public List<ApplyStore> getAllApplication();

    /**
     * 获取所以未处理的店铺申请（即status = -1）
     * @return List<ApplyStore>
     */
    public List<ApplyStore> getAllUntreatedApplication();

    /**
     * 通过这个店铺申请
     *
     * @param id
     */
    public void acceptApplication(int id);

    /**
     * 拒绝这个店铺申请
     *
     * @param id
     */
    public void refuseApplication(int id);
}
