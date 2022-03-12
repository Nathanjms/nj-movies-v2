import React, { ReactElement, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../Auth/AuthContext";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { APIMovie } from "../../helpers/apiCommunication";

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
  const [title, setTitle] = useState<string>("");
  const [tmdbId, setTmdbId] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function handleSubmit(e: any) {
    //   e.preventDefault();
    //   if (!title) {
    //     console.log("false title");
    //     return;
    //   }
    //   try {
    //   } catch (err) {}
  }

  // const handleInputChange = async (newValue: string, actionMeta: ActionMeta) => {
  //   console.log(newValue);
  //   if (newValue.length < 3) {
  //     return;
  //   }
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  // }

  // const loadOptions = (
  //   inputValue: string,
  //   callback: (options: ColourOption[]) => void
  // ) => {
  //   setTimeout(() => {
  //     callback(filterColors(inputValue));
  //   }, 1000);
  // };

  let searchTimeout: NodeJS.Timeout;

  const searchApi = async (inputValue: string) => {
    console.log("search");
    let request = await axios.get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: inputValue,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return request.data.results as Movie[];
  };

  // load options using API call
  const loadOptions = (
    inputValue: string,
    callback: (movies: Movie[]) => void
  ) => {
    clearTimeout(searchTimeout);
    if (!inputValue.length) {
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add new movie to watch list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group id="title">
              <Form.Label>What's the Movie Title?</Form.Label>
              <AsyncSelect
                cacheOptions={false}
                loadOptions={loadOptions}
                defaultOptions
                getOptionLabel={(e) => {
                  return e.title;
                }}
                getOptionValue={(e) => {
                  return e.tmdbId;
                }}
                placeholder="Enter 3 letters to search..."
              />
              <small>Enter at least 3 characters</small>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button disabled={loading} variant="primary" type="button">
              Submit!
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
