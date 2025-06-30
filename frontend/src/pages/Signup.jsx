import {Heading} from "../components/Heading"
import {InputCard} from "../components/InputCard"
import { BottomWarning } from "../components/BottomWarning"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"
import { useState } from "react"



export function Signup(){
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    return(
        <div className="bg-blue-300">
            <div className="flex justify-center items-center h-screen">

                <div className="bg-white rounded-md shadow-md p-6 px-12">
                    
                    <div className="py-2 flex justify-center">
                        <Heading text="Sign up" />
                    </div>

                    <div className="flex justify-center w-80">
                        <SubHeading text="Enter your information to create your account" />
                    </div>

                    <div>
                        <InputCard onChange={(e) => {setFirstName(e.target.value)}} text="First Name" placeholder="Enter your first name" />
                        <InputCard onChange={(e) => {setLastName(e.target.value)}} text="Last Name" placeholder="Enter your last name" />
                        <InputCard onChange={(e) => {setEmail(e.target.value)}} text="Email" placeholder="Enter your email" />
                        <InputCard onChange={(e) => {setPassword(e.target.value)}} text="Password" placeholder="Enter your password" />
                        {/* <InputCard text="Confirm Password" placeholder="Confirm your password" /> */}
                    </div>

                    <div className="flex justify-center pt-2">
                        <Button onClick={async()=>{
                            try{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",
                            {
                                firstName,
                                lastName,
                                username: email,
                                password
                            })
                            localStorage.setItem("token","Bearer "+response.data.token)
                            }
                            catch(err){
                                const message = err.response.data.message
                                alert(message)
                            }
                            }} text="Sign up" />

                    </div>

                    <div className="pt-2">
                    <BottomWarning text="Already have an account?" buttontext="Signin" to="/signin" />
                    </div>


                </div>


            </div>
        </div>
    )
}