import Input from "../components/dataInput"
import { connect } from "react-redux";

const DataEntry = (props) => {

    return (
        <div>
            {
                props.isLogged ? <Input /> : props.history.push("/") 
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(DataEntry)