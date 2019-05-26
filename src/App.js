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
      console.log(value);
      // value = true
      that.setState({allAttempted: value });
      that.checkAnswers();
      
      // console.log(that.state.correctAnswers);
      // console.log(that.state.wrongAnswers);

      // create bar chart here
      that.createBarChart();
    })
  }

  createBarChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
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
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default App;
