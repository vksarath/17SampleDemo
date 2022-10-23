import React, { Component } from "react";
import { getListData } from "../services/getListData";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  loadData = async() => {
    try {
      const listData = await getListData();
      this.setState({ list: [...listData] });
    } catch (error) {
      console.log(error);
    }
 }

  componentDidMount() {
    this.loadData()
    // To get updated list for each time interval
    setInterval(this.loadData, 2000);
  }

  render() {
    const sortedList = this.state.list.sort((listItem1,listItem2) => listItem2.votes - listItem1.votes);
    return (
      <div className="home-content">
        <table className="table-content" key="list">
          {sortedList.map((listItem, index) => {
            return (
              <tr className="list-row" key={listItem.userID}>
                <td className="left-column" key={index + 1}>{index + 1}</td>
                <td>
                <img
                  key={listItem.picture}
                  className="image-avatar"
                  alt=""
                  width="40px"
                  height="40px"
                  src={listItem.picture}/>
                </td>
                <td className="display-content" key={listItem.displayName}>{listItem.displayName}</td>
                <td key={listItem.score}>{listItem.score}pt</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
