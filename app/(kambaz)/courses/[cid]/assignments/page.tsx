import Link from "next/link";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import AssignmentListControlButtons from "./AssignmentListControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <AssignmentsControls /><br />

        <ListGroup className="rounded-0" id="wd-assignments-list">
          <ListGroupItem className="wd-assignment-title p-0 mb-5 fs-5">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentListControlButtons />
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem className="wd-assignment d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3 flex-shrink-0 me-1" />
                <BsFileEarmarkText className="me-4 fs-3 text-success flex-shrink-0" />
                <div className="d-flex flex-column flex-grow-1">
                  <Link className="text-dark fw-bold text-decoration-none" href="/courses/1234/assignments/1">
                    A1
                  </Link>
                  <div className="text-muted small d-flex flex-wrap gap-1 fs-6">
                    <span className="text-danger">Multiple Modules</span> |
                    <span><strong>Not available until</strong> May 6 at 12:00 am |</span>
                    <span><strong>Due</strong> May 13 at 11:59 pm |</span>
                    <span>100 pts</span>
                  </div>
                </div>
                <AssignmentControlButtons />
              </ListGroupItem>
              
              <ListGroupItem className="wd-assignment d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                <BsFileEarmarkText className="me-4 fs-3 text-success flex-shrink-0" />
                <div className="d-flex flex-column flex-grow-1">
                  <Link className="text-dark fw-bold text-decoration-none" href="/courses/1234/assignments/2">
                    A2
                  </Link>
                  <div className="text-muted small d-flex flex-wrap gap-1 fs-6">
                    <span className="text-danger">Multiple Modules</span> |
                    <span><strong>Not available until</strong> May 13 at 12:00 am |</span>
                    <span><strong>Due</strong> May 20 at 11:59 pm |</span>
                    <span>100 pts</span>
                  </div>
                </div>
                <AssignmentControlButtons />
              </ListGroupItem>

              <ListGroupItem className="wd-assignment d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />
                <BsFileEarmarkText className="me-4 fs-3 text-success flex-shrink-0" />
                <div className="d-flex flex-column flex-grow-1">
                  <Link className="text-dark fw-bold text-decoration-none" href="/courses/1234/assignments/3">
                    A3
                  </Link>
                  <div className="text-muted small d-flex flex-wrap gap-1 fs-6">
                    <span className="text-danger">Multiple Modules</span> |
                    <span><strong>Not available until</strong> May 13 at 12:00 am |</span>
                    <span><strong>Due</strong> May 20 at 11:59 pm |</span>
                    <span>100 pts</span>
                  </div>
                </div>
                <AssignmentControlButtons />
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
  );}  

/*
<h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button> </h3>
        <ul id="wd-assignment-list">
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/1"
               className="wd-assignment-link" >
              A1 - ENV + HTML
            </Link>
            <div>
                <text>Multiple Modules | <strong>Not available until</strong> May 6 at 12:00 am |</text>
                <br/>
                <text> <strong>Due</strong> May 13 at 11:59 pm | 100 pts </text>
            </div>
          </li>
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/2"
               className="wd-assignment-link" >
              A2 - CSS + BOOTSTRAP
            </Link>
            <div>
                <text>Multiple Modules | <strong>Not available until</strong> May 13 at 12:00 am |</text>
                <br/>
                <text> <strong>Due</strong> May 20 at 11:59 pm | 100 pts </text>
            </div>
          </li>
          <li className="wd-assignment-list-item">
            <Link href="/courses/1234/assignments/3"
               className="wd-assignment-link" >
              A3 - JAVASCRIPT + REACT
            </Link>
            <div>
                <text>Multiple Modules | <strong>Not available until</strong> May 20 at 12:00 am |</text>
                <br/>
                <text> <strong>Due</strong> May 27 at 11:59 pm | 100 pts </text>
            </div>
          </li>
        </ul>*/