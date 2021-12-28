
const BASE_URL = "http://"
function codeEditor() {
  var editor = ace.edit("editor");
//   editor.setTheme("ace/theme/twilight");

  $(document).ready(function () {
    $("button").click(function () {
      let code = editor.getValue();
      $("#ans").html("Loading...");
      console.log(code);
      let data = {
        source_code: code,
        number_of_runs: "1",
        stdin: "Judge0",
        expected_output: null,
      };
      console.log(data)
      let request = $.ajax({
        url: BASE_URL,
        type: "post",
        data: data,
      });

      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // Callback handler that will be called on success
      request.done(async function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        let token = response.token;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 sec
        let second_request = $.ajax({
          url: BASE_URL + "/"+ token,
          type: "get",
        });
        second_request.done(function (response) {
          console.log(response.stdout);
          $("#ans").html(response.stdout);
        });
      });
    });
  });
}