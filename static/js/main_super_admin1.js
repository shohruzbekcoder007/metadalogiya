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
                createList(managements)
            });
    })()

    const createList = (data) => {
        $('#replist').innerHTML = ''
        data.forEach(elem => {
            $('#replist').prepend(`
            <tr data-id="${elem._id}">
                <td>${elem.name}</td>
                <td>${elem.user_name}</td>
                <td>
                    <button class="ui yellow button" data-btn="${elem._id}" data-btn-name="${elem.name}" data-btn-user-name="${elem.user_name}" onclick="updateFunction(event)">O'zgartirish</button>
                </td>
                </tr>`)
        })
    }
})

// <button class="ui red button" data-btn="${elem._id}" onclick="deleteFunction(event)">Delete</button>

const deleteFunction = async (event) => {
    const del = await axios.delete('/user/delete?id=' + event.target.getAttribute("data-btn"));
    if (del.data.ok == true) {
        event.target.parentElement.parentElement.classList.add('dbn')
    }
}

const updateFunction = async (event) => {
    $('.ui.modal').modal('show');
    $('#modal_name').val(event.target.getAttribute("data-btn-name"))
    $('#modal_user_name').val(event.target.getAttribute("data-btn-user-name"))
    $('#modal_new_password').val("")
    $("#btn_update").attr("data-id", event.target.getAttribute("data-btn"))
}

$("#btn_update").on("click", async (event) => {
    const res = await axios.put('/user/update', {
        name: $('#modal_name').val(),
        user_name: $('#modal_user_name').val(),
        password: $('#modal_new_password').val(),
        _id: event.target.getAttribute("data-id")
    });
    location.reload();
})