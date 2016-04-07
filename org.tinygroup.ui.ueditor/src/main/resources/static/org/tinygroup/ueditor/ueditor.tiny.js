UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
UE.Editor.prototype.getActionUrl = function(action) {
    if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage' ||action == 'uploadfile') {
        return UPLOAD_ACTION_URL;
    } else if (action == 'config') {
        return contextPath+'/static/org/tinygroup/ueditor/config.js';
    } else {
        return this._bkGetActionUrl.call(this, action);
    }
}