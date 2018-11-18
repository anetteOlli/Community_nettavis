// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';

type Props = {
  children?: React.Node,
  onClick?: mixed,
  description?: string,
  onChange?: mixed,
  title?: string,
  alt?: string,
  src?: string,
  type?: string,
  href?: string,
  home?: string,
  key?: number,
  page?: number
};

/**
 * Renders alert messages using Bootstrap classes.dfd
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
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
        ))}
      </>
    );
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

export class Card extends Component<Props> {
  render() {
    return <div className="card">{this.props.children}</div>;
  }
}
export class CardBody extends Component<Props> {
  render() {
    return (
      <div className="card-body">
        <h5 className="card-title">{this.props.title}</h5>
        {this.props.children}
      </div>
    );
  }
}
export class CardText extends Component<Props> {
  render() {
    return <p className="card-text">{this.props.children}</p>;
  }
}
export class CardFooter extends Component<Props> {
  render() {
    return <div className="card-footer text-muted">{this.props.children}</div>;
  }
}
export class ListGroup extends Component<Props> {
  render() {
    return <ul className="list-group">{this.props.children}</ul>;
  }
}

export class ListItem extends Component<Props> {
  render() {
    return (
      <li className="list-group-item" key={this.props.key}>
        {this.props.children}
      </li>
    );
  }
}

export class ConfirmButton extends Component<Props> {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export class DeleteButton extends Component<Props> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export class EditButton extends Component<Props> {
  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export class NavBar extends Component<Props> {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href={this.props.home}>
          {this.props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">{this.props.children}</div>
        </div>
      </nav>
    );
  }
}

export class NavBarA extends Component<Props> {
  render() {
    return (
      <a className="nav-item nav-link" href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}
export class FormGroupText extends Component<Props> {
  render() {
    return (
      <div className="form-group">
        <label> {this.props.description}</label>
        <input className="form-control" type={this.props.type} onChange={this.props.onChange} />
      </div>
    );
  }
}

// export class CheckBox extends Component<Props>{
//
//   render(){
//     return (
//       <div className='form-group form-check'>
//         <input type="checkbox" className='form-check-input' value='1' onChange={this.props.onChange} />
//         <label className='form-check-label'> {this.props.description}
//         </label>
//       </div>
//     );
//   }
// }

export class FormGroupTextArea extends Component<Props> {
  render() {
    return (
      <div className="form-group">
        <label> {this.props.description}</label>
        <textarea className="form-control" onChange={this.props.onChange} rows="15" />
      </div>
    );
  }
}
export class DefaultSelect extends Component<Props> {
  render() {
    return (
      <div className="formgroup" onChange={this.props.onChange}>
        <label> {this.props.description} </label>
        <select className="form-control form-control-lg">{this.props.children}</select>
      </div>
    );
  }
}
export class SaveButton extends Component<Props> {
  render() {
    return (
      <button type="submit" className="btn btn-primary" onClick={this.props.onClick}>
        Submit
      </button>
    );
  }
}

export class CardImg extends Component<Props> {
  render() {
    return (
      <figure className="figure">
        <img className='class="card-img-top img-fluid' src={this.props.src} alt={this.props.alt} />
        <figcaption className="figure-caption">{this.props.alt}</figcaption>
      </figure>
    );
  }
}

export class Pagination extends Component<Props>{
  render(){
    return(
    <ul className='pagination'>
    {this.props.children}
    </ul>
    );
  }
}
export class Page extends Component<Props>{
  render(){
    return(
      <li className="page-item"><button className='page-link' onClick={this.props.onClick} value={this.props.value}>{this.props.children}</button></li>
      );
  }
}
