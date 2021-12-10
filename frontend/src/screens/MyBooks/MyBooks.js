import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookAction,
  listBooks,
  rentBookslist,
} from "../../actions/booksActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { returnBookAction } from "../../actions/userActions";

function MyBooks({ history, search }) {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state["bookList"]);
  const { loading, error, books } = bookList;

  // const rentbookList = useSelector((state) => state["rentbookList"]);
  // const { rentloading, renterror, rentbooks } = rentbookList;

  const userLogin = useSelector((state) => state["userLogin"]);
  const { userInfo } = userLogin;

  const bookDelete = useSelector((state) => state["bookDelete"]);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const bookCreate = useSelector((state) => state["bookCreate"]);
  const { success: successCreate } = bookCreate;

  const bookUpdate = useSelector((state) => state["bookUpdate"]);
  const { success: successUpdate } = bookUpdate;

  const bookReturn = useSelector((state) => state["bookReturn"]);
  const { error: errorReturn, success: successReturn } = bookReturn;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listBooks());
    } else {
      dispatch(rentBookslist(userInfo._id));
    }
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
    successReturn,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBookAction(id));
    }
  };

  const returnHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(returnBookAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(books)}
      <Link to="/createbook">
        {userInfo && userInfo.isAdmin && (
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Add new Book
          </Button>
        )}
      </Link>
      <Link to="/rentbook">
        {userInfo && !userInfo.isAdmin && (
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Rent a Book
          </Button>
        )}
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {errorReturn && (
        <ErrorMessage variant="danger">{errorReturn}</ErrorMessage>
      )}

      {loading && <Loading />}
      {loadingDelete && <Loading />}

      {books &&
        books
          .filter((filteredBook) =>
            filteredBook.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((book) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={book._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(book)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {book.title}
                    </Accordion.Toggle>
                  </span>

                  {userInfo && userInfo.isAdmin && (
                    <div>
                      <Button href={`/book/${book._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(book._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                  {userInfo && !userInfo.isAdmin && (
                    <div>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => returnHandler(book._id)}
                      >
                        Return
                      </Button>
                    </div>
                  )}
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {book.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{book.short_desc}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {book.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyBooks;
