import React from "react";
import { Card, Button } from "react-bootstrap";
import "./EvaluatorCard.css";

type EvaluatorCardProps = {
    tokens: number
}

function EvaluatorCard({ tokens }: EvaluatorCardProps) {
  return (
    <Card className="evaluator-card">
      <Card.Body>
        <Card.Title>Uncertainty Reduction Institute</Card.Title>
        <Card.Text>Tokens: {tokens}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EvaluatorCard;