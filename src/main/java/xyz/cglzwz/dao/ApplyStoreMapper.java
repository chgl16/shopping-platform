package xyz.cglzwz.dao;

import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.ApplyStore;

import java.util.List;

/**
 * 申请店铺表操作
 * 用户申请店铺和运营商管理申请
 *
 * @author chgl16
 * @date 2018-11-9 12:12
 * @version 1.0
 */

@Repository
public interface ApplyStoreMapper {
    /**
     * 插入一条申请记录
     *
     * @param applyStore
     */
    public void insertNewApply(ApplyStore applyStore);

    /**
     * 为运营商获取所有申请记录
     *
     * @return List<ApplyStore>
     */
    public List<ApplyStore> selectAll();

    /**
     * 为运营商获取所有未处理申请记录
     *
     * @return List<ApplyStore>
     */
    public List<ApplyStore> selectAllUntreated();

    /**
     * 根据申请表序号修改申请状态
     * 状态置为1-通过申请
     *
     * @param id
     */
    public void updateStatusToAccept(int id);

    /**
     * 根据申请表序号修改申请状态
     * 状态置为0-通过拒绝
     *
     * @param id
     */
    public void updateStatusToRefuse(int id);

    /**
     * 根据id获取这个申请
     *
     * @param id
     * @return applyStore
     */
    public ApplyStore selectOneByPkId(int id);
}
