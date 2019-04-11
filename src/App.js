import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      Title: 'React News Application',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.title.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();

    let datas = this.state.datas;
    let title = this.refs.title.value;
    if(title===null || title===""){
      alert("title required");
      return;
    }
    let url = this.refs.url.value;
    if(url===null || url===""){
      alert("url required");
      return;
    }
    let text=this.refs.text.value;
    if(text===null || text===""){
      alert("text required");
      return;
    }

    if(this.state.act === 0){   //new
      let data = {
        title, 
        url,
        text
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].title = title;
      datas[index].url = url;
      datas[index].text = text;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.title.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.title.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.title.value = data.title;
    this.refs.url.value = data.url;
    this.refs.text.value = data.text;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.title.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.Title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="title" placeholder="Enter title" className="formField" />
          <input type="text" ref="url" placeholder="Enter url" className="formField" />
          <input type="text" ref="text" placeholder="Enter text" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              <div className="ui card" style={{width:'180vh'}}>
                <div className="content">
                  <div className="header">{data.title}</div>
                  <div className="description">
                    <p style={{whiteSpace:'normal'}}>{data.text}<br />Check out the site : <a href={data.url} target="_blank">{data.url}</a></p>
                  </div>
                </div>
                <div className="extra content">
                  <i className="like icon"></i>
                  121 Likes
                </div>
              </div>
              <button onClick={()=>this.fRemove(i)} className="myListButton" style={{cursor:"pointer"}}>Remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton" style={{cursor:"pointer"}}>Edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;