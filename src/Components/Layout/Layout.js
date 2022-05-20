import Aux from "../hoc/Aux.js";
import Footer from "../Footer/Footer.js";
import classes from "./Layout.module.css";

export default function Layout(props) {
  // const displayBackdrop = useSelector((state) => state.displayBackdrop);

  return (
    <Aux>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
}
