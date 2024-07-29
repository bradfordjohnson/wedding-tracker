import React from 'react';

function SubcategoryForm({ formData, handleInputChange }) {
    const subcategories = [
        '',
        'Other',
        'Groom',
        'Bride',
        'Vendor',
        'Venue',
        'Service'
    ];

    return (
        <select
            className='form-select'
            name='subcategory'
            onChange={handleInputChange}
            value={formData.subcategory}
        >
            {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>{subcategory}</option>
            ))}
        </select>
    );
}

export default SubcategoryForm;
