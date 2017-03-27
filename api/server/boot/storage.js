module.exports = function (app) {
    app.dataSources.media.connector.getFilename = function (file, req, res) {
        var time = new Date().getTime();
        var NewFileName = time + '_' + file.name;
        return NewFileName;
    };
}