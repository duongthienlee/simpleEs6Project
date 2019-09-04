import React, { useEffect, useRef } from 'react';
import Modal from 'components/Modal'
import './index.scss'
export default () => {
    const welcomeModalRef = useRef(null)

    useEffect(() => {
        welcomeModalRef.current.openModal()
    }, [])

    return (
        <Modal
            ref={welcomeModalRef}
            clickButton={() => { welcomeModalRef.current.closeModal() }}
            header="Weather app"
            buttonText="Got it"
            buttonClass="confirm"
            entry={null}
        >
            <div className="content">
                Welcome to my simple replicas weather app from openweathermap!
                <p>
                    Simply put the city's name, comma, 2-letter country code (ISO3166).<br /> You will get all proper cities in chosen country.<br />
                    The order is important - the first is city name then comma then country.<br />  Example - London, GB or New York, US.
                </p>
            </div>
        </Modal>
    )
}