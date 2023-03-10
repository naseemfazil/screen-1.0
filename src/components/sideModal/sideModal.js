import React, { useEffect, useState } from 'react';
import '../../styles/_sideModal.css';
import { MinusCircle } from 'react-feather';
import Header from '../header/header';

const SideModal = () => {
    let arr = [
        {
            label: "First Name", value: "first_name", traits: 'User'
        },
        {
            label: "Last Name", value: "last_name", traits: 'User'
        },
        {
            label: "Gender", value: "gender", traits: 'User'
        },
        {
            label: "Account Name", value: "account_name", traits: 'Group'
        },
        {
            label: "Age", value: "age", traits: 'User'
        },
        {
            label: "City", value: "city", traits: 'Group'
        },
        {
            label: "State", value: "state", traits: 'Group'
        }
    ];

    const [newSchema, setNewSchema] = useState([0]);
    const [userSelectValue, setUserSelectValue] = useState([]);
    const [name, setName] = useState('');

    const addNewSchema = () => {
        const lengthArr = newSchema?.length || 0
        if (lengthArr === 0)
            setNewSchema([0]);
        else
            setNewSchema([...newSchema, lengthArr]);
    }

    const setUserSelectedValue = (value) => {
        const lengthArr = newSchema?.length - 1 || 0
        const selectValue = arr.find(arrValue => arrValue && arrValue.label === value);
        const newArr = [...userSelectValue];
        newArr[lengthArr] = selectValue;
        setUserSelectValue(newArr);
    }

    const onSave = () => {
        const uploadSchemaArr = userSelectValue.map(value => {
            return { [value.value]: value.label }
        });
        const uploadObject = {
            "segment_name": name || '',
            "schema": uploadSchemaArr
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(uploadObject)
        };
        fetch('https://webhook.site/eaa0e645-eb5c-4485-90f9-e7c17ae43667', requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data); });
    }

    const renderValue = (index) => {
        let value = ''
        if (userSelectValue[index])
            value = userSelectValue[index].label
        return value
    }

    return (
        <>
            <div className='main'>
                <Header title="View Audience" />
                <div className='d-flex justify-content-center mt-2'>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Save segment
                    </button>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-slideout" role="document">
                        <div class="modal-content">
                            <div class="">
                                <Header title="Saving Segment" />
                            </div>
                            <div class="modal-body">
                                <div className='segment-content'>
                                    <label className='text-dark'>Enter the Name of  Segment</label>
                                    <input type="text" placeholder='Name of the segment' value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                                    <p>To save your segment, you need to add the schemas to build the qury</p>
                                    <div className='d-flex justify-content-end'>
                                        <p className='mr-2'><span className='green-dot'></span> -User Traits</p>
                                        <p><span className='red-dot'></span> -Group Traits</p>
                                    </div>
                                </div>

                                {newSchema.map(value => (
                                    <>
                                        <div className='segment-group-dropdown'>
                                            <div class="form-group">
                                                <div className='row'>
                                                    {!!userSelectValue[value] ?
                                                        userSelectValue[value].traits === 'User' ?
                                                            <div className='col-md-1 d-flex align-items-center'>
                                                                <span className='green-dot'></span>
                                                            </div> :
                                                            <div className='col-md-1 d-flex align-items-center'>
                                                                <span className='red-dot'></span>
                                                            </div> :
                                                        <div className='col-md-1 d-flex align-items-center'>
                                                            <span className='grey-dot'></span>
                                                        </div>
                                                    }
                                                    <div className='col-md-9'>
                                                        <select class="form-control" id="exampleFormControlSelect1" value={renderValue(value)} onChange={(event) => setUserSelectedValue(event.target.value)}>
                                                            <option>
                                                                Add Schema to Segment
                                                            </option>
                                                            {arr.map(value => <option>{value.label}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                                <a href='#' className='add-new_schema' onClick={() => { addNewSchema() }}>+Add new schema</a>
                            </div>
                            <div class="segment-modal_footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button> */}
                                <button onClick={onSave} className='segment-btn'>Save the Segment</button>
                                <button className='cancel-btn' data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SideModal;