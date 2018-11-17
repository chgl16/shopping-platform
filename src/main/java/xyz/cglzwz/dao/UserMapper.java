package xyz.cglzwz.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import xyz.cglzwz.domain.User;
import xyz.cglzwz.domain.UserView;
import xyz.cglzwz.domain.Userinfo;

/**
 * 用户管理映射器接口
 *
 * @author chgl16
 * @date 2018-11-5 12:06
 * @version 1.0
 */

@Repository
public interface UserMapper {
    /**
     * 通过phone查找用户是否存在
     *
     * @param phone
     * @return id:存在, 0/null:不存在
     */
    public Integer findUserByPhone(String phone);

    /**
     * 注册一个新用户
     *
     * @param user
     */
    public void insertUser(User user);

    /**
     * 给新注册的用户添加一个信息表
     *
     * @param user
     */
    public void insertUserinfo(User user);

    /**
     * 通过phone,password查找用户是否存在
     *
     * @param phone
     * @param password
     * @return id:存在, 0/null:不存在
     */
    public Integer findUserByPhoneAndPassword(@Param("phone") String phone, @Param("password") String password);


    /**
     * 通过phone获取用户登录的视图信息
     *
     * @param phone
     * @return
     */
    public UserView selectUserViewByPhone(String phone);

    /**
     * 更新用户个人信息
     *
     * @param userinfo
     */
    public void updateUserinfoById(Userinfo userinfo);
}
