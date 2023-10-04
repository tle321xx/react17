import React from 'react'
import { useState,useEffect } from 'react' //1. เพิ่ม useEffect
import './Form.css'
import { v4 as uuidv4 } from 'uuid'; 

const Form = (props) => {
    // const [ชื่อstate, function ที่ใช้เปลี่ยนแปลงข้อมูล] = useState('ค่าเริ่มต้น')
    // state พวกนี้เมื่อมีการเปลี่ยนแปลงค่ามันจะทำการ render ใหม่ทันที
    // เช็คได้จาก console
    // console.log("if has changed Render Form Component")
    const [title,setTitle] = useState('')
    const [amount,setAmount] = useState('')
    // 3.สร้าง state ที่เอาไว้เก็บสถานะการเพิ่มข้อมูลภายใน Form และเราจะนำ state ตัวนี้ไปทำงานกับปุ่มเพิ่มข้อมูลของเรา
    const [formValid,setFormValid] = useState(false) 

    const inputTitle = (event) => {
        // console.log(event.target.value) จะเห็นได้ว่าข้อมูลที่วิ่งมาจะอยู่ใน event.target.value 
        setTitle(event.target.value)
    }
    const inputAmount = (event) => {
        setAmount(event.target.value)
    }
    const saveItem = (event) => {
        event.preventDefault()
        //  setFormValid(false); ใส่ไปเพราะมันมี error ทำให้ submit ซ้ำๆได้
        setFormValid(false);
        const itemData = {
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        // เอาไว้เช็คว่าที่เราทำมาข้อมูลมันมาไหม
        // console.log(itemData) 
        // สร้าง props.onAddItem(itemData) เพื่อที่จะส่ง itemData ขึ้นไป
        // itemData ก็คือ newItem ที่เป็น parameter
        props.onAddItem(itemData)
        setTitle('')
        setAmount('')
    }
    // 2. สร้าง useEffect function
    // useEffect จะถูกเรียกใช้เมื่อทำการ rerender component
    // ในส่วนของ useEffect สามารถที่จะดักจับในส่วนของ state ได้
    // หมายความว่า useEffect สามารถถูกเรียกใช้โดยอ้างอิงค่าที่เปลี้ยนไปภายใน state ที่เราต้องการได้
    useEffect(() => {
        // 6.เราจะทำการเช็คว่า state title > 0 (ไม่ได้ป้อนค่าว่างเข้ามา)
        // หมายความว่า state title เมื่อทำการลบช่องว่างทั้งด้านซ้ายและขวาเรียบร้อยแล้วมีความยาวมากกว่า 0 และ amount !== 0 หรือไม่
        const checkData = title.trim().length > 0 && title !== "" && amount !== 0 && amount !== ""
        // console.log("call useEffect")
        // 4.เขียนคำสั่งที่เอาไว้เช็คสถานะที่เปลัี่ยนแปลงไปภายใน amount
        if(checkData){
            setFormValid(true);
        }
    },[title,amount]) // ,[] ในส่วนของ array ตัวนี้เอาไว้ระบุ state ที่เราจะทำการดักจับ
                // ,[amount]) เมื่อมีการเปลี่ยนแปลงค่าใน state amount มันจะเรียกใช้ useEffect
    return (
    <div>
        <form onSubmit={saveItem}>
            <div className="form-control">
                <label>item name</label>
                <input type="text" placeholder="define your items" onChange={inputTitle} value={title}/>
            </div>
            <div className="form-control">
                <label>amount</label>
                <input type="number" placeholder="+ revenue, - expenses" onChange={inputAmount} value={amount}/>
            </div>
            <div>
            {/* 5. นำ formValid ไปผูกกับปุ่ม หมายความว่าปุ่มเพิ่มข้อมูลจะกดได้ก็ต่อเมื่อ amount !== 0 */}
                <button type="submit" className="btn" disabled={!formValid}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Form