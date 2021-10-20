import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBookAction } from "../../actions/booksActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateBook({ history }) {
  const [title, setTitle] = useState("");
  const [short_desc, setShort_desc] = useState("");
  const [category, setCategory] = useState("");
  const [count, setCount] = useState("");

  const dispatch = useDispatch();

  const bookCreate = useSelector((state) => state.bookCreate);
  const { loading, error, book } = bookCreate;

  console.log(book);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setShort_desc("");
    setCount("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBookAction(title, short_desc, category, count));
    if (!title || !short_desc || !category || !count) return;

    resetHandler();
    history.push("/mybooks");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Book">
      <Card>
        <Card.Header>Create a new Book</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Short Description (Markdown enabled)</Form.Label>
              <Form.Control
                as="textarea"
                value={short_desc}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setShort_desc(e.target.value)}
              />
            </Form.Group>
            {short_desc && (
              <Card>
                <Card.Header>Description Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{short_desc}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="content"
                value={count}
                placeholder="Enter the book count"
                onChange={(e) => setCount(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Book
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateBook;
