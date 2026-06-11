import React from 'react';

const H1text = ({children}) => {
    return <h1 className=' text-center text-2xl md:text-3xl leading-tight lg:text-4xl text-primary font-semibold '>
        {children}
        </h1>
};

export default H1text;