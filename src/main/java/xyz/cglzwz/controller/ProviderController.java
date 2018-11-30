package xyz.cglzwz.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.cglzwz.domain.ApplyStore;
import xyz.cglzwz.service.ProviderService;

import java.security.Provider;
import java.util.List;

/**
 * 运行商后台管理页面的一些操作控制
 *
 * @author chgl16
 * @date 2018-11-23
 * @version 1.0
 */

@Controller
public class ProviderController {
    private static final Logger log =  Logger.getLogger(UserController.class);

    @Autowired
    private ProviderService providerService;

    /**
     * 获取所有店铺的申请
     * @return
     */
    @RequestMapping(value = "/getAllApplication")
    @ResponseBody
    public List<ApplyStore> getAllApplication() {
        return providerService.getAllApplication();
    }

    /**
     * 通过店铺申请
     *
     * @param id
     */
    @RequestMapping("/acceptApplication/{id}")
    @ResponseBody
    public String acceptApplication(@PathVariable("id") int id) {
        providerService.acceptApplication(id);
        log.info("通过了序号id=" + id + "的店铺申请");
        return "success";
    }

    /**
     * 绝交店铺神申请
     *
     * @param id
     */
    @RequestMapping("/refuseApplication/{id}")
    @ResponseBody
    public String refuseApplication(@PathVariable("id") int id) {
        providerService.refuseApplication(id);
        log.info("拒绝了序号id=" + id + "的店铺申请");
        return "success";
    }

}
