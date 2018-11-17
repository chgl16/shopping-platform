package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 书和店的关系映射POJO
 *
 * @author chgl16
 * @date 2018-11-11 21:45
 * @version 1.0
 */

@Component
public class StoreBookRelation {
    private int storeId;
    private int bookId;

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}
