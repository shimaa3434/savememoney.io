import React from 'react';
import { modalPropsInt } from '../../TypeScript/App Interfaces';



const Modal:React.FC<modalPropsInt> = ({children, underlayclassName, modalclassName, containerclassName, toggleStatus, toggleModal, closeOnUnderlayClick}) => {
    
    return (
        <div className='flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen'>
            <div className={`${underlayclassName}`} onClick={() => {
                if (toggleStatus && closeOnUnderlayClick) {toggleModal(false); document.body.style.overflowY='unset';}
            }}>
            </div>

            <div className={`${modalclassName}`}>
                {children}
            </div>
    
        </div>
    )
}

Modal.defaultProps = {

    closeOnUnderlayClick: true,
    underlayclassName: 'top-0 bottom-0 left-0 right-0 fixed z-10 bg-modalunderlay w-screen h-screen',
    modalclassName: 'w-4/6 h-full bg-white flex fixed flex-col z-20 top-0 right-0 left-0 bottom-0',
    containerclassName: 'flex flex-col items-center h-screen w-screen fixed z-10 top-0 left-0 right-0 bottom-0'
} 

export default Modal;