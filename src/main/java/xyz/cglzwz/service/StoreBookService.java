package xyz.cglzwz.service;

import xyz.cglzwz.domain.Book;

import java.util.List;

/**
 * 和书有关的业务
 *
 * @author chgl16
 * @date 2018-11-11 20:01
 * @version 1.0
 */

public interface StoreBookService {
    /**
     * 给指定的店铺添加一本书
     *
     * @param book
     * @Param storeId
     */
    public void addBook(Book book, int storeId);

    /**
     * 修改图书信息
     *
     * @param book
     */
    public void updateBook(Book book);

    /**
     * 下架删除书
     *
     * @param storeId
     * @param bookId
     */
    public void deleteBook(int storeId, int bookId);

    /**
     * 获取店铺的所有图书
     *
     * @param storeId
     * @return
     */
    public List<Book> getStoreBook(int storeId);

    /**
     * 获取一定数量推荐到网站首页轮播显示的书
     *
     * @param limit
     * @return List<Book>
     */
    public List<Book> getBookRecommend(int limit);

    /**
     * 获取一定数量的店铺轮播显示的书
     *
     * @param storeId
     * @param limit
     * @return List<Book>
     */
    public List<Book> getStoreBookShow(int storeId, int limit);
}
