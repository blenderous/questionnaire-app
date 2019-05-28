import React from 'react';
//  import logo from './logo.svg';
import './App.css';
import { OptionsList } from './OptionsList';
import questions from './Data';
import { GoogleCharts } from "google-charts";

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      correctAnswers: 0, 
      wrongAnswers: 0, 
      allAttempted: false 
    }
    this.validate = this.validate.bind(this);
    this.clear = this.clear.bind(this);
    this.resetScore = this.resetScore.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
    this.createChart = this.createChart.bind(this);
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
      console.log('allAttempted: ', value);
      that.setState({allAttempted: value });

      if (that.state.allAttempted === true) {
        that.checkAnswers();
        that.createChart(that.state.correctAnswers, that.state.wrongAnswers);
      }
    });
  }

  resetScore() {
    this.setState({correctAnswers: 0, wrongAnswers: 0});
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
    this.createChart(0, 0);
  }
  
  // data = [
  //   ["Questions", "Answers", { role: "style" }],
  //   ["Correct Answers", 0, "#e0dc3c"], // RGB value
  //   ["Wrong Answers", 0, "#ff4014"], // English color name (changed)
  // ];

  createChart(correctAnswers, wrongAnswers) {
    //Load the charts library with a callback
    GoogleCharts.load(drawChart);
    
    function drawChart() {
    
        // Standard google charts functionality is available as GoogleCharts.api after load
        const data = GoogleCharts.api.visualization.arrayToDataTable([
          ["Questions", "Answers", { role: "style" }],
          ["Correct Answers", correctAnswers, "#e0dc3c"], // RGB value
          ["Wrong Answers", wrongAnswers, "#ff4014"], // English color name (changed)
        ]);
        const column_chart_1 = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart1'));
        column_chart_1.draw(data);
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
        <div className="col-1">
          <form>
            {questionsList}
            <button onClick={this.validate} type="submit">Submit</button>
            <button onClick={this.clear}>Clear</button>
          </form>
        </div>
        <div className="col-2">
          <div id="chart1"></div>
        </div>
      </div>
    );
  }
}

export default App;
