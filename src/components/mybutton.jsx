import React from 'react';
// import { Button } from 'react-bootstrap';


function MyButton({ title, onClick, style }) {
    return (
        // <Button type='submit' className='button'>Add to Cart</Button>
        <button onClick={onClick} style={style} className='button bg-primary'>{title}</button>
    )
}

export default MyButton