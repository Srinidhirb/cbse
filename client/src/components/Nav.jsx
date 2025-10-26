import React, { useRef, useState } from "react";
const logo = "/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const User = "/assets/icons/user.png";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

const Nav = () => {
  const { userEmail, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="w-full px-6 custom:px-24 py-3 flex justify-between items-center relative  z-50">
      <div className="flex justify-between items-center w-full custom:w-auto">
        <Link to="/">
          <img className="cursor-pointer w-32" src={logo} alt="Logo" />
        </Link>

        {/* Hamburger Icon */}
        <div
          className="custom:hidden text-3xl cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden custom:flex gap-12 items-center">
        <Link to="/">
          <li className="font-semibold text-lg hover:underline underline-offset-8">
            Home
          </li>
        </Link>
        <Link to="/courses">
          <li className="font-semibold text-lg hover:underline underline-offset-8">
            Courses
          </li>
        </Link>
        <Link to="/faq">
          <li className="font-semibold text-lg hover:underline underline-offset-8">
            FAQ
          </li>
        </Link>
        <Link to="/blogs">
          <li className="font-semibold text-lg hover:underline underline-offset-8">
            Blogs
          </li>
        </Link>
        <Link to="/contact">
          <li className="font-semibold text-lg hover:underline underline-offset-8">
            Contact Us
          </li>
        </Link>
        {isAdmin && (
          <Link to="/admin">
            <li className="font-semibold text-lg hover:underline underline-offset-8 text-red-600">
              Admin
            </li>
          </Link>
        )}
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden custom:flex gap-5 items-center">
        {userEmail ? (
          <>
            <Link to="/dashboard">
              <img
                src={User}
                alt="User Icon"
                className="w-9 hover:scale-105 transition-transform"
              />
            </Link>
            <button
              onClick={onOpen}
              className="px-4 border-2 rounded-2xl border-red-400 text-red-600 font-medium hover:scale-105 transition-transform"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <div className="px-5 py-1 border rounded-2xl bg-cyan-200 border-stone-950 hover:scale-105 transition-transform">
                Login
              </div>
            </Link>
            <Link to="/register">
              <div className="px-5 py-1 border-2 rounded-2xl border-blue-300 hover:scale-105 transition-transform">
                Sign Up
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 custom:hidden flex flex-col gap-4">
          <Link to="/" onClick={toggleMenu}>
            <div className="text-lg font-medium">Home</div>
          </Link>
          <Link to="/courses" onClick={toggleMenu}>
            <div className="text-lg font-medium">Courses</div>
          </Link>
          <Link to="/faq" onClick={toggleMenu}>
            <div className="text-lg font-medium">FAQ</div>
          </Link>
          <Link to="/blogs" onClick={toggleMenu}>
            <div className="text-lg font-medium">Blogs</div>
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            <div className="text-lg font-medium">Contact Us</div>
          </Link>
          {isAdmin && (
            <Link to="/admin" onClick={toggleMenu}>
              <div className="text-lg font-medium text-red-600">Admin</div>
            </Link>
          )}
          {userEmail ? (
            <>
              <Link to="/dashboard" onClick={toggleMenu}>
                <div className="flex items-center gap-2">
                  <img src={User} alt="User" className="w-6" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  toggleMenu();
                  onOpen();
                }}
                className="text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <div className="text-lg">Login</div>
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                <div className="text-lg">Sign Up</div>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Logout
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to log out? You’ll be redirected to the
              login page.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirmLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </nav>
  );
};

export default Nav;
