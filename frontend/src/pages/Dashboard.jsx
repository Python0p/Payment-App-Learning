import {Heading} from "../components/Heading"
import {NameIcon} from "../components/NameIcon"
import { Contacts } from "../components/Contacts"
import { useEffect , useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Dashboard(){
    const [deatails , setDetails] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/user/details',
            headers: { 
            'Authorization': localStorage.getItem("token")
            }
        };
        
        axios.request(config)
        .then((response) => {
            console.log(response.data);
            setDetails(response.data);
        })
        .catch((error) => {
            console.log(error);
            navigate("/signin");
        });
        
    },[])

    return(
        <div className="">
            <div className="">
                <div className="flex justify-between p-4 border-b">
                    <div>
                        <Heading text="Dashboard"></Heading>
                    </div>

                    <div className="flex items-center text-xl font-medium justify-around">
                        <div>
                            Hello, {deatails?.firstName || "User"}
                        </div>
                        <div className="pl-2">
                            <NameIcon text={deatails?.firstName?.[0] || "?"} />
                        </div>
                    </div>
                </div>

                <div>
                    <Contacts></Contacts>
                </div>

            </div>
        </div>
    )
}