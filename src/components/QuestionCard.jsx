import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/QuestionCard.css';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      score: 0,
      qstnLevel: '',
    };
    this.setScore = this.setScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  setScore(difficulty) {
    if (difficulty === 'easy') {
      this.updateState({ qstnLevel: 1 });
    } if (difficulty === 'medium') {
      this.updateState({ qstnLevel: 2 });
    } if (difficulty === 'hard') {
      this.updateState({ qstnLevel: 3 });
    }

    const { score, qstnLevel } = this.state;
    const basePoints = { easy: 1, medium: 2, hard: 3, base: 10 };

    const anwserPoints = basePoints.base + (qstnLevel);
    this.updateState({
      score: score + anwserPoints,
    });
    console.log(anwserPoints);
  }

  updateState(state) {
    this.setState(state);
  }

  handleClick(difficulty) {
    this.setState({ showAnswer: true });
    this.setScore(difficulty);
  }

  render() {
    const { data } = this.props;
    const { showAnswer } = this.state;

    const {
      category,
      correct_answer: correct,
      incorrect_answers: incorrect,
      question,
      difficulty,
    } = data;

    return (
      <div className="question-card">
        <div className="question-container">
          <p className="question-category" data-testid="question-category">
            {category}
          </p>
          <p className="question-text" data-testid="question-text">
            {question}
          </p>
        </div>
        <div className="answers-container">
          <button
            className={ showAnswer ? 'answer correct' : 'answer' }
            data-testid="correct-answer"
            onClick={ () => this.handleClick(difficulty) }
            type="button"
          >
            {correct}
          </button>
          {incorrect.map((answer, index) => (
            <button
              className={ showAnswer ? 'answer wrong' : 'answer' }
              data-testid={ `wrong-answer-${index}` }
              key={ `${answer}-${index}` }
              onClick={ this.handleClick }
              type="button"
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionCard;
