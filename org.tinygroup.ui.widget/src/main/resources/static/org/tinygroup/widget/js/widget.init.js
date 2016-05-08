function setup_widgets() {
    var enableJarvisWidgets = true,
    /*
     * Use localstorage to save widget settings
     * turn this off if you prefer to use the onSave hook to save
     * these settings to your datatabse instead
     */
        localStorageJarvisWidgets = true,
    /*
     * Turn off sortable feature for JarvisWidgets
     */
        sortableJarvisWidgets = true;
    $.fn.jarvisWidgets && $("#widget-grid").jarvisWidgets({
        "grid": "article",
        "widgets": ".jarviswidget",
        "localStorage": localStorageJarvisWidgets,
        "deleteSettingsKey": "#deletesettingskey-options",
        "settingsKeyLabel": "Reset settings?",
        "deletePositionKey": "#deletepositionkey-options",
        "positionKeyLabel": "Reset position?",
        "sortable": sortableJarvisWidgets,
        "buttonsHidden": !1,
        "toggleButton": !0,
        "toggleClass": "fa fa-minus | fa fa-plus",
        "toggleSpeed": 200,
        "onToggle": function () {
        },
        "deleteButton": !0,
        "deleteMsg": "Warning: This action cannot be undone!",
        "deleteClass": "fa fa-times",
        "deleteSpeed": 200,
        "onDelete": function () {
        },
        "editButton": !0,
        "editPlaceholder": ".jarviswidget-editbox",
        "editClass": "fa fa-cog | fa fa-save",
        "editSpeed": 200,
        "onEdit": function () {
        },
        "colorButton": !0,
        "fullscreenButton": !0,
        "fullscreenClass": "fa fa-expand | fa fa-compress",
        "fullscreenDiff": 3,
        "onFullscreen": function () {
        },
        "customButton": !1,
        "customClass": "folder-10 | next-10",
        "customStart": function () {
            //alert("Hello you, this is a custom button...")
        },
        "customEnd": function () {
            //alert("bye, till next time...")
        },
        "buttonOrder": "%refresh% %custom% %edit% %toggle% %fullscreen% %delete%",
        "opacity": 1,
        "dragHandle": "> header",
        "placeholderClass": "jarviswidget-placeholder",
        "indicator": !0,
        "indicatorTime": 600,
        "ajax": !0,
        "timestampPlaceholder": ".jarviswidget-timestamp",
        "timestampFormat": "Last update: %m%/%d%/%y% %h%:%i%:%s%",
        "refreshButton": !0,
        "refreshButtonClass": "fa fa-refresh",
        "labelError": "Sorry but there was a error:",
        "labelUpdated": "Last Update:",
        "labelRefresh": "Refresh",
        "labelDelete": "Delete widget:",
        "afterLoad": function () {
        },
        "rtl": !1,
        "onChange": function () {
        },
        "onSave": function () {
        },
        "ajaxnav": false
    })
}