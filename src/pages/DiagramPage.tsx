import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

const DiagramPage = () => {
    const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
    const [users, setUsers] = useState<{ id: string; name: string; teamId: string }[]>([]);
    const [teamVisibility, setTeamVisibility] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const unsubscribeTeams = onSnapshot(collection(db, "teams"), (snapshot) => {
            const teamsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as { id: string; name: string }[];
            setTeams(teamsData);
            setTeamVisibility((prevState) => {
                const updatedVisibility = { ...prevState };
                teamsData.forEach(team => {
                    if (!updatedVisibility[team.id]) {
                        updatedVisibility[team.id] = true;
                    }
                });
                return updatedVisibility;
            });
        });

        const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as { id: string; name: string; teamId: string }[];
            setUsers(usersData);
        });

        return () => {
            unsubscribeTeams();
            unsubscribeUsers();
        };
    }, []);

    const handleTeamClick = (teamId: string) => {
        setTeamVisibility((prevState) => ({
            ...prevState,
            [teamId]: !prevState[teamId],
        }));
    };

    const handleRemoveUserFromTeam = async (userId: string) => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { teamId: "" });
    };

    const centerX = window.innerWidth / 2;
    const teamSpacingY = 200;
    const userSpacingX = 150;

    const teamPositions: Record<string, { x: number; y: number }> = {};
    teams.forEach((team, index) => {
        teamPositions[team.id] = {
            x: centerX,
            y: 100 + index * teamSpacingY,
        };
    });
    const userOffsets: Record<string, number> = {};

    const teamNodes: Node[] = teams.map((team) => ({
        id: `team-${team.id}`,
        type: "default",
        position: { x: teamPositions[team.id].x, y: teamPositions[team.id].y },
        data: { label: team.name },
    }));

    const userNodes: Node[] = users
        .filter((user) => teamVisibility[user.teamId])
        .map((user) => {
            const teamPosition = teamPositions[user.teamId] || { x: centerX, y: 100 };

            if (!userOffsets[user.teamId]) {
                userOffsets[user.teamId] = teamPosition.x - 100;
            } else {
                userOffsets[user.teamId] += userSpacingX;
            }

            return {
                id: `user-${user.id}`,
                type: "default",
                position: { x: userOffsets[user.teamId], y: teamPosition.y + 150 },
                data: { label: user.name },
            };
        });

    const edges: Edge[] = users
        .filter((user) => teamVisibility[user.teamId])
        .map((user) => ({
            id: `edge-${user.id}`,
            source: `team-${user.teamId}`,
            target: `user-${user.id}`,
            animated: true,
        }));

    const handleNodeContextMenu = (event: React.MouseEvent, node: Node) => {
        event.preventDefault();
        if (node.id.startsWith("user-")) {
            const userId = node.id.replace("user-", "");
            if (window.confirm(`Kullanıcıyı ekipten silmek istediğinizden emin misiniz?`)) {
                handleRemoveUserFromTeam(userId);
            }
        }
    };

    return (
        <ReactFlowProvider>
            <div style={{ width: "100vw", height: "90vh" }}>
                <h2 className="text-center text-2xl font-bold my-4">Ekip Diyagramı</h2>
                <ReactFlow
                    className="diagram"
                    nodes={[...teamNodes, ...userNodes]}
                    edges={edges}
                    onNodeClick={(_event, node) => {
                        if (node.id.startsWith("team-")) {
                            handleTeamClick(node.id.replace("team-", ""));
                        }
                    }}
                    onNodeContextMenu={handleNodeContextMenu}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    );
};

export default DiagramPage;