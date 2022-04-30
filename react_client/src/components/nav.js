import { Link } from "react-router-dom";
import styles from "../styles/nav.module.css"
import { connect } from "react-redux";

const Nav = (props) => {

    const logout = () => {
        try {
            localStorage.removeItem("token")
            props.changeLoginState()
            props.history.push("/login")
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className={styles.nav}>
            <div>
                <ul className={styles.nav2}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dataEntry">Data Input</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/searchClients">View Clients</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.login}>
                {
                    props.isLogged ?
                            <button style={{margin: "20px 0 0 0"}} onClick={logout} className="btn btn-primary">Logout</button>
                            :
                            <ul>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)