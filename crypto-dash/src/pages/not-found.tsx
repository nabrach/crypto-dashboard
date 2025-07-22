import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div style={styles.container as React.CSSProperties}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
      <Link style={styles.link} to="/">
        Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2rem",
    color: "#343a40",
  },
  message: {
    fontSize: "1.2rem",
    color: "#6c757d",
  },
  link: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};
export default NotFoundPage;
