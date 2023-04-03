import React from "react";
import { Card, Button } from "react-bootstrap";
import "./InterventionCard.css";

type Intervention = {
    confidenceInterval: [number, number],
    utility: number,
    image: string,
    name: string,
    revealed: boolean,
    tokens: number,
}
type InterventionCardProps = {
    intervention: Intervention,
    disabled: boolean,
    onReveal: () => void,
    onDonate: () => void
}

function InterventionCard({ disabled, intervention, onDonate, onReveal } : InterventionCardProps) {
  return (
    <Card className="intervention-card">
      <Card.Body>
        <Card.Img variant="top" src={"images/" + intervention.image} />
        <Card.Title>{intervention.name}</Card.Title>
        {intervention.revealed ? (
          <Card.Text>Utility: {intervention.utility}</Card.Text>
        ): 
        <Card.Text>Confidence Interval: {intervention.confidenceInterval[0]} - {intervention.confidenceInterval[1]}</Card.Text>
}
        <Button onClick={onReveal} disabled={disabled}>
          Evaluate
        </Button>
        <Button onClick={onDonate} disabled={disabled}>
          Donate
        </Button>
        {intervention.tokens > 0 && <Card.Text>Tokens Donated: {intervention.tokens}</Card.Text>}
      </Card.Body>
    </Card>
  );
}

export default InterventionCard;