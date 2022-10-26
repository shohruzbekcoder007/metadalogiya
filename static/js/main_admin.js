$(document).ready(function () {

    (() => {
        const options = {
            url: '/user/users?status=1&group=1',
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
                    if ($('#region_user').attr('data-selected') == element._id) {
                        $("#region_user").append(`<option value=${element._id} selected>${element.name}</option>`);
                    } else {
                        $("#region_user").append(`<option value=${element._id}>${element.name}</option>`);
                    }
                });
                getTasks($("#region_user").val())
            });

    })()
})

const getTasks = (user_id) => {
    const options = {
        url: `/task/tasks?user_id=${user_id}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {}
    };

    axios(options)
        .then(response => {
            createTaskList(response.data)
        });
}

const createTaskList = (data) => {
    $('#tasklist').html('')
    if (data.length > 0) {
        data.forEach(elem => {
            $('#tasklist').append(`
            <tr>
                <td>${elem.user_id.name}</td>
                <td>${elem.user_id.user_name}</td>
                <td>${elem.text}</td>
                <td>${stringMonth(elem.date_month)}</td>
                <td>${elem.date_year}</td>
                <td><button class="ui red button" data-btn="${elem._id}" onclick="deleteFunction(event)">Delete</button></td>
            </tr>`)
        })
    }
}

const stringMonth = (month_number) => {
    let month = "";
    switch (month_number) {
        case 1: month = "Yanvar"; break;
        case 2: month = "Fevral"; break;
        case 3: month = "Mart"; break;
        case 4: month = "Aprel"; break;
        case 5: month = "May"; break;
        case 6: month = "Iyun"; break;
        case 7: month = "Iyul"; break;
        case 8: month = "Avgust"; break;
        case 9: month = "Sentabr"; break;
        case 10: month = "Oktabr"; break;
        case 11: month = "Noyabr"; break;
        case 12: month = "Dekabr"; break;
        default: month = ""; break;
    }
    return month;
}

$('#region_user').on('change', function () {
    getTasks(this.value)
});