(function($) {
  "use strict";

  /*==================================================================
    [ Focus input ]*/
  $(".input100").each(function() {
    $(this).on("blur", function() {
      if (
        $(this)
          .val()
          .trim() != ""
      ) {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function() {
    $(this).focus(function() {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if (
        $(input)
          .val()
          .trim() == ""
      ) {
        return false;
      }
    }
  }

  function showValidate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      let email = $(input).val();
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email != "") {
        if (!re.test(email)) {
          $(input)
            .parent()
            .attr("data-validate", "Địa Chỉ Email không hợp lệ");
        }
      }
    }
    var thisAlert = $(input).parent();
    let show = $(input)
      .parent()
      .find(".show");
    $(show).removeClass("show");
    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    let add = $(thisAlert)
      .find(".eye")
      .addClass("show");
    console.log(add);
    $(thisAlert).removeClass("alert-validate");
  }

  var showPass = 0;
  $(".show").on("click", function() {
    if (showPass == 0) {
      $(this)
        .parent()
        .find(".changeatr")
        .attr("type", "text");
      $(this)
        .parent()
        .addClass("showText");
      showPass = 1;
      console.log(showPass);
    } else {
      $(this)
        .parent()
        .find(".changeatr")
        .attr("type", "password");
      $(this)
        .parent()
        .removeClass("showText");
      showPass = 0;
    }
  });
  $("#register-form").on("submit", function(event) {
    event.preventDefault();
    let email = $("#email").val();
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "") $("#error").text("Email không được để trống");
    else if (!re.test(email)) $("#error").text("Email không đúng định dạng");
    else if (email != "" && re.test(email)) {
      $("#register-form")[0].submit();
    }
  });
})(jQuery);
