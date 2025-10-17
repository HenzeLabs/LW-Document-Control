import { createContext } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
    user: User;
}

export const AuthContext = createContext<AuthContextType>({
    user: MOCK_USERS[0],
});