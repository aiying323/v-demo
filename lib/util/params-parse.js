module.exports.params = {
    getParams: function(url) {
        if (url === undefined || url == null || url.length <= 0) {
            return {};
        }
        let json = '{';
        url.substring(url.indexOf("?") + 1).split("&").forEach(function(element, index) {
            if (element.split("=").length == 2) {
                var key = element.split("=")[0].toString();
                var value = element.split("=")[1].toString();
                json = json + "\"" + key + "\"" + ":\"" + decodeURI(value) + "\","
            }
        });
        if (json.lastIndexOf(",") == json.length - 1) {
            json = json.substring(0, json.lastIndexOf(","));
        }
        json = json + "}";
        return JSON.parse(json);
    }
}
