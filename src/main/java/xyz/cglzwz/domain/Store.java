package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 店铺信息表
 *
 * @author chgl16
 * @date 2018-11-8 23:20
 * @version 1.0
 */

@Component
public class Store {
    private int pkId;
    private String name;
    private String foundingTime;
    private String address;
    private String introduction;
    private String imgUrl;
    private MultipartFile image;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFoundingTime() {
        return foundingTime;
    }

    public void setFoundingTime(String foundingTime) {
        this.foundingTime = foundingTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public int getPkId() {
        return pkId;
    }

    public void setPkId(int pkId) {
        this.pkId = pkId;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "store: [pkId: " + pkId + ", name" + name + ", foundingTime: " + foundingTime + ", address: "
                + address + ", introduction: " + introduction + ", imgUrl: " + imgUrl + "]";
    }
}
