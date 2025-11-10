import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ModernNavbarProps, NavItem } from "./modernNavbar.types";
import * as S from "./modernNavbar.styled";
import { getClient } from "../../../store/state.selector";
import { useSelector } from "react-redux";

const ModernNavbar: React.FC<ModernNavbarProps> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { logo, navigationItems } = props;

  const { name: clientName } = useSelector(getClient);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMobileMenuOpen &&
        !target.closest("[data-mobile-menu]") &&
        !target.closest("[data-mobile-button]")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenSubMenu(null);
        setOpenMobileSubMenu(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSubMenuEnter = useCallback((itemLabel: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenSubMenu(itemLabel);
  }, []);

  const handleSubMenuLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpenSubMenu(null);
    }, 150);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileSubMenu(null);
  };

  const toggleMobileSubMenu = (itemLabel: string) => {
    setOpenMobileSubMenu(openMobileSubMenu === itemLabel ? null : itemLabel);
  };

  const renderDesktopNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenu === item.label;

    return (
      <S.NavItem
        key={item.label}
        onMouseEnter={() => hasSubItems && handleSubMenuEnter(item.label)}
        onMouseLeave={handleSubMenuLeave}
      >
        <S.NavLink
          href={item.href || "#"}
          $hasSubItems={hasSubItems}
          onClick={(e) => {
            if (hasSubItems && !item.href) {
              e.preventDefault();
            }
          }}
          role={hasSubItems ? "button" : "link"}
          aria-haspopup={hasSubItems ? "true" : "false"}
          aria-expanded={hasSubItems ? isSubMenuOpen : undefined}
        >
          {item.label}
        </S.NavLink>

        {hasSubItems && (
          <S.SubMenu $isOpen={isSubMenuOpen} role="menu">
            {item.subItems?.map((subItem) => (
              <S.SubMenuItem
                key={subItem.label}
                href={subItem.href}
                role="menuitem"
              >
                <S.SubMenuItemTitle>{subItem.label}</S.SubMenuItemTitle>
                {subItem.description && (
                  <S.SubMenuItemDescription>
                    {subItem.description}
                  </S.SubMenuItemDescription>
                )}
              </S.SubMenuItem>
            ))}
          </S.SubMenu>
        )}
      </S.NavItem>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = openMobileSubMenu === item.label;

    return (
      <S.MobileNavItem key={item.label}>
        <S.MobileNavLink
          href={hasSubItems ? "#" : item.href}
          $hasSubItems={hasSubItems}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleMobileSubMenu(item.label);
            } else {
              setIsMobileMenuOpen(false);
            }
          }}
          aria-expanded={hasSubItems ? isExpanded : undefined}
        >
          {item.label}
          {hasSubItems && <S.MobileExpandIcon $isExpanded={isExpanded} />}
        </S.MobileNavLink>

        {hasSubItems && (
          <S.MobileSubMenu $isOpen={isExpanded}>
            {item.subItems?.map((subItem) => (
              <S.MobileSubMenuItem
                key={subItem.label}
                href={subItem.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {subItem.label}
              </S.MobileSubMenuItem>
            ))}
          </S.MobileSubMenu>
        )}
      </S.MobileNavItem>
    );
  };

  return (
    <>
      <S.NavbarContainer role="navigation" aria-label="Navigation principale">
        <S.NavbarContent>
          <S.NavbarInner>
            {/* Logo */}
            <S.LogoContainer>
              <S.LogoLink href="/" aria-label="Accueil">
                <S.LogoImage
                  src={`${import.meta.env.BASE_URL}assets/${clientName}/icons/${logo.name}.webp`}
                  alt={logo.alt}
                />
              </S.LogoLink>
            </S.LogoContainer>

            {/* Desktop Navigation */}
            <S.DesktopNavigation>
              {navigationItems.map(renderDesktopNavItem)}
            </S.DesktopNavigation>

            {/* Mobile Menu Button */}
            <S.MobileMenuButton
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              aria-expanded={isMobileMenuOpen}
              data-mobile-button
            >
              <S.HamburgerIcon $isOpen={isMobileMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
              </S.HamburgerIcon>
            </S.MobileMenuButton>
          </S.NavbarInner>
        </S.NavbarContent>

        {/* Mobile Menu */}
        <S.MobileMenu $isOpen={isMobileMenuOpen} data-mobile-menu>
          <S.MobileMenuContent>
            {navigationItems.map(renderMobileNavItem)}
          </S.MobileMenuContent>
        </S.MobileMenu>
      </S.NavbarContainer>

      {/* Backdrop */}
      <S.Backdrop
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
    </>
  );
};

export default ModernNavbar;
