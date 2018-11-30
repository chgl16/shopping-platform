package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 申请店铺表
 *
 * @author chgl16
 * @date 2018-11-9 09:57
 * @version 1.0
 */

@Component
public class ApplyStore {
    private int id;
    private int ownerId;
    private String storeName;
    private String storeIntroduction;
    private String applyTime;
    /**
     * 申请状态：-1-未处理，0-拒绝，1-通过
     */
    private byte status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreIntroduction() {
        return storeIntroduction;
    }

    public void setStoreIntroduction(String storeIntroduction) {
        this.storeIntroduction = storeIntroduction;
    }

    public String getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(String applyTime) {
        this.applyTime = applyTime;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "applyStore: [id: " + id + ", ownerId: " + ownerId + ", storeName: " + storeName + ", storeIntroduction: "
                + storeIntroduction + ", applyTime: " + applyTime + ", status: " + status + "]";
    }
}
