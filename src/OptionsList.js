import React from 'react';

export class OptionsList extends React.Component {
    
    render() {
        const optionsList = this.props.options.map((option, i) =>
            <div key={i}>
                <input 
                    type="radio" 
                    name={'input-' + this.props.number} 
                    id={'input-' + this.props.number + i} 
                    value={option}
                    />
                <label
                    // onClick={this.updateScore(this.props.answerIndex, i)} 
                    // onClick={this.props.onClick}
                    htmlFor={'input-' + this.props.number + i}>
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