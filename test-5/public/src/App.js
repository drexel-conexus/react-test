import './App.css';
import React, { useState, useEffect } from 'react';
import Sidebar from "react-sidebar";

function App() {
  const [products, setProducts] = useState([])
  const [listOfCategory, setListOfCategory] = useState([])
  const [listOfManufacturers, setListOfManufacturers] = useState([])
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [openSideBar, setOpenSideBar] = useState(false)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState([])
  const [activeManufacturersFilter, setActiveManufacturersFilter] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalCost, settotalCost] = useState(0)


  useEffect(()=>{
    getData()
  },[])


  const getData=()=>{
    fetch('./products.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setListOfCategory([...new Set(myJson.map(data=> data.category))])
        setListOfManufacturers([...new Set(myJson.map(data=> data.manufacturer))])
        setProducts(myJson)
        setTotalQuantity(myJson.length)
        settotalCost(myJson.reduce((acc, data) => data.price + acc, 0))
      });
  }

  const applyFilter = ()=> {
    const prod =  products.filter(data=> {
      if (activeCategoryFilter.length > 0 && !activeCategoryFilter.includes(data)) {
        return false;
      }
      if (activeManufacturersFilter.length > 0 && !activeManufacturersFilter.includes(data)) {
        return false;
      } 
      return data;   
    })
    setOpenSideBar(false);
    return prod;
  }

  const reset = ()=> {
    getData()
    setOpenSideBar(false);
  }


  return (
    <div className="App">
          <Sidebar
    sidebar={
      <div>
        <h1>Filters</h1>
        <div styles={{display: 'flex', flexDirection: 'column'}}>
          <h3>Category</h3>

          {listOfCategory.map(data => (
              <input type="radio" value={data} />
          ))}
        </div>
        <div styles={{display: 'flex', flexDirection: 'column'}}>
          <h3>Manufacturer</h3>

          {listOfManufacturers.map(data => (
              <input type="radio" value={data} />
          ))}
        </div>
        <div>
        <button type="button" onClick={reset} >apply</button>
        <button type="button" onClick={applyFilter} >reset</button>
        </div>
      </div>
    }
    open={openSideBar}
    onSetOpen={setOpenSideBar}
    styles={{ sidebar: { background: "white", width: '25%' } }}
  >
      <div className="main">
      <button type="button" onClick={()=> setOpenSideBar(true)} >Option</button>
      <h4>total quantity: {totalQuantity}</h4>
      <h4>total cost: {totalCost}</h4>
      <h4>total quantity: {totalQuantity}</h4>

      </div>
      <table>
        <tr>
        <th>Name</th>
        <th>Category</th>
        <th>manufacturer</th>
        <th>Price</th>
        </tr>
      {products.map((el, indx) => (
        <tr key={indx.toString()}>
          <td>{el.name}</td>
          <td>{el.category}</td>
          <td>{el.manufacturer}</td>
          <td>{el.price}</td>
        </tr>
      ))}
    </table>
    </Sidebar>

    </div>
  );
}

export default App;
