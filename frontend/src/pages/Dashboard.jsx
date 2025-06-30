import {Heading} from "../components/Heading"
import {NameIcon} from "../components/NameIcon"
import { Contacts } from "../components/Contacts"
export function Dashboard(){
    return(
        <div className="">
            <div className="">
                <div className="flex justify-between p-4 border-b">
                    <div>
                        <Heading text="Dashboard"></Heading>
                    </div>

                    <div className="flex items-center text-xl font-medium justify-around">
                        <div>
                            Hello, User
                        </div>
                        <div className="pl-2">
                            <NameIcon text={"A"} />
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