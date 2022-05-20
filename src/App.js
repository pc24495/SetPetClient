import "./App.css";
// import classes from "./App.module.css";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// useHistory too^^
import Pets from "./Components/Pets/Pets.js";
import Layout from "./Components/Layout/Layout.js";
import axios from "./axiosConfig.js";

function App(props) {
  const [students, setStudents] = useState([]);
  // const [loggedIn] = useState(false);

  useEffect(() => {
    axios.get("/api/v1/students").then((response) => {
      console.log(response.data);
      setStudents(response.data);
    });
    console.log(props);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Layout>
        <div className="TestDiv"></div>
        {students.map((s) => (
          <p>{s.name}</p>
        ))}
        <Switch>
          <Route path="/pets" component={Pets}></Route>
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
