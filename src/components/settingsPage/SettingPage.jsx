import NavBar from "../NavBar"
import ScrollToTop from "../ScrollToTop"
import "/src/styles/settingsPage.css"
import { useState, useEffect } from "react"
import axios from "axios"
import ProfilePicture from "../ProfilePicture"
function SettingsPage() {
    const [user, setUser] = useState({username: "Not Logged In"})
    const [file, setFile] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null)
    async function getUser() {
        const response = await fetch("https://quickchat-backend-production.up.railway.app/api/user", {
            method: 'GET',
            credentials: 'include'
        })
        const currentUser = await response.json()
        setUser(currentUser)
    }

    useEffect(() => {
        getUser()
        getCurrentProfilePicture()
    }, [])
    
    async function getCurrentProfilePicture() {
        const response = await fetch("https://quickchat-backend-production.up.railway.app/api/profilePicture", {
            method: "GET",
            credentials: "include"
        })
        const profilePicture = await response.json()
        if (profilePicture) {

        }
        console.log(profilePicture[0], "picture")
        setProfilePicture(profilePicture[0].picture)
    }
    
    const upload = async (e) => {
        const formData = new FormData()
        formData.append("file", file)
        response = await axios.post("https://quickchat-backend-production.up.railway.app/api/profilePicture", formData)
    }

    return <div className="settingsPage">
        <NavBar/>
        <ScrollToTop/>
        <div className="settingsPageContent">
            <h2 className="settingsPageHeader">{user.username}</h2>
            <div className="settingsPageSubHeader">Profile Picture</div>
            <div>
                <ProfilePicture image={profilePicture}></ProfilePicture>
                <div>Upload File</div>
                    <input type="file" name="file" accept="image/*" className="fileInput" onChange={(e) => setFile(e.target.files[0])}/>
                    <button type="submit" className="uploadButton" onClick={upload}>
                        <img className="uploadIcon" src="/images/upload-icon.svg"/>
                    </button>
            </div>
        </div>
    </div>
}

export default SettingsPage