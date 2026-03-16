import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { redirect, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function AssignmentsControls() {
 const { cid } = useParams();
 const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
 return (
   <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center text-nowrap">
     <InputGroup className="float-start me-2" style={{ maxWidth: "300px" }}>
        <InputGroupText className="bg-white border-end-0">
            <FaMagnifyingGlass/>
        </InputGroupText>
            <FormControl type="text" placeholder="Search..." className="border-start-0" />
     </InputGroup>

    {currentUser?.role === "FACULTY" && (
        <div className="d-flex gap-1">
        <Button variant="secondary" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
        </Button>

        <Button variant="danger" id="wd-add-assignment"
            onClick={() => {
                redirect(`/courses/${cid}/assignments/new`);
            }}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
        </Button>
        </div>
    )}
   </div>
);}
