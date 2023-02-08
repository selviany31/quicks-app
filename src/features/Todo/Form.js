import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import SVG from "react-inlinesvg"
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { createDataTodo, getDataTodo } from "../../store/action/todo";
import { formatDate } from "../../utils";

const TodoForm = ({ setTask, task }) => {
    const dispatch = useDispatch()

    const { success } = useSelector((state) => state.dataTodo)

    const [edit, setEdit] = useState(false)
    const handleEditButton = (value) => {
        if(edit) {
            return setEdit(false)
        } else {
            return setEdit(true)
        }
    }

    const [newTask, setNewTask] = useState({
        title: "",
        date: "",
        desc: "",
        done: 0,
    })
    console.log(newTask, "form");

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createDataTodo(newTask))
    }

    useEffect(() => {
        if(success) {
            dispatch(getDataTodo())
            setNewTask({
                title: "",
                date: "",
                desc: "",
                done: 0,
            })
        }
    }, [dispatch, success])
    return (
        <Form className="d-flex w-100" style={{ margin: "22px 0", borderBottom: "1px solid #4F4F4F" }}>
            <Form.Check type="checkbox" />
            <div className="ms-4 w-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <Form.Control 
                        type="text" 
                        placeholder="Type Task Title" 
                        style={{ width: "380px" }} 
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <div className="d-flex align-items-center">
                        <Button className="bg-transparent border-0 p-0 mx-3">
                            <SVG src="assets/icons/arrow-top.svg" />
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
                                    onClick={() => setTask(task - 1)}
                                >
                                    Delete
                                </Dropdown.Item>
                                    
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2 form-task">
                    <SVG src="assets/icons/schedule.svg" className="me-3"/>
                    <div className="input-group" style={{ width: "193px"}}>
                        <DatePicker
                            placeholder="Set Date"
                            value={newTask.date}
                            onChange={(e) => {
                                setNewTask({...newTask, date: formatDate(new Date(e), "dd/mm/yyyy")})
                            }}
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
                <div className="d-flex align-items-start mb-2" >
                    <Button className="form-task bg-transparent border-0 p-0" onClick={handleEditButton}>
                        <SVG src="assets/icons/edit.svg" className="me-3"/>
                    </Button>
                    {edit ? 
                    <Form.Control type="text" as="textarea" value={newTask.desc} onChange={(e) => setNewTask({...newTask, desc: e.target.value})} /> : 
                    <p className="ms-1" style={{ marginRight: "50px" }}>No Description</p>}
                </div>
            </div>
            <Form.Control type="submit" className="d-none" onClick={(e) => onSubmit(e)}/>
        </Form>
    );
}
 
export default TodoForm;