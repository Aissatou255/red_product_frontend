import { useState, useEffect } from 'react';
import axios from 'axios';

const CLOUD_NAME = 'iyp1ap9k';
const UPLOAD_PRESET = 'hotel_photo';

function AddHotel({ onHotelAdded, editingHotel }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price_per_night: '',
    currency: 'XOF',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingHotel) {
      setFormData({
        name: editingHotel.name || '',
        address: editingHotel.address || '',
        email: editingHotel.email || '',
        phone: editingHotel.phone || '',
        price_per_night: editingHotel.price_per_night || '',
        currency: editingHotel.currency || 'XOF',
      });
    }
  }, [editingHotel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      let photo_url = editingHotel ? editingHotel.photo_url : null;

      if (photoFile) {
        const data = new FormData();
        data.append('file', photoFile);
        data.append('upload_preset', UPLOAD_PRESET);

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );
        photo_url = cloudinaryRes.data.secure_url;
      }

      if (editingHotel) {
        await axios.put(`http://127.0.0.1:8000/api/hotels/${editingHotel.id}`, {
          ...formData,
          photo_url,
        });
      } else {
        await axios.post('http://127.0.0.1:8000/api/hotels', {
          ...formData,
          photo_url,
        });
      }

      setFormData({ name: '', address: '', email: '', phone: '', price_per_night: '', currency: 'XOF' });
      setPhotoFile(null);
      if (onHotelAdded) onHotelAdded();

    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement de l'hôtel.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white border rounded shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b">
        <span className="text-gray-500">←</span>
        <h2 className="font-semibold tracking-wide text-sm">
          {editingHotel ? "MODIFIER L'HÔTEL" : 'CRÉER UN NOUVEAU HÔTEL'}
        </h2>
      </div>

      <div className="p-6 space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom de l'hôtel</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Adresse</label>
            <input name="address" value={formData.address} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">E-mail</label>
            <input name="email" value={formData.email} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Numéro de téléphone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Prix par nuit</label>
            <input name="price_per_night" type="number" value={formData.price_per_night} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Devise</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="w-full border rounded p-2">
              <option value="XOF">F XOF</option>
              <option value="EUR">Euro</option>
              <option value="USD">Dollar</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Ajouter une photo</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded p-8 text-center text-gray-400 cursor-pointer hover:bg-gray-50">
            <span className="text-3xl mb-2">🖼️</span>
            <span className="text-sm">{photoFile ? photoFile.name : (editingHotel ? 'Changer la photo (optionnel)' : 'Ajouter une photo')}</span>
            <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} className="hidden" />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={uploading} className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600">
            {uploading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddHotel;