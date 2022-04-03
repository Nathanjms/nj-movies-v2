import React, { ReactElement } from "react";
import { Button, Spinner } from "react-bootstrap";

interface SubmitBtnProps {
  loading: boolean;
  loadingMsg?: string;
  defaultMsg?: string;
}

export const SubmitBtn: React.FC<SubmitBtnProps> = ({
  loading,
  loadingMsg,
  defaultMsg,
}): ReactElement => {
  loadingMsg = loadingMsg || "Loading...";
  defaultMsg = defaultMsg || "Submit";

  if (loading) {
    return (
      <Button className="w-100" variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        {loadingMsg}
      </Button>
    );
  }

  return (
    <Button className="w-100" type="submit">
      {defaultMsg}
    </Button>
  );
};
