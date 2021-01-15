import React from 'react'
import styles from './TodoItem.module.css'
import {connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import check from '../../images/check.png'
import * as actions from '../../store/action/todo'
import trashIcon from '../../images/trash.svg'
import editIcon from '../../images/edit.png'
const TodoItem = (props) => {
    const handleCompleteTask = (item_id) => {
        props.onCompletingTask(item_id,props.username)
    }
    
    let todoItemTag = null
    todoItemTag = props.loading ? 
    <div className= {styles.TodoItem}>
        <Spinner/>
    </div>
    :
    <div className= {styles.TodoItem}>
        <div className={styles.TickDiv}>
        <img className={styles.Tick} src={check} style={{backgroundColor : props.item.status ? '#7FFF00' : '#FFFFFF'}} onClick={()=>handleCompleteTask(props.item.id)} alt='check'/>
        </div>
        
        <p>{props.item.text}</p>
        <div className={styles.Delete}>
            <img className={styles.EditIcon} onClick={()=>props.onEditing(props.item.id,props.username)} src={editIcon} alt="edit"/>
            <img className={styles.DeleteIcon} onClick={()=> props.onRemoveItem(props.item.id,props.username)} src={trashIcon} alt="trash"/>
        </div>
    </div>
    return todoItemTag
}
const mapStateToProps = state => {
    return {
        loading : state.loading,
        username : state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompletingTask : (item_id,username) => dispatch(actions.completeTask(item_id,username)),
        onEditing : (item_id,username) => dispatch(actions.editing(item_id,username)),
        onRemoveItem : (item_id,username) => dispatch(actions.removeItem(item_id,username))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)