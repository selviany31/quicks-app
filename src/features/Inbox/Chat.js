import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import SVG from "react-inlinesvg"
import { useDispatch, useSelector } from "react-redux";
import "../../index.css"
import { getDetailInbox } from "../../store/action/inbox";
import { deleteChat, editChat, updateChat } from "../../store/slice/inbox";
import { formatDate } from "../../utils";

const Chat = ({ setShowChat, close, id }) => {
    const dispatch = useDispatch()

    const { detailInbox, loading } = useSelector((state) => state.dataInbox)

    const uid = () =>
        String(
            Date.now().toString(32) +
            Math.random().toString(16)
        ).replace(/\./g, '')

    const [newChat, setNewChat] = useState({
        id: uid(),
        participant: "You",
        message: "",
        time: new Date().toString()
    })
    const [type, setType] = useState("")
    const [idChat, setIdChat] = useState("")

    let groupBy = function(xs, key) {
        return xs?.reduce(function(rv, x) {
            (rv[x[key].slice(0,15)] = rv[x[key].slice(0,15)] || []).push(x);
            return rv;
        }, {});
    };

    const groupByTime = groupBy(detailInbox?.chats, "time")
    const groupKey = groupByTime ? Object.keys(groupByTime) : []

    const renderDate = (date) => {
        if(formatDate(new Date(), "dd mm yyyy") === formatDate(date, "dd mm yyyy")) {
            return `Today ${formatDate(date, "mmmm dd, yyyy")}`
        } else {
            return formatDate(date, "EEEE, dd mmm yyyy")
        }
    }

    const renderColor = (value) => {
        const bgColor = ['#FCEED3', '#D2F2EA']
        const color = ['#E5A443', '#43B78D']
        const filterParticipant = detailInbox?.participants.filter(el => el.name !== 'You')?.map((el, i) => {
            return {
                ...el,
                bg_color: bgColor[i % bgColor.length],
                color: color[i % color.length]
            }
        })

        return filterParticipant.filter(el => el.name === value)[0]
    }

    const onSubmit = () => {
        if(type === 'edit') {
            dispatch(editChat({
                id: idChat,
                message: newChat?.message
            }))
        } else {
            dispatch(updateChat(newChat))
        }
        setNewChat({...newChat, message: ""})
    }

    useEffect(() => {
        dispatch(getDetailInbox(id))
    },[dispatch, id])

    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{ padding: "24px 32px", borderBottom: "1px solid #828282" }}>
                <div className="d-flex align-items-center">
                    <Button className="bg-transparent border-0 p-0" onClick={() => setShowChat(false)}>
                        <SVG src="assets/icons/arrow-left.svg" />
                    </Button>
                    <div className="ms-3">
                        <p className="text-primary fw-bold mb-0">{detailInbox?.title}</p>
                        <p className="mb-0" style={{ fontSize: "12px" }}>{detailInbox?.participants?.length} Participants</p>
                    </div>
                </div>
                <Button 
                    className="bg-transparent border-0 p-0" 
                    onClick={() => {
                        close()
                        setShowChat(false)
                    }}
                >
                    <SVG src="assets/icons/close.svg" />
                </Button>
            </div>
            {loading ? "" : <div style={{ height: "570px"}} className="overflow-auto sidebar-menu">
                <div style={{ padding: "24px 32px" }}>
                    {groupKey?.map((key, i) => (
                        <>
                        <div key={i} className={`d-flex align-items-center ${i === 0 ? "" : "mt-5"}`} style={{ fontSize: "14px" }}>
                            <div style={{ width: "-webkit-fill-available", borderBottom: "1px solid #4F4F4F", height: "fit-content" }}></div>
                            <p className="mb-0 fw-bold text-center" style={{ width: "-webkit-fill-available" }}>{renderDate(key)}</p>
                            <div style={{ width: "-webkit-fill-available", borderBottom: "1px solid #4F4F4F", height: "fit-content" }}></div>
                        </div>
                        {groupByTime?.[`${key}`]?.map((chat, i) => (
                            <div className="mb-3">
                                <div style={{ fontSize: "14px" }}>
                                    <p 
                                        className={`fw-bold mb-0 ${chat?.participant === "You" ? "text-end" : ""}`} 
                                        style={{ color: chat?.participant === 'You' ? "#9B51E0" : `${renderColor(chat?.participant)?.color}` }}
                                    >
                                        {chat?.participant}
                                    </p>
                                    <div 
                                        className={`d-flex ${chat?.participant === 'You' ? "justify-content-end" : ""} d-flex align-items-start`}
                                        style={{ flexDirection: chat?.participant === 'You' ? "row" : "" }}
                                    >
                                        <Card style={{ background : chat?.participant === 'You' ? "#EEDCFF" : `${renderColor(chat?.participant)?.bg_color}`, order: chat?.participant === 'You' ? "2" : "", width: "max-content", maxWidth: "518px", color: "#4F4F4F" }} className="border-0">
                                            <Card.Body className="p-2">
                                                <p className="mb-2">{chat?.message}</p>
                                                <p className="mb-0" style={{ fontSize: "12px" }}>{formatDate(chat?.time, "hh:mm")}</p>
                                            </Card.Body>
                                        </Card>
                                        <Dropdown className="mx-1">
                                            <Dropdown.Toggle
                                                className="bg-white border-0 p-0 m-0 d-flex justify-content-end"
                                            >
                                            <SVG src="assets/icons/more.svg" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="menu" style={{ width: "126px" }}>
                                                <Dropdown.Item 
                                                    onClick={() => {
                                                        if(chat?.participant === 'You') {
                                                            setNewChat({...newChat, message: chat?.message})
                                                            setType("edit")
                                                            setIdChat(chat?.id)
                                                        }
                                                    }} 
                                                    className="text-primary border-bottom"
                                                >
                                                    {chat?.participant === 'You' ? 'Edit' : 'Share'}
                                                </Dropdown.Item>
                                                <Dropdown.Item 
                                                    onClick={() => chat?.participant === 'You' && dispatch(deleteChat(chat?.id))}
                                                    className={`${chat?.participant === 'You' ? "text-danger" : "text-primary"}`}
                                                >
                                                    {chat?.participant === 'You' ? 'Delete' : 'Reply'}
                                                </Dropdown.Item>
                                                    
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </>
                    ))}
                </div>
            </div>}
            <div className="px-4 mt-4 d-flex justify-content-between">
                <Form.Control 
                    type="text" 
                    placeholder="Type a new message" 
                    className="me-3"
                    value={newChat.message}
                    onChange={(e) => {
                        setNewChat({...newChat, message: e.target.value})
                    }}
                />
                <Button 
                    type="submit" 
                    onClick={onSubmit}
                >
                    Send
                </Button>
            </div>
        </>
    );
}
 
export default Chat;