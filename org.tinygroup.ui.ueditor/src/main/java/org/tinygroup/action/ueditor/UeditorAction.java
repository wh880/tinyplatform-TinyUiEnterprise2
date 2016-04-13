package org.tinygroup.action.ueditor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class UeditorAction {
    @RequestMapping("/org/tinygroup/UEditor/config")
    public String edtiorConfig() {
        return "org/tinygroup/UEditor/config.pagelet";

    }
    @RequestMapping("/org/tinygroup/UEditor/config.pagelet")
    public String edtiorConfig2() {
        return "org/tinygroup/UEditor/config.pagelet";

    }
}

