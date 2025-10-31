import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Menu, Settings, X, } from 'lucide-react'
import './Layout.css'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    return (
        <div className="app-layout">
            <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header flex flex-col">

                    <span className="toggle-button" onClick={toggleSidebar}>
                        {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </span>
                    {!isSidebarCollapsed && <h2>MagicInput</h2>}
                </div>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Home size={20} />
                        {!isSidebarCollapsed && <span>首页</span>}
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Settings size={20} />
                        {!isSidebarCollapsed && <span>设置</span>}
                    </NavLink>
                </nav>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Layout