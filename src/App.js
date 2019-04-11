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
        <div className="row">
        <div className="col-md-6">
        <form ref="myForm" className="myForm">
          <input type="text" ref="title" placeholder="Enter title" className="formField" />
          <input type="text" ref="url" placeholder="Enter url" className="formField" />
          <input type="text" ref="text" placeholder="Enter text" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
        </form>
        </div>
        <div className="col-md-6">

        <pre>
          {datas.map((data, i) =>
            <li key={i} style={{marginBottom:"50px" }}className="myList">
              <div className="ui card" style={{width:'100%'}}>
              <div className="content">
                <div className="right floated meta">14h</div>
                <img className="ui avatar image" src="https://pbs.twimg.com/profile_images/906789498192670720/baYXi9SA_400x400.jpg"/> 
                <div className="header"><h2>{data.title}</h2></div>
                  <div className="description">
                    <p style={{whiteSpace:'normal'}}>{data.text}<br />Check out the site : <a href={data.url} target="_blank">{data.url}</a></p>
                  </div>
              </div>
            <div className="image">
              <img/>
            </div>
            <div class="content">
                          <div className="ui left labeled button" tabindex="0">
                <a href="#" className="ui basic right pointing label">
                  2,048
                </a>
                <div className="ui button">
                  <i className="heart icon"></i> Like
                </div>
              </div>
              <i class="comment icon"></i>
              3 comments
            </div>
            <div class="extra content">
              <div className="ui large transparent left icon input">
                <i className="heart outline icon"></i>
                <input type="text" placeholder="Add Comment..."/>
              </div>
            </div>
            <div className="ui inverted segment">
            <button onClick={()=>this.fRemove(i)} className="ui inverted primary basic button" style={{cursor:"pointer"}}>Remove </button>
            <button onClick={()=>this.fEdit(i)} className="ui inverted primary basic button" style={{cursor:"pointer"}}>Edit </button>
            </div>
            </div>

            </li>
          



          )}
        </pre>
        </div>
        
        </div>
        
        
      </div>
    );
  }
}

export default App;