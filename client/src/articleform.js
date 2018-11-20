// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import {Article} from './datastructures';

type Props = {
  description?: string,
  type?: string,
  type?: string,
  value?: string,
  onChange?: mixed,
  onClick?: mixed,
  children?: React.Node,
  article?: Article
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
export class CheckedCheckBox extends Component<Props>{
  render(){
    return(
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" value={this.props.value} checked onChange={this.props.onChange} />
        <label className="form-check-label"> {this.props.description}</label>
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

export class ArticleForm extends Component<Props> {

  //skal få hele denne greia tilsendt:
  // $FlowFixMe
  article : Article = {
    id: -1, //id er minus -1 som placeholder. blir satt til id'en til artikkelen som skal redigeres, eller fjernet hvis det er en artikkel vi skal opprettes
    tittel: '',
    innhold: '',
    kategori: 'matlaging', //setter verdi til matlagin initielt som er det øverste som kommer opp på options
    bildeLink: '',
    isViktig: 0,
    bildeTekst: ''
  };

  render() {
    return (

      <form onSubmit={()=>{
        // $FlowFixMe
        this.props.save(this.article)}}>
        <FormGroupTextRequired
          type="text"
          description="Tittel"
          required
          value = {
            // $FlowFixMe
            this.article.tittel}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.tittel = event.target.value;
          }}
        />
        <FormGroupTextArea
          description="Innhold"
          value = {
            // $FlowFixMe
            this.article.innhold}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.innhold = event.target.value;
          }}
        />
        <DefaultSelect
          description="kategori"
          value = {
            // $FlowFixMe
            this.article.kategori}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.kategori = event.target.value;
          }}
        >
          <option value="matlaging"> matlaging </option>
          <option value="internet-of-shit"> internet of shit </option>
          <option value="agurknytt"> agurknytt </option>
        </DefaultSelect>
        <FormGroupText
          type="url"
          description="bildelenke"
          value = {
            // $FlowFixMe
            this.article.bildeLink}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.bildeLink = event.target.value;
          }}
        />

        <FormGroupText
          type="text"
          description="bildetekst"
          value={
            // $FlowFixMe
            this.article.bildeTekst}
          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            // $FlowFixMe
            this.article.bildeTekst = event.target.value;
          }}
        />
        {
          // $FlowFixMe
          this.article.isViktig ===1 ? (<CheckedCheckBox
            description="publiser på hovedsiden"
            value="1"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              console.log(event.target.value);
              // this.article.isViktig = event.target.value;
              // $FlowFixMe
              this.article.isViktig === 0 ? (this.article.isViktig = 1) : (this.article.isViktig = 0);
              console.log(this.article.isViktig, 'skriver ut verdi av this.article.isViktig');
            }}
          />) :(        <CheckBox
                    description="publiser på hovedsiden"
                    value="1"
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                      console.log(event.target.value);
                      // this.article.isViktig = event.target.value;
                      this.article.isViktig === 0 ? (this.article.isViktig = 1) : (this.article.isViktig = 0);
                      console.log(this.article.isViktig, 'skriver ut verdi av this.article.isViktig');
                    }}
                  />)}
        <SaveButton />
        {this.props.children}
      </form>
    );
  }
  componentDidMount(){
    // $FlowFixMe
    this.article =this.props.article
  }
}
