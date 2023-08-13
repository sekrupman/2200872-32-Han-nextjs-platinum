/// API Connection to save uploaded Avatar
function AvatarApi(payload) {
    var formdata = new FormData();
    formdata.append("avatar", payload.updateImage, `avatar-user${payload.userId}`);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_BE_URL}/avatar/save?id=${payload.userId}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));

}

export {AvatarApi};