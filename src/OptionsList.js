import React from 'react';

export class OptionsList extends React.Component {

    constructor(props) {
      super(props);
      this.state = { correctAnswers: 0, wrongAnswers: 0 }
      this.updateScore = this.updateScore.bind(this);
    }

    updateScore(isCorrect) {
        if (isCorrect) {
            this.setState.correctAnswers += 1;
        }        
        else {
            this.setState.wrongAnswers += 1;
        }
    }

    render() {
        const optionsList = this.props.options.map((option, i) =>
            <div key={i}>
                <input 
                    type="radio" 
                    name={'input-' + this.props.number} 
                    id={'input-' + this.props.number + i} 
                    value={option}/>
                <label htmlFor={'input-' + this.props.number + i}>
                    {option}
                </label>
                <br/>
            </div>
        );
        return (
            optionsList
        );
    }
}