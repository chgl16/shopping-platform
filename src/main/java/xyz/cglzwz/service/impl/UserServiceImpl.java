package xyz.cglzwz.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import xyz.cglzwz.dao.UserMapper;
import xyz.cglzwz.domain.User;
import xyz.cglzwz.domain.UserView;
import xyz.cglzwz.domain.Userinfo;
import xyz.cglzwz.service.UserService;

/**
 * 用户管理业务实现类
 *
 * @author chgl16
 * @date 2018-11-5 12:03
 * @version 1.0
 */

@Service
public class UserServiceImpl implements UserService {
    private static final Logger log =  Logger.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private User user;
    @Autowired
    private Userinfo userinfo;

    @Override
    public boolean isRegistered(String phone) {
        Integer id = userMapper.findUserByPhone(phone);
        if (id == null || id == 0) {
            return false;
        }
        return true;
    }

    @Override
    @Transactional
    public void register(User user) {
        // 开始为用户在tb_user和tb_userinfo表注册
        userMapper.insertUser(user);
        userMapper.insertUserinfo(user);
        log.info("注册成功");
    }

    @Override
    public boolean isCorrectPassword(String phone, String password) {
        Integer id = userMapper.findUserByPhoneAndPassword(phone, password);
        if (id == null || id == 0) {
            return false;
        }
        return true;
    }

    /**
     * 通过电话获取用户登录时的基本信息
     *
     * @param phone
     * @return
     */
    public UserView getUserView(String phone) {
        return userMapper.selectUserViewByPhone(phone);
    }

    @Override
    public void updateUserInfo(Userinfo userinfo) {
        userMapper.updateUserinfoById(userinfo);
    }
}
