import React, { useState } from "react";
import Mainscreen from "./../../component/Mainscreen";
import { Card, Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import LoaderSpinner from "../../component/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CreateNotes } from "../../Action/noteAction";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "./../../component/Errorhandler/ErrorHandler";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const notecreate = useSelector((state) => state.notecreate);
  const { Loader, error, note } = notecreate;

  const restHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
    console.log("clear");
  };

  const changeHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(CreateNotes(title, content, category));

    restHandler();
    Navigate("/mynotes");
  };

  return (
    <Mainscreen>
      <Card className="mt-5">
        <Card.Header style={{ fontSize: "35px" }}>
          Created a New Note
        </Card.Header>
        <Card.Body>
          <Form onSubmit={changeHandler}>
            {error && <ErrorHandler variant="danger">{error}</ErrorHandler>}

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter the content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {Loader && <LoaderSpinner size={50} />}
            <Button variant="primary" type="submit">
              Create Note
            </Button>
            <Button className="mx-2" variant="danger" onClick={restHandler}>
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer style={{ color: "#838383" }}>
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </Mainscreen>
  );
};

export default CreateNote;
