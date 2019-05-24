import React from 'react';
//  import logo from './logo.svg';
import './App.css';
import { OptionsList } from './OptionsList';
import questions from './Data';

export class App extends React.Component {
  
  render() {
    const questionsList = questions.map((question, i) =>
      <div key={i} className="input-group">
        <p>{i+1}. {question.question}</p>
        <OptionsList
          number={i + 1} 
          answerIndex={question.answerIndex} 
          options={question.answerOptions}/>
      </div>
    );
    return (
      <div className="App">
        <form>
          {questionsList}
          <button type="submit">Submit</button>
          <button>Clear</button>
        </form>
      </div>
    );
  }
}

export default App;
