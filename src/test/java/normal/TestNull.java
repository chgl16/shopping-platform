package normal;

import org.junit.Test;
import xyz.cglzwz.domain.Store;

public class TestNull {
    @Test
    public void test1() {
        Store store = new Store();
        if (store == null) {
            System.out.println("为空");
        }
    }
}
