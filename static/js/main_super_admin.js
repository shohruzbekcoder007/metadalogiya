$(document).ready(function () {
    (()=>{
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
                    <button class="ui red button" data-btn="${elem._id}" onclick="deleteFunction(event)">Delete</button>
                </td>
            </tr>`)
        })
    }
})

const deleteFunction = async (event) => {
    const del = await axios.delete('/user/delete?id=' + event.target.getAttribute("data-btn"));
    if(del.data.ok == true){
        event.target.parentElement.parentElement.classList.add('dbn')
    }
}