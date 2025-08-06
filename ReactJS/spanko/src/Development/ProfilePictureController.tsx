export class ProfilePictureController
{
    async UploadImage(imageFile : File , userID : number):Promise<any>
    {
        try
        {
            var imageFormData = new FormData();
            imageFormData.append("image_file" , imageFile);
            imageFormData.append("image_file_name" , imageFile.name);
            imageFormData.append("user_id" , userID.toString());
            const response = await fetch('https://localhost:3000/api/users/downloadProfilePicture' , {
                method : "POST",
                body : imageFormData
            })
            return await response.json()
        }
        catch (error)
        {
            console.log(error)
        }
    }

    async DownloadImage(userID : number):Promise<Blob>
    {
        try
        {
            // const response = await fetch('' , {method : "GET"})
            const response = await fetch('http' , {method : "POST" , })
            return await response.blob()
        }
        catch (error)
        {
            console.log(error)
            throw error
        }    
    }
}
export default ProfilePictureController