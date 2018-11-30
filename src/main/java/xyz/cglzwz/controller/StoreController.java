package xyz.cglzwz.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import xyz.cglzwz.domain.Book;
import xyz.cglzwz.domain.Store;
import xyz.cglzwz.service.StoreBookService;
import xyz.cglzwz.service.StoreService;
import xyz.cglzwz.util.FileUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

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

    @Autowired
    private HttpServletRequest request;

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


    /**
     * 添加一本书
     * @param storeId
     * @param book
     * @return
     */
    @RequestMapping(value = "/addBook", method = RequestMethod.POST)
    @ResponseBody
    public String addBook(@RequestParam("storeId") int storeId, Book book)  throws IOException {
        log.info("给id=" + storeId + "的店铺添加名为" + book.getTitle() + "的书");

        // 处理图片文件
        String contextPath = request.getSession().getServletContext().getRealPath("/");
        MultipartFile[] file = book.getImage();
        // 存储url采用 店id+书名+img+序号
        int lenght = file.length;
        if (lenght >= 1)
            book.setImgUrl1(FileUtil.saveFile(file[0], contextPath, storeId + book.getTitle() + "-img1", "book"));
        if (lenght >= 2)
            book.setImgUrl2(FileUtil.saveFile(file[1], contextPath, storeId + book.getTitle() + "-img2", "book"));
        if (lenght >= 3)
            book.setImgUrl3(FileUtil.saveFile(file[2], contextPath, storeId + book.getTitle() + "-img3", "book"));
        if (lenght >= 4)
            book.setImgUrl4(FileUtil.saveFile(file[3], contextPath, storeId + book.getTitle() + "-img4", "book"));
        if (lenght >= 5)
            book.setImgUrl5(FileUtil.saveFile(file[4], contextPath, storeId + book.getTitle() + "-img5", "book"));

        log.info("书的信息：" + book.toString());
        // 启动添加业务
        storeBookService.addBook(book, storeId);
        return "success";
    }

    /**
     * 获取店铺的所有书
     *
     * @param storeId
     * @return
     */
    @RequestMapping("/getStoreBook/{storeId}")
    @ResponseBody
    public List<Book> getStoreBook(@PathVariable("storeId") int storeId) {
        log.info("给id=" + storeId + "返回其所有图书");
        return storeBookService.getStoreBook(storeId);
    }

    /**
     * 下架删除店铺的某本书
     *
     * @param storeId
     * @param bookId
     * @return
     */
    @RequestMapping("/deleteBook/{storeId}/{bookId}")
    @ResponseBody
    public String deleteBook(@PathVariable("storeId") int storeId, @PathVariable("bookId") int bookId) {
        log.info("删除id=" + storeId + "的店铺的id=" + bookId + "的书");
        storeBookService.deleteBook(storeId, bookId);
        return "success";
    }

    @RequestMapping("/updateStore")
    @ResponseBody
    public String updateStore(Store store) throws  IOException{
        log.info("修改id=" + store.getId() + "的店铺信息");
        // 处理图片文件
        String contextPath = request.getSession().getServletContext().getRealPath("/");
        MultipartFile file = store.getImage();
        // 存储url采用 店id
        store.setImgUrl(FileUtil.saveFile(file, contextPath, String.valueOf(store.getId()), "store"));
        log.info("要修改成的店铺新信息：" + store.toString());
        storeService.updateStore(store);
        return  "success";
    }
}
