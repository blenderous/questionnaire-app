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
    // this.checkAnswers = this.checkAnswers.bind(this);
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
    var promise = new Promise(function(resolve,reject) {
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

      resolve(allAttempted)
      // update state of allAttempted to false or true
      // this.setState({allAttempted: allAttempted });
    })

    var that = this;

    promise.then(function(value){ 
      // value = true
      that.setState({allAttempted: value });
      that.checkAnswers();
      // 
      console.log(that.state.correctAnswers);
      console.log(that.state.wrongAnswers);
    })
  }

  checkAnswers() {
    var array = document.getElementsByTagName('input');
    for (let index = 0; index < array.length; index++) {
      const inputElement = array[index];
      if (inputElement.checked) {
        // inputNumber is the id of inputElement that is checked
        // inputAlt is the id of the correct inputElement
        var inputNumber = inputElement.id.substr(inputElement.id.length - 2, 2);
        var inputAlt = inputElement.alt;
        // if both are same, answer is correct
        if (inputNumber === inputAlt) {
          this.setState({correctAnswers : this.state.correctAnswers + 1})
          console.log('correct answer');
        }
        // else answer is wrong
        else {
          this.setState({wrongAnswers : this.state.wrongAnswers + 1})
          console.log('wrong answer');
        }
      }
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
          // onChange={this.checkAnswers}
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
