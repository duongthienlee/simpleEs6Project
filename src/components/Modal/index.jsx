import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './index.scss'
export default forwardRef((props, ref) => {
    const [loaded, setLoaded] = useState(false)
    const [modalOpened, setOpen] = useState(false)
    /* Function components cannot be given refs
    so need to use forwardRef
    */
    useImperativeHandle(ref, () => ({
        openModal: (e) => {
            open(e)
        },
        closeModal: (e) => {
            close(e)
        }
    }))

    function toggle(e) {
        modalOpened ? close(e) : open(e)
    }
    function open(e) {
        if (!modalOpened) {
            typeof props.onOpen === "function" && props.onOpen(e)
        }
        setLoaded(true)
        setOpen(true)
    }

    function close(e) {
        if (modalOpened) {
            typeof props.onClose === "function" && props.onClose(e)
        }
        setLoaded(true)
        setOpen(false)
    }

    let type = "hidden"

    if (loaded) {
        type = modalOpened ? "open" : "closed"
    }
    const { className, entry, header, children, clickButton, buttonClass, buttonText } = props
    return (
        <div className={`modal ${className ? className : ''}`}>
            {entry &&
                <div className="modal__entry" onClick={(e) => toggle(e)}>
                    {entry}
                </div>
            }
            <div className={"modal__overlay " + type} onClick={(e) => toggle(e)}></div>
            <div className={"modal__content " + type} >
                <div className="modal__content__header">
                    <h4>{header}</h4>
                </div>
                <div className={`modal__content__body`}>
                    {children}
                </div>
                <div className="modal__content__btn-container">
                    <div className={`button ${buttonClass ? buttonClass : ''}`} onClick={clickButton}>{buttonText}</div>
                </div>
            </div>
        </div>
    );
})