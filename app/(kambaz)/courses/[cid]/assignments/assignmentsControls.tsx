import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function assignmentsControls() {
 return (
   <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center text-nowrap">
     <InputGroup className="float-start me-2" style={{ maxWidth: "300px" }}>
        <InputGroupText className="bg-white border-end-0">
            <FaMagnifyingGlass/>
        </InputGroupText>
            <FormControl type="text" placeholder="Search..." className="border-start-0" />
     </InputGroup>

     <div className="d-flex gap-1">
        <Button variant="secondary" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
        </Button>

        <Button variant="danger"  id="wd-add-assignment">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
        </Button>
     </div>
   </div>
);}
