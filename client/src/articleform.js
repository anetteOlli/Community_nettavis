// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';

type Props = {
  description?: string,
  type?: string,
  type?: string,
  value?: string,
  onChange?: mixed,
  onClick?: mixed,
  children?: React.Node
};
export class FormGroupText extends Component<Props> {
  render() {
    return (
      <div className="form-group">
        <label> {this.props.description}</label>
        <input
          className="form-control"
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
export class FormGroupTextRequired extends Component<Props> {
  render() {
    return (
      <div className="form-group">
        <label> {this.props.description}</label>
        <input
          className="form-control"
          type={this.props.type}
          value={this.props.value}
          required
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export class CheckBox extends Component<Props> {
  render() {
    return (
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" value={this.props.value} onChange={this.props.onChange} />
        <label className="form-check-label"> {this.props.description}</label>
      </div>
    );
  }
}

export class FormGroupTextArea extends Component<Props> {
  render() {
    return (
      <div className="form-group">
        <label> {this.props.description}</label>
        <textarea className="form-control" onChange={this.props.onChange} required value={this.props.value} rows="15" />
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
