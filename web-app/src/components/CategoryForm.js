import React from 'react';

function CategoryForm({ formData, handleInputChange }) {
    const categories = [
        'Wedding',
        'Wedding Party',
        'Honeymoon',
        'Rehearsal'
    ];

    return (
        <select
            className='form-select'
            name='category'
            onChange={handleInputChange}
            value={formData.category}
        >
            {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </select>
    );
}

export default CategoryForm;
