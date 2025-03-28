
import LogoImage from '../assets/images/logo.png';
import MenuIcon from '../assets/icons/menu.svg';


export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="px-4">
        <div className="container bg-black">
          <div className="py-4 flex items-center justify-between">

            <div className="relative">
              <img src={LogoImage.src} className="h-16 relative mt-1" />
            </div>
            <div className='border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden'>

              <MenuIcon className="text-white" />
            </div>
            <nav className='text-white gap-6 items-center hidden sm:flex'>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Home</a>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Mock Interviews</a>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Contact</a>
              <button className='bg-white py-2 px-4 rounded-lg text-black'>Get Started</button>
            </nav>
          </div>




        </div>
      </div>
    </div>
  )
};
