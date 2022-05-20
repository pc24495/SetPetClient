import "./App.css";
// import classes from "./App.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from 'history';
import { useHistory } from "react-router-dom";
// useHistory too^^
import Pets from "./Components/Pets/Pets.js";
import Login from "./Components/Login/Login.js";
import Events from "./Components/Events/Events.js";
import Layout from "./Components/Layout/Layout.js";
import axios from "./axiosConfig.js";

function App(props) {
  const [students, setStudents] = useState([]);
  // const [loggedIn] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  // const history = createBrowserHistory();
  const history = useHistory();

  useEffect(() => {
    // axios.get("/api/v1/students").then((response) => {
    //   console.log(response.data);
    //   setStudents(response.data);
    // });
    // console.log(props);
    if (loggedIn) {
      history.push("/events");
    } else if (
      localStorage.getItem("loggedIn") &&
      localStorage.getItem("username")
    ) {
      dispatch({ type: "LOGIN", username: localStorage.getItem("username") });
      history.push("/events");
    }

    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/events" component={Events}></Route>
          <Route path="/pets" component={Pets}></Route>
          <Route path="/" component={Login}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

// <Switch>
// <Route path="/pets" component={Pets}></Route>
// </Switch>

// <Switch>
// <Route path="/pets" component={Pets}></Route>
// </Switch>

// <Layout>
// <BrowserRouter>
//   <Routes>
//     <Route path="/pets" element={<Pets></Pets>}></Route>
//   </Routes>
// </BrowserRouter>
// </Layout>

// <Routes>
// <Route path="/pets" component={Pets}></Route>
// </Routes>

// {students.map((student) => (
//   <p>{student.name}</p>
// ))}
// <div className="Blah"></div>
// <Layout>
//   <div className="Blah"></div>
//   <Routes>
//     <Route path="/pets" component={Pets}></Route>
//   </Routes>
// </Layout>

export default App;
