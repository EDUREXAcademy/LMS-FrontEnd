// import { useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../../../courses/CoursesData";
import PropTypes from "prop-types";
import preview from "../../../../assets/pdf-preview.png";
import assignment from "../../../../assets/sample.pdf";
import emptyFolder from "../../../../assets/empty.svg";
import Button from "../../../../ui/Button";

export default function AssignmentGraded() {
  const { courseTitle } = useParams();
  const selectedCourse = courses.find((course) => course.title === courseTitle);

  return (
    <>
      {selectedCourse.progress < 100 ? (
        <div className="empty-assignment">
          <img src={emptyFolder} alt="empty" width="25%" />

          <h4>You do not have any graded assignments yet!</h4>
          <p>Please complete the assignments in the pending board.</p>
        </div>
      ) : (
        <>
          <Assignment
            fileNo={1}
            fileFormat="DOCX"
            fileName="Assignment Document"
            filePath={assignment}
            score={3}
            totalMark={5}
          />
          <Assignment
            fileNo={2}
            fileFormat="PDF"
            fileName="Assignment Document"
            filePath={assignment}
            score={4}
            totalMark={10}
          />
        </>
      )}
    </>
  );
}

Assignment.propTypes = {
  fileNo: PropTypes.number,
  fileName: PropTypes.string,
  filePath: PropTypes.string,
  fileFormat: PropTypes.string,
  totalMark: PropTypes.number,
  score: PropTypes.number,
};

function Assignment({
  fileName,
  fileFormat,
  filePath,
  fileNo,
  totalMark,
  score,
}) {
  return (
    <div className="assessment-assignment-section">
      <div className="assignment-file-container">
        <div className="assignment-file-container-date">
          <span>Tue</span>
          <span className="date-number">23</span>
          <span>Dec</span>
        </div>

        <div>
          <div className="assignment-file-step">
            <div className="question">
              <h3>
                MODULE {fileNo}:{" "}
                <span>
                  Assignment {fileNo} ({totalMark} marks)
                </span>
              </h3>
              <p>a. Write your name and Matric. No. on your answer sheet</p>
              <p>b. Solution should not be more than a page</p>
            </div>

            <div>
              <span
                className={
                  score <= totalMark * 0.4 ? "almost-expired" : "marked"
                }
              >
                Your score: {score}/{totalMark}
              </span>
            </div>
          </div>

          <div className="assignment-file-foot">
            <a href={filePath} download className="file">
              <img src={preview} alt="" className="file-preview" />
              <span className="file-type">
                <span className="file-name">{fileName}</span>
                <span className="file-format">{fileFormat}.</span>
              </span>
            </a>

            <div className="assignment-file-btn">
              <Button
                width={40}
                fontsize={14}
                fontweight={900}
                color="#008688"
                borderradius={12}
                bordercolor="#008688"
                hoverin="#d6e9e9"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
