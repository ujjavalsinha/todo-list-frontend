import React,{Component} from 'react'
import styles from './LoginForm.module.css'
import * as actions from '../../store/action/auth'
import { connect } from 'react-redux'
import { statusChanged } from '../../store/action/todo'

class LoginForm extends Component {
    state = {
        username : '',
        password : ''
    }
    componentDidMount() {
        this.props.onAuthReset()
    }
    onLogin = (e) => {
        e.preventDefault()
        const userData = {'username' : this.state.username, 'password' : this.state.password}
        this.props.onAuthLogin(userData,this.props.history)
    }
    render(){
    return (
        <div className={styles.Login}>
            <form>
                <h1>LOGIN FORM</h1>
                {this.props.error ? <p className={styles.Error}>{this.props.error}</p> : null}
                <input type='username' placeholder='USERNAME' value={this.state.username} onChange={(e)=>this.setState({username : e.target.value})}></input>
                <input type='password' placeholder='PASSWORD' value={this.state.password} onChange={(e)=>this.setState({password : e.target.value})}></input>
                <button onClick={(e)=>{this.onLogin(e)}}>LogIn</button>
            </form>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error : state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin : (userdata,history) => dispatch(actions.authSignIn(userdata,history)),
        onAuthReset : () => dispatch(actions.authReset())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)