package xyz.cglzwz.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 处理MultipartFile的工具类
 *
 * @author chgl16
 * @date 2018-11-11 19:07
 * @version 1.0
 */

public class FileUtil {
    /**
     * 保存文件到指定路径指定名字
     *
     * @param file Spring MVC管理的上传文件
     * @param pathname 文件目录及命名
     * @return true-成功，false-文件为空
     */
    public static boolean saveFile(MultipartFile file, String pathname) throws IOException {
        if (!file.isEmpty()) {
            File imageFile = new File(pathname);
            file.transferTo(imageFile);
            return true;
        }
        return false;
    }
}
