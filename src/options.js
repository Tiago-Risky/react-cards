import React, {Component} from 'react';
import answersJson from "./answers.json";
import questionsData from "./questions.json";

export default class CardGame extends Component {
    constructor() {
        super();
        var AnswersData = Array.from(answersJson.items);
        var QuestionsData = Array.from(questionsData.items);
        this.state = {
            answersStack:AnswersData,
            questionsStack:QuestionsData,
            currentAnswers:[],
            currentQuestion:"null",
            currentRound:0,
            maxRounds:4
        }
        console.log("starting");
        console.log(this.state);

        while(this.state.currentAnswers.length<5){
            let index = Math.floor(Math.random() * this.state.answersStack.length);
            this.state.currentAnswers.push(this.state.answersStack[index])
            this.state.answersStack.splice(index,1);
        }
    }

    checkState() {
        console.log(this.state);
    }

    UNSAFE_componentWillMount(){
        this.generateAnswers();
        this.generateQuestion();
    }

    generateAnswers(insertIndex){
        console.log(this.state.currentAnswers.length);
        while(this.state.currentAnswers.length<5 && this.state.answersStack.length>0){
            let index = Math.floor(Math.random() * this.state.answersStack.length);
            if(insertIndex!==null){
                this.state.currentAnswers.splice(insertIndex, 0, this.state.answersStack[index]);
            } else {
                this.state.currentAnswers.push(this.state.answersStack[index]);
            }
            this.state.answersStack.splice(index,1);
        }
        console.log(this.state.currentAnswers.length);
    }

    generateQuestion(){
        let newIndex = Math.floor(Math.random() * this.state.questionsStack.length);
        let newQuestion = JSON.parse(JSON.stringify(this.state.questionsStack[newIndex]));
        this.state.questionsStack.splice(newIndex,1);
        this.setState({currentQuestion:newQuestion});
    }

    solve(answer){
        let indexAnswer = this.state.currentAnswers.indexOf(answer);
        
        if(answer.style === this.state.currentQuestion.style){
            this.setState({currentRound:this.state.currentRound+1});
            this.generateQuestion();
        }
        console.log(indexAnswer);

        if(indexAnswer!==-1){
            this.state.currentAnswers.splice(indexAnswer,1);
        }
        this.generateAnswers(indexAnswer);
        this.setState({maxRounds:this.state.maxRounds});
    }

    render() {
        let nextRound = this.state.currentRound<this.state.maxRounds;
        let currentAnswers;
        if(nextRound && this.state.currentAnswers.length>0){
            currentAnswers = this.state.currentAnswers.map((answer, i) => {
                return (
                  <button onClick={()=>this.solve(answer)} key={i}>
                    {answer.answer}
                  </button>
                );
              });
        } else {
            currentAnswers = "No Cards Left";
        }
        
        return(
            <div>
                {nextRound?
                <div>
                    <h2>Round {this.state.currentRound+1}</h2>
                    <h3>{this.state.currentQuestion? this.state.currentQuestion.sentence : "No Question"}</h3>
                    <p>{currentAnswers}</p>
                </div>
                :"No Rounds Left"
                }
                <br/>
                <br/>
                <button onClick={() => this.checkState()}>Check State Object</button>
            </div>
        )
    }
}
