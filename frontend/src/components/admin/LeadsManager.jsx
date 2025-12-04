import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Users, Loader2, Trash2, Check, X } from 'lucide-react';
import { Button } from '../ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const LeadsManager = () => {
  const { getAuthHeaders } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/leads/`, { headers: getAuthHeaders() });
      if (response.data.success) {
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId, status) => {
    try {
      await axios.put(`${API_URL}/api/leads/${leadId}`, { status }, { headers: getAuthHeaders() });
      loadLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm('Supprimer ce lead ?')) return;
    try {
      await axios.delete(`${API_URL}/api/leads/${leadId}`, { headers: getAuthHeaders() });
      loadLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  if (loading) return <div className="text-center py-12"><Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" /></div>;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center"><Users className="h-6 w-6 mr-2" />Leads & Contacts ({leads.length})</h2>
        <div className="flex space-x-2">
          {['all', 'new', 'contacted', 'converted'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded text-sm ${filter === f ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{f === 'all' ? 'Tous' : f}</button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Nom/Entreprise</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 text-sm"><span className={`px-2 py-1 rounded text-xs ${lead.type === 'contact' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{lead.source}</span></td>
                  <td className="px-4 py-3 text-sm">{lead.businessName || lead.name || '-'}</td>
                  <td className="px-4 py-3 text-sm">{lead.email}</td>
                  <td className="px-4 py-3 text-sm">{lead.phone}</td>
                  <td className="px-4 py-3 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">
                    <select value={lead.status || 'new'} onChange={(e) => updateStatus(lead.id, e.target.value)} className="px-2 py-1 border rounded text-xs">
                      <option value="new">Nouveau</option>
                      <option value="contacted">Contact\u00e9</option>
                      <option value="converted">Converti</option>
                      <option value="archived">Archiv\u00e9</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button variant="ghost" onClick={() => deleteLead(lead.id)} className="text-red-600 p-1"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsManager;
