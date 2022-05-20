import Aux from "../hoc/Aux.js";
import Footer from "../Footer/Footer.js";
import classes from "../Layout/Layout.js";

export default function Layout(props) {
  // const displayBackdrop = useSelector((state) => state.displayBackdrop);

  return (
    <Aux>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
}
