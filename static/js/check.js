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
        }

        axios(options)
            .then(response => {
                const managements = response.data
                managements.forEach(element => {
                    $("#region_user").append(`<option value=${element._id}>${element.name}</option>`)
                })
            })
    })()

    const tableOne = (data) => {
        let tbody = ``
        if (data.length > 0) {
            data.forEach(elem => {
                tbody = tbody + 
                            `<tr>
                                <td>${elem.text}</td>
                                <td>${elem.date_month}</td>
                                <td>${elem.date_year}</td>
                            </tr>`
            })
        }
        $('#reportarea').html(`
            <table class="ui celled table">
            <thead>
                <tr>
                    <th>Task text</th>
                    <th>Month</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody id="#reporttbodyone">
                ${tbody}
            </tbody>
            </table>
        `)
    }

    const tableTwo = (data) => {
        let tbody = ``
        if (data.length > 0) {
            data.forEach(elem => {
                tbody = tbody + `<tr>
                                    <td>${elem.text}</td>
                                    <td>${elem.date_month}</td>
                                    <td>${elem.date_year}</td>
                                    <td>
                                        <a href="${elem.file_url}" target="_blank">${elem.file_url}</a>
                                    </td>
                                    <td><button class='ui button' onclick="fun(event)" data-id="${elem._id}">Tasdiqlash</button></td>
                                </tr>`
            })
        }
        $('#reportarea').html(`
            <table class="ui celled table">
            <thead>
                <tr>
                    <th>Task text</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Biriktirilgan file</th>
                    <th>Tasdiqlash</th>
                </tr>
            </thead>
            <tbody id="#reporttbodyone">
                ${tbody}
            </tbody>
            </table>
        `)
    }

    const tableThree = (data) => {
        let tbody = ``
        if (data.length > 0) {
            data.forEach(elem => {
                tbody = tbody + `<tr>
                                    <td>${elem.text}</td>
                                    <td>${elem.date_month}</td>
                                    <td>${elem.date_year}</td>
                                    <td>
                                        <a href="${elem.file_url}" target="_blank">${elem.file_url}</a>
                                    </td>
                                </tr>`
            })
        }
        $('#reportarea').html(`
            <table class="ui celled table">
            <thead>
                <tr>
                    <th>Task text</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Biriktirilgan file</th>
                </tr>
            </thead>
            <tbody id="#reporttbodyone">
                ${tbody}
            </tbody>
            </table>
        `)
    }

    const createTable = (user_id, status) => {

        const options = {
            url: `/task/checktaskone?user_id=${user_id}&status=${status}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        }

        axios(options)
            .then(response => {
                if (status == 1) {
                    tableOne(response.data)
                }
                if (status == 2) {
                    tableTwo(response.data)
                }
                if(status == 3) {
                    tableThree(response.data)
                }
                if(status == 4) {
                    tableOne(response.data)
                }
            })
            .catch(err => {
                console.log("error")
            })
    }

    $('#reportbtn').click((event) => {
        $('#reportarea').addClass('ui container large equal width form segment')
        createTable($('#region_user').val(), $('#task_status').val())
    })

})

function fun(event) {
    const id = event.target.getAttribute('data-id')
    const options = {
        url: `/task/chackestatustwo`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            _id: id
        }
    }

    axios(options)
        .then(response => {
            if(response.data.task_status && response.data.task_status  == 3){
                event.target.parentElement.parentElement.textContent=""
            }
        })
        .catch(err => {
            console.log("error", err)
        })
}