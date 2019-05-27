import React from 'react';
//  import logo from './logo.svg';
import './App.css';
import { OptionsList } from './OptionsList';
import questions from './Data';
import Chart from 'chart.js';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      correctAnswers: 0, 
      wrongAnswers: 0, 
      allAttempted: false 
    }
    this.validate = this.validate.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.clear = this.clear.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
  }

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
        var allAttempted = false;
        var pTag = questionElement.getElementsByTagName('p')[0];
        if (selected === false) {
          if (pTag.className === '') {
            pTag.className = 'alert';
          }
          allAttempted = false;
        }
        else {
          pTag.className = '';
          allAttempted = true;
        }

      }

      resolve(allAttempted)
      // update state of allAttempted to false or true
      // this.setState({allAttempted: allAttempted });
    })

    var that = this;

    promise.then(function(value){ 
      console.log(value);
      that.setState({allAttempted: value });

      if (that.state.allAttempted === true) {
        that.checkAnswers();
        that.createBarChart(that.state.correctAnswers, that.state.wrongAnswers, false);
      }
      
    })
  }

  createBarChart( correctAnswers, wrongAnswers, destroy) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wrong answers', 'Correct answers'],
            datasets: [{
                label: 'Result',
                data: [wrongAnswers, correctAnswers],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    if (destroy) {
      myChart.destroy();
    }
  }

  resetScore() {
    this.setState({correctAnswers: 0, wrongAnswers: 0});
    // this.createBarChart( this.state.correctAnswers, this.state.wrongAnswers, true)
  }

  checkAnswers() {
    this.resetScore();
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
    this.resetScore();
    var inputElements = document.getElementsByTagName('input');
    for (let index = 0; index < inputElements.length; index++) {
      const element = inputElements[index];
      element.checked = false;
    }
    this.createBarChart(this.state.correctAnswers, this.state.wrongAnswers, true);
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
        <div className="col-1">
          <form>
            {questionsList}
            <button onClick={this.validate} type="submit">Submit</button>
            <button onClick={this.clear}>Clear</button>
          </form>
        </div>
        <div className="col-2">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
