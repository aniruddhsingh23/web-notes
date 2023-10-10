import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Mainscreen from "./../../component/Mainscreen";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { DeteleNotes, ListNotes } from "./../../Action/noteAction";
import LoaderSpinner from "./../../component/Spinner/Spinner";
import ErrorHandler from "./../../component/Errorhandler/ErrorHandler";
import { useNavigate } from "react-router-dom";

const Mynotes = ({ search }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const Axios = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: true,
  });

  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  const notecreate = useSelector((state) => state.notecreate);
  const { success: successCreate } = notecreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const nodeDelete = useSelector((state) => state.nodeDelete);
  const {
    Loader: LoadingDelete,
    error: errorDetele,
    success: successDetele,
  } = nodeDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You sure.?")) {
      dispatch(DeteleNotes(id));
    }
  };
  useEffect(() => {
    dispatch(ListNotes());
    if (!userInfo) {
      Navigate("/");
    }
  }, [dispatch, successCreate, successUpdate, successDetele]);

  const notelist = useSelector((state) => state.noteList);
  const { Loader, notes, error } = notelist;

  // console.log("notelist abhi", notelist);
  // console.log("notelist abhi", notes);

  return (
    <Mainscreen title={`Welcome Back ${userInfo.name.toUpperCase()}..`}>
      <Link to="/createnote">
        <Button style={{ fontSize: 18 }}>Create New Note</Button>
      </Link>
      {errorDetele && (
        <ErrorHandler variant="danger">{errorDetele}</ErrorHandler>
      )}
      {LoadingDelete && <LoaderSpinner />}
      {error && <ErrorHandler variant="danger">{error}</ErrorHandler>}
      {Loader && <LoaderSpinner />}
      {notes
        ?.reverse()
        .filter((filterNote) =>
          filterNote.title.toUpperCase().includes(search.toUpperCase())
        )
        .map((note) => (
          <Accordion key={`${note._id}`} style={{ marginTop: 20 }}>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      font: 22,
                    }}
                  >
                    <Accordion.Header>{note.title}</Accordion.Header>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>

                    <Button
                      variant="danger"
                      className="mx-3"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Detele
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge className="bg-success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on --{note.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </div>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </Mainscreen>
  );
};

export default Mynotes;
