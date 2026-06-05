import React from 'react';
import { Select, Tag } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons';
import { DEPARTMENTS } from '../services/api.js';

const { Option } = Select;

const DepartmentSelector = ({ value, onChange }) => {
  const dept = value ? DEPARTMENTS[value] : null;

  return (
    <div className="ppe-card animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
      <div className="section-header">
        <div className="section-icon">
          <ApartmentOutlined />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>Department Selection</h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
            Select work zone to load PPE requirements
          </p>
        </div>
      </div>

      <Select
        placeholder="— Select Department —"
        value={value || undefined}
        onChange={onChange}
        style={{ width: '100%', marginBottom: dept ? 16 : 0 }}
        size="large"
        showSearch
        optionFilterProp="children"
        dropdownStyle={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-primary)',
        }}
      >
        {Object.values(DEPARTMENTS).map((d) => (
          <Option key={d.id} value={d.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 0' }}>
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.2 }}>
                  {d.description}
                </div>
              </div>
            </div>
          </Option>
        ))}
      </Select>

      {/* Department Info Card */}
      {dept && (
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-primary)',
          borderLeft: `3px solid ${dept.color}`,
          borderRadius: 10,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{dept.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 4 }}>
              {dept.label}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10 }}>
              {dept.description}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Required PPE:
              </span>
              <Tag style={{
                background: `${dept.color}18`,
                border: `1px solid ${dept.color}40`,
                color: dept.color,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 11,
              }}>
                {dept.required_ppe.length} items
              </Tag>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentSelector;
