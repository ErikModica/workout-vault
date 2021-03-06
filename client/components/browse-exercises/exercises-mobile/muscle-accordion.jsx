import React from 'react';
import ExerciseAccordion from './exercise-accordion';

export default class MuscleAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { muscles: [], currentMuscleID: null };
    this.decipherMuscleID = this.decipherMuscleID.bind(this);
  }

  componentDidMount() {
    fetch('/api/muscles')
      .then(result => result.json())
      .then(muscles => {
        this.setState({ muscles });
      });
  }

  decipherMuscleID(event) {
    const muscleID = parseInt(event.target.getAttribute('muscleid'));
    if (muscleID === this.state.currentMuscleID) {
      this.setState({ currentMuscleID: null });
    } else {
      this.setState({ currentMuscleID: muscleID });
    }
  }

  render() {
    return (
      <div className="exercise-accordion-mobile">
        {this.state.muscles.map(muscle => (
          <div key={muscle.id} className="muscle-group">
            <a onClick={this.decipherMuscleID} muscleid={muscle.id}>{muscle.name}</a>
            {this.state.currentMuscleID === muscle.id ? <ExerciseAccordion muscleName={muscle.name} muscleID={this.state.currentMuscleID}/> : ''}
          </div>
        ))
        }
      </div>
    );
  }

}
