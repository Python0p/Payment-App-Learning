import { NameIcon } from "./NameIcon"
import { Button } from "./Button"
import { InputCard } from "./InputCard"
import { UserBalance } from "./UserBalance"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Contacts(){
    const [filter , setFilter] = useState("");
    const [users , setUsers] = useState([]);
    


    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
                setUsers(response.data.user)

            }catch(error){
                console.log(error.response.data.message);
            }
        }

        fetchUsers();
    },[filter])

    console.log(users);

    return(
        <div className="p-4">

            <UserBalance></UserBalance>

            <div className="w-full text-2xl font-bold py-4">
                Users
            </div>
            <InputCard onChange={(e) => {setFilter(e.target.value)}} placeholder={"Search users..."}></InputCard>
            
            {users.map(user => (
                <UserCard key={user._id} user={user} /> // ✅ JSX — now React knows it's a component
            ))}

            {/* <UserCard user={{firstName:"John" , lastName:"Doe"}}></UserCard> */}
            
        </div>


    )
}

function UserCard({user}){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between py-4">
                <div className="flex items-center gap-4">
                    <NameIcon text={user.firstName[0]} />
                    {user.firstName + " " + user.lastName}
                </div>
        
                <div className="">
                    <Button onClick={() => {navigate("/send?id=" + user._id + "&name=" + user.firstName + "&lastName=" + user.lastName)}} text={"Send Money"}></Button>
                </div>
            </div>
    )
}