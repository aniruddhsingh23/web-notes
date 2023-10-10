import Spinner from "react-bootstrap/Spinner";

function LoaderSpinner(size = 100) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        width: "100%",
      }}
    >
      <Spinner
        animation="border"
        style={{
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
}

export default LoaderSpinner;
