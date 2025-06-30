import {Link} from "react-router-dom"

export function BottomWarning({text , buttontext , to}){
    return(
        <div className="text-sm py-2 flex justify-center">
            <div>
                {text}
            </div>
            <Link className="pointer underline pl-1 courser-pointer" to={to}>
                {buttontext}
            </Link>
            
        </div>
    )
}