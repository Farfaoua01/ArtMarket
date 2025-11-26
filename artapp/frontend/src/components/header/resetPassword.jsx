import React from 'react';
import { Modal, ModalBody } from 'react-bootstrap';


function ResetPassword({ showrp, onHiderp }) {
    return (
        <>
            <Modal show={showrp} onHide={onHiderp} backdrop='static'>
                <Modal.Body >
                    <div style={{ padding: '10px', fontSize: '19px', fontFamily: 'Playfair Display' }}>
                        Log out ! You're succefully log out from your account .
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ResetPassword;