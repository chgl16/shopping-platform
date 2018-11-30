package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cglzwz.dao.VistorBookMapper;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.service.VistorService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 顾客查书业务
 *
 * @author chgl16
 * @date 2018-11-12 11:13
 * @version 1.0
 */

@Service
public class VistorServiceImpl implements VistorService {
    private static final Logger log =  Logger.getLogger(UserServiceImpl.class);

    @Autowired
    private VistorBookMapper vistorBookMapper;

    @Override
    public List<Book> getAllBook() {
        return vistorBookMapper.selectAllBook();
    }

    @Override
    public List<Book> getBookByKeyword(String keyword) {
        return vistorBookMapper.selectBookByKeyword(keyword);
    }

    /**
     * 按类型获取书的集合
     *
     * @param type
     * @return
     */
    @Override
    public List<Book> getBookByType(String type) {
        return vistorBookMapper.selectBookByType(type);
    }

    @Override
    public List<Book> getBookByPriceRange(double from, double end) {
        return vistorBookMapper.selectBookByPriceRange(from, end);
    }

    @Override
    public List<Book> getBookOrderByPriceAsc() {
        return vistorBookMapper.selectBookOrderByPriceAsc();
    }

    @Override
    public List<Book> getBookOrderByPriceDesc() {
        return vistorBookMapper.selectBookOrderByPriceDesc();
    }

    @Override
    public List<Book> getStoreBookByKeyword(int storeId, String keyword) {
        return vistorBookMapper.selectStoreBookByKeyword(storeId, keyword);
    }

    @Override
    public List<Book> getAllStoreBook(int storeId) {
        return vistorBookMapper.selectAllStoreBook(storeId);
    }

    @Override
    public List<Store> getAllStore() {
        return vistorBookMapper.selectAllStore();
    }

    /**
     * 通过书id获取书和其店铺
     * @param bookId
     * @return
     */
    @Override
    public List<Object> getBookAndStore(int bookId) {
        Book book = vistorBookMapper.getBook(bookId);
        Store store = vistorBookMapper.getStore(bookId);
        List<Object> list = new ArrayList<Object>();
        list.add(book);
        list.add(store);
        log.info("书的信息：" + book.toString());
        log.info("店的信息: " + store.toString());
        return list;
    }

    /**
     * 通过店铺id获取店铺信息
     *
     * @param bookId
     * @return
     */
    public Store getStoreByBookId(int bookId) {
        return vistorBookMapper.getStore(bookId);
    }
}
