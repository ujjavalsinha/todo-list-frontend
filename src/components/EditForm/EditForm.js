import React, {Component} from 'react'
import styles from './EditForm.module.css'
import TodoForm from '../TodoForm/TodoForm'
import {connect } from 'react-redux'
import * as actions from '../../store/action/todo'
class EditForm extends Component {

    render(){
        return (
            <div className={styles.EditForm}>
                <TodoForm/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        editing : state.editing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditing : () => dispatch(actions.editing()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)