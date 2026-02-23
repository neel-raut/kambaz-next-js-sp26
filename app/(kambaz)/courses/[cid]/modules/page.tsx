"use client"
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";
export default function Modules() {
    const { cid } = useParams();
    const modules = db.modules;
    return (
      <div>
        <ModulesControls /><br /><br /><br /><br /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            .filter((module) => module.course === cid)
            .map((module) => (
              <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson) => (
                      <ListGroupItem className="wd-lesson p-3 ps-1" key={lesson._id}>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                      </ListGroupItem>
                  ))}
                </ListGroup>
                )}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
  );}