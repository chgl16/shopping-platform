package xyz.cglzwz.service;

import xyz.cglzwz.domain.User;
import xyz.cglzwz.domain.UserView;
import xyz.cglzwz.domain.Userinfo;

/**
 * 用户登录注册基本业务
 *
 * @author chgl16
 * @date 2018-11-5 11:31
 * @version 1.0
 */

public interface UserService {
    /**
     * 判读用户是否已注册
     *
     * @param phone
     * @return true:已注册，false:未注册
     */
    public boolean isRegistered(String phone);

    /**
     * 注册新用户
     *
     * @param user
     */
    public void register(User user);

    /**
     * 判读用户登录的密码是否正确
     *
     * @param phone
     * @param password
     * @return true/false
     */
    public boolean isCorrectPassword(String phone, String password);

    /**
     * 通过电话获取用户登录时的基本信息
     *
     * @param phone
     * @return
     */
    public UserView getUserView(String phone);

    /**
     * 更新修改用户个人信息
     *
     * @param userinfo
     */
    public void updateUserInfo(Userinfo userinfo);
}
