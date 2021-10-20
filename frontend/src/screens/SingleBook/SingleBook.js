import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookAction, updateBookAction } from "../../actions/booksActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleBook({ match, history }) {
  const [title, setTitle] = useState();
  const [short_desc, setShort_desc] = useState();
  const [category, setCategory] = useState();
  const [count, setCount] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const { loading, error } = bookUpdate;

  const bookDelete = useSelector((state) => state.bookDelete);
  const { loading: loadingDelete, error: errorDelete } = bookDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBookAction(id));
    }
    history.push("/mybooks");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/books/${match.params.id}`);

      setTitle(data.title);
      setShort_desc(data.short_desc);
      setCategory(data.category);
      setCount(data.count);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setShort_desc("");
    setCount("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBookAction(match.params.id, title, short_desc, category, count)
    );
    if (!title || !short_desc || !category || !count) return;

    resetHandler();
    history.push("/mybooks");
  };

  return (
    <MainScreen title="Edit Book">
      <Card>
        <Card.Header>Edit your Book</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Short Description (Markdown enabled)</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={short_desc}
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
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the book count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Book
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Book
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleBook;
