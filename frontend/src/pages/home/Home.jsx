import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
const Home = () => {
  return (
    <div className='
      flex sm:h-[450px] md:h-[500px] 
      rounded-xl overflow-hidden
      bg-gradient-to-br from-white/10 to-white/20 
      backdrop-blur-xl
      border border-white/20
      shadow-[0_8px_32px_rgba(255,255,255,0.15)]
      ring-1 ring-white/10
      transition-all hover:shadow-[0_8px_32px_rgba(255,255,255,0.25)]
    '>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;