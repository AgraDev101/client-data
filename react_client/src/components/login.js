import React, { useState } from "react"
import styles from "../styles/login.module.css"
import { connect } from "react-redux"

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {
                email,
                password
            }
            const response = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const res = await response.json()
            if (res.success === true) {
                setMessage("login successful")
                localStorage.setItem("token", res.token)
                props.changeLoginState()
                props.history.push("/")
                console.log(props)
            } else if (res.success === false) {
                setMessage("wrong password/email")
            }
            } catch (err) {
                setMessage(err.message)
        }
    }

    const loginCheck = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/data", {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem("token")}`
                }
            })
            const res = await response.json()
            setMessage(res.msg)
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.form}>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>Message from server: {message}!</p>
            <button onClick={loginCheck} className="btn btn-primary">Login Check</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginState: () => dispatch({type: "LOGIN_CHANGE"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)