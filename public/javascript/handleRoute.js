$(() => {
    //actve
    $("#route-item").addClass("active");
    //load all street
    $.ajax({
        type: "GET",
        url: "/admin/routes/get-all",
        success: (res) => {
            if (res.result == "OK") {
                let index = 1;
                res.routes.forEach(route => {
                    const date = new Date(route.createdAt)
                    $(".listUserTable").append(`<tr><td>${index}</td><td>${route.routeName}</td> <td>${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td><td>${route.routeStreet.length}</td> <td> <a data-id="${route.id}"  onclick="renameRoute('${route.id}',  '${route.routeName}')" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons"></i></a><a data-id="${route.id}" onclick="deleteRoute('${route.id}',  '${route.routeName}')"  class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td></tr>`)
                    index++;
                });
                $("#numOfRoute").text(--index)
                $.LoadingOverlay("hide");
            } else {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            }

        }
    })
    //add new street
    $("#btnAdd").click(async (item) => {
        const nameStreet = $("#inputRoute").val()
        if (nameStreet.length == 0) {
            toastr["error"]("Tên tuyến không được bỏ trống", "Lỗi thông tin")
            return
        }
        $.ajax({
            type: "POST",
            url: "/admin/routes/add",
            data: {
                name: nameStreet,
            },
            success: (res) => {
                if (res.result != "OK") {
                    res.errors.forEach(error => {
                        toastr["error"](error, "Đã xảy ra lỗi")
                    });
                } else {
                    window.location.href = "/admin/routes"
                }
            }
        })
    })

})
//delete street
const deleteRoute = (id, name) => {
    if (!confirm("Bạn có chắn muốn xóa tuyến " + name + "?")) return;
    $.ajax({
        type: "DELETE",
        url: "/admin/routes/delete",
        data: {
            id: id,
        },
        success: (res) => {
            if (res.result != "OK") {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            } else {
                window.location.href = "/admin/routes"
            }
        }
    })
}

const renameRoute = async (id, name) => {
    const value = await swal("Thay đổi tên tuyến:", {
        content: {
            element: 'input',
            attributes: {
                defaultValue: name,
            }
        }
    })
    if (!value) {
        return
    }
    $.ajax({
        type: "PUT",
        url: "/admin/routes/rename",
        data: {
            id: id,
            name: value,
        },
        success: (res, req) => {
            if (res.result != "OK") {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            } else {
                window.location.href = "/admin/routes"
            }
        }
    })
}
