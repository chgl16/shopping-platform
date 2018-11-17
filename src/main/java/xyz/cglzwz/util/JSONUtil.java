package xyz.cglzwz.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * JSON转化工具类
 *
 * @author chgl16
 * @date 2018-11-16 11:49
 * @version 1.0
 */

@Deprecated
public class JSONUtil {
    @Autowired
    private static ObjectMapper objectMapper;

    public static String toJSON(Object object) throws JsonProcessingException {
        return  objectMapper.writeValueAsString(object);
    }
}
