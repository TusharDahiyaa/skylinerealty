function handleSubmit() {
  var name = document.getElementById("number").name;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;

  var data = {
    name: name,
    email: email,
    number: number,
  };

  fetch("/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("signUp").style = "display:none";
        document.getElementById("signedUpContainer").style = "display:block";
      } else {
        alert("Failed to sign up");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to sign up");
    });
}
