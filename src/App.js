import logo from './logo.svg';
import './App.css';
import React, {Component } from 'react'
import NavBar from './components/NavBar/NavBar'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'
import TodoForm from './components/TodoForm/TodoForm'
import Spinner from './components/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actions from './store/action/todo'
import * as bucketActions from './store/action/buckets'
import Backdrop from './components/Backdrop/Backdrop'
import EditForm from './components/EditForm/EditForm'
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Logout from './components/Logout/Logout'
class App extends Component {
  state = {
    editing : this.props.editing
  }
  
  render(){
    // console.log("EDITING VALUEEEEEE-----",this.props.editing)
    let editForm = null
    if(this.props.editing){
      editForm = (
        <div className='BackdropEditForm'>
          <Route path='/' exact component={Backdrop}/>  
          <Route path='/' exact component={EditForm}/>      
        </div>
      )
    }
    return (
      <div>
        <NavBar/>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignupForm}/>
        <Route path='/logout' component={Logout}/>
        {editForm}
        {this.props.isAuthenticated ?
        <div className="App">
        
        <Route path='/' exact component={Header}/>
        {!this.props.loading ?
        <Route path='/' exact component={TodoList}/>
        :
        <Route path='/' exact component={Spinner}/>
        }
        <Route path='/' exact component={TodoForm}/>
        </div>
        :
        <Redirect to='/signup' />
        } 
      </div>
    );
  }
  
}
const mapStateToProps = state =>{
  return {
    todoItems : state.tasks,
    loading : state.loading,
    status_changed : state.status_changed,
    editing : state.editing,
    isAuthenticated : state.auth.tokenId !== null,
    username : state.auth.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodoItems : (username) => dispatch(actions.fetchTodoItems(username)),
    onFetchingBuckets : (username) => dispatch(bucketActions.fetchBuckets(username))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
