import React, { useState, useMemo } from 'react';
import type { User } from './types';
import { MOCK_USERS } from './constants';
import { AuthContext } from './contexts/AuthContext';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
    // The user is now fixed to the first user in the mock list.
    const [currentUser] = useState<User>(MOCK_USERS[0]);

    const authContextValue = useMemo(() => ({
        user: currentUser,
    }), [currentUser]);

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className="min-h-screen bg-brand-gray text-gray-800">
                <DashboardPage />
            </div>
        </AuthContext.Provider>
    );
};

export default App;