import React, { useState } from "react";
import InterventionCard from "./InterventionCard";
import EvaluatorCard from "./EvaluatorCard";
import Form from "react-bootstrap/form"
import Button from "react-bootstrap/button"
import "./App.css";

type Intervention = {
  confidenceInterval: [number, number],
  utility: number,
  image: string,
  name: string,
}
type InterventionState = {
  revealed: boolean,
  tokens: number
} & Intervention;

const initialInterventions : Intervention[] = [
  {
   name: "Action Against Hunger Initiative",
   image: "Action_Against_Hunger.png",
   confidenceInterval: [25, 70],
   utility: 35,
 },
   {
    name: "Anti Guns Initiative",
   image: "Anti_Guns_Initiative.png",
    confidenceInterval: [15, 75],
    utility: 45,
 }, {
    name: "Stupidity Prevention International",
   image: "Stupidity_Prevention_International.png",
    confidenceInterval: [30, 65],
   utility: 55,
 }, {
   name: "Save the Insects",
   image: "Save_the_Insects.png",
   confidenceInterval: [20, 40],
   utility: 35,
 }, {
    name: "The Anti Measles Association",
   image: "The_Anti_Measles_Association.png",
    confidenceInterval: [25, 60],
    utility: 35,
 }, {
    name: "Against Bioweapons Agency",
   image: "Against_Bioweapons_Agency.png",
    confidenceInterval: [25, 70],
    utility: 40,
 }, {
    name: "Save the AI Research Institute",
    image: "Save_the_AI_Research_Institute.png",
    confidenceInterval: [30, 80],
    utility: 50,
 }]
 
function App() {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [tokens, setTokens] = useState(10);
  const [evaluatorTokens, setEvaluatorTokens] = useState(0);
  const [interventions, setInterventions] = useState(initialInterventions.map(x => ({...x, revealed: false, tokens: 0})));

  function endGame(newInterventions : InterventionState[]){
    setInterventions(newInterventions.map(x =>({...x, revealed: true})))
    fetch("https://discord.com/api/webhooks/1092318143986270228/AO_LmD2oB8uOR3c-F-qGZIW0P2S_dmVvpApy_up-62fRO0fFOECkVi4SHJwIOTfkrQ3F", {method: "POST", headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({content: `Player ${name} got a score of ${calculateScore(newInterventions)}`})
  })
  }

  function calculateScore(interventions: InterventionState[]): number{
    return interventions.map(x => x.tokens * x.utility).reduce((a, b) => a + b)
  }

  function handleReveal(index : number) {
    const newInterventions = interventions.map((x, i) => {
      if(i === index){
        return {
          ...x,
          revealed: true
        }
      }
      else {
        return x;
      }
    })
    setInterventions(newInterventions);
    setEvaluatorTokens(evaluatorTokens + 1);
    setTokens(tokens - 1);
    if(tokens - 1 === 0){
      endGame(newInterventions);
    }
  }

  function handleDonate(index: number) {
    const newInterventions = interventions.map((x, i) => {
      if(i === index){
        return {
          ...x,
          tokens: x.tokens + 1
        }
      }
      else {
        return x;
      }
    })
    setInterventions(newInterventions);
    setTokens(tokens - 1)
    if(tokens - 1 === 0){
      endGame(newInterventions);
    }
  }

  if(!gameStarted){
    return (
      <div className="App">
        <h1>Value of Information Game</h1>
        <Form onSubmit={(event) => setGameStarted(true)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name (or identifier)</Form.Label>
            <Form.Control value={name} type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            <Form.Text className="text-muted">
              Only used to identify you and your score for the presentation 
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>Please enter your name (or identifier)</p>
      </div>
      )
  }
  return (
    <div className="App">
      <h1>Value of Information Game</h1>
      <div>
    <p>The goal (as is life) is to create the most utility possible. 
      You can create utility by donating to an intervention. 
      By donating to an intervention, you get the utility of that intervention. 
      However, you do not know the utility of the intervention, but what you are given is an 89% confidence interval of the actual utility (lognormal distribution, if it matters to you).
      You can donate in any way you wish, for instance you donate to only one intervention or spread them out to each intervention. 
      When you put multiple tokens on a card, you get utility equal to the number on the other side multiplied by the amount of times you donated.
      </p>

    <p>What makes this game interesting, is that if you want, you can evaluate an intervention. 
      This will allow you to learn an intervention's true utility, but this costs 1 token. 
      So you must work out how much that information is worth to you, because every token you put towards an evaluation does not get donated</p>
    </div>

      {tokens > 0 ? 
      <div className="tokens-remaining">
        Tokens remaining: {tokens}
      </div>
      :(
        <div className="game-end">
          Game ended! Your score is {calculateScore(interventions)}
        </div>
      ) }
      <div className="game-area">
        <div className="intervention-cards">
          {interventions.map((intervention, index) => (
            <InterventionCard
              key={index}
              disabled={tokens === 0}
              intervention={intervention}
              onReveal={() => handleReveal(index)}
              onDonate={() => handleDonate(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;