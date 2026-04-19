import { Button, Dropdown, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass, FaCheck } from "react-icons/fa6";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { redirect, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { IoEllipsisVertical } from "react-icons/io5";
import { setSortBy } from "./reducer";

const SORT_OPTIONS = [
    { key: "name", label: "Sort by Name" },
    { key: "due", label: "Sort by Due Date" },
    { key: "available", label: "Sort by Available Date" },
];

export default function QuizzesControls() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const sortBy = useSelector((state: RootState) => state.quizzesReducer.sortBy ?? "default");
    const dispatch = useDispatch();
    return (
        <div id="wd-quizzes-controls" className="d-flex justify-content-between align-items-center text-nowrap">
            <InputGroup className="float-start me-2" style={{ maxWidth: "300px" }}>
                <InputGroupText className="bg-white border-end-0">
                    <FaMagnifyingGlass />
                </InputGroupText>
                <FormControl type="text" placeholder="Search..." className="border-start-0" />
            </InputGroup>

            <div className="d-flex gap-1">
                {currentUser?.role === "FACULTY" && (<Button variant="danger" id="wd-add-quiz"
                    onClick={() => {redirect(`/courses/${cid}/quizzes/new`)}}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Quiz
                </Button>)}

                <Dropdown align="end" className="d-inline-block">
                    <Dropdown.Toggle as={Button} variant="secondary" id="wd-quiz-menu" className="p-1 fs-6">
                        <IoEllipsisVertical className="my-2 mx-2" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {SORT_OPTIONS.map((option) => (
                            <Dropdown.Item key={option.key} className="d-flex align-items-center"
                                onClick={() => dispatch(setSortBy(option.key))}
                                active={sortBy === option.key}>
                                {sortBy === option.key && <FaCheck className="me-2" />}
                                {option.label}
                            </Dropdown.Item>
                        ))}
                        {/* <Dropdown.Item disabled className="d-flex align-items-center">
                            <FaSort className="me-2" /> Sort (todo)
                        </Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
