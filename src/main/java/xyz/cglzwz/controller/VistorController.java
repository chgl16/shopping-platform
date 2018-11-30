package xyz.cglzwz.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.cglzwz.dao.StoreMapper;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.service.StoreBookService;
import xyz.cglzwz.service.StoreService;
import xyz.cglzwz.service.VistorService;

import java.util.*;

/**
 * 店铺首页提供的基本功能，即对于访客
 *
 * @author chgl16
 * @date 2018-11-25
 * @version 1.0
 */

@Controller
public class VistorController {
    private static final Logger log =  Logger.getLogger(UserController.class);

    @Autowired
    private VistorService vistorService;

    @Autowired
    private StoreBookService storeBookService;

    @Autowired
    private StoreService storeService;
    /**
     * 获取推荐的书
     *
     * @return
     */
    @RequestMapping("/getBookRecommend")
    @ResponseBody
    public List<Book> getBookRecommend() {
        log.info("获取首页推荐的书展示");
        int limit =  9;
        return storeBookService.getBookRecommend(limit);
    }

    /**
     * 获取所有书
     *
     * @return
     */
    @RequestMapping("/getAllBook")
    @ResponseBody
    public List<Book> getAllBook() {
        log.info("获取所有书");
        return vistorService.getAllBook();
    }

    /**
     * 根据书id获取书的信息情况和店铺
     *
     * @param bookId
     * @return
     */
    @RequestMapping("/getBookAndStore/{bookId}")
    @ResponseBody
    public List<Object> getBookAndStore(@PathVariable("bookId") int bookId) {
        log.info("获取id=" + bookId + "的书信息和它店铺的信息");
        return vistorService.getBookAndStore(bookId);
    }

    /**
     * 获取某一类型的一些书
     *
     * @param type
     * @return
     */
    @RequestMapping("/getBookByType/{type}")
    @ResponseBody
    public List<Book> getBookByType(@PathVariable("type") String type) {
        log.info("获取type=" + type + "的书");
        return vistorService.getBookByType(type);
    }

    /**
     * 按照书名的关键字搜索书
     *
     * @param keyword
     * @return
     */
    @RequestMapping("/getBookByKeyword/{keyword}")
    @ResponseBody
    public List<Book> getBookBykeyword(@PathVariable("keyword") String keyword) {
        log.info("获取书名关键字=" + keyword + "的书");
        return vistorService.getBookByKeyword(keyword);
    }

    /**
     * 按照书价格范围的搜索书
     *
     * @param
     * @return
     */
    @RequestMapping("/getBookByPriceRange/{from}/{end}")
    @ResponseBody
    public List<Book> getBookBykeyword(@PathVariable("from") double from,  @PathVariable("end") double end) {
        log.info("按照书价格范围的搜索书: " + from + "-" + end);
        return vistorService.getBookByPriceRange(from, end);
    }


    /**
     * 通过店铺id获取店铺的信息和旗下所有书的信息
     *
     * @param storeId
     * @return
     */
    @RequestMapping("/getStore/{storeId}")
    @ResponseBody
    public Map<String, Object> getStore(@PathVariable("storeId") int storeId) {
        List<Book> bookList = vistorService.getAllStoreBook(storeId);
        Store store = storeService.getStore(storeId);
        log.info("获取到的店铺信息:" + store.toString());

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("store", store);
        map.put("bookList", bookList);

        return map;
    }
}
