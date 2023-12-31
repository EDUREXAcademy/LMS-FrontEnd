/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../../../courses/CoursesData";
import PropTypes from "prop-types";
import AssignmentPending from "./AssignmentPending";
import AssignmentSubmitted from "./AssignmentSubmitted";
import AssignmentGraded from "./AssignmentGraded";
import AssignmentSubmit from "./AssignmentSubmit";
import { IoHelpCircleOutline, IoCheckmarkDone } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";

function getStepName(step, checkPending) {
  switch (step) {
    case 1:
      return (
        <p className="assessment-assignment-menu">
          <span className="menu-link">
            <IoHelpCircleOutline className="menu-icon" size={24} />
            PENDING
          </span>

          {checkPending < 100 && <span className="count">2</span>}
        </p>
      );

    case 2:
      return (
        <p className="assessment-assignment-menu">
          <span className="menu-link">
            <IoMdCheckboxOutline size={20} className="menu-icon" />
            SUBMITTED
          </span>

          {checkPending === 100 && <span className="count">2</span>}
        </p>
      );
    case 3:
      return (
        <p className="assessment-assignment-menu">
          <span className="menu-link">
            <IoCheckmarkDone size={20} className="menu-icon" /> GRADED
          </span>

          {checkPending === 100 && <span className="count">2</span>}
        </p>
      );
    default:
      return "";
  }
}

export default function AssignmentAssessment() {
  const [submissionStatus, setSubmissionStatus] = useState(false);

  function handleSubmission() {
    setSubmissionStatus(true);
  }

  return (
    <div>
      {!submissionStatus ? (
        <Step onSubmitNow={handleSubmission} />
      ) : (
        <AssignmentSubmit />
      )}
    </div>
  );
}

Step.propTypes = {
  onSubmitNow: PropTypes.func,
};

function Step({ onSubmitNow }) {
  const messages = [
    // eslint-disable-next-line react/jsx-key
    <AssignmentPending onSubmitNow={onSubmitNow} />,
    // eslint-disable-next-line react/jsx-key
    <AssignmentSubmitted />,
    // eslint-disable-next-line react/jsx-key
    <AssignmentGraded />,
  ];
  const { courseTitle } = useParams();
  const selectedCourse = courses.find((course) => course.title === courseTitle);
  const { progress } = selectedCourse;
  const [step, setStep] = useState(1);

  function handleStepClick(selectedStep) {
    setStep(selectedStep);
  }

  return (
    <div className="assessment-assignment-steps">
      <div className="all-steps">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={step === s ? "active" : ""}
            onClick={() => handleStepClick(s)}
          >
            <div className="step-title">{getStepName(s, progress)}</div>
          </div>
        ))}
      </div>

      <div className="step-content">
        <StepMessage>{messages[step - 1]}</StepMessage>
      </div>
    </div>
  );
}

StepMessage.propTypes = {
  step: PropTypes.number,
  children: PropTypes.node.isRequired,
};

function StepMessage({ children }) {
  return <div className="message">{children}</div>;
}
