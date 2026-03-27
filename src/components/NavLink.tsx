import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, PropsWithChildren<NavLinkCompatProps>>(
  ({ className, activeClassName, children, href, ...props }, ref) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
