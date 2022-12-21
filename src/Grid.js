import { useUnit } from "effector-react";
import Container from "react-bootstrap/Container";
import Card from "react-free-playing-cards/lib/TcN";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { $$grid, cardClicked } from "./model";

export const Grid = () => {
  const cards = useUnit($$grid);
  return (
    <Container className="mt-3">
      {cards.map((row, rowIndex) => (
        <Row key={`rowIndex-${rowIndex}`} className="mb-2">
          {row.map((card, colIndex) => (
            <Col key={`colIndex-${colIndex}`}>
              <div
                className="memo-card"
                onClick={() => {
                  if (!card.isFlipped) cardClicked(card);
                }}
              >
                <Card card={card.rank} height="150px" back={!card.isFlipped} />
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
