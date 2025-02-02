import {ReactNode} from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    teamId: string;
}

export interface Team {
    id: string;
    name: string;
    description?: string;
}

export interface TeamContextType {
    teams: Team[];
    users: User[];
    addTeam: (team: Team) => void;
    addUser: (user: User) => void;
}

export interface TeamProviderProps {
    children: ReactNode;
}