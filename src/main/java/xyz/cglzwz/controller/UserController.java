package xyz.cglzwz.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import xyz.cglzwz.domain.User;
import xyz.cglzwz.domain.UserView;
import xyz.cglzwz.domain.Userinfo;
import xyz.cglzwz.service.UserService;
import xyz.cglzwz.util.FileUtil;
import xyz.cglzwz.util.JSONUtil;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户注册登录基本操作的控制器
 *
 * @author chgl16
 * @date 2018-11-5 19:49
 * @version 1.1
 */

@Controller
public class UserController {
    private static final Logger log =  Logger.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    /**
     * 注册
     *
     * @param user
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register(User user) {
        // 先判读用户是否已经注册了
        boolean isRegistered = userService.isRegistered(user.getPhone());
        if (isRegistered) {
            log.info("用户phone: " + user.getPhone() + "已经注册");
            return "false";
        } else {
            log.info("用户未注册");
            log.info("phone: " + user.getPhone() + ", password: " + user.getPassword()+ ", roleType: " + user.getRoleType());
            userService.register(user);
            return "true";
        }
        /*
        ModelAndView mv = new ModelAndView();
        // 参数列表是POJO(user)自动添加了user进了-ModelAndView
        mv.setView(new MappingJackson2JsonView());
        */
    }

    /**
     * 登录
     *
     * @param user
     * @return
     */
    @RequestMapping("/login")
    @ResponseBody
    public Object login(User user) throws JsonProcessingException {
        boolean flag = userService.isCorrectPassword(user.getPhone(), user.getPassword());
        if (flag) {
            log.info("密码正确,登录....");
            // 获取登录后的一些基本用户数据返回
            UserView userView = userService.getUserView(user.getPhone());
            log.info(userView.toString());
            return userView;
        } else {
            log.info("密码错误或者用户不存在");
            return "false";
        }
    }

    /**
     * 更新修改用户个人信息
     *
     * @param userinfo
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/updateUserinfo", method = RequestMethod.POST)
    @ResponseBody
    public String updateUserinfo(Userinfo userinfo) throws IOException {
        log.info("进入修改信息控制器");
        MultipartFile file  = userinfo.getImage();
        String imgUrl = "/home/lin/" + userinfo.getContactPhone() + ".png";
        FileUtil.saveFile(file, imgUrl);

        return "";
    }
}
