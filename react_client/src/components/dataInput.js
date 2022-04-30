import React, { useState } from "react"
import styles from "../styles/dataInput.module.css"

const Input = () => {

    const [name, setName] = useState("")
    const [middle_name, setMiddleName] = useState("")
    const [last_name, setLastName] = useState("")
    const [pan, setPan] = useState("")
    const [itr_password, setItrPassword] = useState("")
    const [aadhaar, setAadhaar] = useState("")
    const [mobile, setMobile] = useState("")
    const [message, setMessage] = useState("_______")

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {
                name,
                middle_name,
                last_name,
                pan,
                itr_password,
                aadhaar,
                mobile
            }
            const response = await fetch("http://localhost:5000/itr/input", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const res = await response.json()
            if (res.success === true) {
                setMessage("entry created")
            }
            setName("");setMiddleName("");setLastName("");setPan("");setItrPassword("");setAadhaar("");setMobile("");
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
            <div className={styles.form}>
                <h3>Client Details</h3>
                <form onSubmit={onSubmitForm}>
                    <div className={styles.nameGroup}>
                        <div >
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label className="form-label">Middle Name</label>
                            <input type="text" className="form-control" value={middle_name} onChange={e => setMiddleName(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" value={last_name} onChange={e => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.panDetails}>
                        <div>
                            <label className="form-label">PAN</label>
                            <input type="text" className="form-control" value={pan} onChange={e => setPan(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">ITR Password</label>
                            <input type="text" className="form-control" value={itr_password} onChange={e => setItrPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.otherDetails}>
                        <div>
                            <label className="form-label">Aadhaar</label>
                            <input type="text" className="form-control" value={aadhaar} onChange={e => setAadhaar(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">Mobile</label>
                            <input type="text" className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <p>{message}</p>
            </div>
    )
}

export default Input