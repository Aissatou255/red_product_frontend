import { useState, useEffect } from 'react';
import axios from 'axios';

const CLOUD_NAME = 'iyp1ap9k';
const UPLOAD_PRESET = 'hotel_photo';
const API_URL = 'https://red-product-backend-qqo1.onrender.com';

const NAME_MAX = 60;
const ADDRESS_MAX = 100;
const EMAIL_MAX = 100;
const PHONE_MAX = 15;
const PRICE_MAX = 10;

function AddHotel({ onHotelAdded, editingHotel, onClose, onError }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price_per_night: '',
    currency: 'XOF',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

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
      if (editingHotel.photo_url) {
        setPhotoPreview(editingHotel.photo_url);
      }
    }
  }, [editingHotel]);

  const handleChange = (e) => {
    const { name, value, maxLength } = e.target;
    const trimmed = maxLength && maxLength > 0 ? value.slice(0, maxLength) : value;
    setFormData({ ...formData, [name]: trimmed });
    setFieldErrors({ ...fieldErrors, [name]: null });
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, PHONE_MAX);
    setFormData({ ...formData, phone: digitsOnly });
    setFieldErrors({ ...fieldErrors, phone: null });
  };

  const handlePriceChange = (e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, PRICE_MAX);
    setFormData({ ...formData, price_per_night: digitsOnly });
    setFieldErrors({ ...fieldErrors, price_per_night: null });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setFieldErrors({ ...fieldErrors, photo: null });
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Le nom de l'hôtel est requis.";
    if (!formData.address.trim()) errors.address = "L'adresse est requise.";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format d'e-mail invalide.";
    }

    if (formData.phone && formData.phone.length < 8) {
      errors.phone = "Le numéro doit contenir au moins 8 chiffres.";
    }

    if (!formData.price_per_night) {
      errors.price_per_night = "Le prix par nuit est requis.";
    } else if (Number(formData.price_per_night) <= 0) {
      errors.price_per_night = "Le prix doit être supérieur à 0.";
    }

    if (!editingHotel && !photoFile) {
      errors.photo = "Une photo est requise.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setUploading(true);
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
        await axios.put(`${API_URL}/api/hotels/${editingHotel.id}`, {
          ...formData,
          photo_url,
        });
      } else {
        await axios.post(`${API_URL}/api/hotels`, {
          ...formData,
          photo_url,
        });
      }

      setFormData({ name: '', address: '', email: '', phone: '', price_per_night: '', currency: 'XOF' });
      setPhotoFile(null);
      setPhotoPreview(null);
      setFieldErrors({});
      if (onHotelAdded) onHotelAdded();

    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement de l'hôtel.");
      if (onError) onError();
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-2 px-6 py-4 border-b border-dashed border-gray-300">
        <div className="flex items-center gap-2">
          {onClose && (
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">←</button>
          )}
          <h2 className="font-semibold tracking-wide text-sm text-gray-700">
            {editingHotel ? "MODIFIER L'HÔTEL" : 'CRÉER UN NOUVEAU HÔTEL'}
          </h2>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        )}
      </div>

      <div className="p-6 space-y-5">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom de l'hôtel</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={NAME_MAX}
              className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="flex justify-between items-center mt-1">
              {fieldErrors.name ? (
                <p className="text-red-600 text-xs">{fieldErrors.name}</p>
              ) : <span />}
              <span className="text-xs text-gray-400">{formData.name.length}/{NAME_MAX}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Adresse</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={ADDRESS_MAX}
              className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${fieldErrors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            <div className="flex justify-between items-center mt-1">
              {fieldErrors.address ? (
                <p className="text-red-600 text-xs">{fieldErrors.address}</p>
              ) : <span />}
              <span className="text-xs text-gray-400">{formData.address.length}/{ADDRESS_MAX}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={EMAIL_MAX}
              className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.email && <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Numéro de téléphone</label>
            <input
              name="phone"
              type="text"
              inputMode="numeric"
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={PHONE_MAX}
              className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.phone && <p className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Prix par nuit</label>
            <input
              name="price_per_night"
              type="text"
              inputMode="numeric"
              value={formData.price_per_night}
              onChange={handlePriceChange}
              maxLength={PRICE_MAX}
              className={`w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 ${fieldErrors.price_per_night ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.price_per_night && <p className="text-red-600 text-xs mt-1">{fieldErrors.price_per_night}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Devise</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="XOF">F XOF</option>
              <option value="EUR">Euro</option>
              <option value="USD">Dollar</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Ajouter une photo</label>
          <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-40 text-center text-gray-400 cursor-pointer hover:bg-gray-50 overflow-hidden relative ${fieldErrors.photo ? 'border-red-500' : 'border-gray-300'}`}>
            {photoPreview ? (
              <>
                <img src={photoPreview} alt="Aperçu" className="absolute inset-0 w-full h-full object-contain bg-gray-50" />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <span className="opacity-0 hover:opacity-100 text-white text-xs font-medium">Changer la photo</span>
                </div>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 mb-2 text-gray-300">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span className="text-sm">Ajouter une photo</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
          {fieldErrors.photo && <p className="text-red-600 text-xs mt-1">{fieldErrors.photo}</p>}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 text-sm"
          >
            {uploading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddHotel;