const streetNameObject = {}
$(() => {
    //auto complete
    $.ajax({
        type: "GET",
        url: "/admin/streets/get-all",
        success: (res) => {
            const available = []
            if (res.result == "OK") {
                res.streets.forEach(street => {
                    available.push(street.streetName)
                    streetNameObject[street.id] = street.streetName
                });
            }
            $("#start").autocomplete({
                source: available
            });
            $("#end").autocomplete({
                source: available
            });
        }
    })

})
//start search
$("#btnSearch").click(() => {
    const start = $("#start").val()
    const end = $("#end").val()
    $.ajax({
        type: "GET",
        url: "/search",
        data: {
            start,
            end,
        },
        success: (res) => {
            if (res.result != "OK" || res.data.length == 0) {
                swal("Rất tiếc", "Không có tuyến xe bus phù hợp", "error")
            } else {
                $(".modal-body").html("")
                res.data.forEach((item) => {
                    const way = []
                    item.routeStreet.forEach((street) => {
                        way.push(`Qua <b>${streetNameObject[street.streetId]}</b> lúc ${street.time} (giá vé từ bến: ${street.price}đ)`)
                    })
                    $(".modal-body").append("<p>" + way.join("->") + "</p><hr>")
                })
                $("#resultModal").modal()
            }
        }
    })
})