package org.tinygroup.action.ueditor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class UeditorAction {
    @RequestMapping("/org/tinygroup/ueditor/config.pagelet")
    public String edtiorConfig() {
        return "org/tinygroup/ueditor/config.pagelet";

    }
    @RequestMapping("/org/tinygroup/ueditor/macro/macro.pagelet")
    public String edtiorMaro() {
        return "org/tinygroup/ueditor/macro/macro.pagelet";

    }
}

