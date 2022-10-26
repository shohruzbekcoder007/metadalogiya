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

    const createList = (data) => {
        $('#replist').html('')
        data.forEach(elem => {
            $('#replist').prepend(`
                <tr data-id="${elem.town_id._id}">
                    <td>${elem.town_id.name}</td>
                    <td>${elem.town_id.user_name}</td>
                    <td>
                        <button class="ui red button" data-btn="${elem.town_id._id}" onclick="deleteFunction(event)">Delete</button>
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
                createList(response.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    $('#region_user').on('change', function() {
        getTown(this.value)
      });

})

const deleteFunction = async (event) => {
    const del = await axios.delete('/user/delete?id=' + event.target.getAttribute("data-btn"));
    if(del.data.ok == true){
        event.target.parentElement.parentElement.classList.add('dbn')
    }
}