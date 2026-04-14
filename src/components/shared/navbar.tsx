"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Temples", href: "/temples" },
  { name: "Packages", href: "/packages" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <img src="/images/logo.jpg" alt="Divya Nepal" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xl font-bold text-warm-brown">Divya Nepal</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-warm-brown hover:text-saffron transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-warm-brown">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-warm-brown hover:text-saffron font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex space-x-4 pt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 text-warm-brown py-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="flex-1">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}