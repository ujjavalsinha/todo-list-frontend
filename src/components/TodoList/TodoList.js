import React, {Component} from 'react'
import styles from './TodoList.module.css'
import TodoItem from './../TodoItem/TodoItem'
import {connect } from 'react-redux'
import bucket_icon from '../../images/bucket.png'
import * as actions from '../../store/action/buckets'
import * as todoActions from '../../store/action/todo'
class TodoList extends Component{
    componentDidMount(){
        this.props.onFetchTodoItems(this.props.username)
        this.props.onFetchingBuckets(this.props.username)
        
      }
      
    componentDidUpdate(prevProps){
        
        
        if(this.props.tasks.length === prevProps.tasks.length){
        return 
        }
        else{
        this.props.onFetchTodoItems(this.props.username)
        this.props.onFetchingBuckets(this.props.username)
        
        }
    
      }
    render(){
        
        return (
            <div className={styles.TodoList}>
                {this.props.buckets.map(bucket => {
                    return (<div key={bucket} className={styles.BucketCard}>
                                <div className={styles.BucketAndIcon}>
                                    <img src={bucket_icon} alt='bucket'/>
                                    <p className={styles.BucketName}>{bucket.name}</p>
                                    <div className={styles.DeleteBucket}>
                                        <button className={styles.DeleteBucketButton} onClick={()=>this.props.onDeleteBucket(bucket.id,this.props.username)}>Delete Bucket</button>
                                    </div>
                                </div>
                                <div className={styles.TodoItems}>
                                    {this.props.tasks.map((item,index) => {
                                        
                                        if(item.bucket_id === bucket.id){
                                            return <TodoItem key={item+index} delete={()=>this.props.deleteItem(item.id)} item={item}></TodoItem>
                                        }
                                    })}
                                </div>
                            </div>)
                })}
                
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        buckets : state.buckets,
        tasks : state.tasks,
        username : state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteBucket : (bucket_id,username) => dispatch(actions.deleteBucket(bucket_id,username)),
        onFetchTodoItems : (username) => dispatch(todoActions.fetchTodoItems(username)),
        onFetchingBuckets : (username) => dispatch(actions.fetchBuckets(username))
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)