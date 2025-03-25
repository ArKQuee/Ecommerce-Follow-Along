import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1a202c', color: 'white' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>ShopHub</h3>
            <p style={{ color: '#a0aec0' }}>Your one-stop shop for all your needs.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contact</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>FAQs</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Electronics</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Clothing</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home & Living</a></li>
              <li><a href="#" style={{ color: '#a0aec0', textDecoration: 'none' }}>Books</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#a0aec0' }}><Facebook size={24} /></a>
              <a href="#" style={{ color: '#a0aec0' }}><Twitter size={24} /></a>
              <a href="#" style={{ color: '#a0aec0' }}><Instagram size={24} /></a>
              <a href="#" style={{ color: '#a0aec0' }}><Mail size={24} /></a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #2d3748', textAlign: 'center', color: '#a0aec0' }}>
          <p>&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
