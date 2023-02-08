import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css"
import { getDataInbox } from "../../store/action/inbox";
import Chat from "./Chat";
import InboxList from "./InboxList";


const InboxComponent = ({ show, close }) => {
    const dispatch = useDispatch()

    const [showChat, setShowChat] = useState(false)
    const [id, setId] = useState()

    useEffect(() => {
        dispatch(getDataInbox())
    },[dispatch])

    return (
        <Modal show={show} onHide={close} className="modal-custom me-3">
            {showChat ? <Chat setShowChat={setShowChat} close={close} id={id}/> : <InboxList setShowChat={setShowChat} setId={setId} />}
        </Modal>
    );
}
 
export default InboxComponent;