import React, { Component } from 'react';
import classes from './CreatePost.css';
import axios from 'axios';


//import axios from 'axios';

class CreatePost extends Component {

    state ={
        title:'',
        text:'',
        completed:false,
        error:false
    }

    postDataHandler =(event)=>{
        event.preventDefault();
        const data = {
            title: this.state.title,
            text: this.state.text,
            
        };
        axios.post('http://localhost:3001/notes', data)
            .then(response => {
                console.log(response);
                this.setState({completed:true});
                this.setState({title:'' , text:''});
                this.props.history.push('/myposts');
            })
            .catch(e=>{
                this.setState({error:true});
            })

    }

    cancelDataHandler =()=>{
        this.props.history.push('/myposts');
    }
    
   
    render () {
        return (
            <div className={classes.CreatePost}>
                <h4><span class="label label-default">ENTER YOUR NOTE</span></h4><br/>
                <form>
                        <label><b>Enter Title:</b><input type="text" placeholder="Enter your Title..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title} /></label>
                        <br />
                        <label><b>Enter Text:</b> <br/><br/>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" cols="80" type="text" placeholder="Enter your Text..."  
                        onChange={(event)=>this.setState({text: event.target.value})} 
                        value={this.state.text}></textarea>
                        </label>
                        <br />
                        <br />
                        <button type="button" class="btn btn-danger"onClick={this.cancelDataHandler} >CANCEL</button>
                        <button type="button" class="btn btn-success"onClick={(event)=>this.postDataHandler(event)} >SUBMIT NOTE</button>
                        {this.state.completed ? <p style={{color:'green'}}>Note added Successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to add notes</p> : null}
            </form>    
            </div>
        );
    }
}



export default CreatePost;