package xyz.cglzwz.domain;

import org.springframework.stereotype.Component;

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
    private int pkId;
    private String isbn;
    private String title;
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

    public int getPkId() {
        return pkId;
    }

    public void setPkId(int pkId) {
        this.pkId = pkId;
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
        return "book: [pkId: " + pkId + ", isbn: " + isbn + ", title: " + title + ", introduction: "
                + introduction + ", price: " + price + ", recommend: " + recommend + ", show: "
                + show + ", inventory: " + inventory + ", saleVolume: " + saleVolume + "]";
    }
}
