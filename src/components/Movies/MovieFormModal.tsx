import React, { ReactElement, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../Auth/AuthContext";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { APIMovie, routes } from "../../helpers/apiCommunication";

interface Movie {
  title: string;
  tmdbId: string;
  posterPath: string;
}

interface MovieFormModalProps {
  handleClose: () => void;
  show: boolean;
}

export default function MovieFormModal({
  handleClose,
  show,
}: MovieFormModalProps): ReactElement {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const handleSubmit = async () => {
    console.log("submit with token: " + token);
    console.log(user);
  };

  const searchApi = async (inputValue: string) => {
    let request = await axios.get(routes.tmdb.SEARCH, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: inputValue,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let movies: Movie[];

    movies = request.data.results.map((movie: APIMovie, i: number) => {
      return {
        title: movie.title,
        tmdbId: movie.id,
        posterPath: movie.poster_path,
      };
    });
    return movies;
  };

  // Load options using API call
  let searchTimeout: NodeJS.Timeout;
  const loadOptions = (
    inputValue: string,
    callback: (movies: Movie[]) => void
  ) => {
    clearTimeout(searchTimeout);

    // Minor validation check
    if (!inputValue.trim().length) {
      callback([]); // Set empty array for movies to return.
      return;
    }

    searchTimeout = setTimeout(async () => {
      callback(await searchApi(inputValue));
    }, 500);
  };

  return (
    <>
      <Modal
        className="movieModal text-start"
        centered={true}
        size="lg"
        show={show}
        onHide={() => handleClose()}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add new movie to watch list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="title">
              <Form.Label>What's the Movie Title?</Form.Label>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                getOptionLabel={(e) => {
                  return e.title;
                }}
                getOptionValue={(e) => {
                  return e.tmdbId;
                }}
                placeholder="Enter movie title..."
                isClearable
                backspaceRemovesValue
                onChange={(selectedMovie, a) => {
                  setMovie(selectedMovie);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button
              disabled={loading || !movie}
              variant="primary"
              onClick={handleSubmit}
              type="button"
            >
              Submit!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
