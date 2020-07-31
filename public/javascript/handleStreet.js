$(() => {
    //activate
    $("#street-item").addClass("active");
    //load all street
    $.ajax({
        type: "GET",
        url: "/admin/streets/get-all",
        success: (res) => {
            if (res.result == "OK") {
                let index = 1;
                res.streets.forEach(street => {
                    const date = new Date(street.createdAt)
                    $(".listUserTable").append(`<tr><td>${index}</td><td>${street.streetName}</td> <td>${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td><td>${street.routeStreet.length}</td> <td> <a data-id="${street.id}"  onclick="renameStreet('${street.id}',  '${street.streetName}')" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons"></i></a><a data-id="${street.id}" onclick="deleteStreet('${street.id}',  '${street.streetName}')"  class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td></tr>`)
                    index++;
                });
                $("#numOfStreet").text(--index)
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
        const nameStreet = $("#inputStreet").val()
        if (nameStreet.length == 0) {
            toastr["error"]("Tên đường không được bỏ trống", "Lỗi thông tin")
            return
        }
        $.ajax({
            type: "POST",
            url: "/admin/streets/add",
            data: {
                name: nameStreet,
            },
            success: (res) => {
                if (res.result != "OK") {
                    res.errors.forEach(error => {
                        toastr["error"](error, "Đã xảy ra lỗi")
                    });
                } else {
                    window.location.href = "/admin/streets"
                }
            }
        })
    })
    //delete street
})

const deleteStreet = (id, name) => {
    if (!confirm("Bạn có chắn muốn xóa đường " + name + "?")) return;
    $.ajax({
        type: "DELETE",
        url: "/admin/streets/delete",
        data: {
            id: id,
        },
        success: (res) => {
            if (res.result != "OK") {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            } else {
                window.location.href = "/admin/streets"
            }
        }
    })
}

const renameStreet = async (id, name) => {
    const value = await swal("Thay đổi tên đường:", {
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
        url: "/admin/streets/rename",
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
                window.location.href = "/admin/streets"
            }
        }
    })
}
