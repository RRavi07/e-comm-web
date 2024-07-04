import React, { useState, createContext, useEffect } from 'react';
export const AddressContext = createContext();

const AddressState = (props) => {
    const host = "http://localhost:5000";
    const [addresses, setAddresses] = useState([]);

    // Fetch all addresses for the user
    const fetchAddresses = async () => {
        try {
            const response = await fetch(`${host}/api/address/fetchall`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setAddresses(json);
        } catch (error) {
            console.error(error);
        }
    };

    // Add a new address
    const addAddress = async (address, city, postalCode, country) => {
        try {
            const response = await fetch(`${host}/api/address/addAddress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ address, city, postalCode, country })
            });
            const json = await response.json();
            setAddresses([...addresses, json]);
        } catch (error) {
            console.error(error);
        }
    };

    // Update an address
    const updateAddress = async (id, address, city, postalCode, country) => {
        try {
            const response = await fetch(`${host}/api/addresses/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ address, city, postalCode, country })
            });
            const json = await response.json();
            setAddresses(addresses.map(addr => addr._id === id ? json : addr));
        } catch (error) {
            console.error(error);
        }
    };

    // Delete an address
    const deleteAddress = async (id) => {
        try {
            await fetch(`${host}/api/address/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            setAddresses(addresses.filter(addr => addr._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

 // Toggle primary address
 const togglePrimaryAddress = async (id) => {
    try {
        const response = await fetch(`${host}/api/address/makePrimary/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setAddresses(addresses.map(addr => {
            if (addr._id === id) {
                return json;
            } else {
                return { ...addr, primary: false };
            }
        }));
    } catch (error) {
        console.error(error);
    }
};

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <AddressContext.Provider value={{ addresses, fetchAddresses, addAddress, updateAddress, deleteAddress, togglePrimaryAddress }}>
            {props.children}
        </AddressContext.Provider>
    );
};

export default AddressState;
