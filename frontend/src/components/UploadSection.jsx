import React, { useState } from 'react';
import { Upload, Button, Tag, Progress, Tooltip, message } from 'antd';
import {
  InboxOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Dragger } = Upload;

const ACCEPTED_TYPES = {
  video: { extensions: ['.mp4', '.avi', '.mov'], mime: 'video/mp4,video/x-msvideo,video/quicktime', label: 'Video' },
  image: { extensions: ['.jpg', '.jpeg', '.png'], mime: 'image/jpeg,image/png', label: 'Image' },
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

const getFileType = (file) => {
  if (!file) return null;
  if (file.type?.startsWith('video/')) return 'video';
  if (file.type?.startsWith('image/')) return 'image';
  const name = file.name?.toLowerCase() || '';
  if (['.mp4', '.avi', '.mov'].some(e => name.endsWith(e))) return 'video';
  if (['.jpg', '.jpeg', '.png'].some(e => name.endsWith(e))) return 'image';
  return 'unknown';
};

const UploadSection = ({ onFileSelected, selectedFile }) => {
  const [uploadProgress] = useState(100);
  const fileType = getFileType(selectedFile);

  const handleUpload = (file) => {
    const type = getFileType(file);
    if (type === 'unknown') {
      message.error('Unsupported file format. Please upload MP4, AVI, MOV, JPG, or PNG.');
      return false;
    }

    const maxSize = type === 'video' ? 500 * 1024 * 1024 : 20 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error(`File too large. Max size: ${type === 'video' ? '500MB' : '20MB'}`);
      return false;
    }

    onFileSelected(file);
    return false; // Prevent auto-upload
  };

  const handleRemove = () => onFileSelected(null);

  const draggerProps = {
    name: 'file',
    multiple: false,
    accept: `${ACCEPTED_TYPES.video.mime},${ACCEPTED_TYPES.image.mime}`,
    beforeUpload: handleUpload,
    showUploadList: false,
  };

  return (
    <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.1s' }}>

      {/* ── Header ── */}
      <div className="section-header">
        <div className="section-icon">
          <InboxOutlined />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Upload Media</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            Supports video footage and still images
          </p>
        </div>
      </div>

      {/* ── Upload Area ── */}
      {!selectedFile ? (
        <Dragger {...draggerProps} className="upload-area-custom" style={{ borderRadius: 12 }}>
          <div style={{ padding: '20px 0' }}>
            <p className="ant-upload-drag-icon" style={{ marginBottom: 12 }}>
              <InboxOutlined style={{ fontSize: 48, color: 'var(--brand-primary)' }} />
            </p>
            <p style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 6,
            }}>
              Drop your file here or click to browse
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
              Drag & drop video footage or captured images for PPE analysis
            </p>

            {/* Format chips */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: 'MP4', icon: <VideoCameraOutlined />, color: '#0ea5e9' },
                { label: 'AVI', icon: <VideoCameraOutlined />, color: '#0ea5e9' },
                { label: 'MOV', icon: <VideoCameraOutlined />, color: '#0ea5e9' },
                { label: 'JPG', icon: <FileImageOutlined />, color: '#10b981' },
                { label: 'PNG', icon: <FileImageOutlined />, color: '#10b981' },
              ].map(({ label, icon, color }) => (
                <Tag
                  key={label}
                  icon={icon}
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}35`,
                    color: color,
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: '0.5px',
                  }}
                >
                  {label}
                </Tag>
              ))}
            </div>

            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
              Max: 500MB (video) · 20MB (image)
            </p>
          </div>
        </Dragger>
      ) : (

        /* ── File Details Card ── */
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-primary)',
          borderRadius: 12,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* File type icon */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: fileType === 'video'
                ? 'rgba(14, 165, 233, 0.15)'
                : 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${fileType === 'video' ? 'rgba(14,165,233,0.35)' : 'rgba(16,185,129,0.35)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {fileType === 'video'
                ? <VideoCameraOutlined style={{ fontSize: 24, color: 'var(--brand-primary)' }} />
                : <FileImageOutlined style={{ fontSize: 24, color: 'var(--color-success)' }} />
              }
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-bright)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {selectedFile.name}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  <FileOutlined style={{ marginRight: 4 }} />
                  {formatFileSize(selectedFile.size)}
                </span>
                <Tag
                  icon={<CheckCircleOutlined />}
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    color: '#10b981',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  Ready for Analysis
                </Tag>
                <Tag style={{
                  background: fileType === 'video'
                    ? 'rgba(14,165,233,0.12)'
                    : 'rgba(16,185,129,0.12)',
                  border: `1px solid ${fileType === 'video' ? 'rgba(14,165,233,0.35)' : 'rgba(16,185,129,0.35)'}`,
                  color: fileType === 'video' ? 'var(--brand-primary)' : 'var(--color-success)',
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                }}>
                  {fileType === 'video' ? '🎬 Video' : '🖼️ Image'}
                </Tag>
              </div>
            </div>

            <Tooltip title="Remove file">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={handleRemove}
                style={{ color: 'var(--color-danger)', opacity: 0.7 }}
                danger
              />
            </Tooltip>
          </div>

          {/* Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Upload Complete</span>
              <span style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 600 }}>
                {uploadProgress}%
              </span>
            </div>
            <Progress
              percent={uploadProgress}
              strokeColor={{
                from: '#0ea5e9',
                to: '#10b981',
              }}
              trailColor="rgba(148,163,184,0.1)"
              showInfo={false}
              strokeWidth={6}
              style={{ margin: 0 }}
            />
          </div>

          {/* Re-upload option */}
          <Upload {...draggerProps} showUploadList={false}>
            <Button
              type="text"
              size="small"
              style={{ fontSize: 12, color: 'var(--text-muted)' }}
            >
              Replace with different file
            </Button>
          </Upload>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
