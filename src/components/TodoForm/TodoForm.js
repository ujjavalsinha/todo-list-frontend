import React, {Component} from 'react'
import styles from './TodoForm.module.css'
import {connect} from 'react-redux';
import * as actions from '../../store/action/buckets'
import * as todoActions from '../../store/action/todo'
import axios from 'axios'

class TodoForm extends Component{
    state = {
        text : '',
        bucket : ''
    }
    handleSubmit = (e) => {
        
        e.preventDefault()
        if(!this.state.text || !this.state.bucket){
            return
        }
        if(this.props.editing){
            this.props.onUpdatingItem(this.state,this.props.editing_id,this.props.username)
            this.setState({text : '',bucket : ''})
        }
        else{
            this.props.onAddItem(this.state,this.props.username)
            this.setState({text : '',bucket : ''})
        }
    }
    
    componentDidMount = () => {
        // this.props.onFetchingBuckets()
        if(this.props.editing){
            
            axios.get(`https://todo-list-frontend-one.vercel.app/api/todolist/${this.props.username}/${this.props.editing_id}`)
            .then(response => {
                let fetched_bucket_name; 
                for(let i=0;i<=this.props.buckets.length-1;i++){
                    if(this.props.buckets[i].id === response.data.bucket_id){
                        fetched_bucket_name = this.props.buckets[i].name
                    }
                }
                this.setState({text : response.data.text, bucket : fetched_bucket_name})
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    render(){
        
        let bucket_tags = null
        if(this.props.buckets!==[]){
            bucket_tags = (
                <div className={styles.Dropdown}>
                    <input type="text" value={this.state.bucket} onChange={(e)=>this.setState({bucket : e.target.value})} placeholder="Choose bucket" list="buckets" />
                    <datalist name='buckets' id='buckets' value={this.state.bucket} onChange={(e)=>this.setState({bucket : e.target.value})}>
                        {this.props.buckets.map(bucket => {
                            return <option key={bucket.name+bucket.id} value={bucket['name']}>{bucket['name']}</option>
                        })}
                        
                    </datalist>
                </div>
                    )
        }
        else{
            bucket_tags = (
                <div>
                    <input value={this.state.bucket} onChange={(e)=>this.setState(e.target.value)}></input>
                </div>
            )
        }
        return(
            <div className = {styles.TodoForm}>
                <form>
                    <div className={styles.InputButton}>
                        <input value={this.state.text} placeholder="Add Task" onChange={(e)=>this.setState({text : e.target.value})}></input>
                        <button disabled={this.state.text === ''} onClick={(e)=> this.handleSubmit(e)} className={styles.Submit}>Submit</button>
                    </div>
                    {!this.props.editing ?
                    bucket_tags:
                    null
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        buckets : state.buckets,
        editing : state.editing,
        editing_id : state.editing_id,
        username : state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchingBuckets : (username)=> dispatch(actions.fetchBuckets(username)),
        onAddItem : (item,username) => dispatch(todoActions.addItem(item,username)),
        onAddingBuckets : (bucket_name,username) => dispatch(actions.addBucket()),
        onUpdatingItem : (item, item_id,username) => dispatch(todoActions.updatingItem(item,item_id,username))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoForm);
