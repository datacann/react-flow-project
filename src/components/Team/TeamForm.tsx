import * as React from "react";
import {useTeam} from "../../context/TeamContext.tsx";
import {Team} from "../../types";
import {useState} from "react";
import "./Team.css";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../firebase.ts";


const TeamForm: React.FC= () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { addTeam } = useTeam();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !description) {
            alert("Lütfen takım adı ve açıklaması girin.");
            return;
        }
        const newTeam: Team = {
            id: new Date().toISOString(),
            name,
            description
        };
        try {
            await addDoc(collection(db, "teams"), {
                name: newTeam.name,
                description: newTeam.description,
                id: new Date().toISOString(),
            });
            addTeam(newTeam);
            setName('');
            setDescription('');
            alert("Takım başarıyla eklendi!");
        } catch (error) {
            console.error("Hata oluştu: ", error);
            alert("Takım eklenirken hata oluştu.");
        }
    };
    return (

        <form className="p-4" onSubmit={handleSubmit}>
            <div className="card mx-auto text-center">
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title">Takım Oluşturun</h5>

                    <div className="w-100">
                        <label>Takım Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-100">
                        <label>Takım Açıklaması</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn button-color mt-3">Takım Ekle</button>
                </div>
            </div>
        </form>

    );
}

export default TeamForm;
