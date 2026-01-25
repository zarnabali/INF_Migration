import { IconMenu2, IconMoon } from '@tabler/icons-react';
import { LogoLight } from '@/components/layouts/shared/Logo';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  isMiniSidebar: boolean;
  onMobileToggle: () => void;
}

export const AdminHeader = ({ onToggleSidebar, isMiniSidebar, onMobileToggle }: AdminHeaderProps) => {
  return (
    <header className="h-[64px] bg-[#0078FC] flex items-center justify-between px-4 shadow-md z-50 w-full shrink-0 fixed top-0 left-0 right-0">
      {/* Mobile Hamburger - Visible only on mobile */}
      <button
        onClick={onMobileToggle}
        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors lg:hidden absolute left-4 z-20"
      >
        <IconMenu2 size={24} />
      </button>

      {/* Logo Container - Centered on mobile, Left on Desktop */}
      <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
        <div className="flex items-center text-white gap-2 font-medium text-xl tracking-wide px-2">
          {/* Mobile Logo (Always Small) */}
          <div className="lg:hidden">
            <img src="/images/logos/small-logo.svg" alt="INF" className="h-8 w-auto" />
          </div>

          {/* Desktop Logo (Conditional) */}
          <div className="hidden lg:block">
            {isMiniSidebar ? (
              <img src="/images/logos/small-logo.svg" alt="INF" className="h-8 w-auto" />
            ) : (
              <LogoLight />
            )}
          </div>
        </div>

        {/* Desktop Hamburger - Hidden on mobile */}
        <button
          onClick={onToggleSidebar}
          className="text-white hover:bg-white/10 p-2 rounded-full transition-colors hidden lg:block"
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      <div className="flex items-center gap-2 absolute right-4 lg:static">
        <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
          <IconMoon size={22} />
        </button>
      </div>
    </header>
  );
};

