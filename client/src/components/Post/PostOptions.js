import React from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
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
            <ListGroup.Item>View post</ListGroup.Item>
            <ListGroup.Item>Cancel</ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostOptions;
