import * as React from 'react';
import { Component } from 'react-simplified';


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
