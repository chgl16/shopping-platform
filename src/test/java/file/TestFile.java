package file;

import org.junit.Test;

import java.io.File;
import java.io.IOException;

public class TestFile {
    @Test
    public void test1() throws IOException {
        int id = 1;
        String imgUrl = "src/main/resources/picture/" + "user" + "/" + id + ".png";
        File imageFile = new File(imgUrl);
        imageFile.createNewFile();
    }
}
