// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return this.alerts.map((alert, i) => (
      <div key={i} className={'alert alert-' + alert.type} role="alert">
        {alert.text}
        <button
          className="close"
          onClick={() => {
            this.alerts.splice(i, 1);
          }}
        >
          &times;
        </button>
      </div>
    ));
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance: Alert of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance: Alert of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance: Alert of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance: Alert of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}

export class Card extends Component {
  render() {
    return (
      <div className="card">
          {this.props.children}
      </div>
    );
  }
}
export class CardBody extends Component {
  render() {
    return (
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          {this.props.children}
        </div>
    );
  }
}
export class CardFooter extends Component{
  render() {
    return (
      <div className="card-footer text-muted">
        {this.props.children}
      </div>
    );
  }
}
export class ListGroup extends Component{
  render(){
    return(
      <ul className='list-group'>
      {this.props.children}
      </ul>
    );
  }
}

export class ListItem extends Component {
  render(){
    return(
      <li className='list-group-item' key={this.props.key}>
      {this.props.children}</li>
    );
  }
}


export class DeleteButton extends Component{
  render(){
    return(
      <button type='button' className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
        </button>
    );
  }
}

export class EditButton extends Component{
  render(){
    return(
      <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
      {this.props.children}
      </button>
    );
  }
}

export class NavBar extends Component{
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href={this.props.home}>{this.props.title}</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      {this.props.children}
    </div>
  </div>
</nav>
      );
  }
}

export class NavBarA extends Component{
  render(){
    return(
      <a className="nav-item nav-link" href={this.props.href}>{this.props.children}</a>
      );
  }
}
export class FormGroupText extends Component{

  render(){
    return (
      <div className='form-group'>
          <label> {this.props.description}
            </label>
            <input className='form-control'
                type={this.props.type} onChange={this.props.onChange}/>
        </div>
    );
  }
}

export class CheckBox extends Component{

  render(){
    return (
      <div className='form-group form-check'>
        <input type="checkbox" className='form-check-input' value='1' onChange={this.props.onChange} />
        <label className='form-check-label'> {this.props.description}
        </label>
      </div>
    );
  }
}

export class FormGroupTextArea extends Component{
  render(){
    return (
      <div className='form-group'>
          <label> {this.props.description}
            </label>
            <textarea className='form-control'
                onChange={this.props.onChange}
                rows='15'/>
        </div>
    );
  }
}
export class DefaultSelect extends Component{
  render(){
    return (
      <div className='formgroup' onChange={this.props.onChange}>
      <label> {this.props.description} </label>
        <select className="form-control form-control-lg">
        {this.props.children}
        </select>
      </div>
    );
  }
}
export class SaveButton extends Component{
  render(){
    return (
        <button type="submit" className="btn btn-primary" onClick={this.props.onClick}>Submit</button>
    );
  }
}

export class CardImg extends Component{
  render(){
    return (
      <figure className='figure'>
      <img className='class="card-img-top img-fluid' src={this.props.src} alt={this.props.alt} />
      <figcaption className='figure-caption'>{this.props.alt}</figcaption>
      </figure>
      );
  }
}
