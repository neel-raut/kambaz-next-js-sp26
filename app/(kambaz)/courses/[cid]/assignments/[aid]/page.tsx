export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea rows={10} cols={45} id="wd-description">
        The assignment is available online Submit a link to the
        landing page of your Web application running on Netlify.
        The landing page should include the following: Your 
        full name and section Links to each of the lab assignments
        Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a
        link to navigate back to the landing page.
        </textarea>
        <br/><br/>
        <table>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr><br/>

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-assignment-group">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                </select>
            </td>
          </tr><br/>

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade">
                    <option value="Percentage">Percentage</option>
                </select>
            </td>
          </tr><br/>

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                </select><br/><br/>
                <div>
                    <text> Online Entry Options </text><br/>

                    <input type="checkbox" name="check-entry-option" id="wd-chkbox-text-entry"/>
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>

                    <input type="checkbox" name="check-entry-option" id="wd-chkbox-website-url"/>
                    <label htmlFor="wd-chkbox-website-url">Website URL</label><br/>

                    <input type="checkbox" name="check-entry-option" id="wd-chkbox-media-recordings"/>
                    <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br/>

                    <input type="checkbox" name="check-entry-option" id="wd-chkbox-student-annotations"/>
                    <label htmlFor="wd-chkbox-student-annotations">Student Annotations</label><br/>

                    <input type="checkbox" name="check-entry-option" id="wd-chkbox-file-uploads"/>
                    <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
                </div>
            </td>
          </tr><br/>

          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
                <div>
                    <label htmlFor="wd-assign-to"> Assign to </label><br/>
                    <input id="wd-assign-to" defaultValue="Everyone" />
                </div><br/>
                <div>
                    <label htmlFor="wd-due-date"> Due Date </label><br/>
                    <input id="wd-due-date" defaultValue="2024-05-13" type="date" />
                </div><br />
                <div>
                    <td>
                        <label htmlFor="wd-available-from-date"> Available from </label><br/>
                        <input id="wd-available-from-date" defaultValue="2024-05-06" type="date" />
                    </td>
                    <td>
                        <label htmlFor="wd-available-until-date"> Until </label><br/>
                        <input id="wd-available-until-date" defaultValue="2024-05-20" type="date" />
                    </td>
                </div>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
                <hr />
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td align="right" valign="top">
                <button>Cancel</button>
                <button>Save</button>
            </td>
          </tr>
        </table>
      </div>
  );}
  