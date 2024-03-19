import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export function HomePage() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Link
        to="/todos"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "30px",
        }}
      >
        Go to the todo list <FaLongArrowAltRight fontSize="22px" />
      </Link>
    </div>
  );
}
