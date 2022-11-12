import { BsCoin,BsTruck,BsCreditCard,BsShieldCheck,BsFacebook,BsTwitter,BsMessenger,BsInstagram,BsWhatsapp} from "react-icons/bs";

const Footer = ()=> (
    <div className="shadow-lg " >
        <div className="max-w-[1200px] mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-2" >
            <FooterInfoCard Icon={BsCoin} title="Great value" desc="We offer competitive prices on over 100 million items." />
            <div className="sm:h-20 sm:w-0.5 w-40 h-0.5 bg-gray-100" />
            <FooterInfoCard Icon={BsTruck} title="Worldwide shopping" desc="We ship to over 200 countries and regions, and our site comes in 12 languages." />
            <div className="sm:h-20 sm:w-0.5 w-40 h-0.5 bg-gray-100" />
            <FooterInfoCard Icon={BsCreditCard} title="Safe payment" desc="Pay with the world’s most popular and secure payment methods." />
            <div className="sm:h-20 sm:w-0.5 w-40 h-0.5 bg-gray-100" />
            <FooterInfoCard Icon={BsShieldCheck} title="Shop with confidence" desc="Our Buyer Protection policy covers your entire purchase journey." />
        </div>

        <div className="w-full h-0.5 bg-gray-100" />

        <div className=" flex justify-between w-full  p-2" >
            <div className="flex justify-center items-center gap-4" >
                <a href="https://www.facebook.com/" >
                    <BsFacebook size={25} color ="#333" />
                </a>                
                <a href="https://www.twitter.com/">
                    <BsTwitter size={25} color ="#333"/>
                </a>                
                <a href="https://www.messenger.com/">
                    <BsMessenger size={25} color ="#333"/>
                </a>                
                <a href="https://www.instagram.com/">
                    <BsInstagram size={25} color ="#333"/>
                </a>                
                <a href="https://www.whatsapp.com/">
                    <BsWhatsapp size={25} color ="#333"/>
                </a>                
            </div>

                <span className="text-lg sm:text-xl font-semibold text-gray-800 self-end" >SaiiExpress 2022</span>

        </div>
        </div>  
    </div>
  )


export default  Footer

interface FooterInfoCardPropType{
    Icon:any
    title:string
    desc:string
}

const FooterInfoCard = ({Icon,title,desc}:FooterInfoCardPropType)=>(
    <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 h-40 sm:h-56 w-52 " >
        <span> <Icon size={35} color ="#333" /> </span>
        <span className="font-semibold text-gray-800" >{title}</span>
        <span className="text-sm text-center text-gray-700" >{desc}</span>
    </div>
)