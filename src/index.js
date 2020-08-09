import React from 'react';
import ReactDOM from 'react-dom';
import CardGame from './options';

class App extends React.Component{
    constructor(){
        super();
        this.state = {CardGameOn:false};
        this.switchCardGame = this.switchCardGame.bind(this);
    }

    switchCardGame(){
        this.setState({CardGameOn:!this.state.CardGameOn});
    }

    render(){
        return(
        <div>
            <h1>Hello World</h1>
            <button onClick={this.switchCardGame}>Switch Card Game ON/OFF</button>
            {this.state.CardGameOn === true && <CardGame />}
        </div>
    )}
}

ReactDOM.render(<App />, document.getElementById('root'));