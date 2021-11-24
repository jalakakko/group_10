import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import UploadForm from "./UploadForm"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import MenuAppbar from "./MenuAppBar"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const [selectedImg, setSelectedImg] = useState(null)
    const navigate = useNavigate()
    async function handleLogout() {
        setError('')

        try{
            await logout()
            navigate("/login")
        } catch{
            setError("Failed to log out")
        }
    }

    return (
        <>
            <MenuAppbar/>
            <Card className="card">
                <Card.Body>
                    <h2 className="text-center mb-4">Upload</h2>
                    <UploadForm/>
                </Card.Body>
            </Card>
            <ImageGrid setSelectedImg={setSelectedImg}/>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update profile
                    </Link>
                </Card.Body>
            </Card>
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/> }
            <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}
