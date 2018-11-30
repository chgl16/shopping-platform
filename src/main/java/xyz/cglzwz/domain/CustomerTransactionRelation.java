package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 用户订单关系
 *
 * @author chgl16
 * @date 2018-11-28
 * @version 1.0
 */

@Component
public class CustomerTransactionRelation {
    private int customerId;
    private int transactionId;

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }
}
