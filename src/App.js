import React from 'react';
//  import logo from './logo.svg';
import './App.css';
import { OptionsList } from './OptionsList';
import questions from './Data';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      correctAnswers: 0, 
      wrongAnswers: 0, 
      allAttempted: false 
    }
    // this.updateScore = this.updateScore.bind(this);
    this.validate = this.validate.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
  }

  // updateScore(answerIndex, number) {
  //     console.log('answerIndex ' + answerIndex);
  //     console.log('number ' + number);
  //     if (answerIndex === number) {
  //       this.setState({correctAnswers : this.state.correctAnswers + 1});
  //     }
  //     else {
  //       this.setState({wrongAnswers : this.state.wrongAnswers + 1});
  //     }
  // }

  validate(e) {
    e.preventDefault();
    var inputGroup = document.getElementsByClassName('input-group');
    
    for (let index = 0; index < inputGroup.length; index++) {
      // questionElement is the group of inputs under className 'input-group'
      const questionElement = inputGroup[index];
      var inputElements = questionElement.getElementsByTagName('input');
      
      // checking for checked inputs
      var j=0;
      var selected = false;
      do {
        if (inputElements[j].checked === true) {
          selected = true;
        }
        j++;
      } while (j < inputElements.length);
      
      // if no input is selected show question in red-ish color
      var allAttempted = true;
      var pTag = questionElement.getElementsByTagName('p')[0];
      if (selected === false) {
        if (pTag.className === '') {
          pTag.className = 'alert';
        }
        allAttempted = false;
      }
      else {
        pTag.className = '';
      }

    }

    // update state of allAttempted to false or true
    this.setState({allAttempted: allAttempted });
    
  }

  checkAnswers(e) {
    // input value 
    var inputElement = e.target;
    var inputNumber = inputElement.id.substr(inputElement.id.length - 2, 2);
    var inputAlt = inputElement.alt;

    if (inputNumber === inputAlt) {
      this.setState({correctAnswers : this.state.correctAnswers + 1});
      console.log('correct answers + 1');
      // console.log(this.state.correctAnswers);
    }
    else {
      this.setState({wrongAnswers : this.state.wrongAnswers + 1})
      console.log('wrong answers + 1');

      var questionNumber1 = inputNumber.substr(inputNumber.length - 2, 1);
      var questionNumber2 = inputAlt.substr(inputAlt.length - 2, 1);
      
      // console.log(questionNumber1, questionNumber2)

      if (questionNumber1 === questionNumber2) {
        this.setState({correctAnswers : this.state.correctAnswers - 1})
        console.log('correct answers - 1');
      }
      
    }

    if (this.state.allAttempted) {
      // ...
    }
  }

  clear(e) {
    e.preventDefault();
    var inputElements = document.getElementsByTagName('input');
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
          onChange={this.checkAnswers}
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
