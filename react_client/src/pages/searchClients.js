import { useEffect, useState } from "react"
import styles from "../styles/searchClients.module.css"

const Search = () => {
    const [clients, setClients] = useState([])

    const fetchClients = async () => {
        try {
            const clients = await fetch("http://localhost:5000/itr/clients")
            const clientsData = await clients.json()
            // console.log(clientsData)
            setClients(clientsData)
        } catch (err) {
            console.error(err.message)
        }
    }

    // const capitalise = (str) => {
    //     return str.replace(/[\w']+/g, function(match) {
    //         return match[0].toUpperCase() + match.substr(1);
    //     });
    // }

    // useEffect(() => {
    //     fetchClients()
    // }, [])


    return (
        <div className="container">
            <button onClick={fetchClients} className="btn btn-primary">View All</button>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">PAN</th>
                            <th scope="col">ITR Password</th>
                            <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr> */}
                        {clients.map(client => (
                            <tr key={client.client_id}>
                                <td className={styles.capitalise}>{client.name + " " + (client.middle_name === "na" ? "" : client.middle_name) + " " + client.last_name}</td>
                                <td>{client.pan.toUpperCase()}</td>
                                <td>{client.itr_password}</td>
                                <td>{client.mobile === "nil" ? "" : client.mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Search