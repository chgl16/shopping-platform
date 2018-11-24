package xyz.cglzwz.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.service.StoreBookService;
import xyz.cglzwz.service.StoreService;

/**
 * 店铺基本操作的控制器
 *
 * @author chgl16
 * @date 2018-11-23
 * @version 1.0
 */

@Controller
public class StoreController {
    private static final Logger log =  Logger.getLogger(UserController.class);

    @Autowired
    private StoreService storeService;

    @Autowired
    private StoreBookService storeBookService;

    /**
     * 提交店铺申请
     *
     * @param ownerId
     * @param storeName
     * @param storeIntroduction
     * @return
     */
    @RequestMapping(value = "/applyStore", method = RequestMethod.POST)
    @ResponseBody
    public String applyStore(int ownerId, String storeName, String storeIntroduction) {
        storeService.applyStore(ownerId, storeName, storeIntroduction);
        log.info("id=" + ownerId + "的店主成功提交了申请");
        return "success";
    }


    /**
     * 获取我的店铺
     * @param ownerId
     * @return
     */
    @RequestMapping("/getMyStore/{ownerId}")
    @ResponseBody
    public Object getMyStore(@PathVariable("ownerId") int ownerId) {
        Store store = storeService.getStoreInfo(ownerId);
        if (store == null) {
            log.info("该店主还没有店铺");
            return "null";
        } else {
            return store;
        }
    }


    @RequestMapping(value = "/addBook", method = RequestMethod.POST)
    @ResponseBody
    public String addBook(@RequestParam("storeId") int storeId, Book book) {
        log.info("给id=" + storeId + "的店铺添加名为" + book.getTitle() + "的书");
        storeBookService.addBook(book, storeId);
        return "success";
    }


}
