import React, {useState, useEffect } from "react";
import { Label, Input, Button } from "reactstrap";

// import css
import style from '../../styles/profile/Avatar.module.css'

// import api
import { AvatarApi } from "../../api/avatarApi";

function UploadAvatar() {
    // // get data from token
    // const id = localStorage.getItem('tokenId');
    // const avatar = localStorage.getItem('tokenAvatar')

    // const [imageUrl, setImageUrl] = useState(avatar);
    // const [updateImage, setUpdateImage] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // simpan url file agar gambar yang ditampilkan berganti yang baru
            setImageUrl(URL.createObjectURL(event.target.files[0]));

            // simpan file type untuk dilempar ke BE
            setUpdateImage(event.target.files[0])
        }
    }
    
    const handleSubmit = (event) => {
        try {
            if (!updateImage) {
                alert("Please upload file!")
            } else {
                event.preventDefault();
                AvatarApi({id, updateImage}).then(async result => {
                    // change avatar token with the new one
                    await localStorage.removeItem('tokenAvatar');
                    await localStorage.setItem('tokenAvatar', result.data.avatar)
                    await window.location.replace('/profilePage')
                })
            }   
        } catch (error) {
            console.log(error);
        }
    }


    // // check if token is active
    // useEffect(() => {
    //     try{
    //         if (!localStorage.getItem('tokenId')) {
    //             window.location.replace('/login')
    //         }
    //     } catch(error) {
    //         console.error('Error occurred while verifying token:', error);
    //     }
    // }, [])


    return (
        <div className={style.avatarBackground}>
            <div className={style.avatarFormArea}>
                <Label for="avatar" className="text-light mb-3">
                    <h1>Upload Avatar</h1>
                </Label>
                <img src={imageUrl} alt="" width={200} height={200}></img>
                <Input 
                    type="file" 
                    name="avatar"
                    accept="image/*"
                    onChange={onImageChange}
                />
                <div className={style.avatarButtonsArea}>
                    <Button 
                        type="submit"
                        color="dark"
                        onClick={handleSubmit}>
                            Submit Avatar
                    </Button>{' '}

                    <Button 
                        color="danger"
                        onClick={() => window.location.href='/profile'}>
                            Cancel
                    </Button>
                </div>
            </div>

        </div>
)};

export default UploadAvatar;
