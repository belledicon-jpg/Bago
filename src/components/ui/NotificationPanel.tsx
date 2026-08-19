import { useRef, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
}

const typeIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
  error: AlertCircle,
};

const typeColors = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  error: 'text-red-500',
};

export function NotificationPanel({ notifications, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={panelRef} className='fixed top-16 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50'>
      <div className='flex items-center justify-between p-4 border-b border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-800'>Notifications</h3>
        <button className='text-gray-400 hover:text-gray-600' onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className='max-h-96 overflow-y-auto'>
        {notifications.length === 0 ? (
          <p className='text-center text-gray-500 py-6'>No new notifications</p>
        ) : (
          notifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            const itemClass = !notification.read
              ? 'p-4 border-b border-gray-100 hover:bg-gray-50 transition bg-blue-50'
              : 'p-4 border-b border-gray-100 hover:bg-gray-50 transition';
            return (
              <div key={notification.id} className={itemClass}>
                <div className='flex items-start gap-3'>
                  <Icon size={20} className={typeColors[notification.type]} />
                  <div className='flex-1'>
                    <h4 className='font-medium text-gray-800'>{notification.title}</h4>
                    <p className='text-sm text-gray-600 mt-1'>{notification.message}</p>
                    <p className='text-xs text-gray-400 mt-2'>{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className='p-2 border-t border-gray-200'>
        <button className='w-full text-center text-sm text-emerald-600 hover:bg-gray-50 py-2 rounded'>
          View all notifications
        </button>
      </div>
    </div>
  );
}