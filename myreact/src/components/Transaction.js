import React from "react";
import Item from "./Item";
import "./Transaction.css";

const Transaction = (props) => {
  // นำ props ที่โยนมาจาก App ที่มีชื่อว่า items มาทำงาน
  const { items } = props;
  // ย้ายข้อมูล data ไปทำงานส่วนของ App เพราะเราจะให้ App เป็นตัวกระจายข้อมูล
  return (
    <div>
      <ul className="item-list">
      {items.map(element => {
        return <Item {...element} key={element.id}/>
      })}
    </ul>
    </div>
  );
};

export default Transaction;
