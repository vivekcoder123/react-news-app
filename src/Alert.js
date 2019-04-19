import React from 'react';

const alert = (props) => {
  const { type, message } = props.alert;
  return (
    <div style={{textAlign:"center",paddingLeft:"10%",paddingRight:"10%"}}>
    
      <div className={`alert alert-${type} `} >{message}</div>
    </div>
  );
}

export default alert
