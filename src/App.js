import Navbar from "./cmp/Navbar/Navbar";
import Firstscreen from "./cmp/Movie/Firstscreen";
import {} from "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const design = (
    <>
      <Navbar />
      <Firstscreen />
    </>
  );
  return design;
};
export default App;
