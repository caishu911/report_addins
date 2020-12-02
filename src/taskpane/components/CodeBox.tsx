import * as React from "react";
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import {PrimaryButton, IButtonStyles} from 'office-ui-fabric-react';
// import { ITextStyles } from "office-ui-fabric-react";


export interface CodeBoxProps {
  title: string;
  logo: string;
  message: string;
}

const labelStyle: Partial<ILabelStyles> = {root: {flex:1}};
const textStyle: Partial<ITextFieldStyles> = {root: {width: "100%", margin: "0 0 5px 0"}};
const buttonStyle: Partial<IButtonStyles> = {root: {width: "100%"}};


export default class CodeBox extends React.Component<CodeBoxProps> {
  render() {
    const { title, logo, message } = this.props;

    return (
      <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
        <div className="ms-welcome__logo">
          <img style={{margin: "0 10px 0 0"}} width="16" height="16" src={logo} alt={title} title={title} />
          <Label styles={labelStyle} required>{message}</Label>
        </div>
        <div className="ms-welcome__action">
          <TextField styles={textStyle} placeholder="查询码" />
          <PrimaryButton styles={buttonStyle}>查询</PrimaryButton>
        </div>
      </section>
    );
  }
}
