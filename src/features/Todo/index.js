import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDataTodo } from "../../store/action/todo";
import TodoForm from "./Form";
import "./Todo.css"
import "../../index.css"
import Todo from "./Todo";

const TodoComponent = ({ show, close }) => {
    const dispatch = useDispatch()

    const { todos, success } = useSelector((state) => state.dataTodo)

    const [task, setTask] = useState(1)

    useEffect(() => {
        if(success) {
            dispatch(getDataTodo())
        }
    }, [dispatch, success])


    

    useEffect(() => {
        dispatch(getDataTodo())
    },[dispatch])
    
    return (
        <Modal show={show} onHide={close} className="modal-custom me-3">
            <div style={{ padding: "24px 32px" }} className="overflow-auto sidebar-menu">
                <div className="d-flex justify-content-between" style={{ marginLeft: "82px", fontSize: "14px"}}>
                    <Form.Select className="w-auto">
                        <option>My Task</option>
                    </Form.Select>
                    <Button style={{ fontSize: "14px"}} onClick={() => setTask(task+1)}>New Task</Button>
                </div>

                <div style={{ fontSize: "12px", color: "#4F4F4F" }}>
                    {todos?.map((todo, i) => (
                        <Todo todo={todo} />
                        // <Form className="d-flex" style={{ borderBottom: "1px solid #4F4F4F", margin: "22px 0" }}>
                        //     <Form.Check type="checkbox" className="bg-transparent" checked={todo?.done}/>
                        //     <div className="w-100">
                        //         <div className="d-flex align-items-center justify-content-between mb-2 ms-4">
                        //             {todo?.title ? <p className={`fw-bold mb-0 ${todo?.done ? "text-decoration-line-through" : ""}`}>{todo?.title}</p> : 
                        //                 <Form.Control 
                        //                 type="text" 
                        //                 placeholder="Type Task Title" 
                        //                 style={{ width: "380px" }} 
                        //                 value={newTask.title}
                        //                 onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        //             />}
                        //             <div className="d-flex align-items-center">
                        //                 <p className="me-2 mb-0 text-danger">2 Days Left</p>
                        //                 <p className="ms-1 mb-0">{todo?.date}</p>
                        //                 <Button 
                        //                     className="bg-transparent border-0 p-0 mx-3"
                        //                     onClick={() => handleButton(todo?.id)}
                        //                 >
                        //                     <SVG src={selectedId.includes(todo?.id) ? "assets/icons/arrow-bottom.svg" : "assets/icons/arrow-top.svg"} />
                        //                 </Button>
                        //                 <Dropdown >
                        //                     <Dropdown.Toggle
                        //                         className="bg-white border-0 p-0 m-0 d-flex justify-content-end"
                        //                     >
                        //                     <SVG src="assets/icons/more.svg" />
                        //                     </Dropdown.Toggle>

                        //                     <Dropdown.Menu className="menu" style={{ width: "126px" }}>
                        //                         <Dropdown.Item 
                        //                             className="text-danger"
                        //                         >
                        //                             Delete
                        //                         </Dropdown.Item>
                                                    
                        //                     </Dropdown.Menu>
                        //                 </Dropdown>
                        //             </div>
                        //         </div>
                        //         <div className={selectedId.includes(todo?.id) ? "d-none" : "d-block"}>
                        //             <div className="d-flex align-items-center mb-2 ms-4">
                        //                 <SVG src="assets/icons/schedule.svg" className="me-3"/>
                        //                 <div className="input-group" style={{ width: "193px"}}>
                        //                     <DatePicker
                        //                         placeholder="Set date"
                        //                         value={todo?.date}
                        //                         onChange={(e) => setNewTask({...newTask, date: formatDate(new Date(e), "dd/mm/yyyy")})}
                        //                         format="DD/MM/YYYY"
                        //                         style={{
                        //                             borderTopRightRadius: "0",
                        //                             borderBottomRightRadius: "0",
                        //                         }}
                        //                         containerStyle={{
                        //                             flex: "1",
                        //                         }}
                        //                         inputClass="form-control"
                        //                     />
                        //                     <span
                        //                         className="input-group-text"
                        //                         style={{
                        //                         borderLeft: "0",
                        //                         borderColor: "#ced4da",
                        //                         background: "white",
                        //                         borderTopRightRadius: "0.475rem",
                        //                         borderBottomRightRadius: "0.475rem",
                        //                         }}
                        //                     >
                        //                         <SVG src="assets/icons/calender.svg" />
                        //                     </span>
                        //                 </div>
                        //             </div>
                        //             <div className="d-flex align-items-start mb-2 ms-4" >
                        //                 <Button className="bg-transparent border-0 p-0" onClick={() => handleEditButton(todo?.id)}>
                        //                     <SVG src="assets/icons/edit.svg" className="me-3"/>
                        //                 </Button>
                        //                 {edit.includes(todo?.id) ? 
                        //                 <Form.Control type="text" as="textarea" value={newTask.desc ? newTask.desc : todo?.desc} onChange={(e) => setNewTask({...newTask, desc: e.target.value})} /> : 
                        //                 <p className="ms-1" style={{ marginRight: "50px" }}>{todo?.desc ? todo?.desc : "No description"}</p>}
                        //             </div>
                        //             <div className="d-flex align-items-center mb-2 ps-4 py-2" style={{ background: "#F9F9F9"}}>
                        //                 <Dropdown >
                        //                     <Dropdown.Toggle
                        //                         className="bg-white border-0 p-0 m-0 d-flex justify-content-end"
                        //                     >
                        //                     <SVG src="assets/icons/bookmark.svg" />
                        //                     </Dropdown.Toggle>

                        //                     <Dropdown.Menu className="menu px-3" style={{ width: "277px" }}>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold my-2"
                        //                             style={{ background: "#E9F3FF", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Important ASAP")})}
                        //                         >
                        //                             Important ASAP
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#FDCFA4", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Offline Meeting")})}
                        //                         >
                        //                             Offline Meeting
                        //                         </Dropdown.Item> 
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#F9E9C3", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Virtual Meeting")})}
                        //                         >
                        //                             Virtual Meeting
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#AFEBDB", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("ASAP")})}
                        //                         >
                        //                             ASAP
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#CBF1C2", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Client Related")})}
                        //                         >
                        //                             Client Related
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#CFCEF9", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Self Task")})}
                        //                         >
                        //                             Self Task
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#F9E0FD", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Appointments")})}
                        //                         >
                        //                             Appointments
                        //                         </Dropdown.Item>
                        //                         <Dropdown.Item 
                        //                             className="fw-bold  my-2"
                        //                             style={{ background: "#9DD0ED", borderRadius: "5px"}}
                        //                             onClick={() => setNewTask({...newTask, bookmark: newTask.bookmark.concat("Court Related")})}
                        //                         >
                        //                             Court Related
                        //                         </Dropdown.Item>  
                        //                     </Dropdown.Menu>
                        //                 </Dropdown>
                        //                 {todo?.bookmark?.map((el, i) => (
                        //                     <p key={i} className="ms-1 mb-0 fw-bold py-2 px-3" style={{ background: renderColor(el), borderRadius: "5px"}}>{el}</p>
                        //                 )) }
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <Form.Control type="submit" className="d-none" onClick={(e) => onSubmit(e, todo?.id, {
                        //         title: newTask.title ? newTask.title : todo?.title,
                        //         date: newTask.date ? newTask.date : todo?.date,
                        //         desc: newTask.desc ? newTask.desc : todo?.desc,
                        //         bookmark: [...new Set(newTask.bookmark ? newTask?.bookmark : todo?.bookmark)],
                        //         done: newTask.done ? newTask.done : todo?.done
                        //     })}/>
                        // </Form>
                    ))}
                    {Array(task).fill().map((el, i) => (
                        <TodoForm key={i} setTask={setTask} task={task}/>
                    ))}
                </div>
            </div>
        </Modal>
    );
}
 
export default TodoComponent;