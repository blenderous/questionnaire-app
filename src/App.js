import React from 'react';
//  import logo from './logo.svg';
import './App.css';
import { OptionsList } from './OptionsList';
import questions from './Data';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { correctAnswers: 0, wrongAnswers: 0 }
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore(answerIndex, number) {
      console.log('answerIndex ' + answerIndex);
      console.log('number ' + number);
      if (answerIndex === number) {
        this.setState({correctAnswers : this.state.correctAnswers + 1});
      }
      else {
        this.setState({wrongAnswers : this.state.wrongAnswers + 1});
      }
  }

  validate(e) {
    e.preventDefault();
    console.log('validation comes here');
  }

  clear(e) {
    e.preventDefault();
    var inputElements = document.getElementsByTagName("input");
    for (let index = 0; index < inputElements.length; index++) {
      const element = inputElements[index];
      element.checked = false;
    }
  }
  
  render() {
    var questionsList = questions.map((question, i) =>
      <div key={i} className="input-group">
        <p>{i+1}. {question.question}</p>
        <OptionsList
          number={i + 1} 
          answerIndex={question.answerIndex} 
          options={question.answerOptions}
          />
      </div>
    );
    return (
      <div className="App">
        <form>
          {questionsList}
          <button onClick={this.validate} type="submit">Submit</button>
          <button onClick={this.clear}>Clear</button>
        </form>
      </div>
    );
  }
}

export default App;
