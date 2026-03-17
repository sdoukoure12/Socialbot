import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [rules, setRules] = useState([]);
  const [newAccount, setNewAccount] = useState({ username: '', password: '' });
  const [newRule, setNewRule] = useState({ trigger: '', response: '' });

  useEffect(() => {
    // Charger les données de l'utilisateur
    const fetchData = async () => {
      try {
        // Vous pouvez créer des routes pour récupérer les comptes et règles
        // Pour l'exemple, on suppose que l'utilisateur est récupéré via un endpoint
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const addAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/instagram/add-account', newAccount, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Compte ajouté');
      setNewAccount({ username: '', password: '' });
    } catch (err) {
      alert('Erreur');
    }
  };

  const addRule = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/instagram/add-rule', newRule, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Règle ajoutée');
      setNewRule({ trigger: '', response: '' });
    } catch (err) {
      alert('Erreur');
    }
  };

  const runBot = async () => {
    try {
      await axios.post('http://localhost:5000/api/instagram/run-bot', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Bot exécuté');
    } catch (err) {
      alert('Erreur');
    }
  };

  return (
    <div>
      <h1>Tableau de bord SocialBot</h1>

      <section>
        <h2>Ajouter un compte Instagram</h2>
        <form onSubmit={addAccount}>
          <input type="text" placeholder="Nom d'utilisateur" value={newAccount.username} onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })} required />
          <input type="password" placeholder="Mot de passe" value={newAccount.password} onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })} required />
          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section>
        <h2>Ajouter une règle</h2>
        <form onSubmit={addRule}>
          <input type="text" placeholder="Mot déclencheur" value={newRule.trigger} onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })} required />
          <input type="text" placeholder="Réponse automatique" value={newRule.response} onChange={(e) => setNewRule({ ...newRule, response: e.target.value })} required />
          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section>
        <h2>Actions</h2>
        <button onClick={runBot}>Exécuter le bot maintenant</button>
      </section>
    </div>
  );
};

export default Dashboard;
