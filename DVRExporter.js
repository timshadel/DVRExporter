var DVRExporter = function() {
  this.generate = function(context, requests, options) {
    var generated = "";
    var session = {
      interactions: [],
      name: options.file.name.slice(0, -5)
    };

    // iterate requests (`Request` objects)
    for (var i in requests) {
      var request = requests[i];
      var response = request.getLastExchange();

      var interaction = {};
      interaction.recorded_at = Date.parse(response.date) / 1000;

      interaction.request = {};
      interaction.request.method = request.method;
      interaction.request.headers = request.headers;
      interaction.request.body = request.jsonBody;
      interaction.request.url = request.url;

      interaction.response = {};
      interaction.response.url = response.requestUrl;
      interaction.response.status = response.responseStatusCode;
      interaction.response.headers = response.responseHeaders;
      interaction.response.body = JSON.parse(response.responseBody);

      session.interactions.push(interaction);
    }

    // return the generated string
    return JSON.stringify(session, null, "  ") + "\n";
  }
}

// set the extension identifier (must be same as the directory name)
DVRExporter.identifier = "com.timshadel.PawExtensions.DVRExporter";
DVRExporter.title = "DVR Exporter";
DVRExporter.fileExtension = "json";
DVRExporter.languageHighlighter = "json";

// call to register function is required
registerCodeGenerator(DVRExporter)
