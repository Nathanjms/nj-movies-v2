import React, { ReactElement } from "react";
import {
  Button,
  Modal,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Row,
} from "react-bootstrap";
import {
  moviesOrderColumnsArray,
  validMovieOrderBy,
  validMovieOrderColumn,
} from "../../helpers/movies";

interface MovieSortModalProps {
  setShowSortModal: (show: boolean) => void;
  show: boolean;
  setOrderBy: (orderBy: validMovieOrderBy) => void;
  orderBy: validMovieOrderBy;
  setOrderColumn: (column: validMovieOrderColumn) => void;
  orderColumn: validMovieOrderColumn;
  watched: boolean;
}

export default function MovieSortModal({
  setShowSortModal,
  show,
  setOrderBy,
  orderBy,
  setOrderColumn,
  orderColumn,
  watched,
}: MovieSortModalProps): ReactElement {
  return (
    <>
      <Modal
        className="movieModal text-start"
        centered={true}
        size="lg"
        show={show}
        onHide={() => setShowSortModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sort Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="pt-1 pb-1">
            <Form.Label className="col-sm-3">Order</Form.Label>
            <ToggleButtonGroup
              className="col-sm-9"
              name="orderBy"
              onChange={(value) => setOrderBy(value)}
              defaultValue={orderBy}
            >
              <ToggleButton
                id="radioBtnAsc"
                value="asc"
                disabled={orderBy === "asc"}
              >
                Ascending
              </ToggleButton>
              <ToggleButton
                id="radioBtnDesc"
                value="desc"
                disabled={orderBy === "desc"}
              >
                Descending
              </ToggleButton>
            </ToggleButtonGroup>
          </Row>
          <Row className="pt-1 pb-1">
            <Form.Label className="col-sm-3">Order By</Form.Label>
            <ToggleButtonGroup
              className="col-sm-9"
              name="orderColumn"
              onChange={(value) => setOrderColumn(value)}
              defaultValue={orderColumn}
            >
              {moviesOrderColumnsArray.map((col, index) => {
                if (col.value === "seen_at" && !watched) {
                  return null;
                }
                return (
                  <ToggleButton
                    key={col.value}
                    id={`radioBtn${col.value}`}
                    value={col.value}
                    disabled={orderColumn === col.value}
                  >
                    {col.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSortModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
