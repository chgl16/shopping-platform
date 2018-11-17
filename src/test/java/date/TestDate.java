package date;

import org.junit.Test;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class TestDate {
    @Test
    public void test() {
        String f1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
        String d1 = new Date(new java.util.Date().getTime()).toString();
        System.out.println(d1);
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date()));
    }
}
