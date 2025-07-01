import {Heading} from "../components/Heading"
import {InputCard} from "../components/InputCard"
import { BottomWarning } from "../components/BottomWarning"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { NameIcon } from "../components/NameIcon"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const lastName = searchParams.get("lastName");

    const [amount , setAmount] = useState(0);

    return(
        <div className="bg-blue-300">
            <div className="flex justify-center items-center h-screen">

                <div className="bg-white rounded-md shadow-md p-6 px-12">
                    
                    <div className="py-2 flex justify-center">
                        <Heading text="Send Money" />
                    </div>

                    <div className="felx justify-between w-80">

                    </div>

                    <div className="flex items-center gap-3 py-4">
                        <div>
                            <NameIcon text={name[0]}></NameIcon>
                        </div>
                        <div className="text-2xl font-bold">
                            {name + " " + lastName}
                        </div>
                    </div>

                    
                    

                    <div>
                        <InputCard onChange={(e) => {setAmount(e.target.value)}} text="Amount (INR)" placeholder="Enter the amount" />
                    </div>

                    <div className="flex justify-center pt-2">
                        <Button onClick={() => {
                            let data = JSON.stringify({
                                "amount": amount || 0,
                                "to": id
                              });
                              
                              let config = {
                                method: 'post',
                                maxBodyLength: Infinity,
                                url: 'http://localhost:3000/api/v1/account/transfer',
                                headers: { 
                                  'Authorization': localStorage.getItem("token"), 
                                  'Content-Type': 'application/json'
                                },
                                data : data
                              };
                              
                              axios.request(config)
                              .then((response) => {
                                console.log(JSON.stringify(response.data));

                                alert(JSON.stringify(response.data.message));
                                alert(amount + " INR Deducted Successfully")
                              })
                              .catch((error) => {
                                console.log(error);
                                alert(error.response.data.message);
                              });
                              
                        }} text="Initiate Transfer" />
                    </div>


                </div>


            </div>
        </div>
    )
}