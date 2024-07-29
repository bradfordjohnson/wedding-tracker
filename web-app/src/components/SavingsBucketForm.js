import React from 'react';

function SavingsBucketForm({ formData, handleInputChange }) {
    const savingsBuckets = [
        '',
        'General Wedding and Savings',
        'Honeymoon Savings'
    ];

    return (
        <select
            className='form-select'
            name='savingsBuckets'
            onChange={handleInputChange}
            value={formData.savings_bucket}
        >
            {savingsBuckets.map((savingsBucket, index) => (
                <option key={index} value={savingsBucket}>{savingsBucket}</option>
            ))}
        </select>
    );
}

export default SavingsBucketForm;
