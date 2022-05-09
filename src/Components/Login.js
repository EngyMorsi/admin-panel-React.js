import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
//import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Login=(props)=>{
    const navigate = useNavigate();

    const paperStyle={padding:67,height:'80vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'10px 0'}


    const schema = Yup.object().shape({
        username: Yup.string().min(3, 'Too Short!')
        .max(15, 'Too Long!').required("Required"),
        password: Yup.string().min(4, "Password must be 3 characters at minimum").max(10, "Password must be 10 characters at maximum").required("Required"),   
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

    const onSubmit = async (data) =>  {
        const { username, password } = data;

        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        try {
            const res = await axios.post('http://172.104.243.247:8000/api/admins/login', formData, {headers:{"Content-Type" : "multipart/form-data"}});
            console.log(res.data)
            if (res.data.success === true){
                console.log("ok");
                localStorage.setItem('token', res.data.token);
                props.getUserInfo();
                navigate('/home')
            }
            else {
                console.log('Incorrect username or password!');
            }
        } catch (err) {
            console.log(err);
        } 
        
            reset();
    };
    
   
  

    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle} >
                        
                 </Avatar>
                    <h2>Sign In</h2>  
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                   
                    <TextField type="text" name="username" placeholder="Enter Your username" label="username" variant="outlined" fullWidth required 
                    {...register("username")} helperText={errors.username?.message}
                    error={errors.username?.message ? true : false}/>

                    <TextField type="text" name="password" placeholder="Enter Your password" label="Password" variant="outlined" fullWidth required 
                    {...register("password")}
                    helperText={errors.password?.message}
                    error={errors.password?.message ? true : false}/>
                  
                    <Button type="submit"  color='primary' variant="contained" style={btnstyle} fullWidth>signin </Button>
                 </form>
           
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                <Link href='/signup'>
                        Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
