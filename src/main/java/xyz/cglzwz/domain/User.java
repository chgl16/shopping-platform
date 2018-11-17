package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

/**
 * 用户信息表
 *
 * @author chgl16
 * @date 2018-11-5 11:36
 * @version 1.0
 */

@Component
public class User {
    private int id;
    private String phone;
    private String password;
    private byte roleType;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte getRoleType() {
        return roleType;
    }

    public void setRoleType(byte roleType) {
        this.roleType = roleType;
    }

    @Override
    public String toString() {
        return "user: [id: " + id + ", phone: " + phone + ", password: " +  password
                + ", roleType: " + roleType + "]";
    }
}
