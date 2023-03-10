import React from 'react';
import { ChevronLeft } from 'react-feather';

const Header = (props) => {
    return (
        <>
            <div className='header-container'>
                <div className='header-content d-flex '>
                    <span className=''>
                        <ChevronLeft />
                    </span>
                    <p>
                     {props.title}    
                    </p>
                    <span></span>
                </div>
            </div>
        </>
    );
}

export default Header;