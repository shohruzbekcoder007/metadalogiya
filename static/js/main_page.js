document.querySelectorAll('input').forEach(elem => {
    elem.addEventListener('change', (event) => {
        document.getElementById(`btn${event.target.id}`).classList.remove('dbn')
    })
})

async function ferferrro(event) {
    event.preventDefault();
    let id = event.target.getAttribute('data-id')
    console.log();
    const formData = new FormData();
    const imagefile = document.getElementById(`${id}`);
    formData.append("file", imagefile.files[0]);
    let res = await axios.post(`/file/uploadfile?task_id=${id}`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
    console.log(res.data)
    if(res.data) {
        window.location.reload();
    }
}