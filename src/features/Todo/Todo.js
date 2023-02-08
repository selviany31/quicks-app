import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { updateDataTodo } from "../../store/action/todo";
import SVG from "react-inlinesvg"
import { formatDate } from "../../utils";

const Todo = ({ todo }) => {
    const dispatch = useDispatch()

    const [selectedId, setSelectedId] = useState([])
    const handleButton = (value) => {
        if(selectedId.includes(value)) {
            return setSelectedId(selectedId.filter(el => el !== value))
        } else {
            return setSelectedId(selectedId.concat(value))
        }
    }
    const [edit, setEdit] = useState([])
    const handleEditButton = (value) => {
        if(edit.includes(value)) {
            return setEdit(edit.filter(el => el !== value))
        } else {
            return setEdit(edit.concat(value))
        }
    }

    const [newTask, setNewTask] = useState({
        title: todo?.title ? todo?.title : "",
        date: todo?.date ? todo?.date : "",
        desc: todo?.desc ? todo?.desc : "",
        bookmark: todo?.bookmark?.length ? todo?.bookmark : [],
        done: todo?.done ? todo?.done : 0,
    })

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(formatDate(todo?.date, "yyyy, mm, dd"));
    const secondDate = new Date();

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    console.log(diffDays, firstDate, secondDate, todo?.title, todo?.date, formatDate(todo?.date, "yyyy, mm, dd"));
    console.log(secondDate < firstDate);

    const onSubmit = (e, id) => {
        e.preventDefault()
        dispatch(updateDataTodo({
            id,
            data: newTask
        }))
        setEdit([])
    }

    const renderBookmark = (value) => {
        console.log(value, newTask?.bookmark);
        let bookmarks = newTask?.bookmark?.concat(value)
        return [...new Set(bookmarks)] 
    }

    const renderColor = (value) => {
        switch (value) {
            case 'Important ASAP':
                return "#9DD0ED"
            case 'Offline Meeting':
                return "#FDCFA4"
            case 'Virtual Meeting':
                return "#F9E9C3"
            case 'ASAP':
                return "#AFEBDB"
            case 'Client Related':
                return "#CBF1C2"
            case 'Self Task':
                return "#CFCEF9"
            case 'Appointments':
                return "#F9E0FD"
            case 'Court Related':
                return "#9DD0ED"
            default:
                return ""
        }
    }

    return (
        <Form className="d-flex" style={{ borderBottom: "1px solid #4F4F4F", margin: "22px 0" }}>
            <Form.Check type="checkbox" className="bg-transparent" checked={todo?.done}/>
            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between mb-2 ms-4">
                    {todo?.title ? <p className={`fw-bold mb-0 ${todo?.done ? "text-decoration-line-through" : ""}`}>{todo?.title}</p> : 
                        <Form.Control 
                        type="text" 
                        placeholder="Type Task Title" 
                        style={{ width: "380px" }} 
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />}
                    <div className="d-flex align-items-center">
                        {diffDays > 0 && secondDate < firstDate && <p className="me-2 mb-0 text-danger">{diffDays} Days Left</p>}
                        <p className="ms-1 mb-0">{todo?.date}</p>
                        <Button 
                            className="bg-transparent border-0 p-0 mx-3"
                            onClick={() => handleButton(todo?.id)}
                        >
                            <SVG src={selectedId.includes(todo?.id) ? "assets/icons/arrow-bottom.svg" : "assets/icons/arrow-top.svg"} />
                        </Button>
                        <Dropdown >
                            <Dropdown.Toggle
                                className="bg-white border-0 p-0 m-0 d-flex justify-content-end"
                            >
                            <SVG src="assets/icons/more.svg" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="menu" style={{ width: "126px" }}>
                                <Dropdown.Item 
                                    className="text-danger"
                                >
                                    Delete
                                </Dropdown.Item>
                                    
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className={selectedId.includes(todo?.id) ? "d-none" : "d-block"}>
                    <div className="d-flex align-items-center mb-2 ms-4">
                        <SVG src="assets/icons/schedule.svg" className="me-3"/>
                        <div className="input-group" style={{ width: "193px"}}>
                            <DatePicker
                                placeholder="Set date"
                                value={todo?.date}
                                onChange={(e) => setNewTask({...newTask, date: formatDate(new Date(e), "dd/mm/yyyy")})}
                                format="DD/MM/YYYY"
                                style={{
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                }}
                                containerStyle={{
                                    flex: "1",
                                }}
                                inputClass="form-control"
                            />
                            <span
                                className="input-group-text"
                                style={{
                                borderLeft: "0",
                                borderColor: "#ced4da",
                                background: "white",
                                borderTopRightRadius: "0.475rem",
                                borderBottomRightRadius: "0.475rem",
                                }}
                            >
                                <SVG src="assets/icons/calender.svg" />
                            </span>
                        </div>
                    </div>
                    <div className="d-flex align-items-start mb-2 ms-4" >
                        <Button className="bg-transparent border-0 p-0" onClick={() => handleEditButton(todo?.id)}>
                            <SVG src="assets/icons/edit.svg" className="me-3"/>
                        </Button>
                        {edit.includes(todo?.id) ? 
                        <Form.Control type="text" as="textarea" value={newTask.desc} onChange={(e) => setNewTask({...newTask, desc: e.target.value})} /> : 
                        <p className="ms-1" style={{ marginRight: "50px" }}>{todo?.desc ? todo?.desc : "No description"}</p>}
                    </div>
                    <div className="d-flex align-items-center mb-2 ps-4 py-2" style={{ background: "#F9F9F9"}}>
                        <Dropdown >
                            <Dropdown.Toggle
                                className="bg-white border-0 p-0 m-0 d-flex justify-content-end"
                            >
                            <SVG src="assets/icons/bookmark.svg" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="menu px-3" style={{ width: "277px" }}>
                                <Dropdown.Item 
                                    className="fw-bold my-2"
                                    style={{ background: "#E9F3FF", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask?.bookmark?.concat("Important ASAP")})}
                                >
                                    Important ASAP
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#FDCFA4", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Offline Meeting")})}
                                >
                                    Offline Meeting
                                </Dropdown.Item> 
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#F9E9C3", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Virtual Meeting")})}
                                >
                                    Virtual Meeting
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#AFEBDB", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("ASAP")})}
                                >
                                    ASAP
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#CBF1C2", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Client Related")})}
                                >
                                    Client Related
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#CFCEF9", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Self Task")})}
                                >
                                    Self Task
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#F9E0FD", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Appointments")})}
                                >
                                    Appointments
                                </Dropdown.Item>
                                <Dropdown.Item 
                                    className="fw-bold  my-2"
                                    style={{ background: "#9DD0ED", borderRadius: "5px"}}
                                    onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Court Related")})}
                                >
                                    Court Related
                                </Dropdown.Item>  
                            </Dropdown.Menu>
                        </Dropdown>
                        {renderBookmark(todo?.bookmark)?.map((el, i) => (
                            <p key={i} className="ms-1 mb-0 fw-bold py-2 px-3" style={{ background: renderColor(el), borderRadius: "5px"}}>{el}</p>
                        )) }
                    </div>
                </div>
            </div>
            <Form.Control type="submit" className="d-none" onClick={(e) => onSubmit(e, todo?.id )}/>
        </Form>
    );
}
 
export default Todo;