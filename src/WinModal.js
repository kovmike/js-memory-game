import { useUnit } from "effector-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { $$points, restartClicked } from "./model";

export const WinModal = () => {

const points = useUnit($$points)
  
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>You win!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <span className="display-1">{points}</span> pts
        </p>
      </Modal.Body>
      <Modal.Footer>
       
        <Button variant="primary" onClick={restartClicked}>
          Play again!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


