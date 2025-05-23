import React, { useState } from "react";
import { Home, Flame, Book, Users, UserCircle2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    user && (
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black/10 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
      
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link to="/">
              <h1 className="text-2xl font-bold text-black">StoreHUB</h1>
            </Link>
            <button
              className="lg:hidden block text-black/70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>

       
          <div className="hidden lg:flex items-center space-x-8 text-black">
            <Link to="/">
              <NavItem icon={<Home />} label="Explore" />
            </Link>
            <Link to="/trending">
              <NavItem icon={<Flame />} label="Trending" />
            </Link>
            <Link to="/sandbox">
              <NavItem icon={<Book />} label="Sandbox" />
            </Link>
            <Link to="/discussion">
              <NavItem icon={<Users />} label="Discussion" />
            </Link>
          </div>

        
          <div className="hidden lg:flex items-center space-x-4">
            <Link to={"/create"}>
              <button className="text-black border-black/70 border px-4 py-2 rounded-lg flex items-center">
                Create
              </button>
            </Link>
            <Link to="/profile">
              <div className="flex items-center space-x-2">
                <UserCircle2 className="text-black/70" size={40} />
                <span className="font-medium">
                  {user.user?.username || "John"}
                </span>
              </div>
            </Link>
          </div>
        </div>

  
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col bg-white border-t border-black/10">
            <Link
              to="/"
              className="p-4 text-black hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavItem icon={<Home />} label="Explore" />
            </Link>
            <Link
              to="/trending"
              className="p-4 text-black hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavItem icon={<Flame />} label="Trending" />
            </Link>
            <Link
              to="/sandbox"
              className="p-4 text-black hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavItem icon={<Book />} label="Sandbox" />
            </Link>
            <Link
              to="/discussion"
              className="p-4 text-black hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <NavItem icon={<Users />} label="Discussion" />
            </Link>
            <Link
              to="/create"
              className="p-4 text-black hover:bg-gray-100 md:border md:border-1 md:border-black/10" 
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            <Link
              to="/profile"
              className="p-4 text-black hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircle2 className="text-black/70" size={30} />
              <span>{user.user?.username || "John"}</span>
            </Link>
          </div>
        )}
      </nav>
    )
  );
};

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 text-black/70 hover:text-black transition-colors cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

export default Navbar;
