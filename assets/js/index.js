$("#add_plant").on("submit", function (event) {
  alert("Plante ajoutée avec succès");
});

$("#update_plant").on("submit", function (event) {
  event.preventDefault();
console.log($(this), event.target);
  var unindexed_array = $(this).serializeArray();
  
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value']
  })
console.log('data submit updatePlants: ',data, "  id : ",data.id);
  var request = {
    // https://crudappcuttings.herokuapp.com
    // http://localhost:3000
    "url" : `https://crudappcuttings.herokuapp.com/api/plants/${data.id}`,
    "method" : "PUT",
    "data" : data
  }

  $.ajax(request).done(function (response) {
    alert("Informations mises à jour");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".card #delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id")

    var request = {
      "url" : `https://crudappcuttings.herokuapp.com/api/plants/${id}`,
      "method" : "DELETE"
    }

    if (confirm("Voulez-vous vraiment supprimer cette plante ?")) {
      $.ajax(request).done(function (response) {
        alert("Plante supprimée.");
        location.reload
      });
    }
  });
}



$(".cat-all").addClass("current");
$(document).ready(function () {
  var activeCat = "";
  function filterGroup(group) {
    if (activeCat != group) {
      $(".card")
        .filter("." + group)
        .show(0);
      $(".card")
        .filter(":not(." + group + ")")
        .hide();
      activeCat = group;
    }
  }
  $(".cat-all").click(function () {
    $(".card").show();
    activeCat = "all";
  });
  $(".cat-interieur").click(function () {
    filterGroup("interieur");
  });
  $(".cat-peperomia").click(function () {
    filterGroup("peperomia");
  });
  $(".cat-carnivore").click(function () {
    filterGroup("carnivore");
  });

  $(".buttonlinkapply").on("click", function () {
    $(".buttonlinkapply.current").removeClass("current");
    $(this).addClass("current");
  });
});

function validateContact() {
  var valid = true;
  var response = grecaptcha.getResponse();
  $(".demoInputBox").css("background-color", "");
  $(".info").html("");
  if (!$("#firstName").val()) {
    $("#firstName-info").html("Champ obligatoire");
    $("#firstName").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (!$("#lastName").val()) {
    $("#lastName-info").html("Champ obligatoire");
    $("#lastName").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (!$("#email").val()) {
    $("#email-info").html("Champ obligatoire");
    $("#email").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (
    !$("#email")
      .val()
      .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
  ) {
    $("#email-info").html("Invalide. Format attendu : example@example.com");
    $("#email").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (!$("#subject").val()) {
    $("#subject-info").html("Champ obligatoire");
    $("#subject").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (!$("#message").val()) {
    $("#message-info").html("Champ obligatoire");
    $("#message").css("background-color", "#F2E2CF");
    valid = false;
  }
  if (response.length == 0) {
    $("#recaptcha-info").html("Merci de réaliser la vérification");
    valid = false;
  }
  return valid;
}
function sendContact() {
  var valid;
  valid = validateContact();
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();
  var response = grecaptcha.getResponse();
  var dataString =
    "firstName=" +
    firstName +
    "&lastName=" +
    lastName +
    "&email=" +
    email +
    "&subject=" +
    subject +
    "&message=" +
    message +
    "&g-recaptcha-response=" +
    response;

  if (valid && response.length > 0) {
    console.log(
      "captcha response: " + response,
      " request length : ",
      response.length
    );
    jQuery.ajax({
      url: "./mail.php",
      data: dataString,
      type: "POST",
      success: function (data) {
        $("#mail-status").html(data);
        $(".input").val("");
      },
      error: function () {},
    });
  }
}
