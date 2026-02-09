import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <span className="rounded-pill border border-dark px-3 py-1 text-muted">40% of Total</span>
      <FaPlus className="ms-1 me-1"/>
      <IoEllipsisVertical className="fs-4" />
    </div> );}