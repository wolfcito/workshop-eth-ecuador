import Link from "next/link";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "~~/lib/utils";

export function ListItem({ className, title, children, ...props }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          {...props}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-[#8B43EE]",
            className,
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground line-clamp-2">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  readonly title: string;
  readonly children: React.ReactNode;
}
