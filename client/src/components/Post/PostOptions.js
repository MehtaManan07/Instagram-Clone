import React from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const PostOptions = (props) => {
  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action variant="danger" disabled>
              Report
            </ListGroup.Item>
            <ListGroup.Item>Follow unfollow</ListGroup.Item>
            <Link to={`/post/${props.post._id}`}><ListGroup.Item>View post</ListGroup.Item></Link>
            <ListGroup.Item onClick={() => props.setShow(false)} >Cancel</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostOptions;
