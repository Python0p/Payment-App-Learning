import {Heading} from "../components/Heading"
import {InputCard} from "../components/InputCard"
import { BottomWarning } from "../components/BottomWarning"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { NameIcon } from "../components/NameIcon"

export function SendMoney(){
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
                            <NameIcon text={"U1"}></NameIcon>
                        </div>
                        <div className="text-2xl font-bold">
                            User 1
                        </div>
                    </div>

                    
                    

                    <div>
                        <InputCard text="Amount (INR)" placeholder="Enter the amount" />
                    </div>

                    <div className="flex justify-center pt-2">
                        <Button text="Initiate Transfer" />
                    </div>


                </div>


            </div>
        </div>
    )
}