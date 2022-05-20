import classes from "./Events.module.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axiosConfig.js";

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function Events() {
  const [state, setState] = useState({
    events: [],
    loaded: false,
    showBackdrop: false,
    formError: false,
  });

  useEffect(() => {
    // const formData = new FormData();
    // formData.append("username", event.target.elements.username.value.trim());
    // formData.append("password", event.target.elements.password.value.trim());
    //   formData.append("user_type", 1);

    if (localStorage.getItem("username")) {
      axios.get("/api/v1/events").then((res) => {
        //   console.log(res);
        console.log(res.data);
        setState((prev) => {
          return {
            ...prev,
            loaded: true,
            events: res.data,
          };
        });
        //   history.push("/events");
        //   window.location.reload(false);
      });
    }
  }, []);

  const showBackdrop = (event) => {
    event.preventDefault();
    setState((prevState) => {
      return { ...prevState, showBackdrop: true };
    });
  };

  const closeBackdrop = (event) => {
    event.preventDefault();
    setState((prevState) => {
      return { ...prevState, showBackdrop: false };
    });
  };

  const postEvent = (event) => {
    event.preventDefault();
    if (
      event.target.elements.petName.value.trim() === "" ||
      event.target.elements.date.value.trim() === "" ||
      event.target.elements.time.value.trim() === "" ||
      event.target.elements.phoneNumber.value.trim() === ""
    ) {
      setState((prev) => {
        return {
          ...prev,
          formError: true,
        };
      });
    } else if (
      isNumeric(event.target.elements.phoneNumber.value.trim()) &&
      localStorage.getItem("username")
    ) {
      const formData = new FormData();
      formData.append("petName", event.target.elements.petName.value.trim());
      formData.append("date", event.target.elements.date.value.trim());
      formData.append("time", event.target.elements.time.value.trim());
      formData.append("ownerName", localStorage.getItem("username").trim());
      formData.append("name", localStorage.getItem("username"));
      formData.append("number", event.target.elements.phoneNumber.value.trim());
      axios.post("/api/v1/events", formData).then((res) => {
        //   console.log(res);
        // console.log(res.data);
        // history.push("/events");
        // window.location.reload(false);
        setState((prev) => {
          const bla = prev.events;
          bla.push({
            petName: event.target.elements.petName.value.trim(),
            date: event.target.elements.date.value.trim(),
            time: event.target.elements.time.value.trim(),
          });
          return {
            ...prev,
            events: bla,
            showBackdrop: false,
          };
        });
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          formError: true,
        };
      });
    }
  };

  return (
    <div className={classes.Events}>
      <h1 className={classes.Header}>Events</h1>
      {!state.loaded && <p>Loading....</p>}
      {state.loaded && state.events.length > 0 && (
        <div className={classes.EventsBox}>
          {state.events.map((e) => (
            <p>{e.petName + " at " + e.time + " on " + e.date}</p>
          ))}
        </div>
      )}
      <button onClick={showBackdrop}>Add New</button>
      {state.showBackdrop && (
        <div className={classes.Backdrop}>
          <form onSubmit={postEvent} className={classes.EventForm}>
            <div className={classes.OptionsContainer}>
              <label for="petName">Pet Name: </label>
              <input id="petName" name="petName"></input>
            </div>
            <div className={classes.OptionsContainer}>
              <label for="date">Date: </label>
              <input id="date" name="date"></input>
            </div>
            <div className={classes.OptionsContainer}>
              <label for="time">Time: </label>
              <input id="time" name="time"></input>
            </div>
            <div className={classes.OptionsContainer}>
              <label for="phoneNumber">Phone Number: </label>
              <input id="phoneNumber" name="phoneNumber"></input>
            </div>
            {state.formError && (
              <p>Error in form (probably invalid number or empty field)</p>
            )}
            <button>Submit</button>
          </form>
          <p className={classes.Close} onClick={closeBackdrop}>
            X
          </p>
        </div>
      )}
    </div>
  );
}

export default Events;
