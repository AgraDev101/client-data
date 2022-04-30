import { BrowserRouter, Switch, Route } from "react-router-dom"
import Nav from "./components/nav"
import Login from "./components/login"
import DataEntry from "./pages/dataEntry";
import Home from "./components/home";
import Search from "./pages/searchClients";
import NotFound from "./pages/notFound";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Nav />
            </div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/dataEntry" component={DataEntry} />
                <Route path="/searchClients" component={Search} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App