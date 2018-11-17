package normal;

import org.apache.log4j.Logger;
import org.junit.Test;
import xyz.cglzwz.domain.User;
import xyz.cglzwz.domain.Userinfo;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


public class TestToString {
    private static final Logger log =  Logger.getLogger(TestToString.class);

    @Test
    public void test1() {
        Map<String, Object> map = new HashMap<String, Object>();
        User user = new User();
        Userinfo userinfo = new Userinfo();
        map.put("1", user);
        map.put("2", userinfo);
        log.info(map);

        Set<Object> set = new HashSet<Object>();
        set.add(user);
        set.add(userinfo);
        log.info(set.toString());
    }

}
