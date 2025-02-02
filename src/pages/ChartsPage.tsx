import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE", "#FC678D"];

const ChartsPage: React.FC = () => {
    const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
    const [users, setUsers] = useState<{ id: string; name: string; teamId: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamsAndUsers = async () => {
            try {
                setLoading(true);
                const teamSnapshot = await getDocs(collection(db, "teams"));
                const teamsData = teamSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as { name: string }),
                }));
                const userSnapshot = await getDocs(collection(db, "users"));
                const usersData = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as { name: string; teamId: string }),
                }));

                setTeams(teamsData);
                setUsers(usersData);
            } catch (error) {
                console.error("Veriler alınırken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeamsAndUsers();
    }, []);

    const teamData = teams.map(team => ({
        name: team.name,
        userCount: users.filter(user => user.teamId === team.id).length,
    }));

    if (loading) {
        return <div className="text-center text-lg font-semibold p-6">Veriler yükleniyor...</div>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Grafikler</h2>
            <div className="mb-8">
                <h3 className="text-lg font-semibold">Ekip Dağılımı</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={teamData}
                            dataKey="userCount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {teamData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, _name, props) => {
                                return [`Kullanıcı Sayısı: ${value}`, `Takım: ${props.payload.name}`];
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Ekip Kullanıcı Sayısı</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={teamData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [`Kullanıcı Sayısı: ${value}`, `Takım: ${name}`]} />
                        <Bar dataKey="userCount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartsPage;