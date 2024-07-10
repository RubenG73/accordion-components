import React, { useState } from "react";
import data from './assets/data'

export default function App(){

  const [selected, setSelected] = useState(null)
  const [enableMultiSelection, setEnableMultiSelection] = useState(false)
  const [multiple, setMultiple] = useState([])

  function handleSingleSelection(id){
    setSelected(id === selected ? null : id)
  }

  function handleMultiSelection(id){
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(id)
    
    if(findIndexOfCurrentId === -1) copyMultiple.push(id)
    else copyMultiple.splice(findIndexOfCurrentId, 1)

    setMultiple(copyMultiple)
  }

  return(
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>{enableMultiSelection ? 'Disable Multi Selection' : 'Enable Multi Selection'}</button>
      <div className="accordion">
       {
        data && data.length > 0 ?
        data.map(dataItem => {
          return(
          <div className="item">
            <div
              className='title' 
              onClick={ enableMultiSelection 
                          ? () => handleMultiSelection(dataItem.id) 
                          : () => handleSingleSelection(dataItem.id)} key={dataItem.id}>
              <h3>{dataItem.question}</h3>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                  <div className="content">{dataItem.answer}</div>
                )
              : selected === dataItem.id && (
                  <div className="content">{dataItem.answer}</div>
              )
              }
            </div>
          </div>
          )
        })
        :
        <div>Data not found!</div>
       }
      </div>
    </div>
  )
}