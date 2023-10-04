import React from "react";
import DataContext from "../data/DataContext";
import { useContext } from "react";
import "./ReportComponent.css";

const ReportComponent = () => {
  const { revenue, expense } = useContext(DataContext);
  //ฟังก์ชั่นแปลงรูปแบบตัวเลข
const formatNumber=(num)=> {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  return (
    <div>
      <h4>Remain (Baht)</h4>
      <h1>{formatNumber(revenue - expense)}</h1>
      <div className="report-container">
        <div>
          <h4>Total Revenue</h4>
          <p className="report income">{formatNumber(revenue)}</p>
        </div>
        <div>
          <h4>Total Expense</h4>
          <p className="report consumption">{formatNumber(expense)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
