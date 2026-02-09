import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <Form className="d-flex flex-column gap-4 pt-3 py-4">
          <div>
            <FormLabel htmlFor="wd-name" >Assignment Name</FormLabel>
            <FormControl id="wd-name" type="text" defaultValue="A1" />
          </div>

          <div>
            <FormControl 
              as="textarea" 
              id="wd-description"
              rows={10}
              defaultValue="The assignment is available online 
              
              Submit a link to the landing page of your Web application
              running on Netlify.
              
              The landing page should include the following:
              Your full name and section
              Links to each of the lab assignments
              Link to the Kanbas application
              Links to all relevant source code repositories
              
              The Kanbas application should include a
              link to navigate back to the landing page." />
          </div>

          <div className="d-flex flex-column gap-4">
            <Row className="d-flex w-100">
              <FormLabel xs={4} column className="text-end">Points</FormLabel>
              <Col xs={8}>
                <FormControl id="wd-points" type="number" defaultValue={100} />
              </Col>
            </Row>

            <Row className="d-flex w-100">
              <FormLabel xs={4} column className="text-end">Assignment Group</FormLabel>
              <Col xs={8}>
                <FormSelect id="wd-assignment-group">
                      <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
                </FormSelect>
              </Col>
            </Row>

            <Row className="d-flex w-100">
              <FormLabel xs={4} column className="text-end">Display Grade as</FormLabel>
              <Col xs={8}>
                <FormSelect id="wd-display-grade">
                      <option value="Percentage" defaultChecked>Percentage</option>
                </FormSelect>
              </Col>
            </Row>

            <Row className="d-flex w-100">
              <FormLabel xs={4} column className="text-end">Submission Type</FormLabel>
              <Col xs={8}>
                <div className="p-3 border rounded">
                  <FormSelect id="wd-submission-type" className="mb-3">
                        <option value="Online" defaultChecked>Online</option>
                  </FormSelect>
                  <span className="fs-6"><strong>Online Entry Options</strong></span>
                  <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-text-entry" label="Text Entry" />
                  <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-website-url" label="Website URL" defaultChecked/>
                  <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-media-recordings" label="Media Recordings" />
                  <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-student-annotations" label="Student Annotations" />
                  <FormCheck className="mt-2" type="checkbox" name="check-entry-option" id="wd-chkbox-file-uploads" label="File Uploads" />
                </div>
              </Col>
            </Row>

            <Row className="d-flex w-100">
              <FormLabel xs={4} column className="text-end">Assign</FormLabel>
              <Col xs={8}>
                <div className="p-3 border rounded d-flex flex-column gap-3">
                  <div>
                    <span className="fs-6"><strong>Assign to</strong></span>
                    <FormSelect id="wd-submission-type">
                          <option value="Everyone" defaultChecked>Everyone</option>
                    </FormSelect>
                  </div>

                  <div>
                    <span className="fs-6"><strong>Due</strong></span>
                    <InputGroup>
                          <FormControl type="datetime-local" defaultValue="2024-05-13T23:59"/>
                    </InputGroup>
                  </div>

                  <div>
                    <Row>
                      <Col xs={12} sm={6}>
                        <span className="fs-6"><strong>Available from</strong></span>
                        <InputGroup>
                            <FormControl type="datetime-local" defaultValue="2024-05-06T00:00"/>
                        </InputGroup>
                      </Col>
                      <Col xs={12} sm={6}>
                        <span className="fs-6"><strong>Until</strong></span>
                        <InputGroup>
                            <FormControl type="datetime-local"/>
                        </InputGroup>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
        <hr />
        <div className="d-flex gap-1 justify-content-end">
          <Button variant="secondary" size="lg" id="wd-cancel-btn"> Cancel </Button>
          <Button variant="danger" size="lg" id="wd-save-btn"> Save </Button>
        </div>
      </div>
  );}
  