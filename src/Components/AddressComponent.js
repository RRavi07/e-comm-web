
import React, { useContext, useEffect, useState } from 'react';
import { AddressContext } from '../context/AddressState';
import styles from './Css/AddressComponent.module.css';
import AddAddressForm from './AddAddressForm';
import Login from './login';

const AddressComponent = () => {
    const { addresses, fetchAddresses, deleteAddress, togglePrimaryAddress } = useContext(AddressContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     fetchAddresses();
    // }, []);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsModalOpen(true)
        } else {
            fetchAddresses();
        }
    }, [])

    const handleSelectPrimary = async (id) => {
        try {
            await togglePrimaryAddress(id);
            fetchAddresses();

        } catch (err) {
            console.log(err);
        }
    };

    return (<>  {(!localStorage.getItem('token')) ? <div className={styles.login}>
        <Login isOpen={isModalOpen} onClose={() => { (localStorage.getItem('token')) ? setIsModalOpen(false) : setIsModalOpen(true) }} />
    </div> :
        <div className={styles.container}>
            <h2 className={styles.title}>Your Addresses</h2>
            <ul className={styles.addressList}>
                {addresses && addresses.map((address) => (
                    <li key={address._id} className={styles.addressItem}>
                        <p>{address.address}, {address.city}, {address.postalCode}, {address.country}</p>
                        <input
                            type='radio'
                            name='primaryAddress'
                            checked={address.primary}
                            onChange={() => handleSelectPrimary(address._id)}
                        />
                        <label>Set as Primary</label>
                        <button onClick={() => deleteAddress(address._id)} className={styles.button}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add New Address</h3>
            <AddAddressForm />
        </div>}
    </>
    );
};

export default AddressComponent;
