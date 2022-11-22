$(document).ready(function () {

    (() => {
        const options = {
            url: '/user/users?status=1&group=2',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        };

        axios(options)
            .then(response => {
                const managements = response.data
                managements.forEach(element => {
                    $("#region_user").append(`<option value=${element._id}>${element.name}</option>`);
                    $("#region_user_modal").append(`<option value=${element._id}>${element.name}</option>`);
                });
                getTown($("#region_user").val())
            });
    })()

    const createList = (data) => {
        $('#replist').html('')
        data.forEach(elem => {
            elem.town_id && $('#replist').prepend(`
                <tr data-id="${elem.town_id._id}">
                    <td>${elem.town_id.name}</td>
                    <td>${elem.town_id.user_name}</td>
                    <td>
                        <button class="ui yellow button" data-btn="${elem.town_id._id}" data-btn-name="${elem.town_id.name}" data-btn-user-name="${elem.town_id.user_name}" onclick="updateFunction(event)">O'zgartirish</button>
                    </td>
                </tr>`)
        })
    }

    const getTown = (region_user) => {
        const options = {
            url: `/group/groups?region_user=${region_user}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        };

        axios(options)
            .then(response => {
                console.log(response.data)
                createList(response.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    $('#region_user').on('change', function () {
        getTown(this.value)
    });

})

{/* <button class="ui red button" data-btn="${elem.town_id._id}" onclick="deleteFunction(event)">Delete</button> */}

const deleteFunction = async (event) => {
    const del = await axios.delete('/user/delete?id=' + event.target.getAttribute("data-btn"));
    if (del.data.ok == true) {
        event.target.parentElement.parentElement.classList.add('dbn')
    }
}

const updateFunction = async (event) => {
    $('#region_user_modal').val($('#region_user').val()).change()
    $('.ui.modal').modal('show');
    $('#modal_name').val(event.target.getAttribute("data-btn-name"))
    $('#modal_user_name').val(event.target.getAttribute("data-btn-user-name"))
    $('#modal_new_password').val("")
    $("#btn_update").attr("data-id", event.target.getAttribute("data-btn"))
}

$("#btn_update").on("click", async (event) => {
    const res = await axios.put('/user/updatewithgroup', {
        name: $('#modal_name').val(),
        user_name: $('#modal_user_name').val(),
        password: $('#modal_new_password').val(),
        region_user: $('#region_user_modal').val(),
        _id: event.target.getAttribute("data-id")
    });
    location.reload();
})

$('#region_user_modal').on('change', async (event) => {
    console.log(event.target.value)
})