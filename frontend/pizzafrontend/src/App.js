import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Aboutus from "./Components/Aboutus";
import Allimages from "./Components/Allimages";
import Allpdf from "./Components/Allpdf";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import Forgetpassword from "./Components/Forgetpassword";
import Home from "./Components/Home";
import InvoiceComponent from "./Components/InvoiceComponent";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Navbar from "./Components/Navbar";
import Registernew from "./Components/Registernew";
import Settingcomponent from "./Components/Settingcomponent";
import Updatecompany from "./Components/Updatecompany";

function App() {
  return (
    <Router>
      <div>
       <Navbar />
        <Switch>
          <Route path="/about">
            <Aboutus />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Registernew />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/invoicedata">
            <InvoiceComponent />
          </Route>
          <Route path="/setting">
            <Settingcomponent />
          </Route>
          <Route path="/updatecompany">
            <Updatecompany />
          </Route>
          <Route path="/forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/allimages">
            <Allimages />
          </Route>
          <Route path="/allpdf">
            <Allpdf />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
