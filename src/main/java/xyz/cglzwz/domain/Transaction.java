package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 订单信息表
 *
 * @author chgl16
 * @date 2018-11-8 23:49
 * @version 1.0
 */

@Component
public class Transaction {
    private int pkId;
    private int bookId;
    private String bookName;
    private int storeId;
    private String storeName;
    private int customerId;
    private String customerName;
    private String customerPhone;
    private String customerAddress;
    private double price;
    private byte status;
    private int logistics;
    private String time;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    public int getPkId() {
        return pkId;
    }

    public void setPkId(int pkId) {
        this.pkId = pkId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    public int getLogistics() {
        return logistics;
    }

    public void setLogistics(int logistics) {
        this.logistics = logistics;
    }

    @Override
    public String toString() {
        return  "transaction: [pkId: " + pkId + ", storeId: " + storeId + ", storeName: " + storeName + ", bookId: "
                + bookId + ", bookName: " + bookName + ", customerId: " + customerId + ", customerName: " + customerName
                + ", customerPhone: " + customerPhone + ", customerAddress: " + customerAddress + ", price: " + price
                + ", status: " + status + ", logistics: " + logistics + "]";
    }
}
