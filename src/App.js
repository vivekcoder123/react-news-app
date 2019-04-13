import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state={
      Title: '𝕷𝖊𝖆𝖗𝖓𝕮𝖔𝖔𝖑 𝕹𝖊𝖜𝖘',
      act: 0,
      index: '',
      datas: [],
      date:date,
      
      
    }
  } 

  componentDidMount(){
    this.refs.title.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();

    let datas = this.state.datas;
    let title = this.refs.title.value;
    let url = this.refs.url.value;
    let description=this.refs.description.value;

    if(title===null || title===""){
        document.querySelector("#title").style.display="block";

        if(url===null || url===""){
          document.querySelector("#url").style.display="block";
        }else{
          document.querySelector("#url").style.display="none";
        }

        if(description===null || description===""){
        document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }

        return;

      }else{
        document.querySelector("#title").style.display="none";
      }
   
    if(url===null || url===""){

      document.querySelector("#url").style.display="block";

      if(description===null || description===""){
        document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }

      return;
    }else{
      document.querySelector("#url").style.display="none";
      var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    
      if(res == null){
        document.querySelector("#ivurl").style.display="block";
        if(description===null || description===""){
          document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }
        return;
      }else{
        document.querySelector("#ivurl").style.display="none";
      }
    
    }
    
    if(description===null || description===""){
      document.querySelector("#description").style.display="block";
      return;
    }else{
      document.querySelector("#description").style.display="none";
    }

    let likes=0;
    if(this.state.act === 0){   //new
      let data = {
        title, 
        url,
        description,
        likes
        
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].title = title;
      datas[index].url = url;
      datas[index].description = description;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.title.focus();
  }
  upvote=(i)=>{
    let data = this.state.datas[i];
    data.likes=data.likes+1;
    var like="#likes"+i;
    document.querySelector(like).innerHTML=data.likes; 
    this.setState({
      act: 1,
      index: i
    });
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
    document.querySelector("#title").style.display="none";
    document.querySelector("#url").style.display="none";
    document.querySelector("#description").style.display="none";
    document.querySelector("#ivurl").style.display="none";
    let data = this.state.datas[i];
    if(data.title===null || data.title===""){
        document.querySelector("#title").style.display="block";

        if(data.url===null || data.url===""){
          document.querySelector("#url").style.display="block";
        }else{
          document.querySelector("#url").style.display="none";
        }

        if(data.description===null || data.description===""){
        document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }

        return;

      }else{
        document.querySelector("#title").style.display="none";
      }
   
    if(data.url===null || data.url===""){

      document.querySelector("#url").style.display="block";

      if(data.description===null || data.description===""){
        document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }

      return;
    }else{
      document.querySelector("#url").style.display="none";
      var res = data.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    
      if(res == null){
        document.querySelector("#ivurl").style.display="block";
        if(data.description===null || data.description===""){
          document.querySelector("#description").style.display="block";
        }else{
          document.querySelector("#description").style.display="none";
        }
        return;
      }else{
        document.querySelector("#ivurl").style.display="none";
      }
    
    }
    
    if(data.description===null || data.description===""){
      document.querySelector("#description").style.display="block";
      return;
    }else{
      document.querySelector("#description").style.display="none";
    }

    this.refs.title.value = data.title;
    this.refs.url.value = data.url;
    this.refs.description.value = data.description;

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
        <h2 style={{textAlign:"center",fontSize:"100px"}}>{this.state.Title}</h2>
        <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">LearnCool News</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Blog</a>
                </li>
              </ul>
              <span class="navbar-text">
                Login/Signup
              </span>
            </div>
          </nav>
        </header>
        
        <div className="row" style={{marginTop:"50px"}}>
        
        <div className="col-md-6">
        <h2>ℙ𝕠𝕤𝕥 𝕐𝕠𝕦𝕣 ℕ𝕖𝕨𝕤 ℍ𝕖𝕣𝕖...</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="title" placeholder="Enter Title" className="formField" />
          <p className="alert alert-danger" id="title" style={{display:"none"}}>* Please Enter The Title</p>
          <input type="text" ref="url" placeholder="Enter Url" className="formField" />
          <p className="alert alert-danger" id="url" style={{display:"none"}}>* Please Enter The Url</p>
          <p className="alert alert-danger" id="ivurl" style={{display:"none"}}>* Provided Url Is Invalid</p>
          <input type="text" ref="description" placeholder="Enter Description" className="formField" />
          <p className="alert alert-danger" id="description" style={{display:"none"}}>* Please Enter The Description</p>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
        </form>
        </div>
        
        
        <div className="col-md-6">
        <pre>
          
          <h2>🅝🅔🅦🅢 🅕🅔🅔🅓</h2>
          {datas.map((data, i) =>
            <li key={i} style={{marginBottom:"50px" }}className="myList">
              <div className="ui card" style={{width:'100%'}}>
              
              <div className="content">
                <div className="right floated meta">{this.state.date}</div>
                <img className="ui avatar image" src="https://pbs.twimg.com/profile_images/906789498192670720/baYXi9SA_400x400.jpg" alt="" /> 
                <div className="header"><h2>{data.title}</h2></div>
                  <div className="description">
                    <p style={{whiteSpace:'normal'}}>{data.description}<br />Check out the site : <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a></p>
                  </div>
              </div>
            <div className="content">
                          <div className="ui left labeled button">
                <button id={"likes"+i} className="ui basic right pointing label">
                  {data.likes}
                </button>
                <div className="ui button" onClick={()=>this.upvote(i)}><i className="heart icon" ></i> Upvote
                  
                </div>
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