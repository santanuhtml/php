/*
-----------------------------------------------
PDF DOWNLOAD AFTER FORM FILLUP
-----------------------------------------------
*/
$('#contact-form-submit3').on('click',function(){
  if($("#contact-form3").valid())
  {
    var name = $("#conName3").val();
    var email = $("#conEmail3").val();
    var phone = $("#conPhone3").val();
    var subject = "enquiry mail";
    var firstName = name;
    
    if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
    }
    $.ajax({
        url: "./mail/contact_me3.php",
        type: "POST",
        data: {
            name: name,
            email: email,
            subject: subject,
            phone: phone
        },
        success: function(response){
            console.log(response);
          if(response == 'success')
          {
            $('#submitMessage3').html("<div class='alert alert-success'>");
            $('#submitMessage3 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#submitMessage3 > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#submitMessage3 > .alert-success')
                .append('</div>');
            $('#submitMessage3').delay(3000).fadeOut();
            //clear all fields
            $('#contact-form').trigger("reset");

            /* =================== file download  start =================== */
              var req = new XMLHttpRequest();
              req.open("GET", "/img/aqua.pdf", true);
              req.responseType = "blob";

              req.onload = function (event) {
                var blob = req.response;
                console.log(blob.size);
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download="aqua_" + new Date() + ".pdf";
                link.click();
              };

              req.send();
            /* =================== file download  end ================== */
          }
          else{
            $('#submitMessage3').html("<div class='alert alert-danger'>");
            $('#submitMessage3 > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#submitMessage3 > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#submitMessage3 > .alert-danger').append('</div>');
            $('#submitMessage3').delay(3000).fadeOut();
            //clear all fields
            $('#contact-form3').trigger("reset");
            
          }
        }
    })
  }
});
