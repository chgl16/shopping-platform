package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.cglzwz.dao.StoreBookMapper;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.StoreBookRelation;
import xyz.cglzwz.service.StoreBookService;

import java.util.List;

/**
 * 货物书业务实现类
 *
 * @author chgl16
 * @date 2018-11-11 20:15
 * @version 1.0
 */

@Service
public class StoreBookServiceImpl implements StoreBookService {
    private static final Logger log =  Logger.getLogger(UserServiceImpl.class);

    @Autowired
    private Book book;

    @Autowired
    private StoreBookRelation storeBookRelation;

    @Autowired
    private StoreBookMapper storeBookMapper;

    /**
     * 为店铺添加一本书
     *
     * @param book
     */
    @Override
    @Transactional
    public void addBook(Book book, int storeId) {
        // 先插入新书记录到tb_book
        storeBookMapper.insertBook(book);
        storeBookRelation.setStoreId(storeId);
        // 再插入店铺和书的关系到tb_store_book
        storeBookMapper.insertStoreBookRelation(storeBookRelation);
        log.info("成功为id = " + storeId + "的店铺添加了一本title = " + book.getTitle() + "的书");
    }

    /**
     * 修改书的信息
     *
     * @param book
     */
    @Override
    public void updateBook(Book book) {
        storeBookMapper.updateBook(book);
        log.info("成功修改了id = " + book.getPkId() + "的书的信息");
    }

    /**
     * 删除店铺的某本书
     *
     * @param storeId
     * @param bookId
     */
    @Override
    @Transactional
    public void deleteBook(int storeId, int bookId) {
        // 先删除tb_store_book表的关系记录
        storeBookMapper.deleteStoreBookRelation(storeId, bookId);
        // 然后删除tb_book表的书记录
        storeBookMapper.deleteBook(bookId);
        log.info("成功删除了店铺id = " + storeId + "，书id = " + bookId + "的书");
    }

    /**
     * 获取一定数量推荐到网站首页轮播显示的书
     *
     * @param limit
     * @return
     */
    @Override
    public List<Book> getBookRecommend(int limit) {
        return storeBookMapper.selectBookRecommend(limit);
    }

    /**
     * 获取一定数量的店铺轮播显示的书
     *
     * @param storeId
     * @param limit
     * @return List<Book>
     */
    @Override
    public List<Book> getStoreBookShow(int storeId, int limit) {
        return storeBookMapper.selectStoreBookShow(storeId, limit);
    }

    /**
     * 获取本店所有书
     *
     * @param storeId
     * @return
     */
    @Override
    public List<Book> getStoreBook(int storeId) {
        return storeBookMapper.selectAllStoreBook(storeId);
    }
}
