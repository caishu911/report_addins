import * as React from "react";
import RequesyQuery, {IRequestListItem} from "./RequestBox";
import VerifyCode from './CodeBox';
import ReportBox from "./ReportBox";
import Progress from "./Progress";
import "../../../assets/report-icon-16.png";
import "../../../assets/report-icon-32.png";
import "../../../assets/report-icon-80.png";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: IRequestListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          id: 1,
          icon: "Ribbon",
          primaryText: "通过验证码查询"
        },
        {
          id: 2,
          icon: "Unlock",
          primaryText: "联机校验"
        },
        {
          id: 3,
          icon: "Design",
          primaryText: "有效期 2020-11-17 至 2020-11-24"
        }
      ],
    });
  }

  click = async () => {
    try {
      await Excel.run(async context => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load("address");

        // Update the fill color
        range.format.fill.color = "yellow";

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  };


  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/report-icon-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <RequesyQuery items={this.state.listItems} logo="assets/report-icon-16.png" title={this.props.title} message="输入需求/联系单号" />
        <VerifyCode logo="assets/report-icon-16.png" title={this.props.title} message="输入查询码" />
        <ReportBox logo="assets/report-icon-16.png" title={this.props.title} message="报表清单" />
      </div>
    );
  }
}
