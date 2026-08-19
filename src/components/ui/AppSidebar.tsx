import { Link, useLocation } from 'react-router-dom';
import { Home, Hospital, ClipboardCheck, Syringe, Droplets, Activity, ChevronLeft } from 'lucide-react';
import { useSidebar } from './SidebarProvider';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export function AppSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();
  const location = useLocation();

  const menu: MenuItem[] = [
    { title: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { title: 'Health Center', icon: <Hospital size={20} />, path: '/health-center' },
    { title: 'Sanitation', icon: <ClipboardCheck size={20} />, path: '/sanitation' },
    { title: 'Immunization', icon: <Syringe size={20} />, path: '/immunization' },
    { title: 'Wastewater', icon: <Droplets size={20} />, path: '/wastewater' },
    { title: 'Surveillance', icon: <Activity size={20} />, path: '/surveillance' }
  ];

  return (
    <>
      <aside
        className={'fixed top-0 left-0 h-screen bg-emerald-700 text-white transition-all duration-300 z-40 ' + (isOpen ? 'w-72' : 'w-16') + ' ' + (!isOpen ? 'hidden md:block' : '')}
      >
        <div className='flex items-center justify-between p-4'>
          {!isOpen && (
            <ChevronLeft
              size={20}
              className='cursor-pointer hover:text-emerald-200'
              onClick={toggleSidebar}
            />
          )}
          {isOpen && <h1 className='text-xl font-bold'>HSMS</h1>}
          <button
            className='text-white hover:text-emerald-200'
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : null}
          </button>
        </div>

        <nav>
          {menu.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={'flex items-center gap-3 px-4 py-3 hover:bg-emerald-600 transition ' + (location.pathname === item.path ? 'bg-emerald-600' : '')}
            >
              {item.icon}
              {!isOpen && <span className='hidden md:inline'>{item.title}</span>}
              {isOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {!isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-30 md:hidden'
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}