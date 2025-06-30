export function InputCard({text , placeholder , onChange}){
    return(
        <div className="flex flex-col font-normal">
            <div className="text-md text-black font-bold w-full">
                {text}
            </div>
            <input className="border border-gray-300 rounded-md p-2 w-full" placeholder={placeholder} onChange={onChange} />
        </div>
    )
}