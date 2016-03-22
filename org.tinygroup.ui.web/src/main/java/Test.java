/**
 * Created by ajian on 2016/3/16.
 */
public class Test {
    public static void main(String[] args) {
        String a = "/static/org/tinygroup/voteCharts/css/voteCharts.tiny.min.css";
        a=a.replaceAll("tiny\\.min\\.","");
        System.out.println(a);
    }
}
