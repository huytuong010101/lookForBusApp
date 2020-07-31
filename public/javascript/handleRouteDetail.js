//active
$("#route-detail-item").addClass("active");
$('tbody').sortable()
//load all route to select
$.ajax({
    type: "GET",
    url: "/admin/routes/get-all",
    success: (res) => {
        if (res.result == "OK") {
            res.routes.forEach(route => {
                $("#routesSelect").append(`<option value="${route.id}">${route.routeName}</option>`)
            });
        } else {
            res.errors.forEach(error => {
                toastr["error"](error, "Đã xảy ra lỗi")
            });
        }
    }
})
//load all street
$.ajax({
    type: "GET",
    url: "/admin/streets/get-all",
    success: (res) => {
        if (res.result == "OK") {
            res.streets.forEach(street => {
                $("#streetName").append(`<option value="${street.id}">${street.streetName}</option>`)
            });
        } else {
            res.errors.forEach(error => {
                toastr["error"](error, "Đã xảy ra lỗi")
            });
        }

    }
})
//load detail
const loadDetail = () => {
    $("#currentRoute").val($("#routesSelect").val())
    $("#currentRoute").attr("data-currentRouteName", $("#routesSelect option:selected").text());
    $("#btnSave").attr("disabled", false)
    $.ajax({
        type: "GET",
        url: "/admin/route-detail/" + $("#routesSelect").val(),
        success: (res) => {
            $("tbody").html("")
            if (res.result == "OK") {
                res.data.forEach((item) => {
                    $("tbody").append(`<tr><td>#</td><td class="streetNames" data-streetid="${item.streetId}">${item.street.streetName}</td><td class="price">${item.price}</td><td class="time">${item.time}</td><td><a  onclick="deleteStreet(event)"  class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td></tr>`)
                })
            } else {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            }
        }
    })
}

const addStreet = () => {
    $("tbody").append(`<tr><td>#</td><td class="streetNames" data-streetid="${$("#streetName").val()}">${$("#streetName option:selected").text()}</td><td class="price">${$("#price").val()}</td><td class="time">${$("#time").val()}</td><td><a  onclick="deleteStreet(event)"  class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a></td></tr>`)
}

const deleteStreet = (event) => {
    event.srcElement.parentElement.parentElement.parentElement.remove()
}

const saveData = () => {
    $.LoadingOverlay("hide");
    const routeName = $("#currentRoute").data("currentroutename");
    const routeId = $("#currentRoute").val()
    if (!confirm(`Toàn bộ lộ trình bên dưới sẽ được lưu vào tuyến ${routeName}. Bạn có chắc muốn lưu?`)) return;
    //start save data
    const data = {
        id: routeId,
        list: [],
    }
    const listStreet = $(".streetNames")
    const listPrice = $(".price")
    const listTime = $(".time")
    const num = listStreet.length
    for (let i = 0; i < num; i++) {
        data.list.push({
            routeId: routeId,
            streetId: listStreet[i].dataset.streetid,
            price: Number(listPrice[i].innerHTML),
            time: listTime[i].innerHTML,
            no: i,
        })
    }
    $.ajax({
        type: "POST",
        url: "/admin/route-detail/update",
        data: JSON.stringify(data),
        success: (res) => {
            $.LoadingOverlay("hide");
            if (res.result == "OK") toastr["success"]("Đã cập nhật dữ liệu thành công", "Thành công")
            else {
                res.errors.forEach(error => {
                    toastr["error"](error, "Đã xảy ra lỗi")
                });
            }

        }
    })
}

$.LoadingOverlay("hide");