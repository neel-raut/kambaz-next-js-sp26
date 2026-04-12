/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setModules, editModule, updateModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();

    const onUpdateModule = async (module: any) => {
      await client.updateModule(cid as string, module);
      const newModules = modules.map((m: any) => m._id === module._id ? module : m);
      dispatch(setModules(newModules));
    };

    const onRemoveModule = async (moduleId: string) => {
      await client.deleteModule(cid as string, moduleId);
      dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };

    const onCreateModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid };
      console.log(newModule);
      const createdModule = await client.createModuleForCourse(cid as string, newModule);
      dispatch(setModules([...modules, createdModule]));
    };

    const fetchModules = async () => {
      const modules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };

    useEffect(() => {
      fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);

    return (
      <div className="wd-modules">
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
          addModule={onCreateModuleForCourse}/>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            .map((module: any) => (
              <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray" key={module._id}>
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" /> 
                  {!module.editing && module.name} 
                  { module.editing && (
                    <FormControl className="w-50 d-inline-block"
                      onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onUpdateModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}/>
                  )}
                  <ModuleControlButtons 
                    moduleId={module._id} 
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any) => (
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