import { IconDashboard, IconChartBar, IconSettings, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SidebarItems = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <IconDashboard size={20} />,
      href: '/dashboard',
      roles: ['user', 'admin'],
    },
    {
      title: 'Trading',
      icon: <IconChartBar size={20} />,
      href: '#',
      roles: ['user', 'admin'],
      submenu: [
        {
          title: 'Weekly Review',
          href: '/weekly-review',
        },
        {
          title: 'Daily Review',
          href: '/daily-review',
        },
        {
          title: 'Economic Calendar',
          href: '/economic-calendar',
        },
        {
          title: 'Trading Insights',
          href: '/trading-insights',
        },
      ],
    },
    {
      title: 'Admin',
      icon: <IconSettings size={20} />,
      href: '/admin',
      roles: ['admin'],
    },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => {
        // Check if user has required role
        if (!item.roles.includes(user?.role || 'user')) {
          return null;
        }

        if (item.submenu) {
          return (
            <li className="nav-item" key={item.title}>
              <a className="nav-link" href={item.href} data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="tradingSubmenu">
                <span className="nav-link-icon">
                  {item.icon}
                </span>
                <span className="nav-link-title">
                  {item.title}
                </span>
              </a>
              <div className="collapse" id="tradingSubmenu">
                <ul className="nav nav-sm flex-column">
                  {item.submenu.map((subItem) => (
                    <li className="nav-item" key={subItem.title}>
                      <a className="nav-link" href={subItem.href}>
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li className="nav-item" key={item.title}>
            <a className="nav-link" href={item.href}>
              <span className="nav-link-icon">
                {item.icon}
              </span>
              <span className="nav-link-title">
                {item.title}
              </span>
            </a>
          </li>
        );
      })}
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={handleLogout}>
          <span className="nav-link-icon">
            <IconLogout size={20} />
          </span>
          <span className="nav-link-title">
            Logout
          </span>
        </a>
      </li>
    </ul>
  );
};

export default SidebarItems; 