import React,{useReducer} from "react";
// import {v4 as uuid} from "uuid";
import axios from "axios";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../Types";

const ContactState = props => {
    const initialState ={
        contacts:null,
        current: null,
        filtered: null,
        error:null,
    };

    const [state,dispatch] = useReducer(ContactReducer,initialState);

    // Get contacts
    const getContacts = async() => {
            try{
                const res = await axios.get("/api/contacts");

                dispatch({
                             type: GET_CONTACTS,
                             payload:res.data
                         });
            }
            catch(error){
                dispatch({
                    type: CONTACT_ERROR,
                    payload: error.res.msg
                });
            }
        }



    // Add Contact
    const addContact = async (contact) => {
        // contact.id = uuid;

        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }

        try{
            const res = await axios.post("/api/contacts",contact,config);

            dispatch({
                type: ADD_CONTACT,
                payload:res.data
            });
        }
        catch(error){
            dispatch({
                type: CONTACT_ERROR,
                payload: error.res.msg
            });
        }

    }

    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                "Content-type":"application/json"
            }
        }

        try{
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);

            dispatch({type: UPDATE_CONTACT,payload:res.data});

        }
        catch(error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.res.msg
            });
        }
    }

    // Delete Contact
    const deleteContact = async (id) => {

        try{
            await axios.delete(`/api/contacts/${id}`);

            dispatch({type: DELETE_CONTACT,payload:id});
        }
        catch(error){
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            });
        }

    }

    // Clear Contacts
    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACTS})
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT,payload:contact});
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }


    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({type: FILTER_CONTACTS,payload:text});
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }


    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current:state.current,
            filtered:state.filtered,
            error: state.error,
            loading:state.loading,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;

