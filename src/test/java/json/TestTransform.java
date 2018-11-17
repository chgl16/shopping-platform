package json;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import xyz.cglzwz.domain.User;

public class TestTransform {
    @Test
    public void test1() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = new User();
        System.out.println(objectMapper.writeValueAsString(user));
    }
}
