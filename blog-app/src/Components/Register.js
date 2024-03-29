import React from 'react'
import {NavLink} from 'react-router-dom';
import { api } from '../utls/ApiLinks';
import {validations} from '../utls/Validation';


class Register extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {
              username: '',
              password: '',
              email: '',
            },
        }

    }
    handleChange = ({ target }) => {
        let { name, value } = target;
        let errors = this.state.errors;
         validations(errors, name, value);
        this.setState({ [name]: value, errors });
    };

    register = () => {
        fetch(api + `/users/` , {
            method :  'POST',
            mode : 'cors',
            cache : 'no-cache',
            credentials : 'same-origin',
            headers : {
                'Content-Type' : 'application/json'
            },
            redirect : 'follow',
            referrerPolicy : 'no-referrer',
            body : JSON.stringify({
                user  : {
                    username : this.state.username,
                    email : this.state.email,
                    password : this.state.password,
                },
            }),

        }).then((res) => {
            if(!res.ok){
               return res.json().then(({errors}) => {
                    this.setState({errors})
                   return Promise.reject(errors)
                });
                // throw new Error('Fetch is not successful')
            }
            return res.json()
        })
            .then(({user}) => {
            console.log({user})
            this.setState({
                username: '',
                email: '',
                password: '',
            })
            this.props.history.push('/users/login');
            console.log("successfully register")
        }).catch((errors) => this.setState({errors}))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.register()
    };
    
    render(){
        
        let {username , password, email } = this.state.errors;
        return (
            <section className="container ">
                <div className="login flex justify-between items-center my-10 column">
                    <div className="w-6/12 m-auto half">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_q5pk6p1k.json"  background="transparent"  speed="1"  style={{width : "85%",}}  loop  autoplay></lottie-player>
                        {/* <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_mragdxra.json"  background="transparent"  speed="1"  style={{width : "100%",}}  loop  autoplay></lottie-player> */}
                    </div>
                    <div className="w-6/12 m-auto half">
                        <form action="" onSubmit={this.handleSubmit} className="border w-8/12 m-auto shadow-md p-6 py-20 rounded-xl">
                            {/* <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_hdiNFs.json"  background="transparent" style={{width : "60%",margin: "auto"}}  speed="1"  loop  autoplay></lottie-player> */}
                            <img className="w-4/12 h-1/6  m-auto mb-8" src="/images/placeholder.png" alt="" />
                            <h2 className="text-lg font-semibold ">Register With Your Details</h2>
                            <div className="mt-4">
                                <label className="ml-2" htmlFor="">Username <span className="text-sm text-red-500">*</span></label>
                                <input type="text" placeholder="Enter Your username" className="border w-full py-2 px-4 rounded-lg" value={this.state.username} name="username" onChange={(e) => this.handleChange(e)} />
                                <span className="text-red-500 text-sm">{username}</span>
                            </div>
                            <div className="mt-4">
                                <label className="ml-2" htmlFor="">Email <span className="text-sm text-red-500">*</span></label>
                                <input type="email" placeholder="Enter Your email" className="border w-full py-2 px-4 rounded-lg" value={this.state.email}  name="email" onChange={(e) => this.handleChange(e)} />
                                <span className="text-red-500 text-sm">{email}</span>
                            </div>
                            <div className="mt-4">
                                <label className="ml-2" htmlFor="">Password <span className="text-sm text-red-500">*</span></label>
                                <input type="text" placeholder="Enter Your Password" className="border w-full py-2 px-4 rounded-lg" value={this.state.password} name="password" onChange={(e) => this.handleChange(e)} />
                                <span className="text-red-500 text-sm">{password}</span>
                            </div>

                            <div className="w-full flex items-center mt-4">
                                <input type="Submit" className=" py-1 px-3 rounded-lg bg-black text-white "/>
                                <NavLink to="/login">
                                    <h6 className="w-full ml-1 text-center text-pink-700">Login ?</h6>
                                </NavLink>
                            </div>
                        </form> 
                    </div>
                </div>
            </section>
        )
    }
}

export default Register
