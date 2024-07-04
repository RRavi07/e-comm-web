import React, { useState, useContext } from 'react';
import { AddressContext } from '../context/AddressState';
import styles from './Css/AddAddressForm.module.css';

const AddAddressForm = () => {
    const { addAddress } = useContext(AddressContext);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addAddress(address, city, postalCode, country);
        setAddress('');
        setCity('');
        setPostalCode('');
        setCountry('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="postalCode" className={styles.label}>Postal Code:</label>
                <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="country" className={styles.label}>Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>
            <button type="submit" className={styles.button}>Add Address</button>
        </form>
    );
};

export default AddAddressForm;
