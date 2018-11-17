DROP DATABASE IF EXISTS `db_shopping_platform`;
CREATE DATABASE `db_shopping_platform` DEFAULT CHARACTER SET utf8;

USE `db_shopping_platform`;

/* 1.创建用户信息表 */
CREATE TABLE `tb_user` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '用户id',
	`uk_phone` VARCHAR(12) UNIQUE COMMENT '手机号',
	`shadow` VARCHAR(40) COMMENT '密码md5',
       `role_type` TINYINT DEFAULT 1 COMMENT '角色类型',
	PRIMARY KEY(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 2.创建个人信息表 */
CREATE TABLE `tb_userinfo` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '用户id',
	`username` VARCHAR(20) COMMENT '昵称',
	`contact_phone` VARCHAR(11) COMMENT '收货地址',
	`contact_address` VARCHAR(100) COMMENT '收货地址',
	`img_url` VARCHAR(100) COMMENT '头像地址',
	PRIMARY KEY(`pk_id`),
	FOREIGN KEY(`pk_id`) REFERENCES `tb_user`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 3.创建货物-书信息表 */
CREATE TABLE `tb_book` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '书id',
	`isbn` VARCHAR(30)  COMMENT 'ISBN',
	`title` VARCHAR(20) NOT NULL COMMENT '书名',
	`price` DECIMAL(6, 2) NOT NULL COMMENT '价格',
	`publication_house` VARCHAR(30) COMMENT '出版社',
	`publication_date` DATETIME COMMENT '出版时间',
	`introduction` VARCHAR(100) COMMENT '简要介绍',
	`type` VARCHAR(20) COMMENT '书本类型',
	`recommend` TINYINT UNSIGNED DEFAULT 0 COMMENT '推荐首页与否',
	`show` TINYINT UNSIGNED DEFAULT 0 COMMENT '是否轮播显示',
	`inventory` INT UNSIGNED COMMENT '库存量',
	`sale_volume` INT UNSIGNED DEFAULT 0 COMMENT '销量',
	`img_url1` VARCHAR(100) COMMENT '图片1',
	`img_url2` VARCHAR(100) COMMENT '图片2',
	`img_url3` VARCHAR(100) COMMENT '图片3',
	`img_url4` VARCHAR(100) COMMENT '图片4',
	`img_url5` VARCHAR(100) COMMENT '图片5',
	PRIMARY KEY(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 4.创建店铺信息表 */
CREATE TABLE `tb_store` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '店铺id',
	`uk_name` VARCHAR(20) UNIQUE COMMENT '店铺名字',
	`founding_time` DATETIME COMMENT '创办时间',
	`introduction` VARCHAR(100) COMMENT '店铺介绍',
	`address` VARCHAR(100) COMMENT '店铺地址',
	`img_url` VARCHAR(100) COMMENT '店铺头像',
	PRIMARY KEY(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 5.创建订单信息表 */
CREATE TABLE `tb_transaction` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '订单号id',
	`book_id` INT UNSIGNED COMMENT '书id',
	`book_name` VARCHAR(20) COMMENT '书名',
	`store_id` INT UNSIGNED COMMENT '店铺id',
	`store_name` VARCHAR(20) COMMENT '店铺名字',
	`customer_id` INT UNSIGNED COMMENT '顾客id',
	`customer_name` VARCHAR(20) COMMENT '顾客昵称',
	`customer_phone` VARCHAR(11) NOT NULL COMMENT '顾客收货手机号',
	`customer_address` VARCHAR(100) NOT NULL COMMENT '顾客收货地址',
	`price` DECIMAL(6, 2) COMMENT '商品金额',
	`status` TINYINT DEFAULT -1 COMMENT '订单状态:-1-未理,0-失败,1-发货,2-成功',
	`logistics` VARCHAR(40) COMMENT '物流号',
	`time` DATETIME COMMENT '订单时间',
	PRIMARY KEY(`pk_id`),
	FOREIGN KEY(`book_id`) REFERENCES `tb_book`(`pk_id`),
	FOREIGN KEY(`store_id`) REFERENCES `tb_store`(`pk_id`),
	FOREIGN KEY(`customer_id`) REFERENCES `tb_user`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 6.创建店铺店主关系表 */
CREATE TABLE `tb_store_owner` (
	`store_id` INT UNSIGNED COMMENT '店铺id',
	`owner_id` INT UNSIGNED COMMENT '店主id',
	FOREIGN KEY(`store_id`) REFERENCES `tb_store`(`pk_id`),
	FOREIGN KEY(`owner_id`) REFERENCES `tb_user`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 7.创建店铺货物关系表 */
CREATE TABLE `tb_store_book` (
	`store_id` INT UNSIGNED COMMENT '店铺id',
	`book_id` INT UNSIGNED COMMENT '书id',
	FOREIGN KEY(`store_id`) REFERENCES `tb_store`(`pk_id`),
	FOREIGN KEY(`book_id`) REFERENCES `tb_book`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

	
/* 8.创建店铺订单关系表 */
CREATE TABLE `tb_store_transaction` (
	`store_id` INT UNSIGNED COMMENT '店铺id',
	`transaction_id` INT UNSIGNED COMMENT '订单id',
	FOREIGN KEY(`store_id`) REFERENCES `tb_store`(`pk_id`),
	FOREIGN KEY(`transaction_id`) REFERENCES `tb_transaction`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/* 9.创建顾客订单关系表 */
CREATE TABLE `tb_customer_transaction` (
	`customer_id` INT UNSIGNED COMMENT '顾客id',
	`transaction_id` INT UNSIGNED COMMENT '订单id',
	FOREIGN KEY(`customer_id`) REFERENCES `tb_user`(`pk_id`),
	FOREIGN KEY(`transaction_id`) REFERENCES `tb_transaction`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 10.申请店铺信息表 */
CREATE TABLE `tb_apply_store` (
	`pk_id` INT UNSIGNED AUTO_INCREMENT COMMENT '申请id',
	`owner_id` INT UNSIGNED COMMENT '店主id',
	`store_name` VARCHAR(20) NOT NULL COMMENT '店铺名字',
	`store_introduction` VARCHAR(100) COMMENT '店铺介绍',
	`apply_time` DATETIME COMMENT '申请时间',
	`status` TINYINT DEFAULT -1 COMMENT '申请状态:-1-未理,0-拒绝,1-通过',
	PRIMARY KEY(`pk_id`),
	FOREIGN KEY(`owner_id`) REFERENCES `tb_user`(`pk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 创建视图 */
CREATE VIEW v_user AS
	SELECT tb_user.pk_id AS id, tb_user.uk_phone AS phone, tb_user.role_type, tb_userinfo.username, tb_userinfo.img_url
	FROM tb_user, tb_userinfo
	WHERE tb_user.pk_id = tb_userinfo.pk_id;

