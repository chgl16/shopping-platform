package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

/**
 * 图书信息表
 *
 * @author chgl16
 * @date 2018-11-8 23:29
 * @version 1.0
 */

@Component
public class Book {
    private int id;
    private String isbn;
    private String title;
    private String type;
    private double price;
    private String publicationHouse;
    private String publicationDate;
    private String introduction;
    /**
     * 是否推荐到网站首页显示
     */
    private boolean recommend;
    /**
     * 是否添加到店铺首页显示
     */
    private boolean show;
    /**
     * 库存
     */
    private int inventory;
    /**
     * 销量
     */
    private int saleVolume;
    /**
     * 五张图片
     */
    private String imgUrl1;
    private String imgUrl2;
    private String imgUrl3;
    private String imgUrl4;
    private String imgUrl5;

    private MultipartFile[] image;

    public String getImgUrl1() {
        return imgUrl1;
    }

    public void setImgUrl1(String imgUrl1) {
        this.imgUrl1 = imgUrl1;
    }

    public String getImgUrl2() {
        return imgUrl2;
    }

    public void setImgUrl2(String imgUrl2) {
        this.imgUrl2 = imgUrl2;
    }

    public String getImgUrl3() {
        return imgUrl3;
    }

    public void setImgUrl3(String imgUrl3) {
        this.imgUrl3 = imgUrl3;
    }

    public String getImgUrl4() {
        return imgUrl4;
    }

    public void setImgUrl4(String imgUrl4) {
        this.imgUrl4 = imgUrl4;
    }

    public String getImgUrl5() {
        return imgUrl5;
    }

    public void setImgUrl5(String imgUrl5) {
        this.imgUrl5 = imgUrl5;
    }

    public MultipartFile[] getImage() {
        return image;
    }

    public void setImage(MultipartFile[] image) {
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPublicationHouse() {
        return publicationHouse;
    }

    public void setPublicationHouse(String publicationHouse) {
        this.publicationHouse = publicationHouse;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public boolean isRecommend() {
        return recommend;
    }

    public void setRecommend(boolean recommend) {
        this.recommend = recommend;
    }

    public boolean isShow() {
        return show;
    }

    public void setShow(boolean show) {
        this.show = show;
    }

    public int getInventory() {
        return inventory;
    }

    public void setInventory(int inventory) {
        this.inventory = inventory;
    }

    public int getSaleVolume() {
        return saleVolume;
    }

    public void setSaleVolume(int saleVolume) {
        this.saleVolume = saleVolume;
    }


    @Override
    public String toString() {
        return "book: [id: " + id + ", isbn: " + isbn + ", title: " + title + ", type: " + type
                + ", publicationHouse:" + publicationHouse + ", publicationDate:" + publicationDate
                + ", introduction: " + introduction + ", price: " + price + ", recommend: " + recommend
                + ", show: " + show + ", inventory: " + inventory + ", saleVolume: " + saleVolume
                + ", imgUrl1:" + imgUrl1 + ", imgUrl2:" + imgUrl2 + ", imgUrl3:" + imgUrl3 + ", imgUrl4"
                + imgUrl4 + ", imgUrl5:" + imgUrl5  + "]";
    }
}
