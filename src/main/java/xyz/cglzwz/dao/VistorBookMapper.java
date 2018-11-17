package xyz.cglzwz.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;

import java.util.List;

/**
 * 访客对书的操作映射器接口
 *
 * @author chgl16
 * @date 2018-11-12 10:11
 * @version 1.0
 */

@Repository
public interface VistorBookMapper {
    /**
     * 首页获取所有书
     *
     * @return
     */
    public List<Book> selectAllBook();

    /**
     * 首页根据关键字查询相应图书
     *
     * @param keyword
     * @return
     */
    public List<Book> selectBookByKeyword(String keyword);

    /**
     * 首页根据类型搜索图书
     *
     * @param type
     * @return
     */
    public List<Book> selectBookByType(String type);

    /**
     * 首页根据价格范围搜索图书[from, end]
     *
     * @param from
     * @param end
     * @return
     */
    public List<Book> selectBookByPriceRange(@Param("from") double from, @Param("end") double end);

    /**
     * 首页根据价格升序排列图书
     *
     * @return
     */
    public List<Book> selectBookOrderByPriceAsc();

    /**
     * 首页根据价格降序排序图书
     *
     * @return
     */
    public List<Book> selectBookOrderByPriceDesc();

    /**
     * 店铺内根据关键字获取图书
     *
     * @param storeId
     * @param keyword
     * @return
     */
    public List<Book> selectStoreBookByKeyword(@Param("storeId") int storeId, @Param("keyword") String keyword);

    /**
     * 店铺内获取所有的书
     *
     * @param storeId
     * @return
     */
    public List<Book> selectAllStoreBook(int storeId);

    /**
     * 获取所有店铺
     *
     * @return
     */
    public List<Store> selectAllStore();
}
