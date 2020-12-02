import * as React from "react";
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import {PrimaryButton, IButtonStyles} from 'office-ui-fabric-react';
// import { ITextStyles } from "office-ui-fabric-react";

import $reportAPI from '../../api/report/index';
// import $swAPI from '../../api/sw/index';

export interface IRequestListItem {
  id: number;
  icon: string;
  primaryText: string;
}

export interface RequesyBoxProps {
  title: string;
  logo: string;
  message: string;
  items: IRequestListItem[];
}

const labelStyle: Partial<ILabelStyles> = {root: {flex:1}};
const textStyle: Partial<ITextFieldStyles> = {root: {width: "100%", margin: "0 0 5px 0"}};
const buttonStyle: Partial<IButtonStyles> = {root: {width: "100%"}};
const columnTags = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


const randomString = (e:number) => {
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  _string = "";
  for (let i = 0; i < e; i++) _string += t.charAt(Math.floor(Math.random() * a));
  return _string
}


export default class RequesyBox extends React.Component<RequesyBoxProps> {

  render() {
    const { title, logo, message, items } = this.props;
    const onSearch = () => {
      $reportAPI.test({}, async (res: any)=>{
        await Excel.run(async context => {
          let headerRow = Object.keys(res.data[0]);
          let columnTagsRange = columnTags[1] + '1' + ":" + columnTags[headerRow.length] + "1";
          console.log(context.workbook.worksheets);
          try {
            context.workbook.worksheets.getItem("Sample").delete();
          } catch (error) {
            
          }
          let sheet1 = context.workbook.worksheets.add("Sample");
          let reportTable = sheet1.tables.add(columnTagsRange, true);
          let _tableNmame = randomString(16);
          console.log(_tableNmame);
          reportTable.name = _tableNmame;
          reportTable.getHeaderRowRange().values = [headerRow];
          let dataBody = [];
          res.data.forEach(row => {
            dataBody.push(Object.values(row));
          });
          reportTable.rows.add(null, dataBody);
          reportTable.getRange().format.autofitColumns();
          reportTable.getRange().format.autofitRows();
          context.workbook.worksheets.getItem("Sample").activate();
        })
        
      }, (err:any)=>{
        console.log(err);
      });
    }

    const listItems = items.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <i className={`ms-Icon ms-Icon--${item.icon}`}></i>
        <span className="ms-font-m ms-fontColor-neutralPrimary">{item.primaryText}</span>
      </li>
    ));

    return (
      <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
        <div className="ms-welcome__logo">
          <img style={{margin: "0 10px 0 0"}} width="16" height="16" src={logo} alt={title} title={title} />
          <Label styles={labelStyle} required>{message}</Label>
        </div>
        <div className="ms-welcome__action">
          <TextField styles={textStyle} placeholder="需求号/联系单号" />
          <PrimaryButton onClick={onSearch} styles={buttonStyle}>查询</PrimaryButton>
        </div>
        <div className="ms-welcom__list">
          <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{listItems}</ul>
        </div>
      </section>
    );
  }
}
