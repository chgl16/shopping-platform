package xyz.cglzwz.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

/**
 * 处理MultipartFile的工具类
 *
 * @author chgl16
 * @date 2018-11-11 19:07
 * @version 1.1
 */

public class FileUtil {

    /**
     * 保存文件到指定路径指定名字并且返回文件路径
     * 文件为空，则返回空
     *
     * @param file
     * @param contextPath
     * @param id
     * @param type
     * @return 文件路径
     * @throws IOException
     */
    public static String saveFile(MultipartFile file, String contextPath, int id, String type) throws IOException {
        if (!file.isEmpty()) {
            // 相对于当前类的相对路径
            String Url = contextPath + "picture/" + type + "/" + id + ".png";
            File imageFile = new File(Url);
            file.transferTo(imageFile);
            // 相对于html/view/*.html的相对路径,保存到数据库
            return "../../" + "picture/" + type + "/" + id + ".png";
        }
        return "";
    }
}
