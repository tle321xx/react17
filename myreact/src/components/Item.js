import PropTypes from "prop-types";
import "./Item.css"; //3. สร้างไฟล์ Item.css แล้ว import

const Item = ({ title, amount }) => {
  // ข้อมูลที่เรารับมาก็คือส่วนของตัว props
  // 1. เราก็จะทำการเช็คจำนวนเงินว่าเป็นค่าบวกหรือค่าลบ
  const status = amount < 0 ? "expense" : "revenue";
  // 4.เราอยากได้เครื่องหมาย + ให้แสดงเหมือนเครื่องหมาย -
  const symbol = amount < 0 ? "" : "+";
  return (
    <ul>
      {/* 2. นำ status มาใส่ใน className */}
      <li className={status}>
        {title}
        <span>
          {symbol}
          {amount}
        </span>
      </li>
    </ul>
  );
};

Item.propTypes = {
  //propTypes ตัวนี้เป็นการเข้าไปในส่วน component Item แล้วไปดึงเอา props มา
  // ด้านในเราจะเอา props มาใช้
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Item;
