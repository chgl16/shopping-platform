package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 店铺订单关系
 *
 * @author chgl16
 * @date 2018-11-28
 * @version 1.0
 */

@Component
public class StoreTransactionRelation {
    private int storeId;
    private int transactionId;

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }
}
