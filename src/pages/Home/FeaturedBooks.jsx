import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { Modal, Button} from 'react-bootstrap';
import  { Container } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import './FeaturedBooks.css';
import HarryPotter1 from '../../assets/HP1.png';
import HarryPotter2 from '../../assets/HP2.png';
import HarryPotter3 from '../../assets/HP3.png';
import HarryPotter4 from '../../assets/HP4.png';
import HarryPotter5 from '../../assets/HP5.png';
import HarryPotter6 from '../../assets/HP6.png';
import HarryPotter7 from '../../assets/HP7.png';


function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch('https://your-api-endpoint.com/books/featured?month=may')
  //     .then(response => response.json())
  //     .then(data => setBooks(data))
  //     .catch(error => console.log(error));
  // }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  

  return (
    <div id="carousel">
      <h2>Featured Books for May</h2>
      <Container>
        <Carousel responsive={responsive}>
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter1} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Philosopher's Stone</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP1"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div>
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter2} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Chamber of Secrets</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP2"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div>
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter3} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Prisoner of Azkaban</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP3"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div> 
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter4} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Goblet of Fire</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP4"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div> 
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter5} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Order of Phoenix</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP5"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div> 
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter6} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Half-Blood Prince</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP6"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div> 
          <div className="featured-books">
            <div className="grid__frame">
              <span className="grid__border"></span>
              <span className="square tl"></span>
              <span className="square tr"></span>
              <span className="square bl"></span>
              <span className="square br"></span>
              <i className="icon icon--diamond left"></i>
              <i className="icon icon--diamond right"></i>
              <div className="grid__image">
                <div className="grid__scale">
                  <img src={HarryPotter7} />
                </div>
              </div>
            </div>
            <div className="details">
              <h6 className="book-title">Harry Potter and the Deathly Hallows</h6>
              <p className="author"><b>By: J.K. Rowling</b></p>
              <Button variant="primary"
                data-bs-toggle="modal"
                data-bs-target="#HP7"
                onClick={handleShow}>
                Read More
              </Button>
            </div>
          </div> 
          <Modal id="HP1" show={show} onHide={handleClose} size="l" scrollable>
            <Modal.Header closeButton className="close">
              <Modal.Title>Harry Potter and the Philosopher's Stone</Modal.Title>
            </Modal.Header>
            <Modal.Body  style={{ maxHeight: "60vh", overflowY: "scroll" }}>
              <img className="img-responsive"src={HarryPotter1} alt="" />
              <p>
                “Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter ‘H’.”
              </p>
              <p>
                Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry’s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Link to='/borrow-form'>
                <Button variant="primary" onClick={handleClose}>
                  Borrow
              </Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </Carousel>
      </Container>
    </div>
  );
}

export default FeaturedBooks;
