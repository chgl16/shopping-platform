package xyz.cglzwz.service;

import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;

import java.util.List;

/**
 * 访客基本权限业务
 *
 * @author chgl16
 * @date 2018-11-12 09:52
 * @version 1.0
 */

public interface VistorService {
    /**
     * 首页获取所有书
     *
     * @return
     */
    public List<Book> getAllBook();

    /**
     * 首页根据关键字查询相应图书
     *
     * @param keyword
     * @return
     */
    public List<Book> getBookByKeyword(String keyword);

    /**
     * 首页根据类型搜索图书
     *
     * @param type
     * @return
     */
    public List<Book> getBookByType(String type);

    /**
     * 首页根据价格范围搜索图书[from, end]
     *
     * @param from
     * @param end
     * @return
     */
    public List<Book> getBookByPriceRange(double from, double end);

    /**
     * 首页根据价格升序排列图书
     *
     * @return
     */
    public List<Book> getBookOrderByPriceAsc();

    /**
     * 首页根据价格降序排序图书
     *
     * @return
     */
    public List<Book> getBookOrderByPriceDesc();

    /**
     * 店铺内根据关键字获取图书
     *
     * @param storeId
     * @param keyword
     * @return
     */
    public List<Book> getStoreBookByKeyword(int storeId, String keyword);

    /**
     * 店铺内获取所有的书
     *
     * @param storeId
     * @return
     */
    public List<Book> getAllStoreBook(int storeId);

    /**
     * 获取所有店铺
     *
     * @return
     */
    public List<Store> getAllStore();
}
