import { Button, Form, Spinner } from "react-bootstrap";
import SVG from "react-inlinesvg"
import { useSelector } from "react-redux";
import { formatDate } from "../../utils";

const InboxList = ({ setShowChat, setId }) => {
    const { inboxes, loading } = useSelector((state) => state.dataInbox)
    console.log(inboxes?.[0]?.chats?.[0]?.time);
    console.log(new Date(inboxes?.[0]?.chats?.[0]?.time).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric"
      }));
      console.log(formatDate(inboxes?.[0]?.chats?.[0]?.time,"mmm dd, yyyy"), formatDate(inboxes?.[0]?.chats?.[0]?.time,"hh:mm:ss"));
    return (
        <div style={{ padding: "24px 32px" }}>
            <Form.Control type="text" placeholder="Search" className="ps-5"/>
            {loading ? 
            <div className="d-flex justify-content-center">
                <div className="text-center">
                    <Spinner variant="secondary"/>
                    <p className="fw-bold" style={{ color: "#4F4F4F", fontSize: "14px" }}>Loading Chats...</p>
                </div>
            </div> : inboxes?.map((inbox, i) => (
                <Button 
                    key={i}
                    className="d-flex align-items-center bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 text-black w-100" 
                    style={{ padding: "22px 0px", borderBottom: "1px solid #828282"}}
                    onClick={() => {
                        setShowChat(true)
                        setId(inbox?.id)
                    }}
                >
                    <SVG src="assets/icons/pictures.svg" className="me-3"/>
                    <div className="w-100">
                        <div className="d-flex">
                            <p className="text-primary fw-bold mb-0 text-start" style={{ maxWidth: "400px" }}>{inbox?.title}</p>
                            <p className="ps-4 mb-0">{formatDate(inbox?.chats?.[0]?.time, "mmm dd, yyyy")}</p>
                        </div>
                        <div>
                            <p className="fw-bold mb-0 text-start" style={{ fontSize: "14px" }}>{inbox?.chats?.[0]?.participant}:</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0" style={{ fontSize: "12px" }}>{inbox?.chats?.[0]?.message}</p>
                                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EB5757", display: "inline-block"}}></div>
                            </div>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
}
 
export default InboxList;