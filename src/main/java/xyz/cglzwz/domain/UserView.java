package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 登录时的用户视图的数据
 *
 * @author chgl16
 * @date 2018-11-16 09:550
 * @version 1.0
 */

@Component
public class UserView {
    private int id;
    private String phone;
    private String username;
    private byte roleType;
    private String imgUrl;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public byte getRoleType() {
        return roleType;
    }

    public void setRoleType(byte roleType) {
        this.roleType = roleType;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @Override
    public String toString() {
        return "userView: [id: " + id + ", phone: " + phone + ", username: " + username + ", roleType: "
                + roleType + ", imgUrl: " + imgUrl + "]";
    }
}
