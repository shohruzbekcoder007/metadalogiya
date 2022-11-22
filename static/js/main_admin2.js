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
                });
                getTown($("#region_user").val())
            });
    })()

})

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
            $("#region_town").html('')
            response.data.forEach(element => {
                $("#region_town").append(`<option value=${element.town_id._id}>${element.town_id.name}</option>`);
            });
            getTasks($("#region_town").val())
        }).catch((err) => {
            console.log(err)
        })
}

$('#region_user').on('change', function () {
    getTown(this.value)
});

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
                <td>${elem.date_day || ""}</td>
                <td>${stringMonth(elem.date_month)}</td>
                <td>${elem.date_year}</td>
                <td><button class="ui red button" data-btn="${elem._id}" onclick="deleteFunction(event)">O'chirish</button></td>
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

$('#region_town').on('change', function () {
    getTasks(this.value)
});

const deleteFunction = async (event) => {
    const del = await axios.delete('/task/delete?id=' + event.target.getAttribute("data-btn"));
    if(del.data.ok == true){
        event.target.parentElement.parentElement.classList.add('dbn')
    }
}