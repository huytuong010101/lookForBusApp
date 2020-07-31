$("#loginBtn").click((event) => {
    const data = {
        username: $("#username").val(),
        password: $("#password").val(),
    }
    $.ajax({
        type: "POST",
        url: "/user/login",
        data: data,
        success: (response) => {
            console.log(response)
            if (response.result != "OK") {
                response.errors.forEach(error => {
                    toastr["error"](error, "Lỗi xác thực")
                });
            } else {
                window.location.href = "/admin"
            }
        }
    })
})