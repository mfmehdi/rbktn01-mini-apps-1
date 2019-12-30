$("#form").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  var form = $(this);
  var url = form.attr("action");
  console.log(url);
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), // serializes the form's elements.
    crossDomain: true,
    xhrFields: {
      responseType: "blob"
    },
    success: function(response, status, xhr) {
      var a = document.createElement("a");
      console.log("a===>", a);
      console.log(response);
      var url = window.URL.createObjectURL(response);
      //  console.log("url===>", url);
      a.href = url;
      a.download = "my.csv";
      $(a).html("download");
      $("#link").append(a);
      a.click();
      window.URL.revokeObjectURL(url);
      // console.log(xhr); // show response from the php script.
    }
  });
});

// $.fileDownload({ type: 'POST', url: 'url', data: form_data, processData: false, contentType: false, success: function() { // $.unblockUI(); } });
// $(document).ready(function(){
//     $("#submit").bind('click',function(){
//         var idiom=$("#idiom").val();
//         $.ajax({
//             type: "GET",
//             url: 'http://www.oxfordlearnersdictionaries.com/search/english/direct/',
//             data:{q:idiom},
//             async:true,
//             crossDomain:true,
//             success: function(data, status, xhr) {
//                 alert(xhr.getResponseHeader('Location'));
//             }
//         });

//     });
// });
// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       // document.getElementById("demo").innerHTML = "fff";
//       console.log("ok");
//     }
//   };
//   //xhttp.open("GET", "ajax_info.txt", true);
//   xhttp.send();
// }
