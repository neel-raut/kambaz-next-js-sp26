import Link from "next/link";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function CourseCard({
    id,
    imageName,
    title,
    description,
}: {
    id?: string;
    imageName?: string;
    title?: string;
    description?: string;
}) {
    return (
        <Card>
            <Link href={`/courses/${id}/home`}
                className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src={`/images/${imageName}`} width="100%" height={160}/>
                    <CardBody>
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{title}</CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                            {description}
                        </CardText>
                        <Button variant="primary"> Go </Button>
                    </CardBody>
            </Link>
        </Card>
    );
}