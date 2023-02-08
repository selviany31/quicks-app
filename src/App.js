import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import SVG from 'react-inlinesvg'
import InboxComponent from './features/Inbox';
import { useEffect, useState } from 'react';
import TodoComponent from './features/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { getDataInbox } from './store/action/inbox';

function App() {
  const [show, setShow] = useState(false)
  const [showTodo, setShowTodo] = useState(false)
  
  return (
    <div className='d-flex'>
      <div style={{ minWidth: "285px" }}>0000000</div>
      <div className="w-100" style={{ border: "1px solid #4F4F4F", height: "100vh"}}>
        <div className='d-flex align-items-center w-100 ps-4' style={{ background: "#4F4F4F" }}>
          <SVG src='assets/icons/search.svg' className='px-y'/>
          <Form.Control type="text" className='w-100 bg-transparent border-0'/>
        </div>
        <div className='me-3 mb-3 position-fixed bottom-0 end-0'>
          {show && <InboxComponent show={show} close={() => setShow(false)}/>}
          {showTodo && <TodoComponent show={showTodo} close={() => setShowTodo(false)}/>}
          <div className='d-flex align-items-center'>
            <div>
              <p className="text-white position-absolute bottom-100 mb-0" style={{ left: "17px" }}>Task</p>
              <Button className='bg-transparent p-0 border-0' onClick={() => setShowTodo(true)}>
                <SVG src='assets/icons/task.svg' />
              </Button>
            </div>
            <div>
              <p className="text-white position-absolute bottom-100 mb-0" style={{ left: "97px" }}>Inbox</p>
              <Button className='bg-transparent p-0 border-0' onClick={() => setShow(true)}>
                <SVG src='assets/icons/inbox.svg' className='mx-3'/>
              </Button>
            </div>
            <SVG src='assets/icons/simpul.svg' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
