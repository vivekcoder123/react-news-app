import React, { Component } from 'react';
import './App.css';
import TimeAgo from 'timeago-react';

class App extends Component {

  constructor(props){
    super(props);
    var date = new Date();
    this.state={
      Title: 'LearnCool News',
      act: 0,
      index: '',
      datas: [{title:'News App',url:'https://newsapp.com',description:'this is my first news app in react js',likes:0,color:'white'}],
      date
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
      var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/g);
    
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
    let color='white';
    if(this.state.act === 0){
      let data = {
        title, 
        url,
        description,
        likes,
        color   
      }
      datas.push(data);
    }else{
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
    var color="#colors"+i;
    if(data.likes>0){
      data.likes=data.likes-1;
      document.querySelector(color).style.color="white";
    }else{
      data.likes=data.likes+1;
      document.querySelector(color).style.color="red";
    }

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
      var res = data.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/g);
    
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
      <div id="particles-js">
        
      <div className="App">
     
        <h2 style={{textAlign:"center",fontFamily:"Devonshire",fontSize:"70px"}}>{this.state.Title}</h2>
        <div className="row" style={{marginTop:"50px"}}>
        
        <div className="col-md-6">
        <h2 className="text-center" style={{fontFamily:"Cabin Sketch"}}>Post Your News Here...</h2>
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
          
          <h2 style={{fontFamily:"Damion"}}>News Feed</h2>
          {datas.map((data, i) =>
            <li key={i} style={{marginBottom:"50px" }}className="myList">
              <div className="ui card" style={{width:'100%'}}>
              
              <div className="content">
                <div className="right floated meta">
                <TimeAgo datetime={this.state.date} />
                </div>
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
                <div className="ui button" onClick={()=>this.upvote(i)}><i className="heart icon" id={"colors"+i}></i> Upvote
                  
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
        
        
      </div>
    );
  }
}

export default App;