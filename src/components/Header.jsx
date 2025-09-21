"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Sparkle,
  Grid3x3,
  Home,
  Info,
  Database,
  Video,
  Image
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

import AuthSync from "@/components/AuthSync";

const Header = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  const { isSignedIn, user } = useUser();
  const firstName = user?.firstName || "";

  // hide entire header if not signed in
  if (!isSignedIn) return null;

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Generate", icon: Sparkle },
    { name: "Dashboard", icon: Grid3x3 },
    { name: "About Us", icon: Info },
    { name: "Feed Stats", icon: Database },
  ];

  const generateMenuItems = [
    {
      name: "Smart Text Generator",
      description: "Create amazing text content",
      icon: Sparkle,
      href: "/content-generation",
    },
    {
      name: "Smart Image Generator",
      description: "Generate visual media",
      icon: Image,
      href: "/image",
    },
    {
      name: "Smart Video Generation",
      description: "Create AI-powered videos",
      icon: Video,
      href: "/generate-video",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item !== "Generate") {
      setIsGenerateOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 shadow-md">
      <AuthSync />
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ascendo
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item, idx) => {
            const Icon = item.icon;

            if (item.name === "Home") {
              return (
                <Link
                  key={idx}
                  href="/"
                  className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            }

            if (item.name === "Generate") {
              return (
                <div key={idx} className="relative">
                  <button
                    onClick={() => setIsGenerateOpen(!isGenerateOpen)}
                    className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeItem === item.name
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isGenerateOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGenerateOpen && (
                    <div className="absolute top-full left-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        {generateMenuItems.map((menuItem, menuIdx) => (
                          <Link
                            key={menuIdx}
                            href={menuItem.href}
                            onClick={() => {
                              setActiveItem("Generate");
                              setIsGenerateOpen(false);
                            }}
                            className="block p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <menuItem.icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {menuItem.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {menuItem.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (item.name === "Dashboard" || item.name === "Feed Stats") {
              return (
                <Link
                  key={idx}
                  href={item.name === "Dashboard" ? "/dashboard" : "/datafeed"}
                  className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            }
            if (item.name === "About Us") {
              return (
                <Link
                  key={idx}
                  href="/about-us"
                  className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => handleItemClick(item.name)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeItem === item.name
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* User Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8", // avatar size
                },
              }}
            />
            <span className="ml-2 text-gray-700 font-medium">{firstName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
