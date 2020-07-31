$("#registerBtn").click((event) => {
    const data = {
        fullname: $("#fullname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        sex: $("#sex").val(),
        birth: $("#birth").val(),
        department: $("#department").val(),
        username: $("#username").val(),
        password: $("#password").val(),
    }
    $.ajax({
        type: "POST",
        url: "/user/register",
        data: data,
        success: (response) => {
            console.log(response)
            if (response.result == "OK") {
                swal("Đăng kí thành công. Bạn phải được phê duyệt trước khi đăng nhập")
                    .then((value) => {
                        window.location.href = "/user/login";
                    });
            }
            response.errors.forEach(error => {
                toastr["error"](error, "Lỗi thông tin")
            });
        }
    })
})