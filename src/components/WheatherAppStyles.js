import { blue, grey } from "@mui/material/colors";
import { color } from "chart.js/helpers";

export const useStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d47a1",
    padding: 2,
  },
  cardContainer: {
    width: "100%",
    minWidth: "800px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: 3,
  },
  title: {
    color: blue[900],
  },
  inputField: {
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: blue[900],
    color: "white",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  errorText: {
    color: 'error',
    textAlign: 'center',
  },
  card: {
    marginBottom: "20px",
    padding: "20px",
  },
  cardContent: {
    textAlign: "center",
  },
  favoriteButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  favoriteListTitle: {
    marginTop: "30px",
  },
  favoritesList: {
    maxHeight: 200,
    overflowY: "auto",
  },
  favoriteItem: {
    backgroundColor: grey[200],
    marginBottom: "10px",
    borderRadius: "5px",
  },
  favoriteIcon: {
    color: blue[900],
  },
};
