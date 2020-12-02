import * as React from "react";
import { Label, ILabelStyles } from "office-ui-fabric-react/lib/Label";

// interface IReport {
//   id: number;
//   name: string;
//   create_date: string;
//   request_id: number;
// }

export interface IReportBoxProps {
  title: string;
  logo: string;
  message: string;
}

const labelStyle: Partial<ILabelStyles> = { root: { flex: 1 } };

const report = [
  { id: 1, name: "报表1", create_date: "2020-11-17", request_id: 1 },
  { id: 2, name: "报表2", create_date: "2020-11-17", request_id: 1 },
  { id: 3, name: "报表3", create_date: "2020-11-17", request_id: 1 },
  { id: 4, name: "报表4", create_date: "2020-11-17", request_id: 1 },
  { id: 5, name: "报表5", create_date: "2020-11-17", request_id: 1 },
  { id: 6, name: "报表6", create_date: "2020-11-17", request_id: 1 },
  { id: 7, name: "报表7", create_date: "2020-11-17", request_id: 1 },
  { id: 8, name: "报表8", create_date: "2020-11-17", request_id: 1 },
  { id: 9, name: "报表9", create_date: "2020-11-17", request_id: 1 },
  { id: 10, name: "报表10", create_date: "2020-11-17", request_id: 1 },
  // { id: 1, name: "报表1", create_date: "2020-11-17", request_id: 1 },
  // { id: 2, name: "报表2", create_date: "2020-11-17", request_id: 1 },
  // { id: 3, name: "报表3", create_date: "2020-11-17", request_id: 1 },
  // { id: 4, name: "报表4", create_date: "2020-11-17", request_id: 1 },
  // { id: 5, name: "报表5", create_date: "2020-11-17", request_id: 1 },
  // { id: 6, name: "报表6", create_date: "2020-11-17", request_id: 1 },
  // { id: 7, name: "报表7", create_date: "2020-11-17", request_id: 1 },
  // { id: 8, name: "报表8", create_date: "2020-11-17", request_id: 1 },
  // { id: 9, name: "报表9", create_date: "2020-11-17", request_id: 1 },
  // { id: 10, name: "报表10", create_date: "2020-11-17", request_id: 1 },
]

export default class ReportBox extends React.Component<IReportBoxProps> {
  state = {

  };

  render() {
    const { title, logo, message } = this.props;

    return (
      <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
        <div className="ms-welcome__logo">
          <img style={{ margin: "0 10px 0 0" }} width="16" height="16" src={logo} alt={title} title={title} />
          <Label styles={labelStyle} required>
            {message}
          </Label>
        </div>
        <div style={{ width: "100%" }} className="ms-welcome__list">
          {report.map((item, index) => {
            return(<div key={index} className="ms-welcom__listitem">
              {item.name}
            </div>);
          })}
        </div>
      </section>
    );
  }
}
