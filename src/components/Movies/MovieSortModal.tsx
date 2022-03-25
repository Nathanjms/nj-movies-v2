import React, { ReactElement } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
  const handleSubmit = async () => {};

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
          <Form.Group id="title">
            <Form.Label>test</Form.Label>
            <Form.Select>
              {moviesOrderColumnsArray.map((col, index) => {
                if (col.value === "seen_at" && !watched) {
                  return null;
                }
                return (
                  <option key={col.value} value={col.value}>
                    {col.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSortModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="button">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
