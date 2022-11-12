
type  ButtonProps =  {
    outlined? : boolean | false,
    varient? : "Primary",
    className? : String,
    children?:React.ReactNode,
    onClick?:()=>void
}
 const Button = (props: ButtonProps)=>{
  return (
    <button onClick={props.onClick} className= { props.outlined? 
        "font-semibold border-2 border-gray-900 bg-white  text-lg rounded-lg p-1 px-2 hover:border-red-400 hover:text-red-400 "+" "+props.className
        :
        "font-semibold bg-red-400  text-lg rounded-lg p-1 px-2 text-white hover:brightness-110"+" "+props.className
        } >
        {props.children}
    </button>
  )
}

export default Button