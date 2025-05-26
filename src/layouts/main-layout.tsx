import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { ThemeSwitcher } from "../components/theme-switcher";

interface MainLayoutProps {
  children: React.ReactNode;
  isMobile?: boolean; // Add isMobile prop
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isMobile = false }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", path: "/", icon: "lucide:home" },
    { name: "Content Library", path: "/content-library", icon: "lucide:library" },
    { name: "Interactive Map", path: "/map", icon: "lucide:map" },
    { name: "Passion Discovery", path: "/passion-discovery", icon: "lucide:compass" },
    { name: "Action Hub", path: "/action-hub", icon: "lucide:rocket" },
    { name: "Community Chat", path: "/community", icon: "lucide:message-circle" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        isBordered 
        isMenuOpen={isMenuOpen} 
        onMenuOpenChange={setIsMenuOpen}
        className="border-b border-divider"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit flex items-center gap-2">
              <Icon icon="lucide:globe" width={24} height={24} className="text-primary" />
              <span>ImpactConnect</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.path} isActive={location.pathname === item.path}>
              <Link 
                href={item.path} 
                color={location.pathname === item.path ? "primary" : "foreground"}
                className="flex items-center gap-1"
              >
                <Icon icon={item.icon} width={16} height={16} />
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <ThemeSwitcher />
          </NavbarItem>
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="Jane Doe"
                  size="sm"
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">jane.doe@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="favorites">My Favorites</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.path}>
              <Link
                href={item.path}
                color={location.pathname === item.path ? "primary" : "foreground"}
                className="w-full flex items-center gap-2 py-2"
                size="lg"
              >
                <Icon icon={item.icon} width={20} height={20} />
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <div className="py-2">
              <ThemeSwitcher />
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Conditional rendering for mobile bottom navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-content1 border-t border-divider py-2 px-4 z-50">
          <div className="flex justify-around">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex flex-col items-center p-2 ${
                  location.pathname === item.path 
                    ? "text-primary" 
                    : "text-default-500"
                }`}
              >
                <Icon 
                  icon={item.icon} 
                  width={24} 
                  height={24} 
                />
                <span className="text-tiny mt-1">{item.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Adjust footer for mobile */}
      <footer className={`bg-content2 py-8 ${isMobile ? 'pb-20' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ImpactConnect</h3>
              <p className="text-small text-default-500">
                Connecting passionate individuals with social causes that matter.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="foreground" size="sm">About Us</Link></li>
                <li><Link href="#" color="foreground" size="sm">Blog</Link></li>
                <li><Link href="#" color="foreground" size="sm">Partners</Link></li>
                <li><Link href="#" color="foreground" size="sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" color="foreground" size="sm">Terms of Service</Link></li>
                <li><Link href="#" color="foreground" size="sm">Privacy Policy</Link></li>
                <li><Link href="#" color="foreground" size="sm">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <Button isIconOnly variant="light" aria-label="Facebook">
                  <Icon icon="logos:facebook" width={20} height={20} />
                </Button>
                <Button isIconOnly variant="light" aria-label="Twitter">
                  <Icon icon="logos:twitter" width={20} height={20} />
                </Button>
                <Button isIconOnly variant="light" aria-label="Instagram">
                  <Icon icon="logos:instagram-icon" width={20} height={20} />
                </Button>
                <Button isIconOnly variant="light" aria-label="LinkedIn">
                  <Icon icon="logos:linkedin-icon" width={20} height={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-divider text-center text-small text-default-500">
            <p>© 2024 ImpactConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};