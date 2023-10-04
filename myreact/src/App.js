import "./App.css";
import Transaction from "./components/Transaction";
import Form from "./components/Form";
import { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

// function App() = parent component
// within App = child component
function App() {
  // สร้าง component
  const Title = () => (
    <h1 style={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}>
      PayMent Finace
    </h1>
  );
  const Description = () => <p>บันทึกข้อมูลในแต่ละวัน</p>;

  const design = { color: "red", textAlign: "center", fontSize: "1.5rem" };

  const [items, setItems] = useState([]);
  // เอาข้อมูลใน items state มาคำนวณโดยทำการ map แต่ขั้นตอนแรกต้องสร้าง state มารับ
  const [reportRevenue, setReportRevenue] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onaddNewItem = (newItem) => {
    // console.log("ข้อมูลที่ส่งมาจาก form = ", newItem);
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };
  // ในเรื่องของการคำนวณเราจะใช้ useEffect ฟังชั่นนี้เราจะทำการแยกและเอามารวมกันก่อน
  useEffect(() => {
    // ดึงเอาตัวเลขที่อยู่ใน items
    const itemAmount = items.map((items) => items.amount);
    // console.log(itemAmount)
    // กรองข้อมูลจาก Array itemAmount
    const revenue = itemAmount
      .filter((item) => item > 0)
      .reduce((total, item) => (total += item), 0);
    // เราไม่ได้อยากได้ค่าติดลบให้เอาไป * -1 ตามคณิตศาสตร์
    const expense =
      itemAmount
        .filter((item) => item < 0)
        .reduce((total, item) => (total += item), 0) * -1;
    // ทำการกำหนดค่า
    setReportRevenue(revenue);
    setReportExpense(expense);
    // ตอนนี้เราจะได้ข้อมูลที่เก็บลงไปใน state reportExpense reportRevenue
  }, [items, reportExpense, reportRevenue]); // [ใส่ state ทุกตัวที่อยากจะดัก]

  return (
    <DataContext.Provider
      value={
        // นำค่าที่เราได้จาก function มากำหนด
        {
          revenue: reportRevenue,
          expense: reportExpense,
        }
      }
    >
      <div className="container">
        <Title />
        <h1 style={design}>test color</h1>
        {/* 2.ถ้าจะทำให้ Link ใช้ได้จำเป็นต้องนำ Router มาครอบ */}
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">Account Data</Link>
              </li>
              <li>
                <Link to="/insert">Insert Data</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <>
                    <Form onAddItem={onaddNewItem} />{" "}
                    <Transaction items={items} />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>

        {/* <Form onAddItem={onaddNewItem} />
        <Description />
        <Transaction items={items} /> */}
        {/* ทำการลบ dispatch */}
      </div>
    </DataContext.Provider>
  );
}

export default App;
