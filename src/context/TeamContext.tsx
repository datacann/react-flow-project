import {createContext, useContext} from "react";
import {Team, TeamContextType, TeamProviderProps, User} from "../types";
import * as React from "react";


const TeamContext = createContext<TeamContextType | null>(null)

export const useTeam = () => {
    const context = useContext(TeamContext)
    if(!context) {
        throw new Error("useTeam must be used within a TeamProvider")
    }
    return context
}


export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
    const [teams, setTeams] = React.useState<Team[]>([])
    const [users, setUsers] = React.useState<User[]>([])

    const addTeam = (team : Team) => {
        setTeams((prevTeams) => [...prevTeams, team])
    }

    const addUser = (user: User) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <TeamContext.Provider value={{ teams, users, addTeam, addUser }}>
            {children}
        </TeamContext.Provider>
    );
}

