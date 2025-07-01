import { useState , useEffect } from "react"
import axios from "axios";
import { Button } from "./Button";


export function UserBalance(){
    const [money , setMoney] = useState(0);
    const [firstName , setFirstName] = useState("");
    const [check , setCheck] = useState(0);

    useEffect(()=>{
        const fetchBalance = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/v1/account/balance',
                headers: { 
                  'Authorization': localStorage.getItem("token")
                }
              };
              
              axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                setMoney(response.data.balance);
                setFirstName(response.data.firstName);
              })
              .catch((error) => {
                console.log(error);
              });
        }
        fetchBalance();
    },[check])
    return(
        <div className="text-2xl font-bold py-4 flex gap-6 items-center">
            <div>
                Your Balance is : Rs. {money}
            </div>
            <div>
                <Button onClick={()=>{setCheck(check + 1)}} text={"Refresh Balance"}></Button>
            </div>
        </div>
    )
}