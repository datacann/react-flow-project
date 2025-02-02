import * as React  from 'react';
import {useEffect, useState} from "react";
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {db} from "../firebase.ts";


const UserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [teamId, setTeamId] = useState('');
    const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "teams"), (snapshot) => {
            const teamsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as { id: string; name: string }[];

            setTeams(teamsData);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !teamId) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }
        try {
            const userRef = doc(collection(db, "users"));
            const userId = userRef.id;

            await setDoc(userRef, {
                id: userId,
                name: name,
                email: email,
                teamId: teamId,
                createdAt: new Date(),
            });
            alert("Kişi başarıyla eklendi!");
            setName("");
            setEmail("");
            setTeamId("");
        } catch (error) {
            console.error("Hata oluştu: ", error);
            alert("Kişi eklenirken hata oluştu.");
        }
    };
    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <div className="card mx-auto text-center">
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title">Kişi Ekle</h5>

                    <div className="w-100">
                        <label>İsim</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-100">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-100">
                        <label>Takım Seç</label>
                        <select
                            className="form-control"
                            value={teamId}
                            onChange={(e) => setTeamId(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Takımlar</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn button-color mt-3">Kişi ekle</button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;