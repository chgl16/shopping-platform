package xyz.cglzwz.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.StoreBookRelation;

import java.util.List;

/**
 * 货物书的映射器接口
 *
 * @author chgl16
 * @date 2018-11-11 20:51
 * @version 1.0
 */

@Repository
public interface StoreBookMapper {
    /**
     * 插入一本书
     *
     * @param book
     */
    public void insertBook(Book book);

    /**
     * 为新添加的书建立书和店铺的关系记录
     * 书的id通过SELECT LAST_INSERT_ID();获取
     * 自动注入到传递的storeBookRelation参数Pojo中
     *
     * @param storeBookRelation
     */
    public void insertStoreBookRelation(StoreBookRelation storeBookRelation);

    /**
     * 根据书的id修改书的信息
     * 可以修改的字段为price, introduction, type,
     * recommend, show, inventory
     *
     * @param book
     */
    public void updateBook(Book book);

    /**
     * 根据书的id从书和店关系表删除关系
     * ## 外键约束，所有先删除关系
     *
     * @param storeId
     * @param bookId
     */
    public void deleteStoreBookRelation(@Param("storeId") int storeId, @Param("bookId") int bookId);

    /**
     * 根据书id从书表删除一本书
     *
     * @param bookId
     */
    public void deleteBook(int bookId);

    /**
     * 获取店铺的所有图书
     *
     * @param storeId
     * @return
     */
    public List<Book> selectAllStoreBook(int storeId);

    /**
     * 获取一定数量推荐首页的书
     *
     * @param limit
     * @return List<Book>
     */
    public List<Book> selectBookRecommend(int limit);

    /**
     * 获取一定数量本店展示的书
     *
     * @param limit
     * @return List<Book>
     */
    public List<Book> selectStoreBookShow(@Param("storeId") int storeId, @Param("limit") int limit);
}
