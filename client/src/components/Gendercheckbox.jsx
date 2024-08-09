import React from 'react'

const Gendercheckbox = () => {
    return (
        <div className='flex gap-5'>
            <div className='form-control'>
                <label htmlFor="maleCheckbox" className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Male</span>
                    <input type="checkbox" id="maleCheckbox" className='checkbox border-white' />
                </label>
            </div>
            <div className='form-control'>
                <label htmlFor="femaleCheckbox" className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Female</span>
                    <input type="checkbox" id="femaleCheckbox" className='checkbox border-white' />
                </label>
            </div>
        </div>
    )
}

export default Gendercheckbox