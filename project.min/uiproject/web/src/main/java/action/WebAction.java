package action;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class WebAction {
    @RequestMapping(value = "/table/{objectType}/{objectId}", method = RequestMethod.GET)
    public String attachment(@PathVariable String objectType,@PathVariable String objectId, Model model) {
        model.addAttribute("objectType", objectType);
        model.addAttribute("objectId", objectId);
        return "page/tinytable";
    }

    @RequestMapping(value = "/{partId}/{pageId}", method = RequestMethod.GET)
    public String mainDevPage2(@PathVariable String partId, @PathVariable String pageId) {
        return partId + "/" + pageId;
    }


    @RequestMapping(value = "/table/")
    public String attachment2() {
        return "page/tinytable";
    }
}

