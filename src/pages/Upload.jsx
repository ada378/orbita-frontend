import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { uploadAPI, itineraryAPI } from '../utils/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError('');
      setUploadResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024
  });

  const handleUpload = async () => {
    if (!file) { setError('Please select a file first'); return; }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadAPI.upload(formData);
      setUploadResult(res.data.upload);
      toast.success('File uploaded & text extracted!');
    } catch (err) { setError(err.response?.data?.message || 'Upload failed');
      toast.error('Upload failed');
    } finally { setUploading(false); }
  };

  const handleGenerate = async () => {
    if (!uploadResult) return;
    setGenerating(true);
    try {
      const res = await itineraryAPI.create({ uploadId: uploadResult.id });
      toast.success('AI itinerary generated!');
      navigate(`/itinerary/${res.data.itinerary._id}`);
    } catch (err) { setError(err.response?.data?.message || 'Generation failed');
      toast.error('Itinerary generation failed');
    } finally { setGenerating(false); }
  };

  return (
    <div className="page-container">
      <div className="page-header"><h1>Upload Booking</h1></div>
      <div className="upload-container">
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone-active' : ''} ${file ? 'dropzone-has-file' : ''}`}>
          <input {...getInputProps()} />
          {file ? (
            <div className="file-selected">
              <div className="file-icon">F</div>
              <p className="file-name">{file.name}</p>
              <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : isDragActive ? <p>Drop your file here...</p> : (
            <div className="dropzone-content">
              <div className="dropzone-icon">+</div>
              <p>Drag & drop your booking document here</p>
              <p className="dropzone-hint">Supports PDF, JPG, PNG (Max 10MB)</p>
            </div>
          )}
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="upload-actions">
          {!uploadResult ? (
            <button className="btn btn-primary btn-block" onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Upload & Extract'}
            </button>
          ) : (
            <div className="upload-success">
              <div className="success-message">Text extracted from "{uploadResult.originalName}"</div>
              <div className="extracted-preview">
                <h4>Extracted Text Preview</h4>
                <p>{uploadResult.extractedText?.slice(0, 300)}...</p>
              </div>
              <button className="btn btn-primary btn-block" onClick={handleGenerate} disabled={generating}>
                {generating ? 'Generating Itinerary...' : 'Generate AI Itinerary'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
