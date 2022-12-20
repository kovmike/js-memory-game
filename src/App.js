import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { WinModal } from "./WinModal";
import { Grid } from "./Grid";
import { useUnit } from "effector-react";
import { $clickCount, $$hasWon, $timer, tick } from "./model";

function App() {
  const [clickCount, timer, showModal] = useUnit([
    $clickCount,
    $timer,
    $$hasWon,
  ]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Memory Game
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Clicks: {clickCount} &mdash; Time: {timer}s
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
          <Grid />
      {showModal && <WinModal />}
    </>
  );
}

export default App;
