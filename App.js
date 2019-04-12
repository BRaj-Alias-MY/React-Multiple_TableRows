import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

class App extends React.Component {
  constructor () {
    super ();
    this.nameRef = React.createRef ();
    this.courseRef = React.createRef ();
    this.firstRef = React.createRef ();
    this.classRef = React.createRef ();
    this.state = {
      name: '',
      shareholders: [{name: 'test', class: 'X', course: 'hello'}],
    };
  }

  handleNameChange = evt => {
    this.setState ({name: this.firstRef.current.value});
  };

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map (
      (shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return {
          ...shareholder,
          name: this.nameRef.current.value,
          class: this.classRef.current.value,
          course: this.courseRef.current.value,
        };
      }
    );

    this.setState ({shareholders: newShareholders});
  };

  handleSubmit = evt => {
    evt.preventDefault ();
    const {name, shareholders} = this.state;
    console.log (this.state);
    //  alert (`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState ({
      shareholders: this.state.shareholders.concat ([
        {name: '', class: '', course: ''},
      ]),
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState ({
      shareholders: this.state.shareholders.filter ((s, sidx) => idx !== sidx),
    });
  };

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Company name, e.g. Magic Everywhere LLC"
          value={this.state.name}
          onChange={this.handleNameChange}
          ref={this.firstRef}
        />

        <h4>Shareholders</h4>

        {this.state.shareholders.map ((shareholder, idx) => (
          <div key={idx} className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange (idx)}
              ref={this.nameRef}
            />

            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.class}
              onChange={this.handleShareholderNameChange (idx)}
              ref={this.classRef}
            />

            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.course}
              onChange={this.handleShareholderNameChange (idx)}
              ref={this.courseRef}
            />
            <button
              type="button"
              onClick={this.handleRemoveShareholder (idx)}
              className="small"
            >
              -
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="small"
        >
          Add Shareholder
        </button>
        <button>Incorporate</button>
      </form>
    );
  }
}

export default App;
