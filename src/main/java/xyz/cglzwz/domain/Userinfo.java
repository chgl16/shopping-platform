package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 用户个人资料信息表
 *
 * @author chgl16
 * @date 2018-11-5 11:53
 * @version 1.0
 */

@Component
public class Userinfo {
    private int id;
    private String username;
    private String contactPhone;
    private String contactAddress;
    private String imgUrl;
    private MultipartFile image;

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int pkId) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getContactAddress() {
        return contactAddress;
    }

    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    @Override
    public String toString()  {
        return "userinfo: [id: " + id + ", username: " + username + ", contactPhone: " + contactPhone
                + ", contactAddress: " + contactAddress + ", imgUrl: " + imgUrl + "]";
    }
}
