import React, { useState } from "react"
import { Label, Input, Button, Alert } from "reactstrap"

// SPINNER
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

// IMPORT CSS
import styles from '../../styles/RegisterLoginPage/Reset.module.css'

const antIcon = (
    <LoadingOutlined
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 19,
        fontWeight: 900,
        color: 'blue',
    }}
    spin/>)

function ResetPasswordPage() {
    const [inputs, setInputs] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showResetSpinner, setShowResetSpinner] = useState(false)
    const [showBackSpinner, setShowBackSpinner] = useState(false)
  
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleBackClick = () => {
        setShowBackSpinner(true)
        setTimeout(() => {
        setShowBackSpinner(false)
        window.location.href = '/login'
        }, 2000)
    }

    const handleResetClick = async () => {
        try {
            if (!inputs.email) {
            setShowAlert(true)
            setAlertMessage('FAILED ❗ PLEASE ENTER YOUR EMAIL')
            return
        }
        setShowResetSpinner(true)
        setTimeout(() => {
            setShowResetSpinner(false)
            setShowAlert(true)
            setAlertMessage('SUCCESS ✅ CHECK YOUR EMAIL TO RESET YOUR PASSWORD')
        }, 2000)
    } catch (error) {
        console.log(error)
        }
    }

    return (
        <div
            className={
                `${styles.bodyClass}`
            }>
        <div
            className={
                `${styles.boxClass}`
            }>
        <div
            className={
                `${styles.borderClass}`
            }>
        </div>
        <div
            className={
                `${styles.formClass}`
            }>

        <Alert
            className={
                `${styles.alertClass} ${alertMessage.includes('SUCCESS') ? styles.greenAlert : styles.redAlert}`}
            isOpen={showAlert}>
            {alertMessage}
        </Alert>

        <h2
            className={
                `${styles.hClass}`
            }>
            RESET PASSWORD
        </h2>

        <p
            className={
                `${styles.pClass}`
            }>
            To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.
        </p>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="email"
            name="email"
            id="email"
            className={
                `${styles.inputClass}`
            }
                value={inputs.email || ""}
                onChange={handleChange}
            required/>
        <Label
            for="email"
            className={
                `${styles.labelClass}`
            }>
            EMAIL
        </Label>
        <div
            className={
                `${styles.divClass}`
            }>
        </div>
        </div>

        <div
            className={
                `${styles.ButtonContainerClass}`
            }>

        <Button
            className={
                `${styles.ButtonClass}`
            }
            type="button"
            onClick={handleBackClick}>
            {showBackSpinner ? <Spin indicator={antIcon} /> : 'BACK'}
        </Button>

        <Button
            className={
                `${styles.SubmitClass}`
            }
            onClick={handleResetClick}
            type="submit">
            {showResetSpinner ? <Spin indicator={antIcon} /> : 'RESET'}
        </Button>

        </div>

        </div>
        </div>
        </div>
    )
}

export default ResetPasswordPage