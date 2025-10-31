import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import HomePage from '@/pages/HomePage/HomePage'
import SettingsPage from '@/pages/SettingsPage/SettingsPage'
import './App.css'

import "uno.css";
import "virtual:unocss-devtools";


function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
