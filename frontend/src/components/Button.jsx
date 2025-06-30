export function Button({text , onClick}){
    return(
        <button onClick={onClick} className="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">
            {text}
        </button>
    )
}