import React,{Component} from 'react'
import styles from './SignupForm.module.css'
import * as actions from '../../store/action/auth'
import { connect } from 'react-redux'
class SignupForm extends Component{
    state = {
        username : '',
        email : '',
        password : '',
    }
    componentDidMount(){
        this.props.onAuthReset()
    }
    onSignUp(e){
        e.preventDefault()
        const signUpData = {...this.state}
        this.props.onAuthSignUp(signUpData,this.props.history)
    }
    render(){
        return (
            <div className={styles.SignUp}>
                
                <form>
                    <h1>SIGNUP FORM</h1>
                    {this.props.error ? <p className={styles.Error}>{this.props.error}</p> : null}
                    <input type='text' value={this.state.name} placeholder='USERNAME' onChange={(e)=>this.setState({username : e.target.value})}></input>
                    <input type='email' value={this.state.email} placeholder='EMAIL ' onChange={(e)=>this.setState({email : e.target.value})}></input>
                    <input type='password' value={this.state.password} placeholder='PASSWORD ' onChange={(e)=>this.setState({password : e.target.value})}></input>
                    <button onClick={(e)=>{this.onSignUp(e)}}>SIGN UP</button>
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
        onAuthSignUp : (signupdata,history) => dispatch(actions.authSignUp(signupdata,history)),
        onAuthReset : () => dispatch(actions.authReset())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignupForm)
