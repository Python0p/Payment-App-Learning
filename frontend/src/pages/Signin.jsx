import {Heading} from "../components/Heading"
import {InputCard} from "../components/InputCard"
import { BottomWarning } from "../components/BottomWarning"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signin(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className="bg-blue-300">
            <div className="flex justify-center items-center h-screen">

                <div className="bg-white rounded-md shadow-md p-6 px-12">
                    
                    <div className="py-2 flex justify-center">
                        <Heading text="Sign in" />
                    </div>

                    <div className="felx justify-center w-80">
                        <SubHeading text="Enter your credentials to access your account" />
                    </div>

                    <div>
                        <InputCard onChange={(e) => {setEmail(e.target.value)}} text="Email" placeholder="Enter your email" />
                        <InputCard onChange={(e) => {setPassword(e.target.value)}} text="Password" placeholder="Enter your password" />
                    </div>

                    <div className="flex justify-center pt-2">
                        <Button onClick={async()=>{
                            try{
                                const res = await axios.post("http://localhost:3000/api/v1/user/signin" , 
                                    {
                                        username: email , 
                                        password
                                    }
                                );
                                localStorage.setItem("token" , "Bearer "+ res.data.token); 
                                navigate("/dashboard");       
                            }catch(err){
                                alert(err.response.data.message);
                            }
                        }} text="Sign in" />
                    </div>

                    <div className="pt-2">
                    <BottomWarning text="Dont have an account?" buttontext="Sign Up" to="/signup" />
                    </div>


                </div>


            </div>
        </div>
    )
}